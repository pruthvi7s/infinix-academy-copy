
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function RootPage() {
  const router = useRouter();
  const { assessmentData, isAuthLoading, isAdmin } = useAssessment();

  useEffect(() => {
    // Wait until the authentication check is complete
    if (!isAuthLoading) {
      if (isAdmin) {
        // If the user is an admin, always go to the admin dashboard.
        router.replace('/admin/dashboard');
      } else if (assessmentData.id) {
        // If user has an ID and is not an admin, they are a student, so go to the home page.
        router.replace('/home');
      } else {
        // If no user ID, they are not logged in, so go to the student signup page.
        router.replace('/signup');
      }
    }
  }, [router, assessmentData.id, isAuthLoading, isAdmin]);

  // Show a loading spinner while we determine where to send the user.
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size={48} />
        <p className="text-lg text-primary">Loading your experience...</p>
      </div>
    </div>
  );
}
