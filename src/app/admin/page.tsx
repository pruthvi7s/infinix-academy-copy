"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssessment } from '@/context/AssessmentContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminRootPage() {
  const router = useRouter();
  const { isAdmin, isAuthLoading, isUserLoading } = useAssessment();

  useEffect(() => {
    if (!isAuthLoading && !isUserLoading) {
      if (isAdmin) {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/admin/login');
      }
    }
  }, [isAdmin, isAuthLoading, isUserLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size={48} />
        <p className="text-lg text-primary">Loading Admin Panel...</p>
      </div>
    </div>
  );
}
