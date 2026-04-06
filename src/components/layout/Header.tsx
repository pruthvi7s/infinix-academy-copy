
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Video, Trophy, Shield, Bookmark, HelpCircle, LogOut, ChevronLeft, ChevronRight, Phone, Mail, Flame, Crown, Gem, Download, MessageSquare, Building, BrainCircuit, GraduationCap, Book, Bot, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAssessment } from '@/context/AssessmentContext';
import { studentLogoutAction } from '@/actions/authActions';
import placeholderImages from '@/app/lib/placeholder-images.json';


const UserCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
);


export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { assessmentData, clearAssessment, isProUser, setIsProUser, levelInfo } = useAssessment();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const handleBeforeInstallPrompt = (event: Event) => {
        event.preventDefault();
        setInstallPrompt(event);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed' }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  const handleLogout = async () => {
    await studentLogoutAction();
    clearAssessment();
    router.replace('/login');
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-shadow duration-200",
      hasScrolled ? "shadow-md bg-background/80 backdrop-blur" : "bg-transparent"
    )}>
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
          <Image src={placeholderImages.infinixLogo.src} alt={placeholderImages.infinixLogo.alt} width={32} height={32} className="rounded-md" data-ai-hint={placeholderImages.infinixLogo.dataAiHint} />
          <h1 className="text-2xl font-headline font-semibold">Infinix Academy</h1>
        </Link>
        <div className="flex items-center space-x-1">
            {assessmentData.plan !== 'Premium' && (
                <Button asChild variant="premium" className="animate-pulse-glow hidden sm:flex">
                    <Link href="/upgrade">
                        <Flame className="mr-2 h-5 w-5"/>
                        Upgrade
                    </Link>
                </Button>
            )}
            <Button size="icon" className="text-foreground/70 hover:text-foreground transition-colors bg-transparent hover:bg-transparent" onClick={() => router.back()}>
                <ChevronLeft className="h-6 w-6" />
             </Button>
             <Button size="icon" className="text-foreground/70 hover:text-foreground transition-colors bg-transparent hover:bg-transparent" onClick={() => router.forward()}>
                <ChevronRight className="h-6 w-6" />
             </Button>
            
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button size="icon" className="rounded-full font-normal text-foreground/70 hover:text-foreground transition-colors bg-transparent hover:bg-transparent">
                    <UserCircle className="h-7 w-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <p className="font-bold flex items-center gap-2">
                      {assessmentData?.name || "Guest User"}
                      {assessmentData.plan === 'Premium' && <Crown className="h-5 w-5 text-yellow-400" style={{ filter: "drop-shadow(0 0 2px #facc15)"}} />}
                    </p>
                    <p className="text-xs text-muted-foreground font-normal">{assessmentData?.email || "Not logged in"}</p>
                </DropdownMenuLabel>
                 <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                   <div className="flex items-center justify-between w-full">
                     <div className="flex items-center">
                       <Gem className="mr-2 h-4 w-4 text-accent" />
                       <span>XP</span>
                     </div>
                     <span className="font-bold text-primary">{assessmentData?.experiencePoints || 0}</span>
                   </div>
                 </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <Trophy className="mr-2 h-4 w-4 text-accent" />
                            <span>Level</span>
                        </div>
                        <span className="font-bold text-primary">{levelInfo.currentLevel}</span>
                    </div>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/home" passHref>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                   <Link href="/courses" passHref>
                      <Video className="mr-2 h-4 w-4" />
                      <span>Video Courses</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/achievements" passHref>
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>My Achievements</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/leaderboard" passHref>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Leaderboard</span>
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/saved-items" passHref>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Saved Items</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/contact" passHref>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Contact Us</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                    <Link href="/about" passHref>
                        <Building className="mr-2 h-4 w-4" />
                        <span>About Us</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                     <Link href="/upgrade" passHref>
                        <Flame className="mr-2 h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-orange-500">Upgrade Plan</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {installPrompt && (
                    <>
                        <DropdownMenuItem onClick={handleInstallClick}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Install App</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                 <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
