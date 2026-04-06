'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting career paths based on user assessment results.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerPathSuggestionsInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of the user\'s skills.'),
  interests: z
    .string()
    .describe('A comma-separated list of the user\'s interests.'),
  values: z
    .string()
    .describe('A comma-separated list of the user\'s values.'),
  hollandCode: z
    .string()
    .optional()
    .describe('The user\'s Holland Code (e.g., RIA, SEC), if available.'),
  mbtiType: z
    .string()
    .optional()
    .describe('The user\'s Myers-Briggs Type Indicator (MBTI) type (e.g., "INTJ", "ESFP"), if available.'),
});
export type CareerPathSuggestionsInput = z.infer<
  typeof CareerPathSuggestionsInputSchema
>;

const CareerPathSuggestionsOutputSchema = z.object({
  mbtiExplanation: z.string().optional().describe("A detailed explanation of the provided MBTI type's key traits, strengths, and weaknesses in a professional context. This should only be generated if an MBTI type is provided in the input."),
  careerPaths: z.array(
    z.object({
      title: z.string().describe('The title of the career path.'),
      description: z
        .string()
        .describe('A description of the career path.'),
      suitabilityReasoning: z
        .string()
        .describe("A concise, 5-point bulleted list explaining why this career path is suitable for the user, based on their skills, interests, and personality traits. Each point should start with a '*' character."),
      specificJobRoles: z.array(z.string()).describe("A list of at least 5-7 specific job roles or departments within this career path (e.g., 'Quality Control', 'R&D Scientist', 'Production Manager')."),
      salaryEstimate: z.object({
          fresher: z.string().describe("An estimated annual salary in Indian Rupees (INR), formatted as 'X-Y Lakhs per annum', for a fresher in this role."),
          senior: z.string().describe("An estimated annual salary in Indian Rupees (INR), formatted as 'X-Y Lakhs per annum', for a senior (5+ years experience) in this role."),
      }).describe("An object containing salary estimates in INR for fresher and senior levels, formatted as 'X-Y Lakhs per annum'.").optional(),
      topHiringCompanies: z.array(z.string()).describe("A list of 10-12 top companies or types of organizations known for hiring in this role.").optional(),
    })
  ).describe("An array of at least 3 distinct career path suggestions. If you cannot find good matches, provide broader category suggestions instead of specific careers, but you MUST return at least 3 items in the array."),
});
export type CareerPathSuggestionsOutput = z.infer<
  typeof CareerPathSuggestionsOutputSchema
>;

export async function suggestCareerPaths(
  input: CareerPathSuggestionsInput
): Promise<CareerPathSuggestionsOutput> {
  return suggestCareerPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerPathSuggestionsPrompt',
  input: {schema: CareerPathSuggestionsInputSchema},
  output: {schema: CareerPathSuggestionsOutputSchema},
  prompt: `You are an expert career counselor. Your goal is to suggest at least 3 potential career paths based on a user's profile. You MUST produce a valid JSON object matching the output schema.

**User Profile:**
- Skills: {{{skills}}}
- Interests: {{{interests}}}
- Values: {{{values}}}
{{#if hollandCode}}- Holland Code: {{{hollandCode}}}{{/if}}
{{#if mbtiType}}- MBTI Type: {{{mbtiType}}}{{/if}}

**Instructions (Follow Strictly):**

1.  **Generate Career Paths (Mandatory):**
    *   You MUST suggest at least 3 distinct career paths in the 'careerPaths' array.
    *   For each path, you MUST provide:
        *   'title': A concise title.
        *   'description': A summary of the career.
        *   'suitabilityReasoning': CRITICAL - This MUST be a concise, 5-point bulleted list explaining why the career is a good fit. Each bullet point MUST start with a '*' character.
        *   'specificJobRoles': A list of at least 5 specific job roles.
        *   'salaryEstimate': (Optional but recommended) Salary estimates in INR for fresher and senior levels, formatted as "X-Y Lakhs per annum".
        *   'topHiringCompanies': (Optional but recommended) A list of 10-12 top hiring companies.
    *   **CRITICAL FALLBACK:** If the user's input is too generic or you cannot determine specific career paths, you MUST still return 3 suggestions. In this case, suggest broader career CATEGORIES (e.g., "Creative Arts", "Technology and IT", "Healthcare Services") and explain why the user's inputs might align with those general fields. Ensure all required fields for each path are still populated, even if the content is more general.

2.  **Generate MBTI Explanation (Conditional):**
    *   If (and only if) an 'mbtiType' is provided in the input, you MUST generate a detailed 'mbtiExplanation'. This should be a general overview of that personality type's professional characteristics, strengths, and weaknesses.

Produce a single JSON object that strictly follows the output schema. Do NOT return anything other than the valid JSON object.
`,
});

const suggestCareerPathsFlow = ai.defineFlow(
  {
    name: 'suggestCareerPathsFlow',
    inputSchema: CareerPathSuggestionsInputSchema,
    outputSchema: CareerPathSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output || !output.careerPaths || output.careerPaths.length === 0) {
      // Throw an error if the output is completely empty or malformed
      throw new Error("The AI model returned an invalid or empty response. It might be due to a content filter or an internal error.");
    }
    return output;
  }
);
