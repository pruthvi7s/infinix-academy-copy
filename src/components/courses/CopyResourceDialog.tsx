
"use client";

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CopyResourceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resourceText: string;
}

export default function CopyResourceDialog({ isOpen, onOpenChange, resourceText }: CopyResourceDialogProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    // Reset copy state when dialog is closed or resource text changes
    if (!isOpen) {
      setTimeout(() => setHasCopied(false), 200);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
       toast({
        title: "Copy Not Supported",
        description: "Your browser does not support the Clipboard API. Please copy the text manually.",
        variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(resourceText);
      setHasCopied(true);
      toast({
        title: "Copied to Clipboard!",
        description: "You can now paste this in the chat agent.",
      });
      setTimeout(() => setHasCopied(false), 2500); // Reset icon after 2.5 seconds
    } catch (err) {
      toast({
        title: "Failed to Copy",
        description: "Could not copy text. Please try again or copy it manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Get Your Course Resources</AlertDialogTitle>
          <AlertDialogDescription>
            To get the PDF for this course, copy the text below and paste it into the AI chat agent found at the bottom-right of your screen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative flex items-center">
            <Input 
                value={resourceText}
                readOnly
                className="pr-12"
            />
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 h-8 w-8 text-muted-foreground"
                onClick={handleCopy}
            >
                {hasCopied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                <span className="sr-only">Copy to clipboard</span>
            </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
