
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Palette, Map, Clock, NotebookPen, BookUser, Waves, Pin, Download, CheckCircle, PlayCircle, Check, BookOpen, Brain, Flag, Lock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const lifeSkillsCourses = [
    {
        id: "ls1",
        icon: Map,
        title: "How to Make a Mind Map",
        description: "Enhance your memory and learning efficiency by mastering the art of creating effective mind maps to organize information.",
        videoUrl: "https://www.youtube.com/embed/Grd7K7bJVWg?si=7iFnDvXVM5DtdH3D",
        imageUrl: "https://i.postimg.cc/yNZZg1mJ/life-course-1.png",
        price: "Free",
        resources: [{ name: "Mind Map Templates", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Boosting Your Brain",
                lessons: [
                    { title: "The Loci Method", time: "10:00" },
                    { title: "Creating Effective Mind Maps", time: "12:30" },
                ]
            }
        ]
    },
    {
        id: "ls2",
        icon: Clock,
        title: "Time Management (Pomodoro Technique)",
        description: "Learn to beat procrastination and boost your productivity using the Pomodoro Technique, a proven method for improving focus and managing your time.",
        videoUrl: "https://www.youtube.com/embed/7ax4Tb5G1P4?si=lHNQwITADwD14_wD",
        imageUrl: "https://i.postimg.cc/L5n4xN2C/life-course-2.png",
        price: "Free",
        resources: [{ name: "Pomodoro Tracker", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Mastering Your Time",
                lessons: [
                    { title: "Understanding the Pomodoro Technique", time: "5:00" },
                    { title: "Advanced Time Management Strategies", time: "15:00" },
                ]
            }
        ]
    },
    {
        id: "ls3",
        icon: NotebookPen,
        title: "30-Day Plan to Study for Exams",
        description: "Learn a 30-day plan that outlines the right way to study for exams, covering schedule creation, revision techniques, and maintaining focus.",
        videoUrl: "https://www.youtube.com/embed/AS903onr9es?si=iJKuFTaqeCWoBf71",
        imageUrl: "https://img.youtube.com/vi/AS903onr9es/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Study Plan Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: 30-Day Exam Plan",
                lessons: [
                    { title: "Creating Your Study Schedule", time: "11:00" },
                    { title: "Effective Revision Techniques", time: "9:30" },
                ]
            }
        ]
    },
    {
        id: "ls5",
        icon: Waves,
        title: "Guided Meditation for Stress Relief & Focus",
        description: "Learn practical mindfulness and meditation techniques to effectively manage stress and significantly improve your focus in this guided session.",
        videoUrl: "https://www.youtube.com/embed/Lv1jpqkN4ZY?si=eAmVCpmS2C58T8_x",
        imageUrl: "https://i.postimg.cc/sXv0Y8yL/life-course-5.png",
        price: "Free",
        resources: [{ name: "Meditation Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Finding Your Calm",
                lessons: [
                    { title: "Mindfulness and Meditation Basics", time: "12:00" },
                    { title: "Breathing Exercises for Stress Relief", time: "7:00" },
                ]
            }
        ]
    },
    {
        id: "ls11",
        icon: Flag,
        title: "The Most Powerful Goal Setting Technique",
        description: "Learn a powerful and simple technique to set and achieve your most ambitious goals by clarifying your vision and creating actionable steps.",
        videoUrl: "https://www.youtube.com/embed/hGqlLmFvOlM?si=gZp8JgVEnxhK0gMO",
        imageUrl: "https://img.youtube.com/vi/hGqlLmFvOlM/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Goal Setting Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Goal Setting Mastery",
                lessons: [
                    { title: "Understanding Powerful Goal Setting", time: "10:00" },
                    { title: "Implementing the Technique", time: "14:00" },
                ]
            }
        ]
    },
    {
        id: "ls12",
        icon: Flag,
        title: "Mastering Goal Setting & Achievement by Amit Kumarr",
        description: "Learn from Amit Kumarr how to effectively set and achieve your goals using a structured and motivational approach.",
        videoUrl: "https://www.youtube.com/embed/pytM_lG6jPU?si=gpE2O8bh3JgSkqU8",
        imageUrl: "https://img.youtube.com/vi/pytM_lG6jPU/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Goal Setting Worksheet", url: "#" }],
        instructor: "Amit Kumarr",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Goal Achievement",
                lessons: [
                    { title: "Principles of Goal Setting", time: "10:00" },
                    { title: "Strategies for Achievement", time: "14:00" },
                ]
            }
        ]
    },
    {
        id: "ls13",
        icon: Brain,
        title: "Emotional Intelligence by Ankur Warikoo",
        description: "Ankur Warikoo explains the importance of emotional intelligence and how developing it can significantly improve your personal and professional life.",
        videoUrl: "https://www.youtube.com/embed/NdI6jMja3Bs?si=dCZb67Bp8HiXj4Ji",
        imageUrl: "https://img.youtube.com/vi/NdI6jMja3Bs/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Ankur Warikoo",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Understanding Emotions",
                lessons: [
                    { title: "What is Emotional Intelligence?", time: "10:00" },
                    { title: "Developing Self-Awareness", time: "15:00" },
                ]
            }
        ]
    },
    {
        id: "ls14",
        icon: Brain,
        title: "12 Traits of Emotionally Intelligent People",
        description: "Explore the 12 key traits of emotionally intelligent individuals—like self-awareness, empathy, and social skills—and learn how to cultivate them.",
        videoUrl: "https://www.youtube.com/embed/cr8sLxde1m8?si=BVIoK5zoywjs8q4E",
        imageUrl: "https://img.youtube.com/vi/cr8sLxde1m8/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Key Traits",
                lessons: [
                    { title: "Self-Awareness and Self-Regulation", time: "10:00" },
                    { title: "Empathy and Social Skills", time: "12:00" },
                ]
            }
        ]
    },
     {
        id: "ls15",
        icon: Brain,
        title: "How To Become A Top 1% Learner (Full Masterclass)",
        description: "A full masterclass on the techniques (like the Feynman Technique, Active Recall) and mindsets required to become a top 1% learner.",
        videoUrl: "https://www.youtube.com/embed/eNu-pEHvZd4?si=J54fMBUOCxX8-xaW",
        imageUrl: "https://img.youtube.com/vi/eNu-pEHvZd4/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Learning Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Learning Framework",
                lessons: [
                    { title: "The Feynman Technique", time: "15:00" },
                    { title: "Active Recall and Spaced Repetition", time: "18:00" },
                ]
            }
        ]
    },
    {
        id: "ls6",
        icon: BookOpen,
        title: "Laws of Human Nature",
        description: "Get a summary of Robert Greene's 'The Laws of Human Nature' to understand the hidden patterns of human behavior and navigate social situations effectively.",
        videoUrl: "https://www.youtube.com/embed/R-iIQ0kQni0?si=T_cedBYzZpqy_pgr",
        imageUrl: "https://i.postimg.cc/Y9r4tXjG/life-course-6.png",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Understanding People",
                lessons: [
                    { title: "Introduction to Human Nature", time: "10:00" },
                    { title: "The Law of Irrationality", time: "14:00" },
                ]
            }
        ]
    },
    {
        id: "ls7",
        icon: BookOpen,
        title: "Rich Dad Poor Dad by Robert Kiyosaki",
        description: "An animated summary of the key financial lessons from the best-selling book 'Rich Dad Poor Dad', focusing on financial literacy and building wealth.",
        videoUrl: "https://www.youtube.com/embed/eDa1U9qJKxo?si=Qpk5ne9VE8fgElbM",
        imageUrl: "https://i.postimg.cc/s2qR2Jk6/life-course-7.png",
        price: "Free",
        resources: [{ name: "Book Summary PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Financial Mindset",
                lessons: [
                    { title: "The Difference Between Assets and Liabilities", time: "10:00" },
                    { title: "Why the Rich Don't Work for Money", time: "14:00" },
                ]
            }
        ]
    },
    {
        id: "ls9",
        icon: BookOpen,
        title: "Atomic Habits",
        description: "An easy and proven way to build good habits and break bad ones, based on the best-selling book by James Clear.",
        videoUrl: "https://www.youtube.com/embed/PZ7lDrwYdZc?si=sjQBLb-UI1ih9pHz",
        imageUrl: "https://img.youtube.com/vi/PZ7lDrwYdZc/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Habit Tracker Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Principles",
                lessons: [
                    { title: "The Four Laws of Behavior Change", time: "12:00" },
                    { title: "How to Make Habits Obvious and Attractive", time: "15:00" },
                ]
            }
        ]
    },
    {
        id: "ms8",
        icon: DollarSign,
        title: "The Psychology of Money in 20 minutes",
        description: "A concise summary of key lessons from Morgan Housel's 'The Psychology of Money', exploring how our biases and emotions affect our financial decisions.",
        videoUrl: "https://www.youtube.com/embed/_5ecgEXLoCA?si=fqUPMHYzrkZrtPMw",
        imageUrl: "https://img.youtube.com/vi/_5ecgEXLoCA/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Key Concepts PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Core Principles",
                lessons: [
                    { title: "No One's Crazy", time: "8:00" },
                    { title: "Luck & Risk", time: "12:00" },
                ]
            }
        ]
    },
];

type CourseType = typeof lifeSkillsCourses[0];

export default function LifeSkillsCoursesPage() {
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
                        <Palette className="h-10 w-10 text-accent" />
                        Life Skills & Book Summaries
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Develop essential skills and learn key ideas from bestselling books.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {lifeSkillsCourses.map((course) => {
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


    

    

    

    
