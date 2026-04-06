
'use server';

import { collection, addDoc, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AssessmentFormData } from '@/context/AssessmentContext';

export interface PaymentRequest {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    planName: string;
    planPrice: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string; // Changed to string
    approvedAt?: string; // Changed to string
}

interface CreatePaymentRequestInput {
    userId: string;
    userName: string;
    userEmail: string;
    planName: string;
    planPrice: string;
}

export async function createPaymentRequestAction(input: CreatePaymentRequestInput): Promise<{ success: boolean; message: string }> {
    try {
        // Firestore rules allow any authenticated user to create.
        const paymentRequestsCollection = collection(db, 'paymentRequests');
        await addDoc(paymentRequestsCollection, {
            ...input,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return { success: true, message: "Payment request submitted successfully!" };
    } catch (error) {
        console.error("Error creating payment request:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: `Failed to submit request: ${errorMessage}` };
    }
}


export async function approvePaymentRequestAction(requestId: string, userId: string, planName: 'Standard' | 'Premium'): Promise<{ success: boolean; message: string }> {
    const batch = writeBatch(db);
    
    try {
        // Firestore rules will enforce admin-only access for these updates.
        // 1. Update the payment request status
        const requestDocRef = doc(db, 'paymentRequests', requestId);
        batch.update(requestDocRef, {
            status: 'approved',
            approvedAt: serverTimestamp()
        });

        // 2. Update the student's document to grant access
        const studentDocRef = doc(db, 'students', userId);
        const updateData: Partial<AssessmentFormData> = {
            isProUser: true, // Generic pro access
            plan: planName // Specific plan tier
        };
        batch.update(studentDocRef, updateData);

        // Commit both writes at once
        await batch.commit();

        return { success: true, message: `User has been successfully upgraded to the ${planName} plan.` };
    } catch (error: any) {
        console.error("Error approving payment request:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: `Failed to approve request: ${errorMessage}` };
    }
}
