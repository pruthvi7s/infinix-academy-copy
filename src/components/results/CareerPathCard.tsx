
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getPersonalizedRoadmapAction, type GenerateRoadmapInput } from "@/actions/careerActions";
import { useAssessment, type CareerSuggestion } from "@/context/AssessmentContext";
import RoadmapDisplay from "./RoadmapDisplay";
import LoadingSpinner from "../ui/LoadingSpinner";
import { AlertCircle, GraduationCap, Sparkles, Building, DollarSign, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CareerPathCardProps {
  careerPath: CareerSuggestion;
}

export default function CareerPathCard({ careerPath }: CareerPathCardProps) {
  const { assessmentData, getRoadmapState, setRoadmapLoading, setRoadmapSuccess, setRoadmapError } = useAssessment();
  const roadmapState = getRoadmapState(careerPath.title);

  const handleGenerateRoadmap = async () => {
    if (!assessmentData) {
      toast({
        title: "Error",
        description: "Assessment data is missing. Please restart the assessment.",
        variant: "destructive",
      });
      return;
    }

    setRoadmapLoading(careerPath.title, true);
    try {
      const input: GenerateRoadmapInput = {
        careerPath: careerPath.title,
        userSkills: assessmentData.skills.split(',').map(s => s.trim()).filter(s => s),
        userInterests: assessmentData.interests,
      };
      const result = await getPersonalizedRoadmapAction(input);
      setRoadmapSuccess(careerPath.title, result.roadmap);
      toast({
        title: "Roadmap Generated!",
        description: `Learning roadmap for ${careerPath.title} is ready.`,
      });
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setRoadmapError(careerPath.title, `Failed to generate roadmap: ${errorMessage}`);
      toast({
        title: "Roadmap Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="flex flex-col w-full bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{careerPath.title}</CardTitle>
        <CardDescription className="text-base pt-1">{careerPath.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow">
        <div>
          <h4 className="font-semibold text-md flex items-center mb-2">
            <Sparkles className="h-6 w-6 mr-2 text-accent" />
            Why it might be a good fit
          </h4>
          <p className="text-sm text-foreground/90">{careerPath.suitabilityReasoning}</p>
        </div>
         {careerPath.specificJobRoles && careerPath.specificJobRoles.length > 0 && (
          <div>
            <h4 className="font-semibold text-md flex items-center mb-2">
              <Target className="h-6 w-6 mr-2 text-accent" />
              Potential Job Roles & Departments
            </h4>
            <div className="flex flex-wrap gap-2">
              {careerPath.specificJobRoles.map(role => (
                <span key={role} className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
        {careerPath.topHiringCompanies && careerPath.topHiringCompanies.length > 0 && (
            <div>
            <h4 className="font-semibold text-md flex items-center mb-2">
                <Building className="h-6 w-6 mr-2 text-accent" />
                Potential Hiring Companies
            </h4>
            <ul className="list-disc pl-5 text-sm text-foreground/90 space-y-1">
                {careerPath.topHiringCompanies.map(company => (
                <li key={company}>{company}</li>
                ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-2">(Note: Based on general knowledge, may not reflect current hiring status.)</p>
            </div>
        )}
        {careerPath.salaryEstimate && (
            <div>
            <h4 className="font-semibold text-md flex items-center mb-2">
                <DollarSign className="h-6 w-6 mr-2 text-accent" />
                General Salary Estimates (Annual)
            </h4>
            <div className="text-sm text-foreground/90">
                <p><span className="font-medium">Fresher:</span> {careerPath.salaryEstimate.fresher}</p>
                <p><span className="font-medium">Senior (5+ yrs):</span> {careerPath.salaryEstimate.senior}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">(Note: Estimates vary by location, company, and skills.)</p>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start p-0 mt-auto">
         <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="roadmap" className="border-t">
            <AccordionTrigger className="text-md font-semibold hover:no-underline text-accent hover:text-accent/90 focus:text-accent [&[data-state=open]]:text-accent px-6 py-4">
              <GraduationCap className="h-6 w-6 mr-2" />
              View Personalized Learning Roadmap
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 border-t pt-4">
              {roadmapState.isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <LoadingSpinner size={32} />
                  <p className="ml-2">Generating your roadmap...</p>
                </div>
              ) : roadmapState.error ? (
                <div className="text-destructive p-4 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-2" />
                  <p>{roadmapState.error}</p>
                  <Button variant="link" onClick={handleGenerateRoadmap} className="ml-2">Try Again</Button>
                </div>
              ) : roadmapState.roadmap ? (
                <RoadmapDisplay roadmap={roadmapState.roadmap} />
              ) : (
                <div className="p-4 text-center">
                  <p className="mb-3">Ready to see how you can achieve this career?</p>
                  <Button onClick={handleGenerateRoadmap} variant="default">
                    Generate Learning Roadmap
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
