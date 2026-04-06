
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { adminSignInAction, sendPasswordResetAction } from "@/actions/authActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Mail, Lock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import placeholderImages from "@/app/lib/placeholder-images.json";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useAssessment } from "@/context/AssessmentContext";


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const passwordResetSchema = z.object({
  resetEmail: z.string().email({ message: "Please enter a valid email address." }),
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

export default function AdminSignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { setAssessmentData } = useAssessment();
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const resetForm = useForm<PasswordResetFormValues>({
      resolver: zodResolver(passwordResetSchema),
      defaultValues: { resetEmail: "" }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    const result = await adminSignInAction(data.email, data.password);
    
    if (result.success && result.role === 'admin') {
      // Set the role in the context BEFORE redirecting
      setAssessmentData({ role: 'admin' });
      toast({ title: "Admin Login Successful", description: "Redirecting to dashboard..." });
      router.push('/admin/dashboard');
    } else {
       toast({ title: "Login Failed", description: result.error, variant: "destructive" });
       setIsSubmitting(false);
    }
  };

  const onResetSubmit = async (data: PasswordResetFormValues) => {
    setIsResetting(true);
    const result = await sendPasswordResetAction(data.resetEmail);
    if (result.success) {
      toast({ title: "Success", description: result.message });
      setIsResetDialogOpen(false);
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }
    setIsResetting(false);
  };

  return (
    <>
        <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
                <Image src={placeholderImages.infinixLogo.src} alt={placeholderImages.infinixLogo.alt} width={32} height={32} className="rounded-md" data-ai-hint={placeholderImages.infinixLogo.dataAiHint} />
                <h1 className="text-2xl font-headline font-semibold">Infinix Academy</h1>
            </div>
            <CardTitle className="text-3xl font-headline text-primary">Admin Login</CardTitle>
            <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center"><Mail className="mr-2 h-5 w-5 text-accent"/>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center"><Lock className="mr-2 h-5 w-5 text-accent"/>Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="text-right">
                    <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="link" size="sm" type="button" className="p-0 h-auto text-sm text-primary">
                                Forgot Password?
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Reset Your Password</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Enter your account's email address below and we will send you a link to reset your password.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Form {...resetForm}>
                                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                                     <FormField
                                        control={resetForm.control}
                                        name="resetEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <AlertDialogFooter>
                                        <AlertDialogCancel disabled={isResetting}>Cancel</AlertDialogCancel>
                                        <Button type="submit" disabled={isResetting}>
                                            {isResetting ? <LoadingSpinner /> : "Send Reset Link"}
                                        </Button>
                                    </AlertDialogFooter>
                                </form>
                            </Form>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> : "Login"}
                </Button>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Not an admin?{" "}
                        <Link href="/login" className="underline text-primary hover:text-primary/80">
                            Go to Student Login
                        </Link>
                    </p>
                </div>
            </form>
            </Form>
        </CardContent>
        </Card>
    </>
  );
}
