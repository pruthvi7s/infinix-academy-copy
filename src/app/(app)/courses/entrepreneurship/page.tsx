"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Rocket, Lightbulb, Camera, ShoppingCart, BrainCircuit, Presentation, Pin, Download, CheckCircle, PlayCircle, Check, Clock, Lock, Brush, Code, Bot, FileText, Flame, HandCoins, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const entrepreneurshipCourses = [
    {
        id: "dt1",
        icon: Brush,
        title: "Canva for Beginners",
        description: "Learn the basics of Canva to create stunning graphics for social media, presentations, and other projects with no prior design experience.",
        videoUrl: "https://www.youtube.com/embed/rXLvN1FEkOE?si=B91IX-m8wBB3Fy8w",
        imageUrl: "https://i.postimg.cc/NfK5qg1j/digital-course-1.png",
        price: "Free",
        resources: [{ name: "Canva Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Welcome to the Course", time: "1:00" },
                    { title: "Understanding the Canva Interface", time: "5:30" },
                ]
            },
            {
                title: "Section 2: Core Concepts",
                 lessons: [
                    { title: "Creating Your First Design", time: "12:15" },
                    { title: "Using Templates and Elements", time: "8:45" },
                ]
            }
        ]
    },
    {
        id: "e6",
        icon: Code,
        title: "How to Build Websites Using Wix",
        description: "Learn how to build a professional website from scratch without any code using the Wix platform, from choosing a template to going live.",
        videoUrl: "https://www.youtube.com/embed/cXOvQEzlZQA?si=PsqB8up5x0B1pFPo",
        imageUrl: "https://img.youtube.com/vi/cXOvQEzlZQA/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "WIX Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started with WIX",
                lessons: [
                    { title: "Introduction to the WIX Editor", time: "3:00" },
                    { title: "Choosing a Template and Customizing", time: "7:00" },
                ]
            }
        ]
    },
    {
        id: "e7",
        icon: ShoppingCart,
        title: "Dropshipping For Beginners",
        description: "A complete guide to dropshipping for beginners, covering everything from what it is, how it works, and how to start your own online store.",
        videoUrl: "https://www.youtube.com/embed/mMunmeAVmCg?si=5N0bL8F5AMsZWJNl",
        imageUrl: "https://img.youtube.com/vi/mMunmeAVmCg/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Dropshipping Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Dropshipping Basics",
                lessons: [
                    { title: "What is Dropshipping?", time: "5:00" },
                    { title: "Finding a Niche", time: "8:00" },
                ]
            }
        ]
    },
    {
        id: "ai-firebase-studio-2",
        icon: Flame,
        title: "Build Apps Using Google Firebase Studio",
        description: "Learn how to build and deploy a complete web application in minutes using Google's Firebase Studio and its powerful AI assistant.",
        videoUrl: "https://www.youtube.com/embed/I_eM6R6XWZc?si=wwmdilAJfaiCTPm9",
        price: "Free",
        resources: [{ name: "Firebase Studio Docs", url: "https://firebase.google.com/docs/studio" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Building with Firebase Studio",
                lessons: [
                    { title: "Introduction to Firebase Studio", time: "1:00" },
                    { title: "Building your first app", time: "5:00" },
                ]
            }
        ]
    },
    {
        id: "ai3",
        icon: FileText,
        title: "How to Build AI Agents with Jotform",
        description: "Create powerful AI agents with Jotform to automate tasks like customer service, data collection, and more, without any code.",
        videoUrl: "https://www.youtube.com/embed/hxcEojsUj6M?si=TjkIwM3ofDWt4opA",
        price: "Free",
        resources: [{ name: "Jotform Website", url: "https://www.jotform.com/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Introduction to Jotform AI",
                lessons: [
                    { title: "What is Jotform AI Agent?", time: "0:30" },
                    { title: "Creating an AI Agent", time: "2:00" },
                    { title: "Customizing Your Agent", time: "4:50" }
                ]
            }
        ]
    },
    {
        id: "e8",
        icon: Rocket,
        title: "5 Steps to Start Your First Business",
        description: "Learn the essential five steps to get your business idea off the ground, from idea generation to building your plan and launching.",
        videoUrl: "https://www.youtube.com/embed/bXLZ8I7s8tw?si=BOT5CwDE9wevOpyk",
        imageUrl: "https://img.youtube.com/vi/bXLZ8I7s8tw/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Business Startup Checklist", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The 5 Steps",
                lessons: [
                    { title: "Step 1: Finding Your Idea", time: "5:00" },
                    { title: "Step 2: Building Your Plan", time: "8:00" },
                ]
            }
        ]
    },
    {
        id: "e9",
        icon: Rocket,
        title: "How to Start a Business From Nothing",
        description: "Learn the fundamental principles of starting a business with minimal resources, focusing on mindset, validating your idea, and achieving early-stage growth.",
        videoUrl: "https://www.youtube.com/embed/unshZobTt6Q?si=V_n_-Msyi5ZtSkRS",
        imageUrl: "https://img.youtube.com/vi/unshZobTt6Q/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Business Startup Checklist", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "The Zero-Cost Mindset", time: "4:00" },
                    { title: "Validating Your Idea for Free", time: "7:00" },
                ]
            }
        ]
    },
    {
        id: "ms5",
        icon: HandCoins,
        title: "How I Made ₹1,86,540 Using Canva",
        description: "Learn how Diptimai Sahoo made over ₹1,86,540 using Canva by offering design services on freelancing platforms like Fiverr.",
        videoUrl: "https://www.youtube.com/embed/D3qG4aFf15Q?si=tfMuWMTI62u9jEKM",
        imageUrl: "https://img.youtube.com/vi/D3qG4aFf15Q/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "List of Side Hustle Ideas", url: "#" }],
        instructor: "Diptimai Sahoo",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Monetize Your Skills",
                lessons: [
                    { title: "Getting started with Canva for freelancing", time: "11:00" },
                    { title: "Finding clients and projects", time: "8:30" },
                ]
            }
        ]
    },
    {
        id: "e10",
        icon: Code,
        title: "How to Make a Website Using Canva for FREE",
        description: "Learn how to create a stunning, fully functional website for free using Canva's website builder feature. No code required!",
        videoUrl: "https://www.youtube.com/embed/_SVCRlhqsEo?si=Iw21VVoOLBu4zpQT",
        imageUrl: "https://img.youtube.com/vi/_SVCRlhqsEo/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Canva Website Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Building Your Site",
                lessons: [
                    { title: "Introduction to Canva Websites", time: "2:00" },
                    { title: "Designing Your Layout", time: "6:30" },
                    { title: "Publishing Your Site", time: "4:00" },
                ]
            }
        ]
    },
    {
        id: "e5",
        icon: Presentation,
        title: "How To Pitch A Business Idea",
        description: "Learn a structured approach on how to effectively pitch a business idea to investors or partners in this guide from Y Combinator.",
        videoUrl: "https://www.youtube.com/embed/l0hVIH3EnlQ?si=xyqRblujNqw5e1wA",
        imageUrl: "https://img.youtube.com/vi/l0hVIH3EnlQ/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Pitch Deck Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Getting Funded",
                lessons: [
                    { title: "Crafting Your Elevator Pitch", time: "7:00" },
                    { title: "Understanding Funding Options", time: "10:00" },
                ]
            }
        ]
    },
    {
        id: "e11",
        icon: Mail,
        title: "Alex Hormozi's $100M Cold Email Strategy",
        description: "Learn the cold email strategy that has generated millions in revenue, as explained by entrepreneur Alex Hormozi.",
        videoUrl: "https://www.youtube.com/embed/N2yMBDt91Ts?si=kreJWAbA150cg7DP",
        imageUrl: "https://img.youtube.com/vi/N2yMBDt91Ts/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Cold Email Framework", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: The $100M Strategy",
                lessons: [
                    { title: "Core Principles of Cold Email", time: "5:00" },
                    { title: "Crafting the Perfect Offer", time: "9:00" },
                ]
            }
        ]
    }
];

