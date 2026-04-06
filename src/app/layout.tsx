
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AssessmentProvider } from '@/context/AssessmentContext';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import ErrorBoundary from "@/components/ui/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: 'Infinix Academy',
    template: '%s | Infinix Academy',
  },
  description: 'Infinix Academy offers personalized career guidance, AI-driven assessments (Holland, MBTI), and a library of courses in tech, finance, and life skills to help students craft their future.',
  keywords: ['Infinix Academy', 'career guidance', 'online courses', 'student assessment', 'Holland test', 'MBTI test', 'career roadmap'],
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#4285F4" />
      </head>
      <body className="font-body antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AssessmentProvider>
              {children}
              <Toaster />
            </AssessmentProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
