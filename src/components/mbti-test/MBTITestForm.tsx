
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAssessment, type MBTIScores } from "@/context/AssessmentContext";
import { mbtiQuestions, type MBTIDimension } from "./mbtiQuestions";
import { ArrowRight, UserCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import { useAutoScroll } from "@/hooks/useAutoScroll";

// Create a dynamic schema
const schemaShape = mbtiQuestions.reduce((acc, q) => {
  acc[q.id] = z.enum([q.options[0].dimension, q.options[1].dimension], {
    required_error: "You must select an option for each question.",
  });
  return acc;
}, {} as Record<string, z.ZodEnum<[MBTIDimension, MBTIDimension]>>);

const mbtiTestSchema = z.object(schemaShape);

type MBTITestFormData = z.infer<typeof mbtiTestSchema>;
const allQuestionIds = mbtiQuestions.map(q => q.id);
const totalQuestions = mbtiQuestions.length;

export default function MBTITestForm() {
  const router = useRouter();
  const { updateAssessmentData } = useAssessment();
  const [completion, setCompletion] = useState(0);

  const form = useForm<MBTITestFormData>({
    resolver: zodResolver(mbtiTestSchema),
  });

  const watchedValues = form.watch();
  useAutoScroll(watchedValues, allQuestionIds);

  useEffect(() => {
    const answeredQuestions = Object.values(watchedValues).filter(Boolean).length;
    const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
    setCompletion(percentage);
  }, [watchedValues]);


  function onSuccess(data: MBTITestFormData) {
    const scores: MBTIScores = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(data).forEach(dimension => {
      scores[dimension as MBTIDimension]++;
    });

    const result = [
      scores.E > scores.I ? 'E' : 'I',
      scores.N > scores.S ? 'N' : 'S',
      scores.F > scores.T ? 'F' : 'T',
      scores.P > scores.J ? 'P' : 'J',
    ].join('');

    updateAssessmentData({ 
      mbtiType: result,
      mbtiScores: scores 
    });

    toast({
      title: "MBTI Test Submitted!",
      description: `Your Personality Type: ${result}. Continuing to the Skills Assessment...`,
    });
    router.push("/assessment");
  }

  function onError(errors: any) {
    toast({
      title: "Incomplete Form",
      description: "Please answer all questions before proceeding.",
      variant: "destructive",
    });

    // Find the first question ID that has an error
    const firstErrorField = allQuestionIds.find(id => errors[id]);

    if (firstErrorField) {
      const errorElement = document.querySelector(`[data-question-id="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }


  return (
    <Card className="w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-headline text-primary flex items-center">
            <UserCheck className="mr-3 h-8 w-8 md:h-9 md:w-9 text-accent" />
            Myers-Briggs Personality Test
        </CardTitle>
        <CardDescription className="text-md md:text-lg pt-2">
            Choose the statement in each pair that best describes you. This will help understand your personality preferences.
        </CardDescription>
         <div className="pt-4">
            <Progress value={completion} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">{completion}% Complete</p>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSuccess, onError)} className="space-y-8">
            {mbtiQuestions.map((question, index) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id as keyof MBTITestFormData}
                render={({ field }) => (
                  <FormItem data-question-id={question.id} className="space-y-3 p-4 border rounded-lg bg-card/50">
                    <FormLabel className="text-base font-semibold">{index + 1}. {question.text}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        {question.options.map(option => (
                          <FormItem key={option.dimension} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.dimension} />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {option.text}
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
            <Button type="submit" size="lg" className="w-full font-semibold mt-8">
              Continue to Skills Assessment <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          This test is based on the Myers-Briggs Type Indicator (MBTI) model and is for educational and guidance purposes only.
        </p>
      </CardFooter>
    </Card>
  );
}
