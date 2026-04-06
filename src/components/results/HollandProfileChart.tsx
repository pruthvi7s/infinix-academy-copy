
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { HollandScores } from "@/context/AssessmentContext";
import { Settings, Search, Palette, Users, Briefcase, Archive } from "lucide-react";
import type { HollandCategory } from "@/components/holland-test/hollandQuestions";

interface HollandProfileChartProps {
  scores: HollandScores;
}

const categoryDetails: { [key in HollandCategory['code']]: { name: string; icon: React.ElementType } } = {
  R: { name: "Realistic", icon: Settings },
  I: { name: "Investigative", icon: Search },
  A: { name: "Artistic", icon: Palette },
  S: { name: "Social", icon: Users },
  E: { name: "Enterprising", icon: Briefcase },
  C: { name: "Conventional", icon: Archive },
};

export default function HollandProfileChart({ scores }: HollandProfileChartProps) {
  const chartData = Object.entries(scores).map(([code, value]) => ({
    name: categoryDetails[code as keyof typeof categoryDetails].name,
    value: value,
    icon: categoryDetails[code as keyof typeof categoryDetails].icon,
  }));

  const maxScore = Math.max(...chartData.map(d => d.value));

  return (
    <Card className="bg-card/50 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Your Holland Test (RIASEC) Profile</CardTitle>
        <CardDescription>This chart visualizes your scores in each of the six Holland interest categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, maxScore > 20 ? maxScore + 5 : 25]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="value" position="top" fill="hsl(var(--foreground))" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-4 mt-4 border-t border-border">
          {chartData.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex items-center text-sm text-muted-foreground">
                <Icon className="h-5 w-5 mr-2 text-accent" />
                <span className="font-medium text-foreground/90">{item.name}:</span>
                <span className="font-bold text-foreground ml-1.5">{item.value}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
