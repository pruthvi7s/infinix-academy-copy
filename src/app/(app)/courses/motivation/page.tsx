"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Flame, Handshake, BookUser, Flag, Brain, Pin, Download, CheckCircle, PlayCircle, Check, Clock, Lock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const motivationCourses = [
    {
        id: "m1",
        icon: Flame,
        title: "Believe in Yourself - Motivational Video",
        description: "A powerful motivational video to inspire you to believe in your potential and overcome any obstacle.",
        videoUrl: "https://www.youtube.com/embed/vrZlO3pX9Q4?si=Dj2NsXXrryJsZx-I",
        imageUrl: "https://img.youtube.com/vi/vrZlO3pX9Q4/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Motivational Quotes", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Message",
                lessons: [
                    { title: "The Power of Belief", time: "5:00" },
                    { title: "Overcoming Limitations", time: "8:00" },
                ]
            }
        ]
    },
    {
        id: "m2",
        icon: Brain,
        title: "The Power of Your Subconscious Mind - Part 1",
        description: "An audio summary exploring the first part of Joseph Murphy's 'The Power of Your Subconscious Mind' to help you transform your life.",
        videoUrl: "https://www.youtube.com/embed/XJjB2U6OkcE?si=OEFtALH1dpeEY9HI",
        imageUrl: "https://img.youtube.com/vi/XJjB2U6OkcE/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Action Plan Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Kaizen Philosophy",
                lessons: [
                    { title: "The Power of Small Steps", time: "7:00" },
                    { title: "Applying the One-Minute Principle", time: "9:00" },
                ]
            }
        ]
    },
     {
        id: "m3",
        icon: Brain,
        title: "The Power of Your Subconscious Mind by Joseph Murphy",
        description: "An exploration of Joseph Murphy's teachings on how to use the power of the subconscious mind to achieve success, happiness, and prosperity.",
        videoUrl: "https://www.youtube.com/embed/7xIGybLtmN4?si=gOsSWoYDHRsEtiHO",
        imageUrl: "https://img.youtube.com/vi/7xIGybLtmN4/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Principles",
                lessons: [
                    { title: "Introduction to the Subconscious", time: "6:00" },
                    { title: "The Law of Belief", time: "9:00" },
                ]
            }
        ]
    },
    {
        id: "m4",
        icon: BookOpen,
        title: "The Secret by Rhonda Byrne (Animated Summary)",
        description: "An animated summary of 'The Secret' by Rhonda Byrne, exploring the law of attraction and how to use it to achieve your goals.",
        videoUrl: "https://www.youtube.com/embed/9cRktx1UV6A?si=9RG0OX3qaQi7SKv-",
        imageUrl: "https://img.youtube.com/vi/9cRktx1UV6A/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Law of Attraction",
                lessons: [
                    { title: "Understanding The Secret", time: "8:00" },
                    { title: "How to Use The Secret", time: "10:00" },
                ]
            }
        ]
    },
    {
        id: "m5",
        icon: Flame,
        title: "Shut Up and Grind",
        description: "A powerful motivational video to help you stop procrastinating and start working towards your goals.",
        videoUrl: "https://www.youtube.com/embed/VGPmNwuVji8?si=bT8nrkaYqcjkqd5K",
        imageUrl: "https://img.youtube.com/vi/VGPmNwuVji8/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Motivational Quotes", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Get Motivated",
                lessons: [
                    { title: "Stop Procrastinating", time: "4:00" },
                    { title: "Take Action Now", time: "6:00" },
                ]
            }
        ]
    },
    {
        id: "m6",
        icon: Flame,
        title: "Prove Them All Wrong - Motivational Video",
        description: "A powerful motivational video to inspire you to prove the doubters wrong and achieve your goals against all odds.",
        videoUrl: "https://www.youtube.com/embed/fBuPKq8Zl0s?si=bApN1Qsdi_e52HXW",
        imageUrl: "https://img.youtube.com/vi/fBuPKq8Zl0s/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Motivational Quotes", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Message",
                lessons: [
                    { title: "Defying Expectations", time: "4:00" },
                    { title: "The Underdog Mentality", time: "5:30" },
                ]
            }
        ]
    },
    {
        id: "m7",
        icon: Flame,
        title: "One Life One Chance - Motivational Video",
        description: "A powerful motivational video reminding you to make the most of the one life you have.",
        videoUrl: "https://www.youtube.com/embed/2irDmWHRAbc?si=ezXzXojzdLPDVGIY",
        imageUrl: "https://img.youtube.com/vi/2irDmWHRAbc/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Motivational Quotes", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Seize the Day",
                lessons: [
                    { title: "The Value of Time", time: "4:00" },
                    { title: "Living with Purpose", time: "6:00" },
                ]
            }
        ]
    },
    {
        id: "m8",
        icon: Flame,
        title: "Real Life Inspirational Story of Karoly Takacs by Sandeep Maheshwari",
        description: "An inspiring real-life story of Karoly Takacs, shared by Sandeep Maheshwari, about overcoming adversity and achieving greatness against all odds.",
        videoUrl: "https://www.youtube.com/embed/HnANWZHfykU?si=r1P3LXpWvpyVG8B7",
        imageUrl: "https://img.youtube.com/vi/HnANWZHfykU/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Motivational Quotes", url: "#" }],
        instructor: "Sandeep Maheshwari",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Story of Karoly",
                lessons: [
                    { title: "Overcoming Adversity", time: "10:00" },
                    { title: "The Power of Perseverance", time: "12:00" },
                ]
            }
        ]
    },
    {
        id: "cp4",
        icon: Handshake,
        title: "Finding Your Purpose (Ikigai)",
        description: "Discover your 'reason for being' with the Japanese concept of Ikigai. This guide helps you find purpose at the intersection of what you love, what you're good at, what the world needs, and what you can be paid for.",
        videoUrl: "https://www.youtube.com/embed/4LE5bel_GvU?si=E07k3l4PbNJjP1YT",
        imageUrl: "https://i.postimg.cc/FKk0q9Lq/career-course-4.png",
        price: "Free",
        resources: [{ name: "Proposal Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Freelancing Fundamentals",
                lessons: [
                    { title: "Setting Up Your Freelance Profile", time: "10:00" },
                    { title: "Crafting Winning Proposals", time: "12:30" },
                ]
            }
        ]
    },
    {
        id: "ls4",
        icon: BookUser,
        title: "The Strangest Secret by Earl Nightingale",
        description: "Unlock your potential and change your life by understanding the powerful message in Earl Nightingale's 'The Strangest Secret'.",
        videoUrl: "https://www.youtube.com/embed/l1gXZu1i8TM?si=_ZhI-iTxy0_yo3wF",
        imageUrl: "https://i.postimg.cc/fyyq0wLh/life-course-4.png",
        price: "Free",
        resources: [{ name: "Journaling Prompts", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Power of Reflection",
                lessons: [
                    { title: "Getting Started with Journaling", time: "6:00" },
                    { title: "Techniques for Deep Reflection", time: "10:00" },
                ]
            }
        ]
    },
    {
        id: "ls10",
        icon: Flag,
        title: "How to Achieve Your Most Ambitious Goals",
        description: "Learn a simple, science-backed method for setting and achieving your most ambitious goals by focusing on what's important.",
        videoUrl: "https://www.youtube.com/embed/TQMbvJNRpLE?si=X-JB8JEP32lAwJKw",
        imageUrl: "https://img.youtube.com/vi/TQMbvJNRpLE/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Goal Setting Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Goal Setting Mastery",
                lessons: [
                    { title: "The Science of Goal Achievement", time: "10:00" },
                    { title: "Creating Actionable Steps", time: "14:00" },
                ]
            }
        ]
    },
     {
        id: "ls8",
        icon: Brain,
        title: "How To Build a Brain That Doesn't Get Distracted",
        description: "Learn a science-based, four-step process to improve your focus, overcome digital distractions, and achieve deep work in a noisy world.",
        videoUrl: "https://www.youtube.com/embed/sAHlZMDHYhY?si=L2AmfrB_6GKCEhyX",
        imageUrl: "https://img.youtube.com/vi/sAHlZMDHYhY/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Focus Techniques PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Mastering Focus",
                lessons: [
                    { title: "Understanding the Distraction Loop", time: "10:00" },
                    { title: "Techniques for Deep Work", time: "15:00" },
                ]
            }
        ]
    },
];

type CourseType = typeof motivationCourses[0];

export default function MotivationCoursesPage() {
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
                        <Flame className="h-10 w-10 text-accent" />
                        Motivation Courses
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Find your drive, focus your mind, and achieve your goals.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {motivationCourses.map((course) => {
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
                                            <Accordion type="multiple" defaultValue={[course.courseContent[0].title]}>
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

    

    



