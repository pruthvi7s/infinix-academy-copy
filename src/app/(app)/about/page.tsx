
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Target, Users, BookOpen } from "lucide-react";
import Image from "next/image";
import placeholderImages from "@/app/lib/placeholder-images.json";

export default function AboutUsPage() {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <Building className="h-10 w-10 text-accent" />
                    About Infinix Academy
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Discover the mission, vision, and the team behind our goal to revolutionize career guidance for students.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
                 <Card className="border-none shadow-none">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-2xl text-primary flex items-center justify-center gap-2">
                           <Target className="h-7 w-7 text-accent" />
                           Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90 text-center max-w-3xl mx-auto">
                        <p className="text-lg">
                            To empower every student with the clarity, skills, and confidence needed to navigate their unique career path and achieve their full potential.
                        </p>
                        <p>
                            We believe that traditional education often leaves a gap between academic knowledge and real-world success. Our mission is to bridge that gap by providing personalized, AI-driven career guidance, practical skill development, and access to expert mentorship. We are committed to making high-quality career education accessible to all.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                        <BookOpen className="h-7 w-7 text-accent" />
                        What We Offer
                    </CardTitle>
                    <CardDescription>
                        A holistic platform designed for the modern student.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2 p-4 rounded-lg bg-card/50">
                        <h3 className="font-semibold text-lg">Personalized Assessments</h3>
                        <p className="text-sm text-muted-foreground">AI-powered tests like Holland (RIASEC) and Myers-Briggs to uncover your unique strengths and interests.</p>
                    </div>
                    <div className="space-y-2 p-4 rounded-lg bg-card/50">
                        <h3 className="font-semibold text-lg">Customized Career Roadmaps</h3>
                        <p className="text-sm text-muted-foreground">Step-by-step learning paths tailored to your dream career, from education to skill development.</p>
                    </div>
                    <div className="space-y-2 p-4 rounded-lg bg-card/50">
                        <h3 className="font-semibold text-lg">Curated Course Library</h3>
                        <p className="text-sm text-muted-foreground">Free, high-quality courses in life skills, money management, tech, and more to build job-ready competencies.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
