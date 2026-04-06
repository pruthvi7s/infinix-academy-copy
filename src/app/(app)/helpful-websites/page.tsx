"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const helpfulWebsites = [
    {
        title: "CollegeDunia",
        description: "India's largest college discovery platform. Find colleges, courses, and exam information.",
        link: "https://collegedunia.com/",
    },
    {
        title: "AglaSem",
        description: "A student guidance portal for admissions, results, and study materials for various exams.",
        link: "https://www.aglasem.com/",
    },
    {
        title: "National Digital Library of India",
        description: "A virtual repository of learning resources with a single-window search facility.",
        link: "https://ndl.iitkgp.ac.in/",
    },
    {
        title: "LightPDF",
        description: "A free online PDF editor to edit, convert, and sign PDF files.",
        link: "https://lightpdf.com/",
    },
    {
        title: "Lingohut",
        description: "Learn over 45 languages for free with vocabulary lessons and games.",
        link: "https://www.lingohut.com/",
    },
    {
        title: "Plan Your Room",
        description: "A free online 3D room planner for interior design and decorating.",
        link: "https://www.planyourroom.com/",
    },
    {
        title: "Brilliant",
        description: "Build quantitative skills in math, science, and computer science with fun and challenging interactive explorations.",
        link: "https://brilliant.org/",
    },
    {
        title: "DoublePrep",
        description: "An AI-powered platform for practicing job interviews and getting instant feedback.",
        link: "https://doubleprep.com/",
        badge: "Paid"
    },
    {
        title: "Mockers.in",
        description: "An online platform for mock tests to prepare for various competitive exams.",
        link: "https://www.mockers.in/",
    },
    {
        title: "Magnet Brains",
        description: "Provides free educational videos and courses for school students from KG to Class 12.",
        link: "https://www.magnetbrains.com/",
    },
    {
        title: "Taiyari 24 Hour",
        description: "A resource for government job news, exam preparation, and current affairs.",
        link: "https://taiyari24hour.com/",
    },
    {
        title: "Mind the Graph",
        description: "Create scientific infographics, presentations and graphical abstracts.",
        link: "https://mindthegraph.com/",
    },
    {
        title: "Speak & Improve",
        description: "An AI-powered platform from Cambridge to practice and improve your spoken English.",
        link: "https://speakandimprove.com/",
    },
    {
        title: "Monkeytype",
        description: "A minimalist, customizable typing test. Improve your typing speed and accuracy.",
        link: "https://monkeytype.com/",
    },
    {
        title: "Internet Archive",
        description: "A non-profit library of millions of free books, movies, software, music, websites, and more.",
        link: "https://archive.org/",
    },
    {
        title: "Chemical Equation Balancer",
        description: "An online tool to balance chemical equations quickly and accurately.",
        link: "https://chemequations.com/",
    },
    {
        title: "Human BioDigital",
        description: "Explore the human body in 3D. A great resource for biology and medical students.",
        link: "https://human.biodigital.com/",
    },
    {
        title: "Falstad",
        description: "A collection of interactive applets for physics, math, and engineering.",
        link: "https://www.falstad.com/",
    },
    {
        title: "WebElements Periodic Table",
        description: "An award-winning periodic table of the elements with detailed information for each element.",
        link: "https://www.webelements.com/",
    },
    {
        title: "Biology Online",
        description: "A comprehensive database and dictionary of biology terms, tutorials, and articles.",
        link: "https://www.biologyonline.com/",
    },
    {
        title: "GeoGebra",
        description: "A free online math tool for graphing, geometry, algebra, calculus, and more.",
        link: "https://www.geogebra.org/",
    },
    {
        title: "myphysicslab",
        description: "A collection of interactive physics simulations.",
        link: "https://www.myphysicslab.com/",
    },
    {
        title: "AccountingCoach",
        description: "Learn accounting for free. A comprehensive resource for accounting principles, bookkeeping, and financial statements.",
        link: "https://www.accountingcoach.com/",
    },
    {
        title: "PYQ Online",
        description: "Find previous year question papers for various exams to help with your preparation.",
        link: "https://www.pyqonline.com/",
    },
    {
        title: "Examsnet",
        description: "Practice free online mock tests for competitive exams.",
        link: "https://examsnet.com/",
    },
    {
        title: "ChemCollective",
        description: "A collection of virtual labs, scenario-based learning activities, and concepts tests for chemistry.",
        link: "https://chemcollective.org/",
    },
    {
        title: "BioMan Bio",
        description: "Interactive biology games, virtual labs, and quizzes to make learning fun.",
        link: "https://biomanbio.com/",
    },
    {
        title: "PhET Interactive Simulations",
        description: "Free interactive math and science simulations from the University of Colorado Boulder.",
        link: "https://phet.colorado.edu/",
    },
    {
        title: "PlayGeography",
        description: "Learn geography with fun and interactive map games.",
        link: "https://www.playgeography.com/",
    },
    {
        title: "Free4Talk",
        description: "Practice your English speaking skills for free with other learners and AI.",
        link: "https://www.free4talk.com/",
    },
    {
        title: "Osmosis",
        description: "A medical & health education platform with videos, questions, and flashcards.",
        link: "https://www.osmosis.org/",
    }
];

export default function HelpfulWebsitesPage() {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-16">
            <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-12 flex items-center justify-center">
                    <ExternalLink className="h-9 w-9 mr-4" />
                    Helpful Websites
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {helpfulWebsites.map((website) => (
                        <Card key={website.title} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl text-foreground flex items-center justify-between">
                                    {website.title}
                                    {website.badge && (
                                        <Badge variant="secondary" className="text-xs">{website.badge}</Badge>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{website.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                                    <a href={website.link} target="_blank" rel="noopener noreferrer">
                                        Visit Site
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
