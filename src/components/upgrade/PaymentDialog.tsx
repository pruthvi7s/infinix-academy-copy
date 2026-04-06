
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import Image from "next/image";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAssessment } from "@/context/AssessmentContext";
import { createPaymentRequestAction } from "@/actions/paymentActions";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import placeholderImages from "@/app/lib/placeholder-images.json";

interface Plan {
    name: string;
    price: string;
}

interface PaymentDialogProps {
  plan: Plan | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentDialog({ plan, isOpen, onOpenChange }: PaymentDialogProps) {
  const { assessmentData } = useAssessment();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!plan) return null;

  const handlePaymentDone = async () => {
    if (!assessmentData.id || !assessmentData.name || !assessmentData.email) {
       toast({
        title: "Error",
        description: "You must be logged in to submit a payment request.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    const result = await createPaymentRequestAction({
      userId: assessmentData.id,
      userName: assessmentData.name,
      userEmail: assessmentData.email,
      planName: plan.name,
      planPrice: plan.price,
    });
    
    if (result.success) {
      onOpenChange(false);
      toast({
          title: "Payment Request Submitted",
          description: "Thank you! Our team will verify your payment and upgrade your account within 24 hours.",
      });
    } else {
       toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-headline text-primary">Pay for {plan.name} Plan</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Scan the QR code to pay <span className="font-bold text-foreground">{plan.price}</span>. After payment, click "Payment Done".
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <ScrollArea className="h-[400px] w-full p-1">
          <div className="grid grid-cols-1 gap-8 py-4">
              <div className="flex flex-col items-center space-y-2">
                  <Image src={placeholderImages.paymentQr.phonePe.src} alt={placeholderImages.paymentQr.phonePe.alt} width={250} height={250} className="rounded-lg border shadow-md" data-ai-hint={placeholderImages.paymentQr.phonePe.dataAiHint} />
                  <p className="font-semibold text-lg">Pay with PhonePe</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                  <Image src={placeholderImages.paymentQr.googlePay.src} alt={placeholderImages.paymentQr.googlePay.alt} width={250} height={250} className="rounded-lg border shadow-md" data-ai-hint={placeholderImages.paymentQr.googlePay.dataAiHint} />
                  <p className="font-semibold text-lg">Pay with Google Pay</p>
              </div>
          </div>
        </ScrollArea>

        <AlertDialogFooter className="pt-4">
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <Button onClick={handlePaymentDone} disabled={isSubmitting}>
             {isSubmitting ? <LoadingSpinner /> : "Payment Done"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
