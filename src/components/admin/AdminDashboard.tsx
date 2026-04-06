
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentDataTable from "./StudentDataTable";
import MessageCenter from "./MessageCenter";
import PaymentDashboard from "./PaymentDashboard";

export default function AdminDashboard() {
  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
      </TabsList>
      <TabsContent value="students" className="mt-4">
        <StudentDataTable />
      </TabsContent>
      <TabsContent value="messages" className="mt-4">
        <MessageCenter />
      </TabsContent>
      <TabsContent value="payments" className="mt-4">
        <PaymentDashboard />
      </TabsContent>
    </Tabs>
  );
}

    