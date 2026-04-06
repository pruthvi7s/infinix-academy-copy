
"use client";

import { useAssessment } from "@/context/AssessmentContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, HelpCircle, Lock, CheckCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import placeholderImages from "@/app/lib/placeholder-images.json";

const MOCK_MEMBER_PERCENTAGES = {
    1: "95%",
    2: "2%",
    3: "1%",
    4: "1%",
    5: "0%",
    6: "0%",
    7: "1%",
    8: "0%",
    9: "0%",
    10: "0%",
}

const { maleAvatar, femaleAvatar, defaultUserAvatar } = placeholderImages;
const availableAvatars = [maleAvatar.src, femaleAvatar.src, defaultUserAvatar.src];

export default function LeaderboardPage() {
    const { assessmentData, levelInfo, updateAssessmentData } = useAssessment();
    const { name, experiencePoints, avatarUrl } = assessmentData;
    const { currentLevel, pointsForNextLevel, progressPercentage } = levelInfo;
    
    const handleAvatarChange = () => {
        const currentIndex = availableAvatars.indexOf(avatarUrl || defaultUserAvatar.src);
        const nextIndex = (currentIndex + 1) % availableAvatars.length;
        updateAssessmentData({ avatarUrl: availableAvatars[nextIndex] });
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-12 flex items-center justify-center gap-3">
                    <Trophy className="h-10 w-10" />
                    Leaderboard
                </h1>

                <Card className="bg-card/80 p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* User Profile Section */}
                        <div className="md:col-span-1 flex flex-col items-center text-center space-y-4 py-8 px-4 bg-background/50 rounded-lg">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-primary shadow-glow">
                                    <AvatarImage src={avatarUrl} alt={name} data-ai-hint="user avatar" />
                                    <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleAvatarChange}
                                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <RotateCw className="h-4 w-4"/>
                                    <span className="sr-only">Change Avatar</span>
                                </Button>
                                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg border-2 border-background">
                                    {currentLevel}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">{name}</h2>
                                <p className="text-lg text-muted-foreground">Level {currentLevel}</p>
                                <p className="text-lg font-semibold text-primary">Points: {experiencePoints}</p>
                            </div>
                            <div className="w-full pt-2">
                                <Progress value={progressPercentage} className="h-2.5" />
                                <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                                    <span>Progress</span>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center cursor-help">
                                                    <span>{pointsForNextLevel} points to level up</span>
                                                    <HelpCircle className="h-4 w-4 ml-1.5" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Complete more lessons to earn points and level up!</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </div>

                        {/* Levels Grid Section */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-6">
                            {Object.entries(MOCK_MEMBER_PERCENTAGES).map(([levelStr, percentage]) => {
                                const level = parseInt(levelStr, 10);
                                const isUnlocked = level <= currentLevel;
                                const Icon = isUnlocked ? CheckCircle : Lock;

                                return (
                                     <div key={level} className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 ${isUnlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                            {isUnlocked ? level : <Lock className="h-6 w-6"/>}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Level {level}</h3>
                                            <p className="text-sm text-muted-foreground">{percentage} of members</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
