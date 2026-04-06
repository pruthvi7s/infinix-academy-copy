
"use client";

import { useAssessment } from "@/context/AssessmentContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gem, Wrench, Lightbulb, Code, Briefcase, Building } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const projects = [
    {
        id: "startup",
        title: "Build a Startup",
        description: "Conceptualize, plan, and create a basic business plan for a new startup idea. This project tests your entrepreneurial thinking and strategic planning.",
        xp: 150,
        icon: Lightbulb
    },
    {
        id: "website",
        title: "Design a Website",
        description: "Create a wireframe and a design mockup for a personal portfolio website. This project focuses on UI/UX principles and creative design.",
        xp: 150,
        icon: Code
    },
    {
        id: "business",
        title: "Start an Online Business",
        description: "Set up a simple e-commerce or service page on a platform like Instagram or a free site builder and outline your first product or service.",
        xp: 150,
        icon: Briefcase
    },
    {
        id: "job",
        title: "Land a Job/Internship",
        description: "Successfully secure a job or internship in your field of interest. This achievement represents a major step in your professional journey.",
        xp: 200,
        icon: Building
    }
];

export default function ProjectsPage() {
    const { completedProjects, toggleProjectCompleted } = useAssessment();

    const handleCompleteProject = (projectId: string, projectTitle: string, xp: number) => {
        toggleProjectCompleted(projectId, xp);
        toast({
            title: "Project Milestone Achieved!",
            description: `Congratulations on completing "${projectTitle}"! You've earned ${xp} XP.`
        });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                        <Wrench className="h-10 w-10 text-accent" />
                        Real-World Projects
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                        Apply your skills to practical challenges. Mark projects as complete to earn significant experience points and level up faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => {
                        const isCompleted = completedProjects.includes(project.id);
                        const Icon = project.icon;

                        return (
                            <Card key={project.id} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-grow">
                                            <CardTitle className="font-headline text-2xl text-foreground flex items-center gap-3">
                                                <Icon className="h-7 w-7 text-primary"/>
                                                {project.title}
                                            </CardTitle>
                                        </div>
                                        <div className="flex items-center gap-2 font-bold text-lg text-primary">
                                            <Gem className="h-5 w-5 text-accent"/>
                                            <span>{project.xp} XP</span>
                                        </div>
                                    </div>
                                    <CardDescription className="pt-2 text-base">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow"/>
                                <CardFooter>
                                    <Button
                                        onClick={() => handleCompleteProject(project.id, project.title, project.xp)}
                                        disabled={isCompleted}
                                        className="w-full font-semibold"
                                        size="lg"
                                    >
                                        {isCompleted ? (
                                            <>
                                                <CheckCircle className="mr-2 h-5 w-5" />
                                                Milestone Achieved
                                            </>
                                        ) : (
                                            "Mark as Complete"
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
