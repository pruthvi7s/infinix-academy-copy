
'use server';
/**
 * @fileOverview A simple chatbot flow for answering student queries.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudentChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    }))
  })).describe("The entire conversation history, including the user's latest message."),
   language: z.string().optional().default('English').describe('The language for the AI to respond in. e.g., "English", "Marathi", "Hindi".'),
});
export type StudentChatInput = z.infer<typeof StudentChatInputSchema>;

const StudentChatOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the student\'s question.'),
});
export type StudentChatOutput = z.infer<typeof StudentChatOutputSchema>;


export async function chatWithStudent(input: StudentChatInput): Promise<StudentChatOutput> {
  return studentChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentChatPrompt',
  input: {schema: z.any()}, // Accept a transformed history
  output: {schema: StudentChatOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for students using the "CareerCraft Navigator" application by Infinix Academy.

You MUST respond in the following language: {{{language}}}.

Your primary roles are:
1.  **Answer General Questions:** Provide concise and simple answers to general knowledge questions a student might have.
2.  **Explain Application Features:**
    *   If asked about the **Holland Test (or RIASEC)**, explain that it helps users discover their personality type based on interests (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) to find matching work environments and occupations. Direct them to the "Holland Test" page.
    *   If asked about the **Myers-Briggs Test (or MBTI / personality test)**, explain that it helps users understand their personality preferences (like Introversion vs. Extraversion) to gain insight into their personal strengths. Direct them to the "Myers-Briggs Test" page.
    *   If asked about the **Skills & Interests Assessment**, explain that it's where they can detail their unique skills, interests, and values to get career suggestions tailored specifically to them. Direct them to the "Skills & Interests Assessment" page.
3.  **Career Guidance:** Provide brief, high-level career counseling advice.
4.  **Encourage Next Steps (Subtly):** If the conversation naturally turns to career paths, roadmaps, or what to do after the tests, you can gently mention that Infinix Academy offers one-on-one guidance with subject matter experts for more personalized help. Frame it as a helpful suggestion, not a sales pitch.

Keep your answers short, supportive, and to the point.

If you do not know the answer, or if the question is too complex or outside your scope, you MUST respond with:
"I can help with general questions, career guidance, and navigating this application. For more specific help, please contact the Infinix Academy team at 6360236070 or infinixacademy7@gmail.com."

Do not invent answers you don't know.

Here is the conversation history. The last message is the user's current question.
{{#each history}}
  {{#if this.user}}User: {{this.user}}{{/if}}
  {{#if this.model}}AI: {{this.model}}{{/if}}
{{/each}}

Provide your answer now.`,
});

const studentChatFlow = ai.defineFlow(
  {
    name: 'studentChatFlow',
    inputSchema: StudentChatInputSchema,
    outputSchema: StudentChatOutputSchema,
  },
  async (input) => {
    // Transform the history for the prompt's template structure
    const transformedHistory = input.history.map(message => {
        if (message.role === 'user') {
            return { user: message.content[0].text };
        } else {
            return { model: message.content[0].text };
        }
    });

    const {output} = await prompt({ history: transformedHistory, language: input.language });
    if (!output) {
      throw new Error("Failed to get a response from the AI model.");
    }
    return output;
  }
);
