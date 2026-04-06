"use client";

import { studentLogoutAction } from '@/actions/authActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useAssessment } from '@/context/AssessmentContext';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clearAssessment } = useAssessment();
  const pathname = usePathname();
  
  const handleLogout = async (redirectTo: string) => {
    await studentLogoutAction();
    clearAssessment(); 
    window.location.href = redirectTo; 
  };
  
  return (
      <div className="min-h-screen bg-muted/40">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
            <Link href="/admin/dashboard" className="text-2xl font-headline font-bold text-primary">
                Admin Panel
            </Link>
            {pathname !== '/admin/login' && (
              <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                      <Link href="/login">
                          <LogIn className="mr-2 h-4 w-4" />
                          Student Login
                      </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleLogout('/admin/login')}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                  </Button>
              </div>
            )}
        </header>
        <main className="p-4 sm:p-6 md:p-8">
            {children}
        </main>
      </div>
  );
}
