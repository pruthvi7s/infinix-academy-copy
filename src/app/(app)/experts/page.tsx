
"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import placeholderImages from "@/app/lib/placeholder-images.json";

const teamMembers = [
    {
        name: "Pruthvi P",
        role: "Founder & CEO",
        avatar: "https://i.postimg.cc/Jz2tbqk8/Profile-PIC.png",
        bio: "Visionary leader with a passion for empowering students through technology and personalized education."
    },
    {
        name: "Dr. Tasneem Taj",
        role: "PhD in Organic Chemistry, Senior Scientific Analyst",
        avatar: "https://i.postimg.cc/65xx715q/taj-mam.jpg",
        bio: "Senior Scientific Analyst at Molecular Connections, specializing in scientific research and data analysis."
    },
    {
      name: "Dr. Omkar Koshti",
      role: "PhD Biology, Teacher, Researcher",
      avatar: "https://i.postimg.cc/vH0x89GQ/omkar-da.jpg",
      bio: "Research and teaching professional at Devchand College, specializing in Biology."
    },
    {
      name: "Dr. Saurabh Vairat",
      role: "PhD Physics, Teacher, Researcher",
      avatar: "https://i.postimg.cc/8CdL7cT5/f83ed4fa-1c0a-4a16-b555-48174d1cb6f5.png",
      bio: "Research and teaching professional at Ranichannama University, Belgaum, specializing in Physics."
    },
    {
      name: "Pr. Ranjit pandit",
      role: "NET Teacher, Inorganic chemistry",
      avatar: "https://i.postimg.cc/W4LNsbFn/ranji-sir.jpg",
      bio: "Scientific Research Industry"
    },
    {
      name: "Bhushan Patil",
      role: "Entrepreneur (Flownotions PVT LTD), Mechanical Eng, Writer",
      avatar: "https://i.postimg.cc/6Q0DF9dH/bhushan-da.jpg",
      bio: "An entrepreneur and writer with a background in Mechanical Engineering, focusing on innovation and business."
    },
    {
      name: "Pr. Pundlik Nagnoor",
      role: "SET, Research Analyst",
      avatar: "https://i.postimg.cc/7Y1hbzDk/Gemini-Generated-Image-ukr0v9ukr0v9ukr0.png",
      bio: "Research Analyst at Molecular Connections with a SET qualification."
    },
    {
        name: "Abhay Shinde",
        role: "CS Engineer",
        avatar: "https://i.postimg.cc/90qZwQb7/abhay.jpg",
        bio: "Experienced Computer Science Engineer, having worked with top companies like TCS (for Jaguar Land Rover) and Global Logic."
    },
    {
        name: "Atul Chougule",
        role: "Mechanical Engineer (Tester)",
        avatar: "https://i.postimg.cc/cH3frJXw/atul.jpg",
        bio: "Specializing in mechanical testing and quality assurance at DXC Technology."
    },
    {
        name: "Shreedhar Badigar",
        role: "Metallurgy Engineer",
        avatar: "https://i.postimg.cc/fRryK0f5/shreedhar.jpg",
        bio: "Expert in metallurgy with experience at leading manufacturing firms like Kirloskar and ITC."
    },
    {
        name: "Amarjit Patil",
        role: "Entrepreneur, Finolex Trader",
        avatar: "https://i.postimg.cc/h4s5L9xH/amarjit.png",
        bio: "Successful entrepreneur and trader associated with the Finolex group."
    },
    {
        name: "Vishal Mokashi",
        role: "Full-Stack Developer",
        avatar: "https://i.postimg.cc/pT6y05vX/Gemini-Generated-Image-higt57higt57higt.png",
        bio: "Skilled in creating web apps and websites with expertise across the full development stack."
    },
    {
        name: "Suresh Patil",
        role: "MSc Mathematics, Gold Medalist",
        avatar: placeholderImages.maleAvatar.src,
        bio: "Principal at Dharwad University and author of engineering books."
    },
    {
        name: "Sanjanna Khannukar",
        role: "BCA, Backend Data Management",
        avatar: "https://i.postimg.cc/y8n87bJh/sanjanna-ori.png",
        bio: "Specializing in backend data management at Accenture."
    },
    {
        name: "Samarjeet Patil",
        role: "Marketing, Web App Developer, Freelancer",
        avatar: "https://i.postimg.cc/m2hpgc6Y/samjio.jpg",
        bio: "Marketing and advertisement specialist at Hive, and a freelancer in website and web app development."
    },
    {
        name: "Atish Chougule",
        role: "Sales Manager, IDBI Bank",
        avatar: placeholderImages.maleAvatar.src,
        bio: "Experienced Sales Manager at IDBI Bank, skilled in financial products and client relations."
    },
    {
        name: "Ranjit patil",
        role: "MPSC Forensic Scientist",
        avatar: placeholderImages.maleAvatar.src,
        bio: "A dedicated forensic scientist, qualified through the Maharashtra Public Service Commission, with expertise in scientific investigation."
    },
    {
        name: "Prashant Patil",
        role: "MBA, Businessman MRF showroom",
        avatar: "https://i.postimg.cc/28gg7kBt/prashant-da.jpg",
        bio: "An MBA graduate and accomplished businessman, currently managing an MRF showroom."
    }
];

export default function ExpertsPage() {
    return (
        <div className="w-full max-w-6xl mx-auto space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
                    <Users className="h-10 w-10 text-accent" />
                    Our Career Experts
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Meet the dedicated team of professionals and educators behind CareerCraft.
                </p>
            </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                    <Card key={member.name} className="flex flex-col items-center text-center p-4 bg-card/80 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-glow">
                        <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-primary mb-4">
                            <AvatarImage src={member.avatar} alt={member.name} className="object-cover object-top" />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                        <p className="text-sm md:text-md font-semibold text-primary">{member.role}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-2 flex-grow">{member.bio}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
