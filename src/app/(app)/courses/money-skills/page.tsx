"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Banknote, ShieldCheck, CandlestickChart, HandCoins, Pin, Download, CheckCircle, PlayCircle, Check, Clock, Landmark, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import CopyResourceDialog from "@/components/courses/CopyResourceDialog";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const moneySkillsCourses = [
    {
        id: "ms1",
        icon: Banknote,
        title: "How to Manage Your Money (50-30-20 Rule)",
        description: "Learn a simple yet powerful 5-step rule for money management based on the 50/30/20 principle to help you budget, save, and secure your financial future.",
        videoUrl: "https://www.youtube.com/embed/VaiqGsot5ws?si=Dn5qPttqB7Vryke7",
        imageUrl: "https://i.postimg.cc/0Q3S0ypr/money-course-1.png",
        price: "Free",
        resources: [{ name: "Budgeting Spreadsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Financial Foundations",
                lessons: [
                    { title: "The 50/30/20 Budgeting Rule", time: "8:00" },
                    { title: "Tools for Tracking Spending", time: "9:30" },
                ]
            }
        ]
    },
    {
        id: "ms2",
        icon: ShieldCheck,
        title: "15 Assets That Are Making People Rich",
        description: "Explore 15 different types of assets, from traditional stocks and real estate to modern digital assets, that have the potential to build wealth.",
        videoUrl: "https://www.youtube.com/embed/BKoTLf_D4xo?si=407pM8g7eTuCrcz-",
        imageUrl: "https://i.postimg.cc/kG8wM3M1/money-course-2.png",
        price: "Free",
        resources: [{ name: "15 Assets That Are Making People Rich pdf", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Secure Transactions",
                lessons: [
                    { title: "Common UPI Scams and How to Avoid Them", time: "7:00" },
                    { title: "Best Practices for Digital Wallets", time: "6:30" },
                ]
            }
        ]
    },
    {
        id: "ms3",
        icon: CandlestickChart,
        title: "How to Choose the Best Mutual Fund (in Hindi)",
        description: "Get a clear, beginner-friendly introduction to mutual funds in Hindi, covering how to choose the right one for your investment goals.",
        videoUrl: "https://www.youtube.com/embed/6fQwVxqqpAg?si=d5D-A5Xlsd_PNag6",
        imageUrl: "https://i.postimg.cc/prpW1pS3/money-course-3.png",
        price: "Free",
        resources: [{ name: "Investment Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Building Wealth",
                lessons: [
                    { title: "The Power of Compounding", time: "10:00" },
                    { title: "Understanding Mutual Funds", time: "14:00" },
                ]
            }
        ]
    },
    {
        id: "ms4",
        icon: DollarSign,
        title: "15 Lessons Rich Parents Teach Their Kids",
        description: "Learn the crucial financial lessons and mindsets that wealthy parents often teach their children about money, assets, and investing.",
        videoUrl: "https://www.youtube.com/embed/WqA4PgRDvtY?si=KFHC7flWYLkMm8qB",
        imageUrl: "https://i.postimg.cc/WbFPhFv2/money-course-4.png",
        price: "Free",
        resources: [{ name: "Glossary of Terms", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Your First Investment",
                lessons: [
                    { title: "Stocks, Bonds, and ETFs Explained", time: "12:00" },
                    { title: "How to Start Investing with Small Amounts", time: "9:00" },
                ]
            }
        ]
    },
    {
        id: "ms6",
        icon: DollarSign,
        title: "40 Eye-Opening Money Lessons",
        description: "This video shares 40 powerful and eye-opening lessons about money that can reshape your financial mindset and habits for the better.",
        videoUrl: "https://www.youtube.com/embed/MHmDw6pJ1UM?si=Qy9zL1hMfvjoc-qa",
        imageUrl: "https://i.postimg.cc/fTdG4Y12/money-course-6.png",
        price: "Free",
        resources: [{ name: "Key Lessons PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Eye-opening Lessons",
                lessons: [
                    { title: "Understanding Assets vs. Liabilities", time: "10:00" },
                    { title: "The Mindset of Wealth", time: "15:00" },
                ]
            }
        ]
    },
    {
        id: "ms7",
        icon: Landmark,
        title: "Indian Tax System Explained",
        description: "A clear and simple explanation of the Indian tax system, covering direct vs. indirect taxes, GST, income tax slabs, and how it all works.",
        videoUrl: "https://www.youtube.com/embed/MQpbxF_RngI?si=raxJvpACcfzGtsGX",
        imageUrl: "https://i.postimg.cc/L8yR1xZJ/money-course-7.png",
        price: "Free",
        resources: [{ name: "Tax System Overview PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Understanding Indian Taxes",
                lessons: [
                    { title: "Direct vs. Indirect Taxes", time: "10:00" },
                    { title: "Introduction to Income Tax", time: "14:00" },
                ]
            },
        ],
        categoryUrl: "/courses/money-skills"
    },
    {
        id: "ms9",
        icon: CandlestickChart,
        title: "₹15,000 Salary to ₹1 Crore Investment Strategy (in Hindi)",
        description: "Learn a powerful investment strategy (in Hindi) to grow your wealth from a starting salary to 1 crore through disciplined investing.",
        videoUrl: "https://www.youtube.com/embed/6VejpP5Seuc?si=3DJ2BF5eUOyu73Do",
        imageUrl: "https://img.youtube.com/vi/6VejpP5Seuc/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Investment Strategy PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Investment Strategy",
                lessons: [
                    { title: "Understanding the Strategy", time: "10:00" },
                    { title: "Steps to Implementation", time: "15:00" },
                ]
            }
        ],
        categoryUrl: "/courses/money-skills"
    }
];

type CourseType = typeof moneySkillsCourses[0];

export default function MoneySkillsCoursesPage() {
    const { assessmentData, addSavedCourse, savedCourses = [], completedLessons, toggleLessonCompleted, completeAllLessons } = useAssessment();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [resourceText, setResourceText] = useState("");
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

    const handleResourceClick = (text: string) => {
        if (isBasicUser) return;
        setResourceText(text);
        setDialogOpen(true);
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
        <>
            <CopyResourceDialog
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                resourceText={resourceText}
            />
            <div className="flex flex-col items-center space-y-12">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                            <DollarSign className="h-10 w-10 text-accent" />
                            Money Skills Courses
                        </h1>
                        <p className="text-lg text-muted-foreground mt-3">
                            Improve your financial literacy and take control of your money.
                        </p>
                    </div>
                    
                    <div className="space-y-8">
                        {moneySkillsCourses.map((course) => {
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
                                                    {course.courseContent && course.courseContent.map((section, index) => (
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
        </>
    );
}
