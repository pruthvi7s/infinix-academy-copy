
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAssessment } from "@/context/AssessmentContext";
import type { AssessmentFormData } from "@/context/AssessmentContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, FileText, Trash2, Search, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "../ui/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { updateStudentDataAction } from "@/actions/studentActions";
import AdminReloginForm from "./AdminReloginForm";


type StudentRecord = AssessmentFormData & {
  id: string;
  createdAt: string;
};

type SortKey = keyof Pick<StudentRecord, 'name' | 'email' | 'createdAt' | 'phone'>;

export default function StudentDataTable() {
  const { setAssessmentData, setIsAdminView, isUserLoading, clearAssessment } = useAssessment();
  const router = useRouter();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'ascending' | 'descending' }>({ key: 'createdAt', direction: 'descending' });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
      setIsLoadingData(true);
      setError(null);
      try {
          const studentsCollection = collection(db, "students");
          const studentSnapshot = await getDocs(studentsCollection);
          
          const studentList = studentSnapshot.docs
              .map(doc => ({
                  id: doc.id,
                  ...doc.data()
              })) as StudentRecord[];
          
          const sortedStudents = studentList.sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return dateB - dateA;
          });

          setStudents(sortedStudents);
      } catch (err: any) {
           if (err.code === 'permission-denied') {
              setError("Permission Denied. Ensure you are logged in as an admin and Firestore security rules are correctly configured.");
           } else {
              const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
              setError(errorMessage);
           }
      } finally {
          setIsLoadingData(false);
      }
  };

  useEffect(() => {
    if (!isUserLoading) {
        fetchStudents();
    }
  }, [isUserLoading]);
  
  const handleReloginSuccess = () => {
    toast({ title: "Re-Login Successful", description: "Retrying data fetch..." });
    window.location.reload();
  };
  
  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    try {
        const studentDocRef = doc(db, "students", studentId);
        await deleteDoc(studentDocRef);
        
        toast({
            title: "Student Deleted",
            description: `The record for ${studentName} has been successfully deleted.`,
        });
        
        // Refetch the student list to update the UI
        fetchStudents();
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        toast({
            title: "Deletion Failed",
            description: `Could not delete student: ${errorMessage}. Your security rules should allow this.`,
            variant: "destructive",
        });
    }
  };

  const handleViewResults = (student: StudentRecord) => {
    if (!student.careerSuggestions && !student.hollandCode && !student.mbtiType && !student.skills) {
        toast({
            title: "No Results Available",
            description: "This student has not completed any assessments yet.",
            variant: "destructive"
        });
        return;
    }
    setIsAdminView(true);
    setAssessmentData(student);
    router.push('/results');
  };
  
  const handleChangePlan = async (studentId: string, studentName: string, newPlan: 'Basic' | 'Standard' | 'Premium') => {
      const result = await updateStudentDataAction({ id: studentId, plan: newPlan });
      
      if (result.success) {
          toast({
              title: "Plan Updated!",
              description: `${studentName}'s plan has been changed to ${newPlan}.`,
          });
          // Update local state to reflect the change immediately
          setStudents(prevStudents => 
              prevStudents.map(s => 
                  s.id === studentId ? { ...s, plan: newPlan } : s
              )
          );
      } else {
          toast({
              title: "Update Failed",
              description: result.message,
              variant: "destructive",
          });
      }
  };

  const filteredAndSortedStudents = useMemo(() => {
    let filteredItems = students;
    if (searchQuery) {
        filteredItems = students.filter(student =>
            (student.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (student.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
        );
    }
    
    let sortableItems = [...filteredItems];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [students, sortConfig, searchQuery]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  return (
      <Card className="w-full mx-auto">
        <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-3xl font-headline text-primary">Student Records</CardTitle>
                    <CardDescription className="text-lg mt-1">
                        Viewing {filteredAndSortedStudents.length} of {students.length} student record(s).
                    </CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          {isUserLoading || isLoadingData ? (
             <div className="flex justify-center items-center min-h-[300px]">
                <LoadingSpinner size={48} />
             </div>
           ) : error ? (
                error.includes("Permission Denied") ? (
                     <AdminReloginForm onReloginSuccess={handleReloginSuccess} />
                ) : (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error Fetching Data</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )
           ) : (
            <div className="border rounded-lg">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-12 text-center px-2">No.</TableHead>
                    <TableHead className="px-2">
                        <Button variant="ghost" onClick={() => requestSort('name')}>
                        Name <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead className="px-2">
                        <Button variant="ghost" onClick={() => requestSort('email')}>
                        Email <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead className="px-2">
                        <Button variant="ghost" onClick={() => requestSort('phone')}>
                        Phone <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead className="px-2">Plan</TableHead>
                    <TableHead className="px-2">
                        <Button variant="ghost" onClick={() => requestSort('createdAt')}>
                        Sub On <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead className="text-center px-2">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedStudents.length > 0 ? filteredAndSortedStudents.map((student, index) => (
                    <TableRow key={student.id}>
                        <TableCell className="text-center font-medium text-muted-foreground px-2">{index + 1}</TableCell>
                        <TableCell className="font-medium px-2">{student.name}</TableCell>
                        <TableCell className="px-2">{student.email}</TableCell>
                        <TableCell className="px-2">{student.phone}</TableCell>
                        <TableCell className="px-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-auto p-1">
                                        <Badge variant={student.plan === 'Premium' ? 'premium' : student.plan === 'Standard' ? 'default' : 'secondary'}>
                                            {student.plan || 'Basic'}
                                        </Badge>
                                        <ChevronDown className="h-4 w-4 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Change Plan</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleChangePlan(student.id, student.name, 'Basic')}>Basic</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleChangePlan(student.id, student.name, 'Standard')}>Standard</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleChangePlan(student.id, student.name, 'Premium')}>Premium</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                        <TableCell className="px-2">{student.createdAt ? new Date(student.createdAt).toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' }) : 'N/A'}</TableCell>
                        <TableCell className="text-right px-2">
                            <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewResults(student)}>
                                    <FileText className="mr-2 h-4 w-4"/>
                                    Results
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the student record for <span className="font-bold">{student.name}</span> from the database. It will NOT delete their authentication account.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteStudent(student.id, student.name)}>
                                            Yes, delete student
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                    )) : (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                           {searchQuery ? "No students match your search." : "No students have signed up yet."}
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
           )}
        </CardContent>
      </Card>
  );
}

    

    