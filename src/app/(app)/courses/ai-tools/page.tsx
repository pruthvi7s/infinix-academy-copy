
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Cpu, Bot, Flame, FileText, Video, Pin, Download, CheckCircle, PlayCircle, Check, Clock, Lock, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const aiToolsCourses = [
    {
        id: "dt6",
        icon: Bot,
        title: "Prompt Engineering",
        description: "Learn how to write effective prompts to get the best results from AI models like ChatGPT. Unlock the power of generative AI.",
        videoUrl: "https://www.youtube.com/embed/-c0Jw7s1J0Y?si=7X744DRoPkklba_w",
        price: "Free",
        resources: [{ name: "Advanced Prompting Cheatsheet", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
             {
                title: "Section 1: The Art of the Prompt",
                lessons: [
                    { title: "Introduction to Prompt Engineering", time: "8:00" },
                    { title: "Key Principles of Effective Prompts", time: "12:00" },
                ]
            }
        ]
    },
    {
        id: "ai15",
        icon: Bot,
        title: "ChatGPT for Beginners",
        description: "A beginner's guide to using ChatGPT, covering the basics of how to get started, write effective prompts, and understand its various use cases.",
        videoUrl: "https://www.youtube.com/embed/PDw3Uk9dNk?si=y8jvyUdIUkPwgopn",
        price: "Free",
        resources: [{ name: "ChatGPT Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started with ChatGPT",
                lessons: [
                    { title: "What is ChatGPT and How it Works?", time: "1:05" },
                    { title: "Writing Your First Prompt", time: "3:30" },
                    { title: "Examples and Use Cases", time: "6:50" }
                ]
            }
        ]
    },
    {
        id: "ai14",
        icon: Bot,
        title: "ChatGPT Advanced Tutorial",
        description: "An advanced tutorial on ChatGPT covering custom instructions, creating and using GPTs, function calling, and more.",
        videoUrl: "https://www.youtube.com/embed/iRTK-jsfleg?si=kJ3jgHTHklbHxjMN",
        price: "Free",
        resources: [{ name: "Gamma AI Website", url: "https://gamma.app/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Advanced ChatGPT Techniques",
                lessons: [
                    { title: "Custom Instructions", time: "1:20" },
                    { title: "Using GPTs", time: "3:45" },
                    { title: "Function Calling and APIs", time: "7:10" }
                ]
            }
        ]
    },
    {
        id: "ai1",
        icon: Flame,
        title: "Firebase For Beginners",
        description: "A quick introduction to Firebase, covering its key features like Authentication, Firestore, and Hosting, and how it helps you develop high-quality apps.",
        videoUrl: "https://www.youtube.com/embed/tnvI4WWrpDY?si=6eiR4paqhWUFT1nF", 
        price: "Free",
        resources: [{ name: "Firebase Docs", url: "https://firebase.google.com/docs" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Introduction to Firebase",
                lessons: [
                    { title: "What is Firebase?", time: "0:25" },
                    { title: "Key Features Overview", time: "1:30" },
                    { title: "Setting Up a Project", time: "2:45" }
                ]
            },
            {
                title: "Section 2: Core Services",
                lessons: [
                    { title: "Authentication", time: "3:50" },
                    { title: "Firestore Database", time: "5:10" },
                    { title: "Hosting", time: "6:20" }
                ]
            }
        ]
    },
    {
        id: "ai9",
        icon: Flame,
        title: "Google Firebase Studio In 23 Minutes",
        description: "A comprehensive overview of Google's Firebase Studio, a powerful tool for building and managing web applications.",
        videoUrl: "https://www.youtube.com/embed/Rd6F5wHIysM?si=xPQS3EMb66__Knmd",
        price: "Free",
        resources: [{ name: "Firebase Studio Docs", url: "https://firebase.google.com/docs/studio" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started",
                lessons: [
                    { title: "Introduction to Firebase Studio", time: "0:30" },
                    { title: "Creating a New Project", time: "2:00" },
                    { title: "Dashboard Overview", time: "4:15" }
                ]
            },
            {
                title: "Section 2: Building an App",
                lessons: [
                    { title: "Using the AI Assistant", time: "6:00" },
                    { title: "Editing Code and Components", time: "11:30" },
                    { title: "Deploying Your Application", time: "18:00" }
                ]
            }
        ]
    },
    {
        id: "ai2",
        icon: Bot,
        title: "Napkin AI",
        description: "Capture and connect ideas with this tool for networked thought. Learn how to use its features like AI Magic to generate new insights.",
        videoUrl: "https://www.youtube.com/embed/LvObyJFnM8U?si=M6vOwd-eXNQjopO_",
        price: "Free",
        resources: [{ name: "Napkin AI Website", url: "https://napkin.ai/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Introduction to Napkin",
                lessons: [
                    { title: "What is Napkin AI?", time: "0:45" },
                    { title: "Capturing Your First Idea", time: "2:10" },
                    { title: "Connecting Thoughts", time: "4:30" }
                ]
            }
        ]
    },
    {
        id: "ai12",
        icon: Bot,
        title: "Napkin AI in Hindi",
        description: "A guide to Napkin AI in Hindi, showing you how to capture your thoughts and use the AI Magic feature to generate new ideas.",
        videoUrl: "https://www.youtube.com/embed/PkswnIk2tW8?si=hHtSGZyNDrovNoEv",
        price: "Free",
        resources: [{ name: "Napkin AI Website", url: "https://napkin.ai/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Napkin AI का परिचय",
                lessons: [
                    { title: "Napkin AI क्या है?", time: "1:15" },
                    { title: "अपने विचार कैसे capture करें", time: "3:40" },
                    { title: "AI Magic Feature", time: "6:20" }
                ]
            }
        ]
    },
    {
        id: "ai13",
        icon: FileText,
        title: "Jotform Apps Guide",
        description: "Build powerful apps and collect data seamlessly with Jotform Apps, without writing any code.",
        videoUrl: "https://www.youtube.com/embed/1gBt4QDV7h4?si=YcxNHg9akr904uIX",
        price: "Free",
        resources: [{ name: "Jotform Apps", url: "https://www.jotform.com/products/apps/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Building with Jotform Apps",
                lessons: [
                    { title: "Introduction to Jotform Apps", time: "0:50" },
                    { title: "Adding Forms and Widgets", time: "2:30" },
                    { title: "Publishing Your App", time: "4:15" }
                ]
            }
        ]
    },
    {
        id: "ai4",
        icon: Bot,
        title: "Gamma AI",
        description: "Create beautiful presentations, documents, and websites from a simple text prompt using Gamma AI.",
        videoUrl: "https://www.youtube.com/embed/KcbXKUR7-a0?si=LYD4g-EnOhEonqkZ",
        price: "Free",
        resources: [{ name: "Gamma AI Website", url: "https://gamma.app/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Introduction to Gamma AI",
                lessons: [
                    { title: "Creating a Presentation from a Prompt", time: "1:00" },
                    { title: "Editing and Customizing Slides", time: "3:15" },
                    { title: "Sharing Your Presentation", time: "5:30" }
                ]
            }
        ]
    },
    {
        id: "ai10",
        icon: Bot,
        title: "Notion AI",
        description: "Learn how to use Notion AI to boost your productivity, organize your life, and automate tasks like summarizing content and generating action items.",
        videoUrl: "https://www.youtube.com/embed/hbxQw4LQwws?si=eLgKlHDZwgAln7Kw",
        price: "Free",
        resources: [{ name: "Notion AI Website", url: "https://www.notion.so/product/ai" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Notion AI Features",
                lessons: [
                    { title: "AI Blocks and Autofill", time: "1:30" },
                    { title: "Summarizing and Action Items", time: "4:00" },
                    { title: "Brainstorming and Writing Help", time: "6:45" }
                ]
            }
        ]
    },
    {
        id: "ai11",
        icon: Bot,
        title: "Notion For Beginners [Hindi]",
        description: "A comprehensive guide to using Notion for beginners in Hindi, covering pages, blocks, databases, and templates.",
        videoUrl: "https://www.youtube.com/embed/57kuu_mfaIM?si=KD07G9faMrCjUGJQ",
        price: "Free",
        resources: [{ name: "Notion Website", url: "https://www.notion.so/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Notion के Basics",
                lessons: [
                    { title: "Notion क्या है?", time: "1:50" },
                    { title: "Pages, Blocks, and Databases", time: "5:20" },
                    { title: "Templates का उपयोग", time: "11:00" }
                ]
            }
        ]
    },
    {
        id: "ai5",
        icon: Bot,
        title: "Perplexity AI",
        description: "Explore Perplexity AI, a conversational search engine that provides direct answers and cites its sources, and learn how to use its 'Focus' feature.",
        videoUrl: "https://www.youtube.com/embed/YoWdogtZRw8?si=kmaOo2R9YKSRu07M",
        price: "Free",
        resources: [{ name: "Perplexity AI Website", url: "https://www.perplexity.ai/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Using Perplexity AI",
                lessons: [
                    { title: "Introduction to Perplexity", time: "0:40" },
                    { title: "Asking Questions and Getting Sources", time: "2:15" },
                    { title: "Using 'Focus' for Deeper Search", time: "4:30" }
                ]
            }
        ]
    },
    {
        id: "ai6",
        icon: Video,
        title: "InVideo",
        description: "Create professional-quality videos with InVideo, an online video editor. Learn to use templates, edit footage, and export your creations.",
        videoUrl: "https://www.youtube.com/embed/8KklxjehDbs?si=Jka7xaRtM2GE8kiK",
        price: "Free",
        resources: [{ name: "InVideo Website", url: "https://invideo.io/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started with InVideo",
                lessons: [
                    { title: "Dashboard Overview", time: "1:00" },
                    { title: "Using Templates", time: "3:05" },
                    { title: "Editing Your Video", time: "5:50" },
                    { title: "Exporting and Sharing", time: "8:10" }
                ]
            }
        ]
    },
    {
        id: "ai7",
        icon: Bot,
        title: "Stitch AI",
        description: "A quick introduction to Stitch, a tool for data integration (ETL), showing how to connect data sources and destinations.",
        videoUrl: "https://www.youtube.com/embed/xX15HwJWtDU?si=7G7iysKSX8G_65Nz",
        price: "Free",
        resources: [{ name: "Stitch AI Website", url: "https://stitch.withgoogle.com/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Data Integration with Stitch",
                lessons: [
                    { title: "What is Stitch?", time: "0:55" },
                    { title: "Connecting a Data Source", time: "2:40" },
                    { title: "Setting a Destination", time: "4:15" },
                    { title: "Running Your First Integration", time: "6:30" }
                ]
            }
        ]
    },
    {
        id: "ai8",
        icon: BrainCircuit,
        title: "NotebookLM in Under 13 Minutes!",
        description: "Learn how to use Google's NotebookLM to organize your research, generate ideas, get summaries, and ask questions about your sources.",
        videoUrl: "https://www.youtube.com/embed/EOmgC3-hznM?si=5FriAXK3YaNkQeqP",
        price: "Free",
        resources: [{ name: "NotebookLM Website", url: "https://notebooklm.google.com/" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: Getting Started with NotebookLM",
                lessons: [
                    { title: "Introduction to NotebookLM", time: "0:45" },
                    { title: "Adding and Summarizing Sources", time: "3:00" },
                    { title: "Asking Questions about Your Sources", time: "6:30" },
                    { title: "Generating Ideas and Outlines", time: "9:15" }
                ]
            }
        ]
    },
    {
        id: "ai16",
        icon: Bot,
        title: "Top FREE AI tools for Literature Review",
        description: "A guide to the best free AI tools that can help streamline your literature review process for research papers.",
        videoUrl: "https://www.youtube.com/embed/0dJj3XpTey0?si=8-WYYeZk8GKrv1uq",
        price: "Free",
        resources: [{ name: "Literature Review Guide", url: "#" }],
        instructor: "Infinix Academy",
        avatarUrl: "https://i.postimg.cc/PfcYfJWm/Chat-GPT-Image-Jun-21-2025-04-40-45-PM.png",
        courseContent: [
            {
                title: "Section 1: AI for Research",
                lessons: [
                    { title: "Finding and Summarizing Papers", time: "5:00" },
                    { title: "Organizing Your Research", time: "8:00" },
                ]
            }
        ]
    }
];

type CourseType = typeof aiToolsCourses[0];

export default function AIToolsPage() {
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
                        <Cpu className="h-10 w-10 text-accent" />
                        AI Tools and Tech skills
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Learn to leverage powerful AI tools and tech skills to boost your productivity and creativity.
                    </p>
                </div>
                
                <div className="space-y-8">
                    {aiToolsCourses.map((course) => {
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
                                            <Accordion type="multiple" defaultValue={course.courseContent.length > 0 ? [course.courseContent[0].title] : []}>
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
                                        disabled={(isBasicUser) || isCourseComplete}
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

    
    
