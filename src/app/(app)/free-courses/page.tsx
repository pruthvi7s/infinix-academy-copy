
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const freeCoursesWebsites = [
    {
        title: "MindLuster",
        description: "Find courses, jobs, and career resources to help you grow.",
        link: "https://mindluster.com/",
    },
    {
        title: "The Open University",
        description: "Discover free courses on a wide range of subjects from a world-leading distance learning provider.",
        link: "https://www.open.edu/"
    },
    {
        title: "Google Digital Garage",
        description: "Learn digital skills with free courses from Google, covering everything from marketing to data.",
        link: "https://skillshop.exceedlms.com/"
    },
    {
        title: "Alison",
        description: "Access thousands of free online courses with certificates in various professional and personal skills.",
        link: "https://alison.com/"
    },
    {
        title: "Class Central",
        description: "Search and review thousands of free online courses from top universities like MIT, Stanford, and Harvard.",
        link: "https://www.classcentral.com/"
    },
    {
        title: "LearnVern",
        description: "Learn from free courses with certificates in software development, IT, marketing, and more.",
        link: "https://www.learnvern.com/",
    }
];

export default function FreeCoursesPage() {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <GraduationCap className="h-10 w-10 text-accent" />
                    Free Courses from Top Providers
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Explore free courses from trusted platforms to enhance your skills.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {freeCoursesWebsites.map((website) => (
                    <Card key={website.title} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-foreground">
                                {website.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{website.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                                <Link href={website.link} target="_blank" rel="noopener noreferrer">
                                    Visit Site
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