type CourseType = typeof entrepreneurshipCourses[0];

export default function EntrepreneurshipCoursesPage() {
    const { assessmentData, addSavedCourse, savedCourses = [], completedLessons, toggleLessonCompleted, completeAllLessons } = useAssessment();
    const isBasicUser = assessmentData.plan === 'Basic';

    const handlePinCourse = (course: {id: string, title: string, videoUrl: string, imageUrl?: string}) => {
        const isAlreadySaved = savedCourses.some(saved => saved.id === course.id);
        if (isAlreadySaved) {
            toast({ title: "Already Pinned", description: "This course is already in your saved items." });
            return;
        }
        addSavedCourse({ id: course.id, title: course.title, url: course.videoUrl, imageUrl: course.imageUrl });
        toast({ title: "Course Pinned!", description: `"${course.title}" has been added to your saved items.` });
    };

    const handleToggleComplete = (courseId: string, lessonTitle: string) => {
        toggleLessonCompleted(courseId, lessonTitle);
        const isCompleted = completedLessons[courseId]?.includes(lessonTitle);
        toast({
            title: isCompleted ? "Lesson Incomplete" : "Lesson Complete!",
            description: `You've updated "${lessonTitle}".`,
        });
    };

    const calculateProgress = (course: CourseType) => {
        const totalLessons = course.courseContent.reduce((acc, section) => acc + section.lessons.length, 0);
        if (totalLessons === 0) return 0;
        
        const completedCount = completedLessons[course.id]?.length || 0;
        return Math.round((completedCount / totalLessons) * 100);
    }
    
    const handleCompleteCourse = (course: CourseType) => {
        const allLessonTitles = course.courseContent.flatMap(section => section.lessons.map(lesson => lesson.title));
        completeAllLessons(course.id, allLessonTitles);
        toast({
            title: "Course Completed!",
            description: `Congratulations on completing "${course.title}"! You've earned XP.`,
        });
    };

    return (
        <div className="flex flex-col items-center space-y-12">
            <div className="w-full max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                        <Rocket className="h-10 w-10 text-accent" />
                        Entrepreneurship Courses
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Launch your own venture with these essential skills.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {entrepreneurshipCourses.map((course) => {
                        const Icon = course.icon;
                        const isPinned = savedCourses.some(saved => saved.id === course.id);
                        const progress = calculateProgress(course);
                        const isCourseComplete = progress === 100;
                        
                        return (
                             <Card key={course.id} className="w-full max-w-4xl mx-auto flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                <CardContent className="p-6 flex-grow relative space-y-6">
                                     <div className="aspect-video w-full relative">
                                        {isBasicUser ? (
                                            <div className="w-full h-full rounded-lg bg-muted flex flex-col items-center justify-center text-center p-8">
                                                <Lock className="h-12 w-12 text-primary mb-4" />
                                                <h3 className="text-xl font-bold text-foreground">Content Locked</h3>
                                                <p className="text-muted-foreground mb-4">Upgrade to a Standard or Premium plan to watch this course.</p>
                                                <Button asChild variant="premium">
                                                    <Link href="/upgrade">Upgrade Now</Link>
                                                </Button>
                                            </div>
                                        ) : (
                                            <iframe
                                                className="w-full h-full rounded-lg"
                                                src={course.videoUrl}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen>
                                            </iframe>
                                        )}
                                        <Button variant={isPinned ? "default" : "outline"} size="icon" onClick={() => handlePinCourse(course)} className="absolute top-2 right-2 z-10">
                                            <Pin className="h-5 w-5" />
                                            <span className="sr-only">Pin course</span>
                                        </Button>
                                    </div>

                                     <div className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="font-headline text-2xl text-foreground">
                                                    {course.title}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={course.avatarUrl} alt={course.instructor} />
                                                        <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground">{course.instructor}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                         <CardDescription>{course.description}</CardDescription>
                                    </div>

                                    {!isBasicUser && progress > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Progress value={progress} className="h-2.5 flex-grow" />
                                                <span className="text-sm font-medium text-muted-foreground">{progress}% Complete</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                     <Card className={cn("bg-background/50", isBasicUser && "opacity-50 pointer-events-none")}>
                                        <CardHeader>
                                            <CardTitle className="text-xl">Course Content</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Accordion type="multiple" defaultValue={course.courseContent && course.courseContent.length > 0 ? [course.courseContent[0].title] : []}>
                                                {course.courseContent.map((section, index) => (
                                                    <AccordionItem key={index} value={section.title}>
                                                        <AccordionTrigger className="font-semibold">{section.title}</AccordionTrigger>
                                                        <AccordionContent>
                                                            <ul className="space-y-2">
                                                                {section.lessons.map((lesson, lessonIndex) => {
                                                                    const isCompleted = completedLessons[course.id]?.includes(lesson.title);
                                                                    return (
                                                                         <li key={lessonIndex} className="flex items-center justify-between text-sm">
                                                                            <div className="flex items-center gap-2">
                                                                                 <button onClick={() => handleToggleComplete(course.id, lesson.title)} className="focus:outline-none">
                                                                                    {isCompleted ? <CheckCircle className="h-5 w-5 text-primary" /> : <PlayCircle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />}
                                                                                </button>
                                                                                <span className={cn(isCompleted && "line-through text-muted-foreground")}>{lesson.title}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                                <Clock className="h-4 w-4" />
                                                                                <span>{lesson.time}</span>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        </CardContent>
                                    </Card>

                                </CardContent>
                                <CardFooter className="flex flex-col sm:flex-row justify-center items-center bg-muted/50 py-3 px-6 gap-4">
                                     <Button 
                                        variant={isCourseComplete ? "default" : "outline"}
                                        onClick={() => handleCompleteCourse(course)}
                                        disabled={isBasicUser || isCourseComplete}
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4"/>
                                        {isCourseComplete ? "Course Completed" : "Mark as Complete"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
