import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })],
  // ⭐️ THIS IS THE CHANGE: Using the more cost-effective model
  model: 'googleai/gemini-2.5-flash-lite',
});
