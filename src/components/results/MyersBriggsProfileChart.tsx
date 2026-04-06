
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MBTIScores } from "@/context/AssessmentContext";
import React from "react";

interface MyersBriggsProfileChartProps {
  scores: MBTIScores;
}

const dichotomies = [
    { name: 'Energy', pair: ['I', 'E'], labels: ['Introversion', 'Extraversion'] },
    { name: 'Information', pair: ['S', 'N'], labels: ['Sensing', 'Intuition'] },
    { name: 'Decision', pair: ['T', 'F'], labels: ['Thinking', 'Feeling'] },
    { name: 'Lifestyle', pair: ['J', 'P'], labels: ['Judging', 'Perceiving'] },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-card border rounded-lg shadow-lg text-sm">
          <p className="font-bold text-primary mb-1">{label}</p>
          {payload.map((pld: any) => (
             <p key={pld.dataKey} style={{ color: pld.fill }}>{`${pld.name}: ${pld.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
    const data = dichotomies.find(d => d.name === payload.value);
    if (!data) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill="hsl(var(--foreground))" className="font-semibold text-sm">
                {data.name}
            </text>
            <text x={0} y={0} dy={32} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-xs">
                <tspan x="0" fill="hsl(var(--chart-1))" className="font-medium">{data.labels[0]}</tspan>
            </text>
             <text x={0} y={0} dy={46} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-xs">
                <tspan x="0" fill="hsl(var(--chart-2))" className="font-medium">{data.labels[1]}</tspan>
            </text>
        </g>
    );
};


export default function MyersBriggsProfileChart({ scores }: MyersBriggsProfileChartProps) {
  const chartData = dichotomies.map(d => ({
    name: d.name,
    [d.labels[0]]: scores[d.pair[0] as keyof MBTIScores],
    [d.labels[1]]: scores[d.pair[1] as keyof MBTIScores],
  }));

  return (
    <Card className="bg-card/50 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Your Myers-Briggs Profile</CardTitle>
        <CardDescription>This chart visualizes your scores in each of the four Myers-Briggs dichotomies.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={chartData} 
            margin={{ top: 5, right: 10, left: -10, bottom: 40 }} // Increased bottom margin for custom tick
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} interval={0} tick={<CustomXAxisTick />} />
            <YAxis type="number" domain={[0, 3]} ticks={[0, 1, 2, 3]} stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--card), 0.5)' }} />

            <Bar dataKey="Introversion" name="Introversion" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Extraversion" name="Extraversion" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Sensing" name="Sensing" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Intuition" name="Intuition" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Thinking" name="Thinking" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Feeling" name="Feeling" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Judging" name="Judging" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="Perceiving" name="Perceiving" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
