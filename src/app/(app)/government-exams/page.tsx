
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, ArrowUpRight, BookOpen, Download, Lock } from "lucide-react";
import Link from "next/link";
import { useAssessment } from "@/context/AssessmentContext";

type Exam = {
    name: string;
    description: string;
    applyLink: string;
};

type ExamGroup = {
    group: 'A' | 'B' | 'C' | 'D';
    title: string;
    description: string;
    exams: Exam[];
};

const upscExamGroups: ExamGroup[] = [
    {
        group: 'A',
        title: "Group A (Gazetted Officers)",
        description: "These are the highest-ranking managerial roles in the central and state governments. Recruitment is typically done through the UPSC Civil Services Examination.",
        exams: [
            { name: "Civil Services Examination (IAS, IPS, IFS)", description: "Top administrative roles like District Magistrate, Superintendent of Police, and diplomats.", applyLink: "https://upsc.gov.in/" },
            { name: "Indian Engineering Services (IES)", description: "Technical and managerial positions in various government engineering departments.", applyLink: "https://upsc.gov.in/" },
            { name: "Indian Forest Service (IFoS)", description: "Management and conservation of the country's natural resources and forests.", applyLink: "https://upsc.gov.in/" }
        ]
    },
    {
        group: 'B',
        title: "Group B (Gazetted & Non-Gazetted Officers)",
        description: "These roles are crucial for supervising the implementation of government policies. Recruitment is conducted by both UPSC and SSC.",
        exams: [
            { name: "SSC Combined Graduate Level (CGL)", description: "Roles like Inspector in Income Tax/Excise, Assistant Section Officer in various ministries.", applyLink: "https://ssc.nic.in/" },
            { name: "IBPS PO / SBI PO", description: "Probationary Officer roles in public sector banks, leading to managerial positions.", applyLink: "https://www.ibps.in/" },
        ]
    },
    {
        group: 'C',
        title: "Group C (Clerical & Support Staff)",
        description: "These are non-supervisory, clerical, and skilled operational roles that form the backbone of government functions.",
        exams: [
            { name: "SSC Combined Higher Secondary Level (CHSL)", description: "Clerical roles like Lower Division Clerk (LDC), Data Entry Operator (DEO).", applyLink: "https://ssc.nic.in/" },
            { name: "Railway Recruitment Board (RRB) NTPC", description: "Non-Technical Popular Categories like Junior Clerk, Accounts Clerk, Goods Guard.", applyLink: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,4,1244" }
        ]
    },
    {
        group: 'D',
        title: "Group D (Multi-Tasking Staff)",
        description: "These roles involve manual and routine tasks within various government departments. Recruitment is typically done through SSC MTS exam.",
        exams: [
            { name: "SSC Multi-Tasking (Non-Technical) Staff (MTS)", description: "Roles like Peon, Daftary, Jamadar, Junior Gestetner Operator.", applyLink: "https://ssc.nic.in/" },
            { name: "Railway Recruitment Cell (RRC) Group D", description: "Various posts like Trackman, Helper/Assistant in different technical departments.", applyLink: "https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,4,1244" }
        ]
    }
];

const mpscExamGroups: ExamGroup[] = [
    {
        group: 'A',
        title: "Group A (Gazetted)",
        description: "Top-tier administrative and executive roles within the Maharashtra state government.",
        exams: [
            { name: "State Service Examination (Rajyaseva)", description: "For posts like Deputy Collector, Deputy Superintendent of Police (DySP), Tehsildar.", applyLink: "https://mpsc.gov.in/" },
            { name: "Assistant Motor Vehicle Inspector", description: "Technical post in the Regional Transport Office (RTO).", applyLink: "https://mpsc.gov.in/" },
        ]
    },
    {
        group: 'B',
        title: "Group B (Gazetted & Non-Gazetted)",
        description: "Mid-level executive and supervisory roles in various state departments.",
        exams: [
            { name: "Subordinate Services (Combined)", description: "For posts like Police Sub-Inspector (PSI), State Tax Inspector (STI), Assistant Section Officer (ASO).", applyLink: "https://mpsc.gov.in/" },
            { name: "Maharashtra Engineering Services", description: "For Assistant Engineer roles in various engineering departments of the state.", applyLink: "https://mpsc.gov.in/" }
        ]
    },
    {
        group: 'C',
        title: "Group C (Clerical & Technical)",
        description: "Clerical, technical, and support roles essential for government operations.",
        exams: [
            { name: "Group C Services (Combined)", description: "For posts like Clerk-Typist, Tax Assistant, and Technical Assistant.", applyLink: "https://mpsc.gov.in/" }
        ]
    },
    {
        group: 'D',
        title: "Group D (Support Staff)",
        description: "Entry-level support roles in various government offices. (Recruitment often handled by respective departments or district selection boards).",
        exams: [
             { name: "Peon, Hamal, etc.", description: "General support and manual roles in government offices.", applyLink: "https://mpsc.gov.in/" }
        ]
    }
];

const kpscExamGroups: ExamGroup[] = [
    {
        group: 'A',
        title: "Group A (Gazetted)",
        description: "Highest level administrative and technical positions in the Karnataka government.",
        exams: [
            { name: "Gazetted Probationers Exam (KAS)", description: "For roles like Assistant Commissioner, Deputy Superintendent of Police (DySP), Commercial Tax Officer.", applyLink: "https://kpsc.kar.nic.in/" },
            { name: "Assistant Engineer (AE)", description: "Technical leadership roles in various engineering departments.", applyLink: "https://kpsc.kar.nic.in/" }
        ]
    },
    {
        group: 'B',
        title: "Group B (Gazetted & Non-Gazetted)",
        description: "Supervisory and technical roles that support Group A officers.",
        exams: [
            { name: "First Division Assistant (FDA)", description: "Higher-level clerical and assistant roles in state secretariats and offices.", applyLink: "https://kpsc.kar.nic.in/" },
            { name: "Junior Engineer (JE)", description: "Technical roles supporting Assistant Engineers in various departments.", applyLink: "https://kpsc.kar.nic.in/" }
        ]
    },
    {
        group: 'C',
        title: "Group C (Non-Gazetted)",
        description: "Includes a wide range of technical and non-technical support roles.",
        exams: [
            { name: "Second Division Assistant (SDA)", description: "Entry-level clerical roles in various government departments.", applyLink: "https://kpsc.kar.nic.in/" },
            { name: "Junior Health Inspector", description: "Field-level roles in the state's health department.", applyLink: "https://kpsc.kar.nic.in/" }
        ]
    },
    {
        group: 'D',
        title: "Group D (Support Staff)",
        description: "Basic support and operational roles within government offices. (Recruitment often at the district level).",
        exams: [
            { name: "Peon, Attender, etc.", description: "General support roles in various state government offices.", applyLink: "https://kpsc.kar.nic.in/" }
        ]
    }
];

const bankingExamGroups: ExamGroup[] = [
    {
        group: 'A',
        title: "Officer Scale / Managerial",
        description: "Leadership and specialist roles in banking operations.",
        exams: [
            { name: "IBPS PO / SBI PO", description: "Probationary Officers, the entry point for management roles in Public Sector Banks.", applyLink: "https://www.ibps.in/" },
            { name: "RBI Grade B Officer", description: "A prestigious role for managing functions within the Reserve Bank of India.", applyLink: "https://www.rbi.org.in/" },
            { name: "IBPS SO / SBI SO", description: "Specialist Officers in fields like IT, Law, Marketing, HR, and Agriculture.", applyLink: "https://www.ibps.in/" }
        ]
    },
    {
        group: 'B',
        title: "Clerical / Assistant",
        description: "Frontline and customer-facing roles that are the backbone of bank branches.",
        exams: [
            { name: "IBPS Clerk / SBI Clerk", description: "Handles customer interactions, cash transactions, and back-office work.", applyLink: "https://www.ibps.in/" },
            { name: "RBI Assistant", description: "Supports various departments within the Reserve Bank of India.", applyLink: "https://www.rbi.org.in/" }
        ]
    },
     {
        group: 'C',
        title: "Regional Rural Banks (RRB)",
        description: "Roles specific to RRBs, focusing on banking services in rural areas.",
        exams: [
            { name: "IBPS RRB Officer (Scale I, II, III)", description: "Managerial roles in Regional Rural Banks.", applyLink: "https://www.ibps.in/" },
            { name: "IBPS RRB Office Assistant", description: "Clerical and assistant roles in Regional Rural Banks.", applyLink: "https://www.ibps.in/" }
        ]
    },
    {
        group: 'D',
        title: "Support Staff (Sub-staff)",
        description: "Non-clerical support roles within bank branches.",
        exams: [
            { name: "Bank Peon / Attendant", description: "General office support, often filled through local recruitment.", applyLink: "https://www.ibps.in/" }
        ]
    }
];

const examCategories: { title: string; data: ExamGroup[], resourceLink: string, resourceDescription: string }[] = [
    { title: "UPSC", data: upscExamGroups, resourceLink: "https://drive.google.com/file/d/1Qqs7aKx5UGDYO-hbmkPvKOGJVDAnDyMX/view?usp=drive_link", resourceDescription: "Download our comprehensive guide for UPSC exams, including syllabus, preparation strategies, and recommended books." },
    { title: "MPSC", data: mpscExamGroups, resourceLink: "https://drive.google.com/file/d/1KKa3exIbmIgmPTmOly8qGdJOPaqs-elO/view?usp=drive_link", resourceDescription: "Get the complete resource guide for MPSC exams, covering all groups and essential preparation materials." },
    { title: "KPSC", data: kpscExamGroups, resourceLink: "https://drive.google.com/file/d/11wrgBSUsaHhJbuJx02NGEw5Brg9vlw5Z/view?usp=drive_link", resourceDescription: "Access the ultimate guide for KPSC exams, with detailed information on syllabus, exam patterns, and tips." },
    { title: "Banking Exams", data: bankingExamGroups, resourceLink: "https://drive.google.com/file/d/1CZw2AyRLzPETldsfMJKekTXMReCz8Iwj/view?usp=drive_link", resourceDescription: "Download your guide to all major banking exams, including IBPS, SBI, and RBI, with solved papers and strategies." },
];

const ExamContent = ({ examGroups }: { examGroups: ExamGroup[] }) => (
    <Accordion type="multiple" className="w-full space-y-4" defaultValue={['A']}>
        {examGroups.map(group => (
            <AccordionItem key={group.group} value={group.group} className="border rounded-lg p-0 bg-card/50 transition-colors hover:bg-card/90">
                <AccordionTrigger className="px-6 py-4 hover:no-underline [&[data-state=open]]:border-b">
                    <div className="flex items-center text-xl font-semibold">
                        <span className="mr-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{group.group}</span>
                        {group.title}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 space-y-6">
                    <p className="text-base text-muted-foreground">{group.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {group.exams.map(exam => (
                            <Card key={exam.name} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg text-foreground">
                                        {exam.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground">{exam.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full font-semibold" variant="outline">
                                        <Link href={exam.applyLink} target="_blank" rel="noopener noreferrer">
                                            Official Site
                                            <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

export default function GovernmentExamsPage() {
    const { assessmentData } = useAssessment();
    const isBasicUser = assessmentData.plan === 'Basic';

    if (isBasicUser) {
        return (
            <div className="w-full max-w-6xl mx-auto space-y-12 text-center">
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
                    <Lock className="h-16 w-16 text-primary mb-4" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Content Locked</h1>
                    <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                        The Government Exams guide is a premium feature. Upgrade your plan to access detailed exam information and downloadable resources.
                    </p>
                    <Button asChild variant="premium" size="lg">
                        <Link href="/upgrade">Upgrade Now</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <Landmark className="h-10 w-10 text-accent" />
                    Government Exams Guide
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Explore government job opportunities categorized by group. Find exam details, job roles, and links to apply.
                </p>
            </div>
            
            <Card className="bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-primary flex-shrink-0"/>
                        Government Exams Resources
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Download our comprehensive guide for government exams, including syllabus, preparation strategies, and more.</p>
                </CardContent>
                <CardFooter>
                     <Button asChild className="w-full sm:w-auto font-semibold">
                        <Link href="https://drive.google.com/file/d/1IcGLQC4MrhUG5z24-Wa47xMVvjEfY2-b/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download General Guide
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <Tabs defaultValue="UPSC" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                    {examCategories.map((category) => (
                         <TabsTrigger key={category.title} value={category.title}>{category.title}</TabsTrigger>
                    ))}
                </TabsList>
                {examCategories.map((category) => (
                    <TabsContent key={category.title} value={category.title} className="mt-8">
                        <Card className="bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow mb-8">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0"/>
                                    {category.title} Exam Resources
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{category.resourceDescription}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full sm:w-auto font-semibold">
                                    <Link href={category.resourceLink} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download {category.title} Guide
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <ExamContent examGroups={category.data} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
