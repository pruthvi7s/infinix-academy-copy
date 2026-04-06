
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, Globe, User, MessageSquare } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAssessment } from '@/context/AssessmentContext';
import { saveMessageAction } from '@/actions/messageActions';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export default function ContactPage() {
    const { assessmentData } = useAssessment();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    useEffect(() => {
        if (assessmentData.name && assessmentData.email) {
            setFormData(prev => ({
                ...prev,
                name: assessmentData.name,
                email: assessmentData.email,
            }));
        }
    }, [assessmentData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await saveMessageAction(formData);

        if (result.success) {
            toast({
                title: "Message Sent!",
                description: "Thank you for contacting us. We'll get back to you shortly.",
            });
            setFormData(prev => ({ ...prev, message: '' }));
        } else {
             toast({
                title: "Error Sending Message",
                description: result.message,
                variant: "destructive",
            });
        }
        setIsSubmitting(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <Mail className="h-10 w-10 text-accent" />
                    Contact Us
                </h1>
                <p className="text-lg text-muted-foreground mt-3">
                    We'd love to hear from you. Reach out with any questions or feedback.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                    <Card className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">Get in Touch</CardTitle>
                            <CardDescription>
                                You can reach us through any of the following channels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-lg">
                             <a href="mailto:infinixacademy7@gmail.com" className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-primary/10">
                                <Mail className="h-6 w-6 text-accent flex-shrink-0" />
                                <span className="font-medium text-foreground hover:text-primary">infinixacademy7@gmail.com</span>
                            </a>
                             <a href="tel:6360236070" className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-primary/10">
                                <Phone className="h-6 w-6 text-accent flex-shrink-0" />
                                <span className="font-medium text-foreground hover:text-primary">6360236070</span>
                            </a>
                             <Link href="https://www.infinixacademy.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-primary/10">
                                <Globe className="h-6 w-6 text-accent flex-shrink-0" />
                                <span className="font-medium text-foreground hover:text-primary">www.infinixacademy.in</span>
                            </Link>
                             <Link href="https://www.instagram.com/infinixacademy.in?igsh=YmppNXlpOHhmb21k" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-primary/10">
                                <InstagramIcon className="h-6 w-6 text-accent flex-shrink-0" />
                                <span className="font-medium text-foreground hover:text-primary">Follow us on Instagram</span>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div>
                     <Card className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">Send us a Message</CardTitle>
                             <CardDescription>
                                Fill out the form below and we'll respond as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4"/>Your Name</Label>
                                    <Input id="name" type="text" placeholder="John Doe" required value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center"><Mail className="mr-2 h-4 w-4"/>Your Email</Label>
                                    <Input id="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleInputChange} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="message" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4"/>Your Message</Label>
                                    <Textarea id="message" placeholder="How can we help you?" required className="min-h-[120px]" value={formData.message} onChange={handleInputChange} />
                                </div>
                                <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting}>
                                    {isSubmitting ? <LoadingSpinner /> : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
