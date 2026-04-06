
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminDashboardPage() {
    const { isAdmin, isAuthLoading } = useAssessment();
    const router = useRouter();

    useEffect(() => {
        // This effect only runs after the auth check is complete.
        if (!isAuthLoading) {
            // If the user is NOT an admin, redirect them away.
            if (!isAdmin) {
                router.replace('/admin/login');
            }
        }
    }, [isAdmin, isAuthLoading, router]);

    // While checking auth, show a full-screen loading state.
    if (isAuthLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-4">
                <LoadingSpinner size={48} />
                <p className="text-xl text-primary">Verifying Admin Access...</p>
            </div>
        );
    }
    
    // If the checks have passed and the user is an admin, render the dashboard.
    // The effect above will handle redirecting non-admins.
    if (isAdmin) {
        return <AdminDashboard />;
    }

    // This is a fallback state, typically shown briefly during the redirect.
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-4">
            <LoadingSpinner size={48} />
            <p className="text-xl text-primary">Redirecting...</p>
        </div>
    );
}
