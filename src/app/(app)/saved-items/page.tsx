
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Bookmark, Pin, Trash2 } from "lucide-react";
import { useAssessment } from "@/context/AssessmentContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export default function SavedItemsPage() {
    const { savedCourses, removeSavedCourse } = useAssessment();

    const handleRemove = (course: {id: string; title: string}) => {
        removeSavedCourse(course.id);
        toast({ title: "Removed", description: `"${course.title}" removed from saved items.` });
    }

    return (
        <div className="flex flex-col items-center">
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary flex items-center">
                        <Bookmark className="mr-3 h-9 w-9 text-accent" />
                        Saved Items
                    </CardTitle>
                    <CardDescription className="text-lg pt-2">
                        Here are the courses you've pinned for later.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {savedCourses && savedCourses.length > 0 ? (
                        savedCourses.map(course => (
                            <Card key={course.id} className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                                <CardHeader>
                                    <CardTitle className="text-xl">{course.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video w-full">
                                        <iframe
                                            className="w-full h-full rounded-lg"
                                            src={course.url}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="ghost" size="icon" onClick={() => handleRemove(course)} className="ml-auto">
                                        <Trash2 className="h-6 w-6 text-destructive" />
                                        <span className="sr-only">Remove course</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Bookmark className="mx-auto h-12 w-12 mb-4" />
                            <h3 className="text-xl font-semibold text-foreground">No Saved Items Yet</h3>
                            <p>You haven't pinned any courses.</p>
                            <Button asChild variant="link" className="mt-2">
                                <Link href="/courses">Browse Courses</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
