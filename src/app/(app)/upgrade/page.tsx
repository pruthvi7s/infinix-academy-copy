
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import PaymentDialog from "@/components/upgrade/PaymentDialog";
import { Badge } from "@/components/ui/badge";

const plans = [
    {
        name: "Basic",
        price: "₹0",
        originalPrice: "₹4999",
        description: "Free",
        features: [
            "Career guidance with complete road map - <span class='line-through text-muted-foreground'>₹2000</span>",
            "PDF resources - <span class='line-through text-muted-foreground'>₹2999</span>",
            "Community support",
            "7 day access",
            "Helpful Websites"
        ],
        buttonText: "Get Started",
        variant: "default" as const,
        popular: false,
        headerClass: "bg-blue-600",
        buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
        name: "Standard",
        price: "₹587",
        originalPrice: "₹21000",
        description: "one-time",
        features: [
            "Career guidance 1-1 with complete road map - <span class='line-through text-muted-foreground'>₹2000</span>",
            "Free 60 video courses - <span class='line-through text-muted-foreground'>₹3000</span>",
            "Government Exam Resources - <span class='line-through text-muted-foreground'>₹2000</span>",
            "Websites, Web App, Chat Bot Building - <span class='line-through text-muted-foreground'>₹2000</span>",
            "Scholarship and Student Loan Resources - <span class='line-through text-muted-foreground'>₹1000</span>",
            "21 AI Tools Free Master Class - <span class='line-through text-muted-foreground'>₹2000</span>",
            "Free Canva Pro (1 year) - <span class='line-through text-muted-foreground'>₹3000</span>",
            "All Helpful Websites - <span class='font-semibold text-primary'>Bonus</span>",
            "Infinix Academy Chat Tutor - <span class='line-through text-muted-foreground'>₹1000</span>",
            "500+ E-books - <span class='line-through text-muted-foreground'>₹2000</span>",
            "Job Guidance - <span class='line-through text-muted-foreground'>₹3000</span>",
            "Community Membership - <span class='font-semibold text-primary'>Bonus</span>",
            "Monthly Q and A - <span class='font-semibold text-primary'>Bonus</span>",
            "Certificate - <span class='font-semibold text-primary'>Bonus</span>"
        ],
        buttonText: "Get Started",
        variant: "default" as const,
        popular: false,
        headerClass: "bg-yellow-400",
        buttonClass: "bg-yellow-400 hover:bg-yellow-500 text-white",
    },
    {
        name: "Premium",
        price: "₹3999",
        originalPrice: "₹31000",
        description: "one-time",
        features: [
            "Everything in Standard - <span class='line-through text-muted-foreground'>₹21000</span>",
            "1-on-1 mentorship (subject Expert Guidance) - <span class='line-through text-muted-foreground'>₹3000</span>",
            "1-1 help in building websites, apps, chat bot - <span class='line-through text-muted-foreground'>₹3000</span>",
            "Weekly personalized 1-1 guidance (for 2 months) - <span class='line-through text-muted-foreground'>₹2000</span>",
            "Personalized insights & analytics - <span class='line-through text-muted-foreground'>₹1000</span>",
            "Advanced & bonus course modules - <span class='line-through text-muted-foreground'>₹1000</span>",
            "Real-world project labs - <span class='font-semibold text-primary'>Bonus</span>"
        ],
        buttonText: "Get Started",
        variant: "default" as const,
        popular: false,
        headerClass: "bg-purple-600",
        buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
    }
];

type Plan = typeof plans[0];

export default function UpgradePage() {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const handleGetStarted = (plan: Plan) => {
        if (plan.name === 'Basic') {
            // Potentially redirect to signup or a free feature page
            window.location.href = '/signup';
        } else {
            setSelectedPlan(plan);
        }
    };

    return (
        <>
            <PaymentDialog
                plan={selectedPlan}
                isOpen={!!selectedPlan}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setSelectedPlan(null);
                    }
                }}
            />
            <div className="flex flex-col items-center space-y-12">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
                        Choose Your Plan
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
                        Select the plan that best fits your learning goals and unlock your potential.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto items-stretch px-4">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={cn(
                                "flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-glow rounded-lg overflow-hidden",
                                plan.popular && "border-2 border-primary shadow-lg"
                            )}
                        >
                            <CardHeader className={cn("text-center text-white p-4", plan.headerClass)}>
                                <CardTitle className="text-xl font-bold uppercase tracking-wider">
                                    {plan.name}
                                </CardTitle>
                            </CardHeader>
                            <div className="flex flex-col flex-grow bg-card">
                                <CardContent className="text-center py-6">
                                     {plan.originalPrice ? (
                                        <div className="flex flex-col items-center">
                                            {plan.name === 'Basic' && <Badge variant="secondary" className="mb-2 text-lg">Free</Badge>}
                                            <p className="text-5xl font-bold text-foreground">{plan.price}</p>
                                            <p className="text-xl text-muted-foreground line-through">{plan.originalPrice}</p>
                                        </div>
                                     ) : (
                                         <>
                                            <p className="text-5xl font-bold text-foreground">{plan.price}</p>
                                            <CardDescription className="text-lg text-muted-foreground mt-1">{plan.description}</CardDescription>
                                         </>
                                     )}
                                </CardContent>
                                <CardContent className="flex-grow space-y-4 pt-0 text-left">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                                                <span className="text-foreground" dangerouslySetInnerHTML={{ __html: feature }}></span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                 <div className="p-6 mt-auto">
                                    <Button 
                                        size="lg" 
                                        className={cn("w-full font-bold animate-pulse-glow", plan.buttonClass)}
                                        onClick={() => handleGetStarted(plan)}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
