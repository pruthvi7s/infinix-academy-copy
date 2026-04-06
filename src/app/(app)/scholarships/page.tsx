
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, ArrowUpRight, Building, Globe, School, Landmark, Download, BookOpen, Lock } from "lucide-react";
import Link from "next/link";
import { useAssessment } from "@/context/AssessmentContext";

type Scholarship = {
  title: string;
  description: string;
  provider: string;
  link: string;
};

const nationalScholarships: Scholarship[] = [
  {
    title: "National Talent Search Examination (NTSE)",
    description: "A prestigious scholarship program to identify and nurture talented students for higher studies in science, social science, medicine, and engineering.",
    provider: "NCERT, Government of India",
    link: "https://scholarships.gov.in/"
  },
  {
    title: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    description: "A fellowship program to encourage students to take up research careers in Basic Sciences, Engineering and Medicine. (Now subsumed under INSPIRE).",
    provider: "Department of Science and Technology",
    link: "https://www.online-inspire.gov.in/"
  },
  {
    title: "Prime Minister's Research Fellowship (PMRF)",
    description: "Aimed at attracting the best talent into research thereby realizing the vision of development through innovation.",
    provider: "Ministry of Education",
    link: "https://pmrf.in/"
  },
  {
    title: "Central Sector Scheme of Scholarship for College and University Students",
    description: "Financial support to meritorious students from low-income families to meet day-to-day expenses while pursuing higher studies.",
    provider: "Department of Higher Education",
    link: "https://scholarships.gov.in/"
  },
];

const stateScholarships: Scholarship[] = [
  {
    title: "Karnataka State Scholarship Portal (SSP)",
    description: "A portal for various pre-metric and post-metric scholarships offered by the Government of Karnataka.",
    provider: "Government of Karnataka",
    link: "https://ssp.postmatric.karnataka.gov.in/"
  },
  {
    title: "MYSY Scholarship, Gujarat",
    description: "Mukhyamantri Yuva Swavalamban Yojana offers financial assistance to meritorious and needy students for higher education.",
    provider: "Government of Gujarat",
    link: "https://mysy.guj.nic.in/"
  },
  {
    title: "E-Grantz, Kerala",
    description: "An online portal for students of SC, ST, and other eligible communities to apply for educational assistance.",
    provider: "Government of Kerala",
    link: "https://www.egrantz.kerala.gov.in/"
  },
  {
    title: "Swami Vivekananda Merit Cum Means Scholarship, West Bengal",
    description: "A merit-cum-means based scholarship for economically backward and meritorious students of West Bengal.",
    provider: "Government of West Bengal",
    link: "https://svmcm.wbhed.gov.in/"
  },
];

const privateScholarships: Scholarship[] = [
  {
    title: "Tata Trusts Scholarship",
    description: "Merit-based scholarships for students pursuing higher education in various fields like medicine, engineering, and arts.",
    provider: "Tata Trusts",
    link: "https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants"
  },
  {
    title: "Reliance Foundation Scholarships",
    description: "Scholarships for undergraduate and postgraduate students to pursue education in any subject of their choice.",
    provider: "Reliance Foundation",
    link: "https://www.reliancefoundation.org/education/scholarships"
  },
  {
    title: "HDFC Bank Educational Crisis Scholarship",
    description: "Support for students who are at a risk of dropping out due to a personal or family crisis.",
    provider: "HDFC Bank",
    link: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecs-scholarship"
  },
  {
    title: "Aditya Birla Capital Scholarship",
    description: "Scholarships for school and college students to cover academic expenses and reduce the dropout rate.",
    provider: "Aditya Birla Capital Foundation",
    link: "https://www.adityabirlacapital.com/sustainability/our-initiatives-and-impact"
  },
   {
    title: "Keep India Smiling Foundational Scholarship",
    description: "A scholarship program by Colgate-Palmolive (India) Ltd. to provide financial aid to students for their education.",
    provider: "Colgate-Palmolive (India) Ltd.",
    link: "https://www.colgate.com/en-in/smile-karo-aur-shuru-ho-jao/keep-india-smiling-scholarship"
  },
];

