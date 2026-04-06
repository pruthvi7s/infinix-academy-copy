
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAssessment, type HollandScores } from "@/context/AssessmentContext";
import { hollandCategories, type HollandCategory } from "./hollandQuestions";
import { ArrowRight, Settings, Search, Palette, Users, Briefcase, Archive } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import { useAutoScroll } from "@/hooks/useAutoScroll";

// Create a dynamic schema based on hollandCategories
const activitySchemaShape = hollandCategories.reduce((acc, category) => {
  category.activities.forEach(activity => {
    acc[activity.id] = z.string({ required_error: "Please select an option for every activity." });
  });
  return acc;
}, {} as Record<string, z.ZodString>);

const hollandTestSchema = z.object(activitySchemaShape);

type HollandTestFormData = z.infer<typeof hollandTestSchema>;

const categoryIcons: Record<HollandCategory['code'], React.ElementType> = {
  R: Settings,
  I: Search,
  A: Palette,
  S: Users,
  E: Briefcase,
  C: Archive,
};

const options = [
  { value: '1', label: 'Strongly Disagree' },
  { value: '2', label: 'Disagree' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Agree' },
  { value: '5', label: 'Strongly Agree' },
];

const allQuestionIds = hollandCategories.flatMap(cat => cat.activities.map(act => act.id));
const totalQuestions = allQuestionIds.length;

export default function HollandTestForm() {
  const router = useRouter();
  const { updateAssessmentData } = useAssessment();
  const [completion, setCompletion] = useState(0);

  const form = useForm<HollandTestFormData>({
    resolver: zodResolver(hollandTestSchema),
    defaultValues: {},
  });

  const watchedValues = form.watch();
  useAutoScroll(watchedValues, allQuestionIds);

  useEffect(() => {
    const answeredQuestions = Object.values(watchedValues).filter(Boolean).length;
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
    setCompletion(percentage);
  }, [watchedValues]);


  function onSuccess(data: HollandTestFormData) {
    const scores: HollandScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    hollandCategories.forEach(category => {
      category.activities.forEach(activity => {
        const score = parseInt(data[activity.id], 10);
        scores[category.code] += score;
      });
    });

    const sortedScores = Object.entries(scores)
      .sort(([, a], [, b]) => b - a);

    const topCodes = sortedScores.slice(0, 3).map(([code]) => code).join('');

     if (!topCodes || sortedScores[0][1] <= (totalQuestions / hollandCategories.length) * 3) {
        toast({
            title: "Not enough data",
            description: "Your answers appear neutral. Please select 'Agree' or 'Strongly Agree' for activities you enjoy to get a more accurate result.",
            variant: "destructive"
        });
        return;
    }

    updateAssessmentData({
      hollandCode: topCodes,
      hollandScores: scores
    });

    toast({
      title: "Holland Test Submitted!",
      description: `Your Holland Code: ${topCodes}. Continuing to next step...`,
    });
    router.push("/mbti-test");
  }

  function onError(errors: any) {
    toast({
      title: "Incomplete Form",
      description: "Please answer all questions before proceeding.",
      variant: "destructive",
    });

    // Find the first question with an error
    const firstErrorField = allQuestionIds.find(id => errors[id]);
    
    if (firstErrorField) {
      const errorElement = document.querySelector(`[data-question-id="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }


  return (
    <Card className="w-full max-w-4xl mx-auto transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-headline text-primary">Holland Test (RIASEC)</CardTitle>
        <CardDescription className="text-md md:text-lg">
          Discover your personality type and career interests. Rate how much you would enjoy each activity.
        </CardDescription>
        <div className="pt-4">
            <Progress value={completion} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">{completion}% Complete</p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSuccess, onError)} className="space-y-6">
            <Accordion type="multiple" className="w-full space-y-4" defaultValue={['R']}>
              {hollandCategories.map((category) => {
                const Icon = categoryIcons[category.code];
                return (
                  <AccordionItem value={category.code} key={category.code} className="border rounded-lg p-0 bg-card/50 transition-colors hover:bg-card">
                    <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline [&[data-state=open]]:border-b">
                      <div className="flex items-center text-lg md:text-xl font-semibold">
                        <Icon className="mr-3 h-7 w-7 text-accent" />
                        {category.name} ({category.code})
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 md:px-6 py-4 space-y-4">
                      <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                      {category.activities.map((activity) => (
                        <FormField
                          key={activity.id}
                          control={form.control}
                          name={activity.id as keyof HollandTestFormData}
                          render={({ field }) => (
                            <FormItem data-question-id={activity.id} className="p-4 border rounded-lg space-y-3 bg-background/50">
                              <FormLabel className="font-medium text-base">{activity.text}</FormLabel>
                               <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4"
                                >
                                  {options.map(option => (
                                    <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                                      </FormControl>
                                      <FormLabel htmlFor={`${field.name}-${option.value}`} className="font-normal cursor-pointer text-sm">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
             {form.formState.errors.root && (
                 <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
            )}
            <Button type="submit" size="lg" className="w-full font-semibold mt-8">
              Continue to Personality Test <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
            The Holland Codes (RIASEC) model is a theory of careers and vocational choice based upon personality types.
            This test provides a simplified version for guidance.
        </p>
      </CardFooter>
    </Card>
  );
}
