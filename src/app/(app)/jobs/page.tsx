
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const jobWebsites = [
    {
        title: "LinkedIn",
        description: "The world's largest professional network. Build your brand and find jobs.",
        link: "https://www.linkedin.com/",
    },
    {
        title: "Naukri.com",
        description: "One of India's leading job portals with a vast number of listings.",
        link: "https://www.naukri.com/",
    },
    {
        title: "Apna",
        description: "India's largest professional platform for the rising workforce.",
        link: "https://apna.co/",
    },
    {
        title: "Internshala",
        description: "A leading platform for finding internships across India.",
        link: "https://internshala.com/",
    },
    {
        title: "Government Internship Program",
        description: "Find internship opportunities from the Government of India's National Career Service portal.",
        link: "https://www.ncs.gov.in/internship",
    },
    {
        title: "LetsIntern",
        description: "Find internships and fresher jobs in India.",
        link: "https://letsintern.in/",
    },
    {
        title: "Freshersworld",
        description: "Find jobs and internships specifically for fresh graduates.",
        link: "https://www.freshersworld.com/",
    },
    {
        title: "Free Word Cloud Generator",
        description: "Create a word cloud from your resume to highlight keywords for job applications.",
        link: "https://www.freewordcloudgenerator.com/",
    },
    {
        title: "Truly Remote",
        description: "Find your next remote job. Verified remote companies and jobs.",
        link: "https://trulyremote.co/",
    },
    {
        title: "Remoteok",
        description: "A popular job board for remote jobs in tech and other industries.",
        link: "https://remoteok.com/",
    },
    {
        title: "We Work Remotely",
        description: "The largest remote work community in the world.",
        link: "https://weworkremotely.com/",
    },
    {
        title: "Remotive",
        description: "Find your dream remote job. Startups and tech companies hiring remotely.",
        link: "https://remotive.com/",
    },
    {
        title: "FlexJobs",
        description: "A top site for remote, flexible, and freelance jobs.",
        link: "https://www.flexjobs.com/",
    },
    {
        title: "InterviewBit",
        description: "Practice coding interviews and find tech jobs.",
        link: "https://www.interviewbit.com/"
    },
    {
        title: "Glassdoor",
        description: "Find jobs, get company insights, and compare salaries.",
        link: "https://www.glassdoor.co.in/"
    },
    {
        title: "Monster",
        description: "A global leader in connecting people and jobs.",
        link: "https://www.monster.com/",
    },
    {
        title: "Indeed",
        description: "The #1 job site in the world with millions of job listings.",
        link: "https://www.indeed.com/",
    },
    {
        title: "FinalRound AI",
        description: "An AI-powered tool to practice and ace your job interviews.",
        link: "https://www.finalroundai.com/",
    }
];

export default function JobsPage() {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <Briefcase className="h-10 w-10 text-accent" />
                    Job & Internship Websites
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Explore top platforms to find job openings and internships.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobWebsites.map((website) => (
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
