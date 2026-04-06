
"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useAssessment } from "@/context/AssessmentContext";
import { User, Mail, Lock, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { studentSignUpAction } from "@/actions/authActions";
import LoadingSpinner from "../ui/LoadingSpinner";

const landingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number.").max(15, "Phone number is too long."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LandingFormData = z.infer<typeof landingFormSchema>;

export default function LandingForm({ isSignUp = false }: { isSignUp?: boolean }) {
  const router = useRouter();
  const { updateAssessmentData } = useAssessment();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LandingFormData>({
    resolver: zodResolver(landingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(data: LandingFormData) {
    setIsSubmitting(true);
    
    try {
        const result = await studentSignUpAction(data);
        if (result.success && result.student) {
          updateAssessmentData(result.student); 
          toast({
            title: "Account Created!",
            description: "Welcome! Let's get started.",
          });
          router.push("/home"); 
        } else {
          toast({
            title: "Sign-up Failed",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Sign-up Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
  }

  return (
    <Card className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Create an Account</CardTitle>
        <CardDescription className="text-lg">
          Please fill out the form below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-accent" />
                      Full Name
                  </FormLabel>
                  <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-accent" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-accent" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="e.g., 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center">
                        <Lock className="mr-2 h-5 w-5 text-accent" />
                        Password
                    </FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Must be at least 6 characters" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
       {isSignUp && (
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary hover:text-primary/80">
              Login
            </Link>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
