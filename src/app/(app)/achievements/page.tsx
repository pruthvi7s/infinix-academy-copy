
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/context/AssessmentContext";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { allCourses, type Course } from "@/lib/courses";
import Image from "next/image";

const getYouTubeVideoId = (url: string) => {
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            if (urlObj.pathname === '/watch') {
                return urlObj.searchParams.get('v');
            }
            if (urlObj.pathname.startsWith('/embed/')) {
                const pathParts = urlObj.pathname.split('/');
                const videoId = pathParts[2];
                // Handle cases where the embed URL has a list parameter
                if (videoId && videoId.includes('?')) {
                    return videoId.split('?')[0];
                }
                return videoId;
            }
        }
    } catch (e) {
        console.error("Invalid video URL", e);
    }
    return null;
};


export default function AchievementsPage() {
    const { completedLessons, savedCourses } = useAssessment();
    
    const coursesToShow = savedCourses
        ? savedCourses.map(savedCourse => allCourses.find(course => course.id === savedCourse.id)).filter(Boolean) as Course[]
        : [];

    const calculateProgress = (course: Course) => {
        const totalLessons = course.courseContent.reduce((acc, section) => acc + section.lessons.length, 0);
        if (totalLessons === 0) return 0;
        
        const completedCount = completedLessons[course.id]?.length || 0;
        return Math.round((completedCount / totalLessons) * 100);
    }

    return (
        <div className="flex flex-col items-center">
             <div className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                        <Trophy className="h-10 w-10 text-accent" />
                        My Achievements
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Track your progress and see how far you've come!
                    </p>
                </div>

                <Card>
                    <CardContent className="p-6 space-y-4">
                         {coursesToShow.length > 0 ? (
                            coursesToShow.map(course => {
                                const progress = calculateProgress(course);
                                const videoId = getYouTubeVideoId(course.videoUrl);
                                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : course.imageUrl;

                                return (
                                    <div key={course.id} className="flex items-center gap-4 p-4 rounded-lg bg-card/50 border border-border/50">
                                        {thumbnailUrl && (
                                            <Image 
                                                src={thumbnailUrl} 
                                                alt={course.title} 
                                                width={160} 
                                                height={90} 
                                                className="rounded-md object-cover aspect-video"
                                            />
                                        )}
                                        <div className="flex-grow space-y-2">
                                            <h3 className="font-semibold text-lg">{course.title}</h3>
                                            <div className="flex items-center gap-3">
                                                <Progress value={progress} className="h-2.5 flex-grow" />
                                                <span className="text-sm font-medium text-muted-foreground">{progress}% Complete</span>
                                            </div>
                                        </div>
                                        <Button asChild variant="outline">
                                            <Link href={course.categoryUrl}>View Course</Link>
                                        </Button>
                                    </div>
                                )
                            })
                         ) : (
                             <div className="text-center py-12 text-muted-foreground">
                                <Trophy className="mx-auto h-12 w-12 mb-4" />
                                <h3 className="text-xl font-semibold text-foreground">No Progress Yet</h3>
                                <p>Pin a course from the courses page to track your achievements here.</p>
                                <Button asChild variant="link" className="mt-2">
                                    <Link href="/courses">Browse Courses</Link>
                                </Button>
                            </div>
                         )}
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}
