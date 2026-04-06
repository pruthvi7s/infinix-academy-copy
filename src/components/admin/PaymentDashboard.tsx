
"use client";

import { useEffect, useState } from "react";
import { approvePaymentRequestAction, type PaymentRequest } from "@/actions/paymentActions";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistanceToNow } from 'date-fns';
import { Badge } from "../ui/badge";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAssessment } from "@/context/AssessmentContext";
import AdminReloginForm from "./AdminReloginForm";


export default function PaymentDashboard() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isUserLoading, clearAssessment } = useAssessment();

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const requestsCollection = collection(db, 'paymentRequests');
        const q = query(requestsCollection, orderBy('createdAt', 'desc'));
        const requestSnapshot = await getDocs(q);

        const requestList = requestSnapshot.docs.map(doc => {
            const data = doc.data();
            const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString();
            const approvedAt = data.approvedAt?.toDate ? data.approvedAt.toDate().toISOString() : undefined;
            
            return {
                id: doc.id,
                userId: data.userId,
                userName: data.userName,
                userEmail: data.userEmail,
                planName: data.planName,
                planPrice: data.planPrice,
                status: data.status,
                createdAt: createdAt,
                approvedAt: approvedAt,
            } as PaymentRequest;
        });

      setRequests(requestList);
    } catch (err: any) {
        console.error("Error fetching payment requests:", err);
        const errorMessage = err.code === 'permission-denied'
            ? "Permission Denied. Ensure you are logged in as an admin and Firestore security rules are correctly configured."
            : err.message || "An unknown error occurred.";
        setError(errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isUserLoading) {
        fetchRequests();
    }
  }, [isUserLoading]);

  const handleApprove = async (request: PaymentRequest) => {
    if (request.planName !== 'Standard' && request.planName !== 'Premium') {
        toast({ title: "Invalid Plan", description: "Cannot approve an unknown plan type.", variant: "destructive" });
        return;
    }
    
    const result = await approvePaymentRequestAction(request.id, request.userId, request.planName);
    
    if (result.success) {
        toast({
            title: "Request Approved!",
            description: result.message,
        });
        fetchRequests(); 
    } else {
        toast({
            title: "Approval Failed",
            description: result.message,
            variant: "destructive",
        });
    }
  };
  
  const handleReloginSuccess = () => {
    toast({ title: "Re-Login Successful", description: "Retrying data fetch..." });
    window.location.reload();
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Payment Requests</CardTitle>
        <CardDescription className="text-lg mt-1">
          Approve or review user payment submissions.
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
                    <AlertTitle>Error Fetching Requests</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )
        ) : (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Pending ({pendingRequests.length})</h2>
              {pendingRequests.length === 0 ? (
                <p className="text-muted-foreground">No pending payment requests.</p>
              ) : (
                <div className="space-y-4">
                    {pendingRequests.map(req => (
                        <Card key={req.id} className="bg-card/50">
                            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                                <div className="md:col-span-3 space-y-1">
                                    <p><span className="font-bold">{req.userName}</span> (<a href={`mailto:${req.userEmail}`} className="text-primary hover:underline">{req.userEmail}</a>)</p>
                                    <p className="text-sm">Requested <span className="font-semibold">{req.planName}</span> plan for <span className="font-semibold">{req.planPrice}</span></p>
                                    <p className="text-xs text-muted-foreground">Submitted {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}</p>
                                </div>
                                <Button onClick={() => handleApprove(req)} size="sm">
                                    <CheckCircle className="mr-2 h-4 w-4"/>
                                    Approve
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Processed ({processedRequests.length})</h2>
               {processedRequests.length === 0 ? (
                <p className="text-muted-foreground">No processed requests yet.</p>
              ) : (
                <div className="space-y-4">
                    {processedRequests.map(req => (
                        <Card key={req.id} className="bg-muted/30">
                            <CardContent className="p-4 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p><span className="font-bold">{req.userName}</span> (<span className="text-muted-foreground">{req.userEmail}</span>)</p>
                                    <p className="text-sm text-muted-foreground">Requested <span className="font-semibold">{req.planName}</span> plan for <span className="font-semibold">{req.planPrice}</span></p>
                                    <p className="text-xs text-muted-foreground">Submitted {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}</p>
                                </div>
                                 <Badge variant={req.status === 'approved' ? 'default' : "destructive"} className="text-sm">
                                     {req.status}
                                 </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    

    