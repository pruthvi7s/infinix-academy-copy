
"use client";

import { useEffect, useState } from "react";
import { deleteMessageAction, type Message } from "@/actions/messageActions";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from 'date-fns';
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAssessment } from "@/context/AssessmentContext";
import AdminReloginForm from "./AdminReloginForm";

export default function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isUserLoading, clearAssessment } = useAssessment();

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const messagesCollection = collection(db, 'messages');
        const q = query(messagesCollection, orderBy('createdAt', 'desc'));
        const messageSnapshot = await getDocs(q);

        const messageList = messageSnapshot.docs.map(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();
            
            return {
                id: doc.id,
                name: data.name,
                email: data.email,
                message: data.message,
                createdAt: createdAt,
            } as Message;
        });
        setMessages(messageList);
    } catch (err: any) {
        console.error("Error fetching messages:", err);
        const errorMessage = err.code === 'permission-denied' 
            ? "Permission Denied. Ensure you are logged in as an admin and Firestore security rules are correctly configured."
            : err.message || "An unknown error occurred.";
        setError(errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    // Wait until Firebase auth state and user data are resolved before fetching.
    if (!isUserLoading) {
        fetchMessages();
    }
  }, [isUserLoading]);

  const handleDeleteMessage = async (messageId: string) => {
    const result = await deleteMessageAction(messageId);
    if (result.success) {
      toast({
        title: "Message Deleted",
        description: result.message,
      });
      fetchMessages(); // Refresh the list
    } else {
      toast({
        title: "Deletion Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };
  
  const handleReloginSuccess = () => {
    toast({ title: "Re-Login Successful", description: "Retrying data fetch..." });
    window.location.reload();
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Message Center</CardTitle>
        <CardDescription className="text-lg mt-1">
          Viewing {messages.length} user message(s).
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading || isUserLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner size={48} />
          </div>
        ) : error ? (
            error.includes("Permission Denied") ? (
                <AdminReloginForm onReloginSuccess={handleReloginSuccess} />
            ) : (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error Fetching Messages</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Card className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No Messages Yet</h3>
            <p>When users send messages via the contact form, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className="bg-card/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      <CardDescription>
                        <a href={`mailto:${message.email}`} className="hover:underline">{message.email}</a>
                      </CardDescription>
                    </div>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete this message from <span className="font-bold">{message.name}</span>. This action cannot be undone.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteMessage(message.id)}>
                                Yes, delete
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </CardContent>
                 <CardContent className="text-xs text-muted-foreground pt-4 text-right">
                    Sent {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    

    