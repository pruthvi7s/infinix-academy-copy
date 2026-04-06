
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssessment } from "@/context/AssessmentContext";
import { Lightbulb, Puzzle, Gem, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// This schema only covers the fields this form is responsible for.
const partialAssessmentSchema = z.object({
  skills: z.string().min(10, "Please list at least one skill or describe your skills in more detail (min 10 characters)."),
  interests: z.string().min(10, "Please describe your interests (min 10 characters)."),
  values: z.string().min(10, "Please list your core values or what's important to you in a career (min 10 characters)."),
});

type PartialAssessmentFormData = z.infer<typeof partialAssessmentSchema>;

export default function AssessmentForm() {
  const router = useRouter();
  const { assessmentData, updateAssessmentData } = useAssessment();

  const form = useForm<PartialAssessmentFormData>({
    resolver: zodResolver(partialAssessmentSchema),
    defaultValues: {
      skills: assessmentData?.skills || "",
      interests: assessmentData?.interests || "",
      values: assessmentData?.values || "",
    },
  });

  // Update form if context data changes (e.g., loaded from elsewhere or cleared)
  React.useEffect(() => {
    form.reset({
        skills: assessmentData?.skills || "",
        interests: assessmentData?.interests || "",
        values: assessmentData?.values || "",
    });
  }, [assessmentData, form]);


  function onSubmit(data: PartialAssessmentFormData) {
    updateAssessmentData({
      skills: data.skills,
      interests: data.interests,
      values: data.values,
    });
    toast({
      title: "Assessment Updated!",
      description: "Redirecting to your results...",
    });
    router.push("/results");
  }

  return (
    <Card className="w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Tell Us About Yourself</CardTitle>
        <CardDescription className="text-lg">
          Your answers will help us suggest the best career paths for you. Be as detailed as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-lg">
                    <Puzzle className="mr-2 h-6 w-6 text-accent" />
                    Your Skills
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Python, Project Management, Public Speaking, Creative Writing, Data Analysis..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-lg">
                    <Lightbulb className="mr-2 h-6 w-6 text-accent" />
                    Your Interests
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Technology, Reading, Outdoor Activities, Music, Volunteering, Learning New Languages..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="values"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-lg">
                    <Gem className="mr-2 h-6 w-6 text-accent" />
                    Your Career Values
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Work-life balance, Making an impact, Continuous learning, Financial security, Creativity, Leadership..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full font-semibold">
              Find My Career Paths <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
