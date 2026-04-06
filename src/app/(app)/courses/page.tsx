
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { DollarSign, Briefcase, Monitor, MessageSquare, Palette, Rocket, BookMarked, ArrowRight, BrainCircuit, NotepadText, Target, Mic, Handshake, Mail, Banknote, ShieldCheck, CandlestickChart, HandCoins, Lightbulb, Camera, ShoppingCart, Presentation, Brush, FileText, Code, Bot, UserCheck, Map, Clock, NotebookPen, BookUser, Waves, Users, BookOpen, Landmark, Brain, Flag, Flame, Book, Cpu, Video, FileSpreadsheet } from "lucide-react";
import TrendingCoursesMarquee from "@/components/courses/TrendingCoursesMarquee";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

const courseCategories = [
    {
        icon: Flame,
        title: "Motivation",
        description: "Purpose, secrets to success, focus.",
        href: "/courses/motivation",
        subtopics: [
            { id: "m1", icon: Flame, text: "Believe in Yourself - Motivational Video", href: "/courses/motivation" },
            { id: "m2", icon: Brain, text: "The Power of Your Subconscious Mind - Part 1", href: "/courses/motivation" },
            { id: "m3", icon: Brain, text: "The Power of Your Subconscious Mind by Joseph Murphy", href: "/courses/motivation" },
            { id: "m4", icon: BookOpen, text: "The Secret by Rhonda Byrne (Animated Summary)", href: "/courses/motivation" },
            { id: "m5", icon: Flame, text: "Shut Up and Grind", href: "/courses/motivation" },
            { id: "m6", icon: Flame, text: "Prove Them All Wrong - Motivational Video", href: "/courses/motivation" },
            { id: "m7", icon: Flame, text: "One Life One Chance - Motivational Video", href: "/courses/motivation" },
            { id: "m8", icon: Flame, text: "Real Life Inspirational Story of Karoly Takacs", href: "/courses/motivation"},
            { id: "cp4", icon: Handshake, text: "Finding Your Purpose (Ikigai)", href: "/courses/motivation" },
            { id: "ls4", icon: BookUser, text: "The Strangest Secret by Earl Nightingale", href: "/courses/motivation" },
            { id: "ls10", icon: Flag, text: "How to Achieve Your Most Ambitious Goals", href: "/courses/motivation" },
            { id: "ls8", icon: Brain, text: "How to Build a Brain That Doesn't Get Distracted", href: "/courses/motivation" },
        ]
    },
    {
        icon: Cpu,
        title: "AI Tools and Tech skills",
        description: "Firebase, Notion AI, Jotform, and more.",
        href: "/courses/ai-tools",
        subtopics: [
             { id: "ai1", icon: Flame, text: "Firebase For Beginners", href: "/courses/ai-tools" },
             { id: "ai9", icon: Flame, text: "Google Firebase Studio In 23 Minutes", href: "/courses/ai-tools"},
             { id: "ai2", icon: Bot, text: "Napkin AI", href: "/courses/ai-tools" },
             { id: "ai12", icon: Bot, text: "Napkin AI in Hindi", href: "/courses/ai-tools" },
             { id: "ai13", icon: FileText, text: "Jotform Apps Guide", href: "/courses/ai-tools" },
             { id: "ai14", icon: Bot, text: "ChatGPT Advanced Tutorial", href: "/courses/ai-tools" },
             { id: "ai4", icon: Bot, text: "Gamma AI", href: "/courses/ai-tools" },
             { id: "ai15", icon: Bot, text: "ChatGPT for Beginners", href: "/courses/ai-tools" },
             { id: "ai10", icon: Bot, text: "Notion AI", href: "/courses/ai-tools" },
             { id: "ai11", icon: Bot, text: "Notion For Beginners [Hindi]", href: "/courses/ai-tools" },
             { id: "ai5", icon: Bot, text: "Perplexity AI", href: "/courses/ai-tools" },
             { id: "ai6", icon: Video, text: "InVideo", href: "/courses/ai-tools" },
             { id: "ai7", icon: Bot, text: "Stitch AI", href: "/courses/ai-tools" },
             { id: "ai8", icon: BrainCircuit, text: "NotebookLM in Under 13 Minutes!", href: "/courses/ai-tools" },
             { id: "dt6", icon: Bot, text: "Prompt Engineering", href: "/courses/ai-tools" },
             { id: "ai16", icon: Bot, text: "Top FREE AI tools for Literature Review", href: "/courses/ai-tools" },
        ]
    },
    {
        icon: Briefcase,
        title: "Career & Professional",
        description: "Resume, jobs, interviews, freelancing.",
        href: "/courses/career-and-professional",
        subtopics: [
            { id: "cp1", icon: NotepadText, text: "ATS friendly resume templet", href: "/courses/career-and-professional" },
            { id: "cp14", icon: NotepadText, text: "How to write an ATS Resume | For Freshers & Experienced People", href: "/courses/career-and-professional" },
            { id: "cp15", icon: Mic, text: "5 Tips to Ace Your Interview If You Are Not Fluent in English", href: "/courses/career-and-professional" },
            { id: "cp16", icon: Mic, text: "What are your Strengths & Weaknesses? |Job Interview Question & Answer for Freshers and Experienced", href: "/courses/career-and-professional"},
            { id: "cp17", icon: Mic, text: "Interview Question - Tell Me About Yourself (Best Answer For Freshers & Experienced People)", href: "/courses/career-and-professional"},
            { id: "cp18", icon: Mic, text: "Top 7 Common Job Interview Questions And Answers", href: "/courses/career-and-professional"},
            { id: "cp19", icon: Mic, text: "Follow these 14 Basic Rules to ensure you crack every interview", href: "/courses/career-and-professional"},
            { id: "cp2", icon: Target, text: "How to Create a LinkedIn Profile", href: "/courses/career-and-professional" },
            { id: "cp3", icon: Mic, text: "How to Introduce Yourself in an Interview", href: "/courses/career-and-professional" },
            { id: "cp6", icon: Presentation, text: "Interview Dressing Tips", href: "/courses/career-and-professional" },
            { id: "cp7", icon: Mic, text: "Storytelling", href: "/courses/career-and-professional" },
            { id: "cp8", icon: Mic, text: "How To Become A Master Storyteller", href: "/courses/career-and-professional" },
            { id: "cp9", icon: Presentation, text: "Public Speaking Tips", href: "/courses/career-and-professional" },
            { id: "cp10", icon: Presentation, text: "How to Do a Presentation - 5 Steps to a Killer Opener", href: "/courses/career-and-professional" },
            { id: "cp11", icon: Mail, text: "A Cold Email Strategy That Always Gets a Reply", href: "/courses/career-and-professional"},
            { id: "cp12", icon: FileSpreadsheet, text: "Excel For Beginners | FREE Excel Course", href: "/courses/career-and-professional"},
            { id: "cp13", icon: MessageSquare, text: "English Grammar (hindi)", href: "/courses/career-and-professional"},
        ]
    },
    {
        icon: DollarSign,
        title: "Money Skills",
        description: "Financial literacy, saving, earning, investing.",
        href: "/courses/money-skills",
        subtopics: [
            { id: "ms1", icon: Banknote, text: "How to Manage Your Money (50-30-20 Rule)", href: "/courses/money-skills" },
            { id: "ms2", icon: ShieldCheck, text: "15 Assets That Are Making People Rich", href: "/courses/money-skills" },
            { id: "ms3", icon: CandlestickChart, text: "How to Choose the Best Mutual Fund (in Hindi)", href: "/courses/money-skills" },
            { id: "ms4", icon: DollarSign, text: "15 Lessons Rich Parents Teach Their Kids", href: "/courses/money-skills" },
            { id: "ms6", icon: DollarSign, text: "40 Eye-Opening Money Lessons", href: "/courses/money-skills" },
            { id: "ms7", icon: Landmark, text: "Indian Tax System Explained", href: "/courses/money-skills" },
            { id: "ms9", icon: CandlestickChart, text: "₹15,000 Salary to ₹1 Crore Investment Strategy (in Hindi)", href: "/courses/money-skills" },
        ]
    },
    {
        icon: Rocket,
        title: "Entrepreneurship",
        description: "business,content creation, website developement,dropshipping",
        href: "/courses/entrepreneurship",
        subtopics: [
            { id: "e5", icon: Presentation, text: "How To Pitch A Business Idea", href: "/courses/entrepreneurship" },
            { id: "dt1", icon: Brush, text: "Canva for Beginners", href: "/courses/entrepreneurship" },
            { id: "e6", icon: Code, text: "How to Build Websites Using Wix", href: "/courses/entrepreneurship" },
            { id: "e7", icon: ShoppingCart, text: "Dropshipping For Beginners", href: "/courses/entrepreneurship" },
            { id: "ai-firebase-studio-2", icon: Flame, text: "Build Apps Using Google Firebase Studio", href: "/courses/entrepreneurship"},
            { id: "ai3", icon: FileText, text: "How to Build AI Agents with Jotform", href: "/courses/entrepreneurship" },
            { id: "e8", icon: Rocket, text: "5 Steps to Start Your First Business", href: "/courses/entrepreneurship" },
            { id: "e9", icon: Rocket, text: "How to Start a Business From Nothing", href: "/courses/entrepreneurship" },
            { id: "ms5", icon: HandCoins, text: "How I Made ₹1,86,540 Using Canva", href: "/courses/entrepreneurship" },
            { id: "e10", icon: Code, text: "How to Make a Website Using Canva for FREE", href: "/courses/entrepreneurship"},
            { id: "e11", icon: Mail, text: "Alex Hormozi's $100M Cold Email Strategy", href: "/courses/entrepreneurship" },
        ]
    },
    {
        icon: Palette,
        title: "Life Skills & Books",
        description: "Time, goals, mindset, book summaries.",
        href: "/courses/life-skills",
        subtopics: [
            { id: "ls1", icon: Map, text: "How to Make a Mind Map", href: "/courses/life-skills" },
            { id: "ls2", icon: Clock, text: "Time Management (Pomodoro Technique)", href: "/courses/life-skills" },
            { id: "ls3", icon: NotebookPen, text: "30-Day Plan to Study for Exams", href: "/courses/life-skills" },
            { id: "ls5", icon: Waves, text: "Guided Meditation for Stress Relief & Focus", href: "/courses/life-skills" },
            { id: "ls11", icon: Flag, text: "The Most Powerful Goal Setting Technique", href: "/courses/life-skills" },
            { id: "ls12", icon: Flag, text: "Mastering Goal Setting & Achievement by Amit Kumarr", href: "/courses/life-skills" },
            { id: "ls13", icon: Brain, text: "Emotional Intelligence by Ankur Warikoo", href: "/courses/life-skills" },
            { id: "ls14", icon: Brain, text: "12 Traits of Emotionally Intelligent People", href: "/courses/life-skills" },
            { id: "ls6", icon: BookOpen, text: "The Laws of Human Nature (Book Summary)", href: "/courses/life-skills" },
            { id: "ls9", icon: BookOpen, text: "Atomic Habits by James Clear", href: "/courses/life-skills" },
        ]
    }
]

