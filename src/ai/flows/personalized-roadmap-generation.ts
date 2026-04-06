'use server';

/**
 * @fileOverview Generates personalized learning roadmaps for suggested career paths.
 *
 * - generateRoadmap - A function that generates a personalized learning roadmap for a given career path based on the user's skills and interests, including educational requirements.
 * - GenerateRoadmapInput - The input type for the generateRoadmap function.
 * - GenerateRoadmapOutput - The return type for the generateRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoadmapInputSchema = z.object({
  careerPath: z.string().describe('The career path to generate a roadmap for.'),
  userSkills: z.array(z.string()).describe('The skills the user already possesses.'),
  userInterests: z.string().describe('The interests of the user.'),
});
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;

// This is the output type of the ACTION, not the flow itself.
const GenerateRoadmapOutputSchema = z.object({
  roadmap: z.string(),
});
export type GenerateRoadmapOutput = z.infer<typeof GenerateRoadmapOutputSchema>;


export async function generateRoadmap(input: GenerateRoadmapInput): Promise<string> {
  return generateRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRoadmapPrompt',
  input: {schema: GenerateRoadmapInputSchema},
  output: {format: 'text'}, // Output a raw string
  prompt: `You are an expert career counselor. Generate a detailed, actionable, and personalized learning roadmap for the specified career path. The roadmap MUST be formatted using Markdown.

**Mandatory Output Format:**
Use '##' for main headings. Use '**' for bolded subheadings. Use short, concise bullet points ('* ') for all list items. Do NOT use any other special characters.

**User Profile:**
- **Career Path:** {{{careerPath}}}
- **Existing Skills:** {{#if userSkills}}{{#each userSkills}}- {{{this}}} {{/each}}{{else}}No specific skills listed.{{/if}}
- **Interests:** {{{userInterests}}}

**Roadmap Generation Rules (MUST FOLLOW IN THIS EXACT ORDER):**

1.  **## Educational Pathways**
    *   This section is MANDATORY and MUST be the first section.
    *   **After 10th:** Suggest stream/subjects.
    *   **After 12th:** Suggest entrance exams or next steps.
    *   **Undergraduate Degree:** Recommend specific degrees (e.g., B.Tech in CSE).
    *   **Postgraduate/Masters:** Suggest relevant master's degrees or specializations.
    *   **Key Certifications:** List important professional certifications.

2.  **## Skill Development**
    *   This section MUST come after Educational Pathways.
    *   **Hard Skills:** List crucial technical skills.
    *   **Soft Skills:** List important interpersonal skills.

3.  **## Important Courses**
    *   This section MUST come after Skill Development.
    *   **Detailed Course Topics:** Provide a list of important topics and course categories relevant to the career path. Do NOT mention any platform names like Udemy or Coursera. For example, if the career is Pharmacy, suggest categories like 'Pharmacology and Drug Information', 'Pharmaceutical Industry (covering GMP, supply chain)', 'Drug Regulatory Affairs (DRA)', and 'Clinical Research'. For each category, list a few specific course titles.

4.  **## Experience Building**
    *   **Projects:** Recommend types of projects.
    *   **Internships/Work:** Suggest relevant internships or volunteer work.
    *   **Networking:** Provide networking strategies.

5.  **## Timeline / Phases**
    *   Break down the roadmap into logical phases with time estimates (e.g., **Phase 1: Foundational (1-2 Years)**).

Generate the roadmap now, strictly adhering to the specified Markdown format and section order.
Roadmap:`,
});

const generateRoadmapFlow = ai.defineFlow(
  {
    name: 'generateRoadmapFlow',
    inputSchema: GenerateRoadmapInputSchema,
    outputSchema: z.string(), // The flow returns a string
  },
  async input => {
    const {text} = await prompt(input);
    return text;
  }
);
