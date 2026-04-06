"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mic, Mail, Presentation, Handshake, Users, Pin, Download, CheckCircle, PlayCircle, Check, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const communicationCourses = [
    {
        id: "c1",
        icon: Mic,
        title: "Spoken English Basics (Playlist)",
        description: "Improve your conversational English with this playlist covering fundamental lessons on greetings, introductions, vocabulary, and common phrases.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/rpYxVvB9/comm-course-1.png",
        price: "Free",
        resources: [{ name: "Pronunciation Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Welcome to the Course", time: "1:00" },
                    { title: "Basic Greetings & Introductions", time: "5:30" },
                ]
            },
            {
                title: "Section 2: Core Concepts",
                 lessons: [
                    { title: "Building Vocabulary", time: "12:15" },
                    { title: "Common Phrases", time: "8:45" },
                ]
            }
        ]
    },
    {
        id: "c2",
        icon: Mail,
        title: "Email & WhatsApp Etiquette",
        description: "Learn the do's and don'ts of professional and effective communication on digital platforms like email and WhatsApp.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/Hks22nLg/comm-course-2.png",
        price: "Free",
        resources: [{ name: "Email Templates", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Professional Communication",
                lessons: [
                    { title: "Writing Professional Emails", time: "10:00" },
                    { title: "WhatsApp Business Etiquette", time: "7:30" },
                ]
            }
        ]
    },
    {
        id: "c3",
        icon: Presentation,
        title: "Public Speaking & Debate",
        description: "Build confidence and master the skills needed to deliver compelling speeches and participate effectively in debates.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/d11T3w6h/comm-course-3.png",
        price: "Free",
        resources: [{ name: "Debate Topics", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Mastering the Stage",
                lessons: [
                    { title: "Structuring a Compelling Speech", time: "12:00" },
                    { title: "Debating Techniques", time: "15:00" },
                ]
            }
        ]
    },
    {
        id: "c4",
        icon: Handshake,
        title: "Teamwork & Leadership",
        description: "Develop essential collaboration skills for working in a team and learn about different leadership styles to lead with impact.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/WbN1M21j/comm-course-4.png",
        price: "Free",
        resources: [{ name: "Leadership Styles Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Leading with Impact",
                lessons: [
                    { title: "Understanding Different Leadership Styles", time: "9:00" },
                    { title: "Effective Collaboration in Teams", time: "11:30" },
                ]
            }
        ]
    },
    {
        id: "c5",
        icon: Users,
        title: "Role Plays & Peer Feedback",
        description: "Practice your communication skills in real-world scenarios through role-playing and learn how to give and receive constructive feedback.",
        videoUrl: "https://www.youtube.com/embed/videoseries?list=PL-I2b2K23-g59Wv_9y5aW9aF7a_3-igwU",
        imageUrl: "https://i.postimg.cc/B6Hk6YmB/comm-course-5.png",
        price: "Free",
        resources: [{ name: "Role Play Scenarios", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: Practice Makes Perfect",
                lessons: [
                    { title: "Simulating Real-World Interactions", time: "14:00" },
                    { title: "Giving and Receiving Constructive Feedback", time: "8:00" },
                ]
            }
        ]
    }
];

type CourseType = typeof communicationCourses[0];

export default function CommunicationCoursesPage() {
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
                        <MessageSquare className="h-10 w-10 text-accent" />
                        Communication Courses
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Master the art of effective communication.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {communicationCourses.map((course) => {
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

    
