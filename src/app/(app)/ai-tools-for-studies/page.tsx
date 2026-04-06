
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainCircuit, ArrowUpRight, Bot, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useAssessment } from '@/context/AssessmentContext';

type AITool = {
  name: string;
  description: string;
  category: 'Writing & Editing' | 'Research & Analysis' | 'Presentation & Design' | 'Video & Audio' | 'Development';
  logoUrl: string;
  toolUrl: string;
  dataAiHint: string;
  badge?: string;
};

const aiTools: AITool[] = [
  {
    name: 'ChatGPT',
    description: 'Perfect for drafting essays, brainstorming ideas, and getting coding help.',
    category: 'Writing & Editing',
    logoUrl: 'https://i.postimg.cc/Vk9vkGjL/Chat-GPT-Logo-PNG.jpg',
    toolUrl: 'https://chat.openai.com/',
    dataAiHint: 'ai assistant logo'
  },
  {
    name: 'Gemini',
    description: 'Excellent for summarizing research papers and analyzing complex data sets.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/Fs47XXSs/1dd2c9f4-b991-4437-9ef7-3a213fac3515.jpg',
    toolUrl: 'https://gemini.google.com/',
    dataAiHint: 'ai assistant logo'
  },
  {
    name: 'InVideo',
    description: 'Quickly create professional video presentations for your class projects.',
    category: 'Video & Audio',
    logoUrl: 'https://i.postimg.cc/fTH4MYPx/invideo-ai.png',
    toolUrl: 'https://invideo.io/',
    dataAiHint: 'video editor logo'
  },
  {
    name: 'Grammarly',
    description: 'Your personal proofreader for improving writing clarity and grammar.',
    category: 'Writing & Editing',
    logoUrl: 'https://i.postimg.cc/SNsHsJCr/69f359e5-1d58-4b71-a3f7-f7040c110193.jpg',
    toolUrl: 'https://www.grammarly.com/',
    dataAiHint: 'writing tool logo'
  },
  {
    name: 'Canva Magic',
    description: 'Generate stunning presentation designs and social media graphics in seconds.',
    category: 'Presentation & Design',
    logoUrl: 'https://i.postimg.cc/Qdq6JDQX/19685bc1-e87c-4a31-bc3d-3d5a6ebbe2c4.jpg',
    toolUrl: 'https://www.canva.com/magic-design/',
    dataAiHint: 'design tool logo'
  },
  {
    name: 'Figma',
    description: 'A collaborative interface design tool for creating websites, applications, and other digital products.',
    category: 'Presentation & Design',
    logoUrl: 'https://i.postimg.cc/1t6bC3Zc/figma-logo.png',
    toolUrl: 'https://www.figma.com/',
    dataAiHint: 'design tool logo'
  },
  {
    name: 'Notion AI',
    description: 'Organize your notes, manage tasks, and generate content all in one place.',
    category: 'Writing & Editing',
    logoUrl: 'https://i.postimg.cc/j2rN1wTX/b43be78f-38b5-45f8-92dd-8380f3177763.jpg',
    toolUrl: 'https://www.notion.so/product/ai',
    dataAiHint: 'productivity tool logo'
  },
    {
    name: 'Napkin AI',
    description: 'Capture and connect ideas with this tool for networked thought and generating new insights.',
    category: 'Writing & Editing',
    logoUrl: 'https://i.postimg.cc/kXhBjN98/napkin-ai.png',
    toolUrl: 'https://napkin.ai/',
    dataAiHint: 'idea tool logo'
  },
  {
    name: 'Otter.ai',
    description: 'Record and transcribe lectures or meetings in real-time, so you never miss a detail.',
    category: 'Video & Audio',
    logoUrl: 'https://i.postimg.cc/hGB1w5rW/otter-ai.png',
    toolUrl: 'https://otter.ai/',
    dataAiHint: 'transcription tool logo'
  },
  {
    name: 'Perplexity',
    description: 'An AI-powered search engine that provides direct answers with citations.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/63Knj4tY/5b55fbcd-61a8-4cfd-bb25-c0af58122207.jpg',
    toolUrl: 'https://www.perplexity.ai/',
    dataAiHint: 'search engine logo'
  },
  {
    name: 'Jotform',
    description: 'Build powerful forms, surveys, and apps with AI capabilities, no code required.',
    category: 'Development',
    logoUrl: 'https://i.postimg.cc/7Yq3vnpp/jotform-logo-dark-400x200.png',
    toolUrl: 'https://www.jotform.com/',
    dataAiHint: 'form builder logo'
  },
    {
    name: 'Firebase Studio',
    description: 'Build full-stack web apps with the help of an AI coding assistant. Great for prototypes and MVPs.',
    category: 'Development',
    logoUrl: 'https://i.postimg.cc/sf7mCX1C/firebase.png',
    toolUrl: 'https://firebase.google.com/docs/studio',
    dataAiHint: 'development tool logo'
  },
  {
    name: 'QuillBot',
    description: 'AI-powered paraphrasing tool to rewrite and enhance sentences, paragraphs, and articles.',
    category: 'Writing & Editing',
    logoUrl: 'https://i.postimg.cc/0yxHBSC4/quillbot-img.png',
    toolUrl: 'https://quillbot.com/',
    dataAiHint: 'writing tool logo'
  },
  {
    name: 'CK-12 Flexi',
    description: 'An AI tutor that provides personalized learning in STEM subjects.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/pTP75Fm0/ck-12.png',
    toolUrl: 'https://www.ck12.org/student/',
    dataAiHint: 'education tutor logo'
  },
  {
    name: 'Khanmigo',
    description: 'Your personal AI tutor for learners and a teaching assistant for teachers from Khan Academy.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/639W6Twm/Khanamigo-Logo.jpg',
    toolUrl: 'https://www.khanacademy.org/khan-labs',
    dataAiHint: 'ai tutor logo'
  },
  {
    name: 'NotebookLM',
    description: 'An AI research assistant that helps you get insights from your own sources.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/8kh2KZb7/notebook-lm-logo.jpg',
    toolUrl: 'https://notebooklm.google.com/',
    dataAiHint: 'research tool logo'
  },
  {
    name: 'Elicit',
    description: 'An AI research assistant that helps automate research workflows using language models.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/8PQYLLQP/elicit-logo.png',
    toolUrl: 'https://elicit.com/',
    dataAiHint: 'research assistant logo',
    badge: 'Paid',
  },
  {
    name: 'Semantic Scholar',
    description: 'AI-powered research tool to help you discover and understand scientific literature.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/7hVvM4Y0/semantic-scholar.png',
    toolUrl: 'https://www.semanticscholar.org/',
    dataAiHint: 'research logo'
  },
  {
    name: 'SciSpace',
    description: 'An AI-powered platform to discover, read, and understand research papers.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/yYdY0k66/scispace.png',
    toolUrl: 'https://scispace.com/',
    dataAiHint: 'research assistant logo'
  },
  {
    name: 'Paperpal',
    description: 'An AI writing assistant for academics, offering real-time language and grammar checks to improve your manuscripts.',
    category: 'Writing & Editing',
    logoUrl: 'https://i.postimg.cc/MTwwsNgG/paperpal-logo.png',
    toolUrl: 'https://paperpal.com/',
    dataAiHint: 'writing assistant logo'
  },
  {
    name: 'Wolfram Alpha',
    description: 'A computational knowledge engine for expert-level answers in Math, Science, and more.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/gcfDfpNv/wolfram-alpha-logo.png',
    toolUrl: 'https://www.wolframalpha.com/',
    dataAiHint: 'computational engine logo'
  },
  {
    name: 'Gamma AI',
    description: 'Create beautiful presentations, documents, and websites from a simple text prompt.',
    category: 'Presentation & Design',
    logoUrl: 'https://i.postimg.cc/QdnVy8qB/gamma-ai-logo.webp',
    toolUrl: 'https://gamma.app/',
    dataAiHint: 'presentation tool logo'
  },
  {
    name: 'NoteGPT',
    description: 'Summarize and take notes from any video with AI. Perfect for lectures and tutorials.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/7Yt4PvZ1/note-gpt.png',
    toolUrl: 'https://notegpt.io/',
    dataAiHint: 'note taking logo'
  },
  {
    name: 'Stitch AI',
    description: 'A quick introduction to Stitch, a tool for data integration (ETL), showing how to connect data sources and destinations.',
    category: 'Development',
    logoUrl: 'https://i.postimg.cc/kgRbQRxQ/Google-Stitch-ai-Logo.png',
    toolUrl: 'https://stitch.withgoogle.com/',
    dataAiHint: 'data integration logo'
  },
  {
    name: 'MathGPTPro',
    description: 'The #1 AI Math Problem Solver. Get step-by-step answers and explanations for any math problem.',
    category: 'Research & Analysis',
    logoUrl: 'https://i.postimg.cc/50d3n51x/math-gpt-pro.png',
    toolUrl: 'https://www.mathgptpro.com/',
    dataAiHint: 'math solver logo'
  }
];

