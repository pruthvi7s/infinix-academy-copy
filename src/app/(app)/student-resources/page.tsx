"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, GraduationCap, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const resources = [
    {
        icon: FileText,
        title: "Educational Paths PDF",
        description: "A comprehensive guide for students to get started and make the most of the platform.",
        downloadLink: "https://drive.google.com/file/d/1sByXGvdWf9EqQh9iSE0LwpzX65gS0IRf/view?usp=sharing",
        isExternal: true,
    },
    {
        icon: FileSpreadsheet,
        title: "Financial Tracker Spreadsheet",
        description: "A handy spreadsheet to help you manage your finances, track expenses, and budget effectively.",
        downloadLink: "https://docs.google.com/spreadsheets/d/1abORGUJi4NuGKmmUagd7eHA2Gf4F4qx-/edit?usp=drive_link&ouid=111246190250036027314&rtpof=true&sd=true",
        isExternal: true,
    },
    {
        icon: GraduationCap,
        title: "Yuva Nidhi Scheme (3000 rs per month)",
        description: "Information and application details for the Yuva Nidhi Scheme for eligible graduates and diploma holders.",
        downloadLink: "https://drive.google.com/file/d/1YuXCmEMnesO8N9NAjdjSXp-EwWZGPqzp/view?usp=drive_link",
        isExternal: true,
    }
];

export default function StudentResourcesPage() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl mx-auto space-y-16">
                <div>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-12 flex items-center justify-center">
                        <Download className="h-10 w-10 mr-4" />
                        Downloadable Resources
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {resources.map((resource, index) => {
                            const Icon = resource.icon;
                            return (
                                <Card key={index} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                                        <div className="p-3 bg-primary/20 rounded-full">
                                            <Icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <div className="flex-grow">
                                            <CardTitle className="font-headline text-2xl text-foreground">
                                                {resource.title}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">{resource.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        {resource.isExternal ? (
                                            <Button asChild className="w-full font-semibold" size="lg">
                                                <a href={resource.downloadLink} download target="_blank" rel="noopener noreferrer">
                                                    <Download className="mr-2 h-5 w-5" />
                                                    Download
                                                </a>
                                            </Button>
                                        ) : (
                                            <Button asChild className="w-full font-semibold" size="lg">
                                                <Link href={resource.downloadLink}>
                                                    Explore
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Link>
                                            </Button>
                                        )}
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
