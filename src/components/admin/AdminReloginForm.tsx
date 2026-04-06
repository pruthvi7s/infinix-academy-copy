
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { adminSignInAction } from "@/actions/authActions";
import { useAssessment } from "@/context/AssessmentContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AdminReloginFormProps {
    onReloginSuccess: () => void;
}

export default function AdminReloginForm({ onReloginSuccess }: AdminReloginFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAssessmentData } = useAssessment();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    const result = await adminSignInAction(data.email, data.password);
    
    if (result.success && result.role === 'admin') {
      onReloginSuccess();
    } else {
       toast({ title: "Login Failed", description: result.error, variant: "destructive" });
       setIsSubmitting(false);
    }
  };

  return (
    <Alert variant="destructive" className="max-w-lg mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Session Issue or Permission Denied</AlertTitle>
        <AlertDescription>
            Your session may have expired, or there's an issue with your admin permissions. Please log in again to continue.
        </AlertDescription>
        <div className="mt-4">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center text-sm"><Mail className="mr-2 h-4 w-4"/>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} className="h-9"/>
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
                    <FormLabel className="flex items-center text-sm"><Lock className="mr-2 h-4 w-4"/>Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <LoadingSpinner /> : "Login & Retry"}
                </Button>
            </form>
            </Form>
        </div>
    </Alert>
  );
}


    