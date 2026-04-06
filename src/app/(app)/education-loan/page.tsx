
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, ArrowUpRight, Building, Banknote, Download, BookOpen, Lock } from "lucide-react";
import Link from "next/link";
import { useAssessment } from "@/context/AssessmentContext";

type EducationLoan = {
  title: string;
  description: string;
  provider: string;
  link: string;
};

const publicSectorBanks: EducationLoan[] = [
  {
    title: "SBI Student Loan Scheme",
    description: "One of India's most popular choices. SBI offers a range of schemes like 'SBI Student Loan', 'SBI Scholar Loan', and 'SBI Skill Loan'. They are known for competitive interest rates, covering a wide array of courses in India and abroad, and offering specific benefits for students admitted to premier institutions.",
    provider: "State Bank of India (SBI)",
    link: "https://sbi.co.in/web/personal-banking/loans/education-loans"
  },
  {
    title: "Baroda Vidya & Gyan Loan",
    description: "Bank of Baroda provides multiple schemes. 'Baroda Vidya' is for early education (Nursery to Class 12), while 'Baroda Gyan' is for higher education in India and abroad. They offer flexible repayment options and cover tuition, exam fees, and other related expenses.",
    provider: "Bank of Baroda",
    link: "https://www.bankofbaroda.in/personal-banking/loans/education-loan"
  },
  {
    title: "PNB Udaan",
    description: "This scheme is specifically designed to provide financial support for meritorious students pursuing higher education abroad. It covers a comprehensive list of expenses and is part of the IBA Model Education Loan Scheme, ensuring standardized terms.",
    provider: "Punjab National Bank (PNB)",
    link: "https://www.pnbindia.in/pnb-udaan.html"
  },
  {
    title: "Canara Bank Education Loan",
    description: "Offers various loan products, including the 'IBA Model Education Loan Scheme' and a 'Skill Loan Scheme'. They provide loans for a wide range of professional and technical courses with options for moratorium periods and flexible repayment.",
    provider: "Canara Bank",
    link: "https://canarabank.com/personal-banking/loans/education-loan"
  },
  {
    title: "Union Education Loan",
    description: "Offers education loans for studies in India and abroad with competitive rates under their 'Union Education' scheme. Covers tuition, accommodation, and other related expenses with a moratorium period that includes the course duration plus one year.",
    provider: "Union Bank of India",
    link: "https://www.unionbankofindia.co.in/english/education-loan.aspx"
  },
  {
    title: "Bank of India Star Vidya Loan",
    description: "The 'Star Vidya Loan' scheme caters to students pursuing higher education in India and abroad. Key features include a moratorium period, flexible repayment options, and coverage for a wide range of course-related expenses.",
    provider: "Bank of India",
    link: "https://bankofindia.co.in/education-loan"
  },
  {
    title: "Central Bank of India 'Cent Vidyarthi'",
    description: "The 'Cent Vidyarthi' scheme is designed to support meritorious students for higher education in India and abroad. It offers competitive interest rates and covers tuition fees, exam fees, books, and equipment costs.",
    provider: "Central Bank of India",
    link: "https://www.centralbankofindia.co.in/en/personal-banking/loans/education-loan/cent-vidyarthi"
  },
  {
    title: "Indian Bank 'IB Vidya Jyoti'",
    description: "'IB Vidya Jyoti' is a flexible education loan scheme for students admitted to reputed professional or technical courses in India and abroad, with attractive terms and a generous moratorium period.",
    provider: "Indian Bank",
    link: "https://indianbank.in/departments/education-loan/"
  },
];

