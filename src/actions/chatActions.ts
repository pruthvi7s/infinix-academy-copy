
"use server";

import { chatWithStudent as chatWithStudentFlow, type StudentChatInput, type StudentChatOutput } from "@/ai/flows/student-chat-flow";

export async function getChatResponseAction(input: StudentChatInput): Promise<StudentChatOutput> {
  try {
    const result = await chatWithStudentFlow(input);
    if (!result || !result.answer) {
      return { answer: "I'm sorry, I encountered an issue. Please try again." };
    }
    return result;
  } catch (error) {
    console.error("Error in getChatResponseAction:", error);
    return { answer: "I'm sorry, I couldn't connect to the chat service. Please try again later." };
  }
}
