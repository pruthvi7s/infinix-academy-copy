
"use client";

import React from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAssessment } from "@/context/AssessmentContext";
import { Phone, Home, BookOpen, Hash, Building, Users, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { saveStudentDataAction } from "@/actions/studentActions";
import LoadingSpinner from "../ui/LoadingSpinner";
import placeholderImages from "@/app/lib/placeholder-images.json";


const getStartedFormSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number."),
  address: z.string().min(5, "Please enter a valid address."),
  education: z.string().min(2, "Please enter your education level."),
  age: z.string().refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
    message: "Please enter a valid age.",
  }),
  school: z.string().min(2, "School name must be at least 2 characters."),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
});

type GetStartedFormData = z.infer<typeof getStartedFormSchema>;

const fieldOrder: (keyof GetStartedFormData)[] = ['age', 'gender', 'phone', 'address', 'education', 'school'];

export default function GetStartedForm() {
  const router = useRouter();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<GetStartedFormData>({
    resolver: zodResolver(getStartedFormSchema),
    defaultValues: {
      phone: assessmentData?.phone || "",
      address: assessmentData?.address || "",
      education: assessmentData?.education || "",
      age: assessmentData?.age || "",
      school: assessmentData?.school || "",
      gender: assessmentData?.gender || undefined,
    },
  });
  
  const getAvatarForGender = (gender?: 'male' | 'female' | 'other') => {
    if (gender === 'male') return placeholderImages.maleAvatar.src;
    if (gender === 'female') return placeholderImages.femaleAvatar.src;
    return placeholderImages.defaultUserAvatar.src;
  }

  async function onSubmit(data: GetStartedFormData) {
    setIsSubmitting(true);
    
    const profileData = {
        ...data,
        id: assessmentData.id,
        avatarUrl: getAvatarForGender(data.gender)
    };

    try {
        const result = await saveStudentDataAction(profileData);
        if (result.success) {
          updateAssessmentData(profileData); 
          toast({
            title: "Profile Updated!",
            description: "Let's start your first assessment.",
          });
          router.push("/holland-test");
        } else {
          toast({
            title: "Update Failed",
            description: result.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Update Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
  }

  function onError(errors: FieldErrors<GetStartedFormData>) {
    toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
        variant: "destructive",
    });

    const firstErrorField = fieldOrder.find(field => errors[field]);

    if (firstErrorField) {
        const errorElement = document.getElementsByName(firstErrorField)[0];
        if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-headline text-primary">Complete Your Profile</CardTitle>
        <CardDescription className="text-md md:text-lg">
         Tell us a bit more about yourself. This information helps us tailor your career guidance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center">
                        <Hash className="mr-2 h-5 w-5 text-accent" />
                        Age
                        </FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 18" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel className="flex items-center">
                            <Users className="mr-2 h-5 w-5 text-accent" />
                            Gender
                        </FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 pt-2"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-normal">Male</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-normal">Female</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="other" />
                                </FormControl>
                                <FormLabel className="font-normal">Prefer not to say</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
             </div>
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
                        <Input placeholder="e.g., +1 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Home className="mr-2 h-5 w-5 text-accent" />
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-accent" />
                      Current Class / Highest Education
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12th Grade, B.Tech CSE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Building className="mr-2 h-5 w-5 text-accent" />
                      School / College Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Springfield High / Anytown University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : ('Save & Start Assessment')}
               <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
