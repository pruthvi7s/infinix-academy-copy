
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Search, Video, Download, GraduationCap, Landmark, Banknote, BrainCircuit, Bot, Book, Users, FileText, Briefcase, Globe } from "lucide-react";
import Link from "next/link";
import TrendingCoursesMarquee from "@/components/courses/TrendingCoursesMarquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholderImages from "@/app/lib/placeholder-images.json";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Sneha khannukar",
      role: "Pharma Professional",
      quote: "The personalized roadmap helped me identify the exact skills I needed. The courses are practical and the instructors are top-notch!",
    },
    {
      name: "Amarjit Shinde",
      role: "Entrepreneur, Writer",
      quote: "The Career Finder tool was a game-changer. It helped me understand my personality and align it with my career goals.",
    },
    {
      name: "Sumit Patil",
      role: "Software Engineer",
      quote: "I never thought I could learn digital skills so easily. The hands-on projects made all the difference. Highly recommended!",
    },
  ];

  const howItWorksSteps = [
    {
      number: 1,
      title: "Take a quiz",
      description: "Answer a few questions about your personality, interests, and skills.",
    },
    {
      number: 2,
      title: "Explore recommendations",
      description: "Get a personalized list of career paths and courses that fit you.",
    },
    {
      number: 3,
      title: "Start learning",
      description: "Begin your journey with expert-led courses and build job-ready skills.",
    }
  ];

  const teamMembers = [
    {
        name: "Pruthvi P",
        role: "Founder & CEO",
        avatar: "https://i.postimg.cc/Jz2tbqk8/Profile-PIC.png",
        bio: "Visionary leader with a passion for empowering students through technology and personalized education."
    },
    {
        name: "Dr. Tasneem Taj",
        role: "PhD in Organic Chemistry, Senior Scientific Analyst",
        avatar: "https://i.postimg.cc/65xx715q/taj-mam.jpg",
        bio: "Senior Scientific Analyst at Molecular Connections, specializing in scientific research and data analysis."
    },
    {
      name: "Dr. Omkar Koshti",
      role: "PhD Biology, Teacher, Researcher",
      avatar: "https://i.postimg.cc/vH0x89GQ/omkar-da.jpg",
      bio: "Research and teaching professional at Devchand College, specializing in Biology."
    },
    {
      name: "Dr. Saurabh Vairat",
      role: "PhD Physics, Teacher, Researcher",
      avatar: "https://i.postimg.cc/8CdL7cT5/f83ed4fa-1c0a-4a16-b555-48174d1cb6f5.png",
      bio: "Research and teaching professional at Ranichannama University, Belgaum, specializing in Physics."
    },
    {
      name: "Pr. Ranjit pandit",
      role: "NET Teacher, Inorganic chemistry",
      avatar: "https://i.postimg.cc/W4LNsbFn/ranji-sir.jpg",
      bio: "Scientific Research Industry"
    },
    {
      name: "Bhushan Patil",
      role: "Entrepreneur (Flownotions PVT LTD), Mechanical Eng, Writer",
      avatar: "https://i.postimg.cc/6Q0DF9dH/bhushan-da.jpg",
      bio: "An entrepreneur and writer with a background in Mechanical Engineering, focusing on innovation and business."
    }
  ]

  return (
    <>
      <div className="flex flex-col items-center justify-center text-foreground">
        <main className="w-full">
          {/* Hero Section */}
          <section className="relative w-full mb-20">
            <Image
                src="https://i.postimg.cc/3JXJ3Wy8/back-ground-for-app.png"
                alt="Hero background"
                layout="responsive"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority
            />
          </section>

          <div className="px-4">
              {/* How It Works Section */}
                <div className="max-w-4xl mx-auto mb-12 px-4">
                  <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
                  <div className="relative">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-primary/20 md:left-1/2 md:-translate-x-1/2 md:w-2/3" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {howItWorksSteps.map((step) => {
                          return (
                              <div key={step.number} className="flex flex-col items-center text-center space-y-3">
                                  <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ring-8 ring-background z-10">
                                      {step.number}
                                  </div>
                                  <h3 className="font-semibold text-lg">{step.title}</h3>
                                  <p className="text-sm text-muted-foreground px-4 md:px-0">{step.description}</p>
                              </div>
                          )
                      })}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-20">
                    <Button asChild size="lg" variant="premium" className="animate-pulse-glow">
                        <Link href="/get-started">
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>

              {/* Comprehensive Approach Section */}
              <section className="mb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-7xl mx-auto">
                    <Link href="/get-started">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Search className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Career Finder
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Find the best career path for you with our Career Finder.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/courses">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Video className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Video Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Browse our library of expert-led video courses.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/helpful-websites">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Globe className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Helpful Websites
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Discover a curated list of useful online tools and resources.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/student-resources">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Download className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Student Resources
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Download helpful guides and materials.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/free-courses">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Free Professional Courses
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Discover free courses from top providers.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/scholarships">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Scholarships
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Find and apply for scholarships to fund your education.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                     <Link href="/student-resources/entrance-exams">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Entrance Exams
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    A guide covering major entrance exams for various fields.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/government-exams">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Landmark className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Govt Exams
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Explore government job opportunities and exam guides.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/education-loan">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Banknote className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Education Loan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Find the right education loan to finance your studies.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/ai-tools-for-studies">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <BrainCircuit className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    AI Study Tools
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Boost your studies with curated AI-powered tools.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="https://chatgpt.com/g/g-690a0331d2b8819199b5d9f713de66b1-infinix-academy" target="_blank" rel="noopener noreferrer">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Bot className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Infinix Academy Teacher
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Chat with our custom GPT for instant guidance.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/books">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Book className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    E-Books
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Access our library of free, insightful e-books.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <a href="https://dailyepaper.in/" target="_blank" rel="noopener noreferrer">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Daily E-Paper
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Access daily e-papers of various newspapers online.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </a>
                    <Link href="/jobs">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <Briefcase className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Job Websites
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Find job and internship opportunities.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="https://chatgpt.com/g/g-69763142c6b48191bc2d7f93709be743-infiix-academy-resume-builder" target="_blank" rel="noopener noreferrer">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Resume Builder
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Create an ATS-friendly resume with our custom GPT.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="https://chatgpt.com/g/g-698ec408521c8191afc76b253608c465-infinix-graduate-research-project-gpt" target="_blank" rel="noopener noreferrer">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow text-center">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/20 rounded-full mb-3">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">
                                    Infinix Graduate GPT
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    Your AI research and project assistant.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
              </section>
              
              <section className="mb-24">
                <TrendingCoursesMarquee />
              </section>
              
              {/* Career Experts Section */}
              <section className="mb-24">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center flex items-center justify-center gap-3">
                      <Users className="h-8 w-8 text-accent" />
                      Career Experts
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {teamMembers.map(member => (
                          <Card key={member.name} className="flex flex-col items-center text-center p-6 bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                              <Avatar className="h-28 w-28 border-4 border-primary mb-4">
                                  <AvatarImage src={member.avatar} alt={member.name} className="object-cover object-top" />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <h3 className="text-xl font-bold">{member.name}</h3>
                              <p className="text-md font-semibold text-primary">{member.role}</p>
                              <p className="text-sm text-muted-foreground mt-2 flex-grow">{member.bio}</p>
                          </Card>
                      ))}
                  </div>
                  <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/experts">
                            View All Experts <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                  </div>
              </section>

              {/* Testimonials Section */}
              <section className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                  Trusted by Students and Educators
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                  See how Infinix Academy is making a difference in career development.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {testimonials.map((testimonial: any, index) => (
                    <Card key={index} className="h-full flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                      <CardContent className="pt-6 flex-grow">
                        <div className="flex mb-2">
                        </div>
                        <blockquote className="text-foreground/90 italic">"{testimonial.quote}"</blockquote>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
          </div>
        </main>
      </div>
    </>
  );
}
