"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Book, Atom, Briefcase, Paintbrush, FileText, Download } from "lucide-react";
import Link from "next/link";

const examCategories = [
    {
        icon: Atom,
        title: "Exams for Science",
        description: "Find PDFs for entrance exams like JEE, NEET, and other science-related competitive tests.",
        link: "https://drive.google.com/file/d/1oWf79rxm8mNhECz4aUazq3g7Z3Bb5l0U/view?usp=drive_link",
        isExternal: true,
    },
    {
        icon: Briefcase,
        title: "Exams for Commerce",
        description: "Explore guides for commerce entrance exams such as CA Foundation, CS, and university-specific tests.",
        link: "https://drive.google.com/file/d/19WEaVGHbjVheXFv7m8TIBxi_hMNOG7is/view?usp=drive_link",
        isExternal: true,
    },
    {
        icon: Paintbrush,
        title: "Exams for Arts",
        description: "Discover resources for arts and humanities entrance exams for various universities and design schools.",
        link: "https://drive.google.com/file/d/1rmLrhiupOKacS1HH2eKIZc5UNmSpuVx2/view?usp=drive_link",
        isExternal: true,
    },
    {
        icon: FileText,
        title: "Exams for Diploma",
        description: "Get information on lateral entry exams and other opportunities after completing a Diploma course.",
        link: "https://drive.google.com/file/d/1w6TaaiWtxb_r36yxnbvrrzL48FY1KTp4/view?usp=drive_link",
        isExternal: true,
    },
    {
        icon: FileText,
        title: "Exams for ITI",
        description: "Get information on lateral entry exams and other opportunities after completing an ITI course.",
        link: "https://drive.google.com/file/d/1AVPEF7D733T0sUEd-LcTSsj4C9qq5bly/view?usp=drive_link",
        isExternal: true,
    },
];

export default function EntranceExamsPage() {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <GraduationCap className="h-10 w-10 text-accent" />
                    Entrance Exams Guide
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Select a category to find relevant entrance exam resources and PDFs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {examCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Card key={category.title} className="bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                             <CardHeader>
                                <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                    <Icon className="h-7 w-7 text-primary"/>
                                    {category.title}
                                </CardTitle>
                             </CardHeader>
                            <CardContent>
                                <CardDescription>{category.description}</CardDescription>
                            </CardContent>
                             <CardContent>
                                <Button asChild>
                                    <Link href={category.link} target={category.isExternal ? "_blank" : "_self"} rel={category.isExternal ? "noopener noreferrer" : ""}>
                                        <Download className="mr-2 h-4 w-4"/>
                                        View Exams
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
