
"use server";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AssessmentFormData } from "@/context/AssessmentContext";

// This action is used for any subsequent updates to the main profile data.
// It relies on Firestore Security Rules to ensure only an authenticated user can update their own data,
// or an admin can update any user's data.
export async function updateStudentDataAction(studentData: Partial<AssessmentFormData>): Promise<{ success: boolean; message: string }> {
  if (!studentData.id) {
    return { success: false, message: "Student ID is missing. Cannot save data." };
  }

  const studentId = studentData.id;
  // Exclude the id from the data being written, as it's the document key
  const { id, ...dataToUpdate } = studentData; 

  try {
    const studentDocRef = doc(db, "students", studentId);
    // Security is now entirely handled by Firestore Rules.
    // The rules check if the requester is an admin OR if they are the owner of the document.
    await updateDoc(studentDocRef, { ...dataToUpdate, updatedAt: new Date().toISOString() });

    console.log("Student data updated in Firestore for ID: ", studentId);
    return { success: true, message: "Student data updated successfully." };
  } catch (error) {
    console.error("Error updating student in Firestore: ", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, message: `Failed to save student data: ${errorMessage}` };
  }
}

// This is the original function for the initial profile setup. It's good to keep it separate.
export async function saveStudentDataAction(studentData: Partial<AssessmentFormData>): Promise<{ success: boolean; message: string, studentId?: string }> {
  if (!studentData.id) {
    return { success: false, message: "Student ID is missing. Cannot save data." };
  }
  
  const studentId = studentData.id;
  const { id, ...dataToUpdate } = studentData;

  try {
    const studentDocRef = doc(db, "students", studentId);
    // This uses updateDoc because the document should already exist from the signup process.
    await updateDoc(studentDocRef, { ...dataToUpdate, updatedAt: new Date().toISOString() });

    console.log("Student data updated in Firestore for ID: ", studentId);
    return { success: true, message: "Student data saved successfully.", studentId: studentId };
  } catch (error) {
    console.error("Error updating student in Firestore: ", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, message: `Failed to save student data: ${errorMessage}` };
  }
}

// This function now requires the user's UID (id) to perform the update.
export async function saveAssessmentResultsAction(userId: string, resultsData: Partial<AssessmentFormData>): Promise<{ success: boolean; message: string }> {
  if (!userId) {
    return { success: false, message: "User ID is required to save the results." };
  }

  try {
    const studentDocRef = doc(db, "students", userId);
    const studentDoc = await getDoc(studentDocRef);

    if (!studentDoc.exists()) {
        return { success: false, message: "Could not find student record to update." };
    }

    await updateDoc(studentDocRef, { ...resultsData, updatedAt: new Date().toISOString() });
    
    console.log("Successfully updated student results in Firestore for ID: ", userId);
    return { success: true, message: "Assessment results saved successfully." };

  } catch (error) {
    console.error("Error updating student document with results: ", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, message: `Failed to save results: ${errorMessage}` };
  }
}