export default function AIToolsForStudiesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const { assessmentData } = useAssessment();
  const isBasicUser = assessmentData.plan === 'Basic';

  const filteredTools = activeTab === 'All'
    ? aiTools
    : aiTools.filter(tool => tool.category === activeTab);
    
  const categories = ['All', ...Array.from(new Set(aiTools.map(t => t.category)))];

  if (isBasicUser) {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 text-center">
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
                <Lock className="h-16 w-16 text-primary mb-4" />
                <h1 className="text-3xl font-bold text-foreground mb-2">Content Locked</h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                    The AI Study Tools section is a premium feature. Upgrade your plan to discover powerful tools to enhance your learning.
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
          <BrainCircuit className="h-10 w-10 text-accent" />
          Explore AI Tools to Boost Your Studies
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
          Discover curated AI tools to help with research, writing, creating presentations, and more. Save time and enhance your work.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 h-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredTools.map((tool) => (
            <Card key={tool.name} className="flex flex-col bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
              <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="p-2 bg-muted rounded-lg">
                  <Image src={tool.logoUrl} alt={`${tool.name} logo`} width={32} height={32} data-ai-hint={tool.dataAiHint}/>
                </div>
                <div className="flex-grow">
                  <CardTitle className="font-semibold text-lg text-foreground flex items-center justify-between">
                    {tool.name}
                    {tool.badge && (
                      <Badge variant="secondary" className="text-xs">{tool.badge}</Badge>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </CardContent>
              <div className="p-4 pt-0">
                 <Button asChild className="w-full font-semibold bg-blue-500 hover:bg-blue-600 text-white">
                    <Link href={tool.toolUrl} target="_blank" rel="noopener noreferrer">
                        Access Tool
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                 </Button>
              </div>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

    
    
