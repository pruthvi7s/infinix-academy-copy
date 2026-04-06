
'use server';

import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string; // Changed to string
}

export async function saveMessageAction(formData: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return { success: false, message: "You must be logged in to send a message." };
        }

        const messagesCollection = collection(db, 'messages');
        await addDoc(messagesCollection, {
            ...formData,
            createdAt: serverTimestamp(),
            senderId: currentUser.uid, 
        });
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error saving message:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: `Failed to send message: ${errorMessage}` };
    }
}


export async function deleteMessageAction(messageId: string): Promise<{ success: boolean; message: string }> {
    try {
        const messageDocRef = doc(db, 'messages', messageId);
        await deleteDoc(messageDocRef);
        return { success: true, message: "Message deleted successfully." };
    } catch (error: any) {
        console.error("Error deleting message:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: `Failed to delete message: ${errorMessage}` };
    }
}