const privateSectorBanks: EducationLoan[] = [
  {
    title: "HDFC Bank Education Loan",
    description: "Known for its quick processing and customized loan solutions. HDFC Bank provides education loans for a vast number of courses in both India and over 35 countries. They offer flexible collateral requirements and tax benefits under Section 80(E).",
    provider: "HDFC Bank",
    link: "https://www.hdfcbank.com/personal/borrow/popular-loans/educational-loan"
  },
  {
    title: "ICICI Bank Education Loan",
    description: "Offers a broad spectrum of education loans, from kindergarten to post-graduation, for studies in India and overseas. They are known for their hassle-free application process, doorstep service, and coverage of a wide range of educational expenses.",
    provider: "ICICI Bank",
    link: "https://www.icicibank.com/personal-banking/loans/education-loan"
  },
  {
    title: "Axis Bank Education Loan",
    description: "Provides loans for career-oriented courses like medicine, engineering, and management at graduate and post-graduate levels. Key features include competitive interest rates, quick loan sanction, and options for loans without collateral for select amounts.",
    provider: "Axis Bank",
    link: "https://www.axisbank.com/retail/loans/education-loan/features-benefits"
  },
   {
    title: "Kotak Mahindra Bank Education Loan",
    description: "Caters to a wide range of educational needs, from primary school to university. Kotak offers a simple application process, minimal documentation, and loans that can cover tuition fees, accommodation, and other course-related expenses.",
    provider: "Kotak Mahindra Bank",
    link: "https://www.kotak.com/en/personal-banking/loans/education-loan.html"
  },
  {
    title: "IDFC First Bank Education Loan",
    description: "Offers education loans for higher studies in India and abroad, covering a wide range of courses. They focus on a fully digital process, quick sanctions, and flexible repayment options tailored to the student's needs.",
    provider: "IDFC First Bank",
    link: "https://www.idfcfirstbank.com/personal-banking/loans/education-loan"
  },
  {
    title: "Federal Bank 'Federal Vidya Loan'",
    description: "A specialized education loan scheme for studies in India and abroad. It features attractive interest rates, coverage for a comprehensive list of expenses, and a moratorium period to ease the repayment burden on students.",
    provider: "Federal Bank",
    link: "https://www.federalbank.co.in/education-loan"
  },
  {
    title: "Karur Vysya Bank 'KVB Vidya Loan'",
    description: "Provides financial assistance for higher education in India and overseas. The scheme is designed to be student-friendly, offering loans for a variety of courses with flexible terms and conditions.",
    provider: "Karur Vysya Bank (KVB)",
    link: "https://www.kvb.co.in/personal/loans/other-loans/educational-loan/"
  },
  {
    title: "South Indian Bank Education Loan",
    description: "Offers education loans for a wide range of professional and technical courses in India and abroad. The loan covers tuition, hostel fees, books, and other related expenses, with a focus on quick processing.",
    provider: "South Indian Bank",
    link: "https://www.southindianbank.com/content/education-loan"
  },
];