export default function CoursesPage() {
  const router = useRouter();

  const handleCardClick = (e: MouseEvent<HTMLDivElement>, href: string) => {
    // Check if the click originated from an interactive element like a link or button
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    router.push(href);
  };

  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                <BookMarked className="h-10 w-10 text-accent" />
                Course Categories
            </h1>
            <p className="text-lg text-muted-foreground mt-3">
                Explore our courses by category to find the perfect fit for your goals.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseCategories.map((category) => {
                const Icon = category.icon;
                return (
                    <Card 
                        key={category.title} 
                        onClick={(e) => handleCardClick(e, category.href)}
                        className="h-full w-full flex flex-col group transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow cursor-pointer"
                    >
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-full">
                                    <Icon className="h-7 w-7 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl text-foreground">
                                    {category.title}
                                </CardTitle>
                            </div>
                            <CardDescription className="!mt-4 text-base">
                                {category.description}
                                </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3 pt-0">
                            <ul className="space-y-1 text-sm text-foreground/90">
                                {category.subtopics.map((topic) => {
                                    const TopicIcon = topic.icon;
                                    return (
                                            <li key={topic.id}>
                                            <Link href={topic.href} className="flex items-start gap-3 p-2 rounded-md transition-colors hover:bg-primary/10 hover:text-primary">
                                                <TopicIcon className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                                                <span className="font-medium">{topic.text}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </CardContent>
                            <CardFooter>
                                <Button asChild variant="link" className="p-0 h-auto font-semibold text-primary">
                                    <Link href={category.href}>
                                        View All Courses <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
      </div>
      
      <TrendingCoursesMarquee />

    </div>
  );
}

    
