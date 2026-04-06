
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAssessment } from "@/context/AssessmentContext";
import { getCareerSuggestionsAction } from "@/actions/careerActions";
import { saveAssessmentResultsAction } from "@/actions/studentActions";
import CareerPathCard from "@/components/results/CareerPathCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, Download, RefreshCw, UserCheck, LayoutDashboard, GraduationCap, Mail, Phone, Globe, Home, PenSquare, Lightbulb, Puzzle, Gem } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import HollandProfileChart from "@/components/results/HollandProfileChart";
import MyersBriggsProfileChart from "@/components/results/MyersBriggsProfileChart";
import Link from "next/link";
import Image from "next/image";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const mbtiTypeMap: { [key: string]: string } = {
  I: 'Introversion',
  E: 'Extraversion',
  S: 'Sensing',
  N: 'Intuition',
  T: 'Thinking',
  F: 'Feeling',
  J: 'Judging',
  P: 'Perceiving',
};

const getMbtiFullName = (mbtiType: string = "") => {
    if (!mbtiType || mbtiType.length !== 4) return mbtiType;
    const parts = mbtiType.split('').map(char => mbtiTypeMap[char]);
    return `${mbtiType} (${parts.join(', ')})`;
}


export default function ResultsPage() {
  const router = useRouter();
  const { 
    assessmentData, 
    careerSuggestions, 
    setCareerSuggestions, 
    isLoadingSuggestions, 
    setIsLoadingSuggestions, 
    errorSuggestions, 
    setErrorSuggestions,
    clearAssessment,
    isAdminView,
    isAuthLoading
  } = useAssessment();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  // This ref helps prevent multiple fetches
  const fetchInitiated = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchAndSaveSuggestions = useCallback(async () => {
    // Ensure all necessary data is present before fetching
    if (!assessmentData.skills || !assessmentData.interests || !assessmentData.values) {
        setErrorSuggestions("Assessment data is incomplete. Please start over.");
        setIsLoadingSuggestions(false);
        return;
    }

    setIsLoadingSuggestions(true);
    setErrorSuggestions(null);

    try {
      const inputForAI = {
        skills: assessmentData.skills || "",
        interests: assessmentData.interests || "",
        values: assessmentData.values || "",
        ...(assessmentData.hollandCode && { hollandCode: assessmentData.hollandCode }),
        ...(assessmentData.mbtiType && { mbtiType: assessmentData.mbtiType }),
      };

      const suggestions = await getCareerSuggestionsAction(inputForAI);
      
      // Additional check to ensure the response is valid
      if (!suggestions || !Array.isArray(suggestions.careerPaths) || suggestions.careerPaths.length === 0) {
        throw new Error("The AI model returned an empty or invalid response for career paths.");
      }

      setCareerSuggestions(suggestions);
      toast({
        title: "Suggestions Ready!",
        description: "We've found some career paths for you.",
      });

      // Use the user's UID (id) for saving, which is guaranteed if they've signed up
      if (assessmentData.id) {
        const resultsToSave = {
          skills: assessmentData.skills,
          interests: assessmentData.interests,
          values: assessmentData.values,
          hollandCode: assessmentData.hollandCode,
          mbtiType: assessmentData.mbtiType,
          hollandScores: assessmentData.hollandScores,
          mbtiScores: assessmentData.mbtiScores,
          careerSuggestions: suggestions,
        };
        await saveAssessmentResultsAction(assessmentData.id, resultsToSave);
      }

    } catch (error) {
      console.error("Failed to fetch career suggestions:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setErrorSuggestions(`Failed to fetch suggestions: ${errorMessage}`);
       toast({
        title: "Error Fetching Suggestions",
        description: "Could not load recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [
      assessmentData, 
      setCareerSuggestions, 
      setIsLoadingSuggestions, 
      setErrorSuggestions,
  ]);


  useEffect(() => {
    // If it's an admin viewing a report, the data is already loaded.
    if (isAdminView) {
      setIsLoadingSuggestions(false);
      return;
    }
    
    // Redirect if there's no user ID (meaning not logged in)
    if (!isAuthLoading && !assessmentData.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account first.",
        variant: "destructive"
      });
      router.replace("/login");
      return;
    }
    
    // Fetch suggestions only if they don't already exist and a fetch hasn't been started.
    if (!careerSuggestions && !fetchInitiated.current) {
        fetchInitiated.current = true;
        fetchAndSaveSuggestions();
    } else if (careerSuggestions) {
        // If suggestions are already present (e.g., from context), no need to load.
        setIsLoadingSuggestions(false);
    }

  }, [assessmentData.id, careerSuggestions, isAdminView, fetchAndSaveSuggestions, router, setIsLoadingSuggestions, isAuthLoading]);

  const handleStartOver = () => {
    // Navigates user back to home page instead of clearing all data
    router.push("/home");
  };
  
  const handleDownloadPdf = async () => {
    const reportElement = reportRef.current;
    if (!reportElement) {
        toast({
            title: "Error",
            description: "Could not find report content to download.",
            variant: "destructive"
        });
        return;
    }
    setIsDownloadingPdf(true);
    toast({ title: "Generating PDF...", description: "Please wait a moment." });

    try {
        const canvas = await html2canvas(reportElement, {
            scale: 2, 
            useCORS: true,
            backgroundColor: document.documentElement.classList.contains('dark') ? '#0A0A0A' : '#FFFFFF' 
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; 
        const pageHeight = 295; 
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`CareerCraft-Report-${assessmentData.name || 'Student'}.pdf`);
        toast({ title: "Success!", description: "Your PDF report has been downloaded." });
    } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
            title: "PDF Generation Failed",
            description: "An unexpected error occurred while creating the PDF.",
            variant: "destructive"
        });
    } finally {
        setIsDownloadingPdf(false);
    }
};

  const renderContent = () => {
    if (isLoadingSuggestions) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-4">
          <LoadingSpinner size={48} />
          <p className="text-xl text-primary">Crafting your career suggestions...</p>
          <p className="text-muted-foreground">This might take a moment based on your input.</p>
        </div>
      );
    }

    if (errorSuggestions) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <Alert variant="destructive" className="max-w-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Suggestions</AlertTitle>
            <AlertDescription>
              {errorSuggestions}
              <Button onClick={() => fetchAndSaveSuggestions()} variant="link" className="mt-2 text-destructive">
                Click here to try again.
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    
    const finalSuggestions = isAdminView ? assessmentData.careerSuggestions : careerSuggestions;
    
    if (!finalSuggestions || !finalSuggestions.careerPaths || finalSuggestions.careerPaths.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
          <Alert className="max-w-lg">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Suggestions Found</AlertTitle>
            <AlertDescription>
              We couldn't find any specific career suggestions based on the provided input. This can happen if the assessment was incomplete or if the AI could not generate a response.
              <Button onClick={() => fetchAndSaveSuggestions()} variant="outline" className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Generating Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div ref={reportRef} className="p-4 bg-background">
        {finalSuggestions.mbtiExplanation && (
          <Card className="bg-card/80 mb-8 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <UserCheck className="h-6 w-6 text-accent" />
                Understanding Your Myers-Briggs Type
              </CardTitle>
               <CardDescription className="!mt-2 text-lg font-semibold text-primary">
                {getMbtiFullName(assessmentData?.mbtiType)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 whitespace-pre-line">{finalSuggestions.mbtiExplanation}</p>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            {assessmentData?.hollandScores && <HollandProfileChart scores={assessmentData.hollandScores} />}
            {assessmentData?.mbtiScores && <MyersBriggsProfileChart scores={assessmentData.mbtiScores} />}
        </div>

        <Card className="bg-card/80 mb-8 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <PenSquare className="h-6 w-6 text-accent" />
              Your Assessment Input
            </CardTitle>
            <CardDescription>
              These are the skills, interests, and values you provided, which were used to generate your recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-md flex items-center mb-2">
                <Puzzle className="h-5 w-5 mr-2 text-primary" />
                Your Skills
              </h4>
              <p className="text-sm text-foreground/90 p-3 bg-background/50 rounded-md">{assessmentData.skills}</p>
            </div>
            <div>
              <h4 className="font-semibold text-md flex items-center mb-2">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                Your Interests
              </h4>
              <p className="text-sm text-foreground/90 p-3 bg-background/50 rounded-md">{assessmentData.interests}</p>
            </div>
            <div>
              <h4 className="font-semibold text-md flex items-center mb-2">
                <Gem className="h-5 w-5 mr-2 text-primary" />
                Your Values
              </h4>
              <p className="text-sm text-foreground/90 p-3 bg-background/50 rounded-md">{assessmentData.values}</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8 text-center">
          Recommended Career Paths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalSuggestions.careerPaths.map((path, index) => (
            <CareerPathCard key={index} careerPath={path} />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-3">
          {isAdminView ? `${assessmentData.name}'s Career Insights` : "Your Personalized Career Insights"}
        </h1>
        <p className="text-lg text-foreground/90">
          Based on the profile and assessments, here are the results.
        </p>
        <div className="flex justify-center items-center gap-4 mt-2 text-sm text-muted-foreground">
          {isClient && assessmentData?.hollandCode && (
            <>
              <span>Holland Code: <span className="font-bold text-primary">{assessmentData.hollandCode}</span></span>
              {assessmentData?.mbtiType && <span>|</span>}
            </>
          )}
          {isClient && assessmentData?.mbtiType && (
            <span>Myers-Briggs Type: <span className="font-bold text-primary">{assessmentData.mbtiType}</span></span>
          )}
        </div>
      </div>
      
      {renderContent()}

      {!isLoadingSuggestions && !errorSuggestions && (
        <Card className="mt-12 w-full max-w-4xl mx-auto bg-primary/10 border-primary/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl text-primary flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8" />
              Ready for the Next Step? Expert Guidance Awaits.
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-foreground/90 space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="md:text-left space-y-4">
                    <p>Infinix Academy offers one-on-one career guidance with subject matter experts who can help you on your journey.</p>
                    <p>Our counselors will help you understand your personalized roadmap, choose the right courses, and share valuable insights from their professional experience.</p>
                    <div className="pt-2 flex flex-col items-center md:items-start gap-3 text-primary">
                        <a href="mailto:infinixacademy7@gmail.com" className="flex items-center gap-2 font-semibold hover:underline">
                            <Mail className="h-5 w-5" />
                            infinixacademy7@gmail.com
                        </a>
                        <a href="tel:6360236070" className="flex items-center gap-2 font-semibold hover:underline">
                            <Phone className="h-5 w-5" />
                            6360236070
                        </a>
                        <Link href="https://www.infinixacademy.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold hover:underline">
                            <Globe className="h-5 w-5" />
                            www.infinixacademy.in
                        </Link>
                         <Link href="https://www.instagram.com/infinixacademy.in?igsh=YmppNXlpOHhmb21k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold hover:underline">
                            <InstagramIcon className="h-5 w-5" />
                            Follow us on Instagram
                        </Link>
                    </div>
                </div>
              </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 pt-8 border-t border-border/50">
        {isAdminView ? (
           <Button onClick={() => router.push('/admin/dashboard')} variant="outline" size="lg">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Button>
        ) : (
          <Button onClick={handleStartOver} variant="outline" size="lg">
            <Home className="mr-2 h-4 w-4" /> 
            Back to Home
          </Button>
        )}
        <Button onClick={handleDownloadPdf} variant="default" size="lg" disabled={isDownloadingPdf}>
          {isDownloadingPdf ? (
            <>
              <LoadingSpinner size={24} className="mr-2" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF Report
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

    