const governmentScholarships: Scholarship[] = [
  {
    title: "Prime Minister's Scholarship Scheme (PMSS)",
    description: "Scholarships for dependent wards of Ex-servicemen/Ex-Coast Guard personnel pursuing professional degree courses.",
    provider: "Ministry of Home Affairs",
    link: "https://scholarships.gov.in/"
  },
  {
    title: "Post-Matric Scholarship for Minorities",
    description: "Financial assistance to meritorious students from minority communities for studies in India.",
    provider: "Ministry of Minority Affairs",
    link: "https://scholarships.gov.in/"
  },
   {
    title: "Saksham Scholarship Scheme (AICTE)",
    description: "Provides financial support to specially-abled students to pursue technical education.",
    provider: "All India Council for Technical Education",
    link: "https://www.aicte-india.org/schemes/students-development-schemes"
  },
  {
    title: "Pragati Scholarship for Girls (AICTE)",
    description: "Empowering young women through technical education with financial assistance.",
    provider: "All India Council for Technical Education",
    link: "https://www.aicte-india.org/schemes/students-development-schemes"
  },
];

const scholarshipCategories = [
    { title: "National", icon: Globe, data: nationalScholarships },
    { title: "State", icon: Landmark, data: stateScholarships },
    { title: "Private", icon: Building, data: privateScholarships },
    { title: "Government", icon: School, data: governmentScholarships },
];

const resourceGuides = [
    {
        title: "Scholarship General Guide",
        description: "A comprehensive guide to understanding scholarships, including eligibility, documentation, and application processes.",
        link: "https://drive.google.com/file/d/1st0ZCGDdaeVIoPQU2z-TLbTLYDr-Kh_H/view?usp=drive_link"
    },
    {
        title: "National Scholarship Guide",
        description: "A detailed guide focusing on major national-level scholarships available across India.",
        link: "https://drive.google.com/file/d/12CQl55P_3n971JcSXs9xw9fV47Gvr2WJ/view?usp=drive_link"
    },
    {
        title: "Karnataka Scholarship Guide",
        description: "Specific information and resources for scholarships available to students in Karnataka.",
        link: "https://drive.google.com/file/d/1UumjhPtc7wRbg_XDeLUL8QTZno7XmBPq/view?usp=drive_link"
    },
    {
        title: "Maharashtra Scholarship Guide",
        description: "A guide dedicated to scholarships offered by the state of Maharashtra and other regional bodies.",
        link: "https://drive.google.com/file/d/1KvgYYcdGMc5xiYLCOq4maUGulYI0ho0L/view?usp=drive_link"
    },
];

export default function ScholarshipsPage() {
    const { assessmentData } = useAssessment();
    const isBasicUser = assessmentData.plan === 'Basic';

    if (isBasicUser) {
        return (
            <div className="w-full max-w-6xl mx-auto space-y-12 text-center">
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
                    <Lock className="h-16 w-16 text-primary mb-4" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Content Locked</h1>
                    <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                        The Scholarships section is a premium feature. Upgrade your plan to access detailed scholarship opportunities and guides.
                    </p>
                    <Button asChild variant="premium" size="lg">
                        <Link href="/upgrade">Upgrade Now</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <GraduationCap className="h-10 w-10 text-accent" />
                    Scholarship Opportunities
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Explore and apply for scholarships from various providers.
                </p>
            </div>
            
            <div>
                <h2 className="text-3xl font-headline font-bold text-primary mb-8 text-center">
                    Downloadable Resource Guides
                </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resourceGuides.map(guide => (
                        <Card key={guide.title} className="bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                             <CardHeader>
                                <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                    <BookOpen className="h-6 w-6 text-primary flex-shrink-0"/>
                                    {guide.title}
                                </CardTitle>
                             </CardHeader>
                             <CardContent>
                                <p className="text-sm text-muted-foreground">{guide.description}</p>
                             </CardContent>
                             <CardFooter>
                                <Button asChild className="w-full font-semibold">
                                    <Link href={guide.link} target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Guide
                                    </Link>
                                </Button>
                             </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Tabs defaultValue="National" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                    {scholarshipCategories.map(({ title }) => (
                         <TabsTrigger key={title} value={title}>{title}</TabsTrigger>
                    ))}
                </TabsList>
                {scholarshipCategories.map(({ title, icon: Icon, data }) => (
                     <TabsContent key={title} value={title} className="mt-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.map(scholarship => (
                                <Card key={scholarship.title} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-primary flex-shrink-0"/>
                                            {scholarship.title}
                                        </CardTitle>
                                        <CardDescription className="pt-2">
                                            {scholarship.provider}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                         <Button asChild className="w-full font-semibold">
                                            <Link href={scholarship.link} target="_blank" rel="noopener noreferrer">
                                                Learn More
                                                <ArrowUpRight className="ml-2 h-4 w-4" />
                                            </Link>
                                         </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                         </div>
                     </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
