
"use server";

import { suggestCareerPaths as suggestCareerPathsFlow, type CareerPathSuggestionsInput as GenAICareerPathSuggestionsInput, type CareerPathSuggestionsOutput as GenAICareerPathSuggestionsOutput } from "@/ai/flows/career-path-suggestions";
import { generateRoadmap as generateRoadmapFlow, type GenerateRoadmapInput as GenAIGenerateRoadmapInput, type GenerateRoadmapOutput as GenAIGenerateRoadmapOutput } from "@/ai/flows/personalized-roadmap-generation";

// Re-exporting types for easier import in client components if needed
export type CareerPathSuggestionsInput = GenAICareerPathSuggestionsInput;
export type CareerPathSuggestionsOutput = GenAICareerPathSuggestionsOutput;
export type GenerateRoadmapInput = GenAIGenerateRoadmapInput;
export type GenerateRoadmapOutput = GenAIGenerateRoadmapOutput;


export async function getCareerSuggestionsAction(input: CareerPathSuggestionsInput): Promise<CareerPathSuggestionsOutput> {
  try {
    const result = await suggestCareerPathsFlow(input);
    // Ensure we always return a valid structure, even if the AI response is partial
    if (!result || !Array.isArray(result.careerPaths)) {
      console.warn("AI response for career suggestions was null or malformed. Returning empty array.");
      return { careerPaths: [] };
    }
    return {
      mbtiExplanation: result.mbtiExplanation || undefined,
      careerPaths: result.careerPaths.map(path => ({
        title: path.title || "N/A",
        description: path.description || "No description available.",
        suitabilityReasoning: path.suitabilityReasoning || "No reasoning provided.",
        specificJobRoles: path.specificJobRoles || [],
        salaryEstimate: path.salaryEstimate,
        topHiringCompanies: path.topHiringCompanies,
      })),
    };
  } catch (error) {
    console.error("Error in getCareerSuggestionsAction:", error);
    // Return a default empty structure on error to prevent client-side crashes
    return { careerPaths: [] };
  }
}

export async function getPersonalizedRoadmapAction(input: GenerateRoadmapInput): Promise<GenerateRoadmapOutput> {
  try {
    const roadmapString = await generateRoadmapFlow(input);
    if (typeof roadmapString !== 'string') {
      throw new Error('Roadmap generation returned an unexpected format.');
    }
    return { roadmap: roadmapString };
  } catch (error) {
    console.error("Error in getPersonalizedRoadmapAction:", error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while generating the roadmap.");
  }
}
