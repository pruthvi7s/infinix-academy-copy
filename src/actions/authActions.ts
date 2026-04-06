
"use server";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { AssessmentFormData } from "@/context/AssessmentContext";
import placeholderImages from "@/app/lib/placeholder-images.json";


export async function adminSignInAction(email: string, password: string): Promise<{ success: boolean; error?: string; role?: string }> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Server-side check for admin role immediately after sign-in.
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const role = userDoc.exists() ? userDoc.data().role : 'student';

        if (role === 'admin') {
            return { success: true, role: 'admin' };
        } else {
            // If the user is not an admin, sign them out immediately to prevent confusion.
            await signOut(auth);
            return { success: false, error: "Access Denied. This account does not have admin privileges." };
        }
    } catch (error: any) {
        let errorMessage = "An error occurred during sign-in.";
        if (error.code) {
             switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                    errorMessage = "Invalid admin credentials. Please try again.";
                    break;
                default:
                    errorMessage = `An error occurred: ${error.message}`;
                    break;
            }
        }
        console.error("Admin sign-in error:", error);
        return { success: false, error: errorMessage };
    }
}


export async function studentSignInAction(email: string, password: string): Promise<{ success: boolean; error?: string, student?: AssessmentFormData }> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const studentDocRef = doc(db, "students", user.uid);
        const studentDoc = await getDoc(studentDocRef);

        if (studentDoc.exists()) {
            return { success: true, student: { id: studentDoc.id, ...studentDoc.data() } as AssessmentFormData };
        } else {
            const newStudentData: AssessmentFormData = {
                id: user.uid,
                email: user.email || "",
                name: user.displayName || user.email?.split('@')[0] || "New User",
                createdAt: new Date().toISOString(),
                experiencePoints: 0,
                isProUser: false,
                savedCourses: [],
                completedLessons: {},
                role: "student",
                plan: "Basic",
                avatarUrl: placeholderImages.defaultUserAvatar.src,
                age: "",
                phone: "",
                school: "",
                address: "",
                education: "",
                gender: undefined,
                skills: "",
                interests: "",
                values: "",
                completedProjects: [],
            };
            await setDoc(studentDocRef, newStudentData);
            
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (!userDocSnap.exists()) {
                 await setDoc(userDocRef, {
                    email: user.email,
                    role: 'student',
                    createdAt: new Date().toISOString(),
                }, { merge: true });
            }

            return { success: true, student: newStudentData };
        }
    } catch (error: any) {
        let errorMessage = "An error occurred during sign-in.";
        if (error.code) {
             switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/wrong-password':
                    errorMessage = "Invalid email or password. Please try again.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "The password is too weak. Please use at least 6 characters.";
                    break;
                default:
                    errorMessage = "An error occurred during sign-in.";
                    break;
            }
        }
        console.error("Student sign-in error:", error);
        return { success: false, error: errorMessage };
    }
}

type SignUpData = Pick<AssessmentFormData, 'name' | 'email' | 'phone'> & { password: string };

export async function studentSignUpAction(signUpData: SignUpData): Promise<{ success: boolean; message: string; student?: Partial<AssessmentFormData> }> {
  const { email, password, name, phone } = signUpData;

  if (!password) {
    return { success: false, message: "Password is required for sign-up." };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const newStudentData: Partial<AssessmentFormData> = {
      id: user.uid,
      email: user.email!,
      name: name,
      phone: phone,
      createdAt: new Date().toISOString(),
      experiencePoints: 0,
      isProUser: false,
      savedCourses: [],
      completedLessons: {},
      role: "student",
      plan: "Basic",
      avatarUrl: placeholderImages.defaultUserAvatar.src
    };
    
    const studentDocRef = doc(db, "students", user.uid);
    await setDoc(studentDocRef, newStudentData, { merge: true });

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
        email: user.email,
        role: 'student',
        createdAt: new Date().toISOString(),
    });

    console.log("New user signed up and created in 'students' and 'users' collections with ID: ", user.uid);
    return { success: true, message: "Account created successfully!", student: newStudentData };

  } catch (error: any) {
    let errorMessage = "An unknown error occurred.";
    if (error.code) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "This email address is already in use by another account.";
                break;
            case 'auth/invalid-email':
                errorMessage = "The email address is not valid.";
                break;
            case 'auth/weak-password':
                errorMessage = "The password is too weak. Please use at least 6 characters.";
                break;
            default:
                errorMessage = `Failed to create an account. Error: ${error.code}`;
                break;
        }
    }
    console.error("Error signing up student: ", error);
    return { success: false, message: errorMessage };
  }
}

export async function studentLogoutAction() {
    await signOut(auth);
}

export async function sendPasswordResetAction(email: string): Promise<{ success: boolean; message: string }> {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "Password reset link sent! Please check your email inbox (and spam folder)." };
    } catch (error: any) {
        let errorMessage = "An unknown error occurred.";
        if (error.code) {
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email address.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "The email address is not valid.";
                    break;
                default:
                    errorMessage = "Failed to send password reset email. Please try again.";
                    break;
            }
        }
        console.error("Password reset error:", error);
        return { success: false, message: errorMessage };
    }
}