const nbfcs: EducationLoan[] = [
  {
    title: "Avanse Financial Services",
    description: "A student-centric NBFC offering a variety of loans, including 'Bridge Loans' for pre-admission costs and 'Score-Based Benefits'. They provide 100% financing, flexible repayment options, and loans for a wide range of new-age courses.",
    provider: "Avanse Financial Services",
    link: "https://www.avanse.com/"
  },
  {
    title: "HDFC Credila",
    description: "As India's first dedicated education loan company, HDFC Credila provides customized loan solutions, considering the student's academic record and the future earning potential of the course. They offer income tax benefits and have a long repayment tenure.",
    provider: "HDFC Credila",
    link: "https://www.hdfccredila.com/"
  },
  {
    title: "Auxilo",
    description: "A pro-education NBFC offering tailored student loan solutions for both domestic and international studies. They focus on providing loans for specialized courses and offer customized repayment plans to reduce the financial burden on students and parents.",
    provider: "Auxilo",
    link: "https://www.auxilo.com/"
  },
    {
    title: "InCred",
    description: "A modern financial services group that uses technology and data science for a quick and easy lending process. InCred offers loans for over 700 courses in more than 25 countries, with flexible terms and a focus on the student's potential.",
    provider: "InCred",
    link: "https://www.incred.com/education-loan/"
  },
  {
    title: "Leap Finance",
    description: "Specializes in providing education loans for students planning to study abroad, particularly in the US, Canada, UK, and Australia. They offer collateral-free loans with competitive interest rates based on the student's profile.",
    provider: "Leap Finance",
    link: "https://leapfinance.com/"
  },
  {
    title: "Prodigy Finance",
    description: "A UK-based fintech platform that provides collateral-free loans to international students attending top universities and business schools. Their model is based on future earning potential rather than current financial standing.",
    provider: "Prodigy Finance",
    link: "https://prodigyfinance.com/"
  },
  {
    title: "MPOWER Financing",
    description: "A US-based company providing no-collateral education loans for international students studying in the U.S. and Canada. They also offer visa support and career services, focusing on students' future potential.",
    provider: "MPOWER Financing",
    link: "https://www.mpowerfinancing.com/"
  },
  {
    title: "GyanDhan",
    description: "An education financing marketplace that helps students find the best loan options from various lenders, including banks and NBFCs. They offer assistance with loan applications and provide options for loans with and without collateral.",
    provider: "GyanDhan",
    link: "https://www.gyandhan.com/"
  },
];


const loanCategories = [
    { title: "Complete Guide", icon: BookOpen, data: [] },
    { title: "Public Sector Banks", icon: Landmark, data: publicSectorBanks },
    { title: "Private Sector Banks", icon: Building, data: privateSectorBanks },
    { title: "NBFCs", icon: Banknote, data: nbfcs },
]

export default function EducationLoanPage() {
    const { assessmentData } = useAssessment();
    const isBasicUser = assessmentData.plan === 'Basic';

    if (isBasicUser) {
        return (
            <div className="w-full max-w-6xl mx-auto space-y-12 text-center">
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
                    <Lock className="h-16 w-16 text-primary mb-4" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Content Locked</h1>
                    <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                        The Education Loans section is a premium feature. Upgrade your plan to explore loan opportunities and access our guides.
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
                    Education Loan Opportunities
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Explore and compare education loans from various financial institutions. Click 'Learn More' to visit their official sites for the latest details.
                </p>
            </div>

            <Tabs defaultValue="Complete Guide" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-auto">
                    {loanCategories.map(({ title }) => (
                         <TabsTrigger key={title} value={title}>{title}</TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="Complete Guide" className="mt-8 space-y-6">
                    <Card className="bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-primary flex-shrink-0"/>
                                Education loan complete guide (hindi+eng)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Download our comprehensive guide to understand the ins and outs of education loans, including eligibility, documentation, and repayment processes.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full font-semibold">
                                <Link href="https://drive.google.com/file/d/1KvZesE0YtwWrrwvTkryDKC3r-PrpqMQ0/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Complete Guide
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                <BookOpen className="h-6 w-6 text-primary flex-shrink-0"/>
                                Educational loan complete guide (english)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Download our English guide for a comprehensive overview of the education loan process, from application to repayment.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full font-semibold">
                                <Link href="https://drive.google.com/file/d/1q6_B6mH8lhkHfZVMtJpZRbp21IzCOM5y/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download English Guide
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                {loanCategories.slice(1).map(({ title, icon: Icon, data }) => (
                     <TabsContent key={title} value={title} className="mt-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.map(loan => (
                                <Card key={loan.title} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl text-foreground flex items-center gap-3">
                                            <Icon className="h-6 w-6 text-primary flex-shrink-0"/>
                                            {loan.title}
                                        </CardTitle>
                                        <CardDescription className="pt-2 font-semibold">
                                            Provider: {loan.provider}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground">{loan.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                         <Button asChild className="w-full font-semibold">
                                            <Link href={loan.link} target="_blank" rel="noopener noreferrer">
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
