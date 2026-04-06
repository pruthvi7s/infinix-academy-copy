"use client";

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import Script from 'next/script';
import { useAssessment } from '@/context/AssessmentContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { assessmentData, isAuthLoading, isUserLoading } = useAssessment();
  const router = useRouter();

  useEffect(() => {
    // This layout is for students. If auth is loaded and there's no user, redirect to login.
    if (!isAuthLoading && !assessmentData.id) {
      router.replace('/login');
    }
  }, [isAuthLoading, assessmentData.id, router]);

  // While checking auth or fetching user data, show a full-screen loading state.
  if (isAuthLoading || isUserLoading || !assessmentData.id) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size={48} />
            <p className="text-xl text-primary">Loading your session...</p>
          </div>
        </main>
      </div>
    );
  }

  // Once auth is loaded and we have a user, render the student content.
  return (
    <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow w-full p-4 md:p-8">
            <PageTransition>
                {children}
            </PageTransition>
        </main>
        <Footer />
        <Script src='https://cdn.jotfor.ms/agent/embedjs/019863b3e62079818922160ce2920bd81e07/embed.js' />
    </div>
  );
}
