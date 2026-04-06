
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Briefcase, NotepadText, Target, Mic, Handshake, Presentation, Pin, Download, CheckCircle, PlayCircle, Check, Clock, Lock, Mail, FileSpreadsheet, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const careerCourses = [
    {
        id: "cp1",
        icon: NotepadText,
        title: "ATS friendly resume templet",
        description: "Learn to create a professional, eye-catching resume that stands out to recruiters using Canva, with a free template included.",
        videoUrl: "https://www.youtube.com/embed/ZcuziWFfpQY?si=ioPkvlGA5QOufciz",
        imageUrl: "https://i.postimg.cc/13GjXXgR/career-course-1.png",
        price: "Free",
        resources: [{ name: "Resume Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Welcome to the Course", time: "1:00" },
                    { title: "Understanding the Basics of Resume Design", time: "5:30" },
                ]
            },
            {
                title: "Section 2: Core Concepts",
                 lessons: [
                    { title: "Advanced Canva Techniques", time: "12:15" },
                    { title: "Tailoring Your Resume for Different Jobs", time: "8:45" },
                ]
            }
        ]
    },
    {
        id: "cp14",
        icon: NotepadText,
        title: "How to write an ATS Resume | For Freshers & Experienced People",
        description: "Learn how to write a powerful ATS-friendly resume that gets past screening software. Suitable for both freshers and experienced professionals.",
        videoUrl: "https://www.youtube.com/embed/Hw2nGZtoOhc?si=WGekPYQM0HakmPLk",
        imageUrl: "https://img.youtube.com/vi/Hw2nGZtoOhc/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "ATS Resume Keywords", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Understanding ATS",
                lessons: [
                    { title: "What is an ATS?", time: "5:00" },
                    { title: "Keywords and Formatting", time: "8:00" },
                ]
            }
        ]
    },
    {
        id: "cp15",
        icon: Mic,
        title: "5 Tips to Ace Your Interview If You Are Not Fluent in English",
        description: "Learn five practical tips to confidently handle interviews even if you are not fluent in English, helping you showcase your skills effectively.",
        videoUrl: "https://www.youtube.com/embed/gDN7cJ3Rt80?si=aJCnHGbWnVxOYBHR",
        imageUrl: "https://img.youtube.com/vi/gDN7cJ3Rt80/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Interview Tips PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Interview Confidence",
                lessons: [
                    { title: "Tip 1: Prepare Key Phrases", time: "5:00" },
                    { title: "Tip 2: Focus on Your Strengths", time: "7:00" },
                ]
            }
        ]
    },
    {
        id: "cp16",
        icon: Mic,
        title: "What are your Strengths & Weaknesses? |Job Interview Question & Answer for Freshers and Experienced",
        description: "Learn how to effectively answer the common interview question about your strengths and weaknesses. This guide is for both freshers and experienced professionals.",
        videoUrl: "https://www.youtube.com/embed/M5905oDA34c?si=on-t0v6tqZEANCk1",
        imageUrl: "https://img.youtube.com/vi/M5905oDA34c/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Interview Tips PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Interview Mastery",
                lessons: [
                    { title: "Framing Your Strengths", time: "5:00" },
                    { title: "Presenting Weaknesses Constructively", time: "7:00" },
                ]
            }
        ]
    },
    {
        id: "cp17",
        icon: Mic,
        title: "Interview Question - Tell Me About Yourself (Best Answer For Freshers & Experienced People)",
        description: "Learn how to structure the perfect answer to the 'Tell me about yourself' question, with examples for both freshers and experienced professionals.",
        videoUrl: "https://www.youtube.com/embed/wTBHyLG9KxU?si=X3sQ-KAdtyKUI4Qg",
        imageUrl: "https://img.youtube.com/vi/wTBHyLG9KxU/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Answer Framework", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Crafting Your Story",
                lessons: [
                    { title: "The Present-Past-Future Formula", time: "5:00" },
                    { title: "Tailoring Your Answer to the Job", time: "8:00" },
                ]
            }
        ]
    },
    {
        id: "cp18",
        icon: Mic,
        title: "Top 7 Common Job Interview Questions And Answers",
        description: "Learn how to confidently answer the top 7 most common job interview questions to impress recruiters.",
        videoUrl: "https://www.youtube.com/embed/gCrA-pFe7Zo?si=jIRUPh20Ic7lnBDQ",
        imageUrl: "https://img.youtube.com/vi/gCrA-pFe7Zo/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Answer Framework", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Common Questions",
                lessons: [
                    { title: "Answering 'Why should we hire you?'", time: "5:00" },
                    { title: "Answering 'Where do you see yourself in 5 years?'", time: "8:00" },
                ]
            }
        ]
    },
    {
        id: "cp19",
        icon: Mic,
        title: "Follow these 14 Basic Rules to ensure you crack every interview",
        description: "Learn 14 essential rules to help you succeed in any job interview, covering preparation, communication, and follow-up.",
        videoUrl: "https://www.youtube.com/embed/EW4dEzfBst0?si=sgaYqEjR9yhu3etq",
        imageUrl: "https://img.youtube.com/vi/EW4dEzfBst0/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Interview Rules Checklist", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The 14 Rules",
                lessons: [
                    { title: "Rule 1-7: Preparation and First Impressions", time: "10:00" },
                    { title: "Rule 8-14: During and After the Interview", time: "12:00" },
                ]
            }
        ]
    },
    {
        id: "cp2",
        icon: Target,
        title: "How to Create a LinkedIn Profile",
        description: "Optimize your LinkedIn profile to attract recruiters, build a strong personal brand, and expand your professional network effectively. For beginners.",
        videoUrl: "https://www.youtube.com/embed/hNzpEeU3a4I?si=9NqIxrR02kWUmZ7i",
        imageUrl: "https://i.postimg.cc/tJnQkG0r/career-course-2.png",
        price: "Free",
        resources: [{ name: "LinkedIn Checklist", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Introduction",
                lessons: [
                    { title: "Why LinkedIn is Crucial for Your Career", time: "2:30" },
                    { title: "Setting Up Your Profile", time: "7:00" },
                ]
            }
        ]
    },
    {
        id: "cp3",
        icon: Mic,
        title: "How to Introduce Yourself in an Interview",
        description: "Learn how to confidently answer the 'Tell me about yourself' question in an interview, one of the most common opening questions.",
        videoUrl: "https://www.youtube.com/embed/DHDrj0_bMQ0?si=h2nW1AXJ6h5AiXHj",
        imageUrl: "https://i.postimg.cc/9M9B2Gz8/career-course-3.png",
        price: "Free",
        resources: [{ name: "Common Questions PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Nailing the Interview",
                lessons: [
                    { title: "Common Questions & How to Answer Them", time: "15:00" },
                    { title: "Dressing for Success", time: "5:00" },
                ]
            }
        ]
    },
    {
        id: "cp6",
        icon: Presentation,
        title: "Interview Dressing Tips",
        description: "Learn how to dress for success in your next interview, with specific tips on what to wear and what to avoid for a professional look.",
        videoUrl: "https://www.youtube.com/embed/Lmo-b0taiIw?si=-YfgIYTmZDsF7YZ3",
        imageUrl: "https://img.youtube.com/vi/Lmo-b0taiIw/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Dressing Tips PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Dressing for Success",
                lessons: [
                    { title: "Understanding Business Attire", time: "8:00" },
                    { title: "What Not to Wear", time: "6:00" },
                ]
            }
        ]
    },
    {
        id: "cp7",
        icon: Mic,
        title: "Storytelling",
        description: "Learn the art of storytelling to captivate your audience, whether in interviews, presentations, or daily communication, from a TEDx speaker.",
        videoUrl: "https://www.youtube.com/embed/hNuAv-42jzY?si=-fpFfEUz7UvYSdTm",
        imageUrl: "https://img.youtube.com/vi/hNuAv-42jzY/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Storytelling Framework", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Art of Storytelling",
                lessons: [
                    { title: "The Hero's Journey", time: "10:00" },
                    { title: "Engaging Your Audience", time: "12:00" },
                ]
            }
        ]
    },
    {
        id: "cp8",
        icon: Mic,
        title: "How To Become A Master Storyteller",
        description: "Learn the secrets to becoming a master storyteller and captivate any audience. This video covers advanced techniques and emotional connection.",
        videoUrl: "https://www.youtube.com/embed/t5Z-Q1bg1tU?si=1MGCDKmKhrp2NN1Z",
        imageUrl: "https://img.youtube.com/vi/t5Z-Q1bg1tU/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Storytelling Tips", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: The Art of Masterful Storytelling",
                lessons: [
                    { title: "Advanced Narrative Techniques", time: "11:00" },
                    { title: "Connecting with your Audience Emotionally", time: "13:00" },
                ]
            }
        ]
    },
    {
        id: "cp9",
        icon: Presentation,
        title: "Public Speaking Tips",
        description: "Learn fundamental tips for public speaking that will help you deliver your message with confidence and clarity.",
        videoUrl: "https://www.youtube.com/embed/savwVzZh5go?si=4JyCV5GqV9KIAoC1",
        imageUrl: "https://img.youtube.com/vi/savwVzZh5go/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Public Speaking Tips", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Mastering Public Speaking",
                lessons: [
                    { title: "Building Confidence", time: "10:00" },
                    { title: "Engaging Your Audience", time: "12:00" },
                ]
            }
        ]
    },
    {
        id: "cp10",
        icon: Presentation,
        title: "How to Do a Presentation - 5 Steps to a Killer Opener",
        description: "Learn a 5-step process to create a killer opening for your presentation that will captivate your audience from the very beginning.",
        videoUrl: "https://www.youtube.com/embed/dEDcc0aCjaA?si=hJfYQMfC_DbOVwQ3",
        imageUrl: "https://img.youtube.com/vi/dEDcc0aCjaA/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Presentation Opening Worksheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Killer Openers",
                lessons: [
                    { title: "Step 1: The Hook", time: "3:00" },
                    { title: "Step 2: The Problem", time: "5:00" },
                    { title: "Step 3: The Solution", time: "4:00" },
                ]
            }
        ]
    },
    {
        id: "cp11",
        icon: Mail,
        title: "A Cold Email Strategy That Always Gets a Reply",
        description: "Learn a tried and tested cold email strategy that helps you build connections and almost always gets a reply.",
        videoUrl: "https://www.youtube.com/embed/fvfX28rPYxA?si=OdF3E-8YA791Qcbv",
        imageUrl: "https://img.youtube.com/vi/fvfX28rPYxA/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Email Template", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Cold Email Strategy",
                lessons: [
                    { title: "Crafting the Perfect Subject Line", time: "4:00" },
                    { title: "The AIDA Formula for Emails", time: "8:00" },
                    { title: "Following Up Effectively", time: "5:00" },
                ]
            }
        ]
    },
    {
        id: "cp12",
        icon: FileSpreadsheet,
        title: "Excel For Beginners | FREE Excel Course",
        description: "A comprehensive free course for beginners to learn Microsoft Excel from scratch. Covers formulas, functions, charts, and more.",
        videoUrl: "https://www.youtube.com/embed/UPABcYhugZk?si=WtPiVZcNfOvmxnUX",
        imageUrl: "https://img.youtube.com/vi/UPABcYhugZk/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Excel Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Excel Fundamentals",
                lessons: [
                    { title: "Introduction to the Excel Interface", time: "10:00" },
                    { title: "Basic Formulas and Functions", time: "15:00" },
                    { title: "Creating Your First Chart", time: "12:00" },
                ]
            }
        ]
    },
    {
        id: "cp13",
        icon: MessageSquare,
        title: "English Grammar (hindi)",
        description: "Learn the fundamentals of English grammar explained in Hindi to improve your language skills.",
        videoUrl: "https://www.youtube.com/embed/r1VJpWQvOps?si=8L_mBpwxYLkumKJH",
        imageUrl: "https://img.youtube.com/vi/r1VJpWQvOps/hqdefault.jpg",
        price: "Free",
        resources: [{ name: "Grammar Rules PDF", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Grammar Fundamentals",
                lessons: [
                    { title: "Parts of Speech", time: "10:00" },
                    { title: "Tenses and Sentence Structure", time: "15:00" },
                ]
            }
        ]
    }
];

type CourseType = typeof careerCourses[0];

export default function CareerProfessionalCoursesPage() {
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
                        <Briefcase className="h-10 w-10 text-accent" />
                        Career & Professional Courses
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Build the skills you need for a successful career.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {careerCourses.map((course) => {
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

    