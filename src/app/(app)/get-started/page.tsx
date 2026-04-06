
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAssessment } from '@/context/AssessmentContext';
import GetStartedForm from '@/components/landing/GetStartedForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RefreshCw, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function GetStartedPage() {
    const router = useRouter();
    const { assessmentData, isAuthLoading, clearAssessment } = useAssessment();
    const [isDownloading, setIsDownloading] = useState(false);

    // This state will determine what to render: loading, new user form, or returning user options.
    const [pageState, setPageState] = useState<'loading' | 'new_user' | 'returning_user'>('loading');

    // Check if the user has previously completed the assessment.
    // The presence of 'careerSuggestions' is a good indicator.
    const hasCompletedAssessment = !!assessmentData?.careerSuggestions;

    useEffect(() => {
        if (!isAuthLoading) {
            if (!assessmentData.id) {
                // Not logged in, redirect to login page.
                router.replace("/login");
            } else if (hasCompletedAssessment) {
                // Logged in and has results, show options.
                setPageState('returning_user');
            } else {
                // Logged in but no results, start the assessment flow.
                // If they haven't filled out their basic info, show the form.
                if (!assessmentData.school) {
                    setPageState('new_user');
                } else {
                    // If basic info is there, move to the first test.
                    router.replace('/holland-test');
                }
            }
        }
    }, [router, assessmentData, isAuthLoading, hasCompletedAssessment]);
    
    const handleDownloadReport = () => {
        // Navigate to results page to trigger PDF generation
        router.push('/results');
    };

    const handleRetakeTest = () => {
        // Clear only the assessment-specific data, keeping user info
        clearAssessment(); 
        // Redirect to the beginning of the assessment flow
        router.push('/holland-test');
    };

    if (pageState === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-4">
                <LoadingSpinner size={48} />
                <p className="text-xl text-primary">Checking your profile...</p>
            </div>
        );
    }

    if (pageState === 'new_user') {
        return <GetStartedForm />;
    }
    
    if (pageState === 'returning_user') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Welcome Back!</CardTitle>
                        <CardDescription className="text-lg pt-2">
                            You have already completed the career assessment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p>What would you like to do?</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button size="lg" onClick={handleDownloadReport} disabled={isDownloading}>
                                <Download className="mr-2 h-5 w-5" />
                                View & Download Report
                            </Button>
                            <Button size="lg" variant="outline" onClick={handleRetakeTest}>
                                <RefreshCw className="mr-2 h-5 w-5" />
                                Retake Assessment
                            </Button>
                        </div>
                         <p className="text-xs text-muted-foreground pt-4">
                            Retaking the assessment will clear your previous test scores and generate a new report.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    // Fallback while redirecting
    return (
         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-4">
            <LoadingSpinner size={48} />
            <p className="text-xl text-primary">Redirecting...</p>
        </div>
    );
}
