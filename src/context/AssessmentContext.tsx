"use client";

import type { CareerPathSuggestionsOutput as GenAICareerPathSuggestionsOutput } from '@/ai/flows/career-path-suggestions';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { updateStudentDataAction } from '@/actions/studentActions';
import { toast } from '@/hooks/use-toast';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { usePathname } from 'next/navigation';
import placeholderImages from '@/app/lib/placeholder-images.json';


export type HollandScores = { [key in 'R' | 'I' | 'A' | 'S' | 'E' | 'C']: number };
export type MBTIScores = { [key in 'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P']: number };


// Re-exporting this from here to avoid circular dependencies
export type CareerPathSuggestionsOutput = GenAICareerPathSuggestionsOutput;
// This represents one career path object from the AI's output array.
export type CareerSuggestion = CareerPathSuggestionsOutput['careerPaths'][0];

export type SavedCourse = {
    id: string;
    title: string;
    url: string;
    imageUrl?: string;
}

export type CompletedLessons = {
    [courseId: string]: string[]; // Array of completed lesson titles
}

export type LevelInfo = {
  currentLevel: number;
  pointsInLevel: number;
  pointsToNextLevel: number;
  pointsForNextLevel: number;
  progressPercentage: number;
};


export type AssessmentFormData = {
  // Student Info
  id?: string;
  createdAt?: string;
  updatedAt?: string; // Added for tracking updates
  name: string;
  age: string;
  phone: string;
  school: string;
  email: string;
  address: string;
  education: string;
  gender?: 'male' | 'female' | 'other';
  avatarUrl?: string;
  role?: 'student' | 'admin'; // Role for security rules
  plan?: 'Basic' | 'Standard' | 'Premium';

  // Assessment data
  skills: string;
  interests: string;
  values: string;
  hollandCode?: string;
  mbtiType?: string;
  hollandScores?: HollandScores;
  mbtiScores?: MBTIScores;
  careerSuggestions?: CareerPathSuggestionsOutput;
  savedCourses: SavedCourse[];
  completedLessons: CompletedLessons;
  experiencePoints: number;
  isProUser: boolean;
  completedProjects: string[];
};

type RoadmapDataStore = {
  [careerTitle: string]: {
    roadmap?: string;
    isLoading: boolean;
    error?: string | null;
  };
};

interface AssessmentContextType {
  assessmentData: AssessmentFormData;
  updateAssessmentData: (newData: Partial<AssessmentFormData>) => void;
  careerSuggestions: CareerPathSuggestionsOutput | null;
  setCareerSuggestions: (suggestions: CareerPathSuggestionsOutput | null) => void;
  isLoadingSuggestions: boolean;
  setIsLoadingSuggestions: (loading: boolean) => void;
  errorSuggestions: string | null;
  setErrorSuggestions: (error: string | null) => void;
  
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;

  isProUser: boolean;

  isAdmin: boolean;
  isAuthLoading: boolean;
  isUserLoading: boolean;

  roadmaps: RoadmapDataStore;
  getRoadmapState: (careerTitle: string) => RoadmapDataStore[string];
  setRoadmapLoading: (careerTitle: string, isLoading: boolean) => void;
  setRoadmapSuccess: (careerTitle: string, roadmap: string) => void;
  setRoadmapError: (careerTitle: string, error: string) => void;

  savedCourses: SavedCourse[];
  addSavedCourse: (course: SavedCourse) => void;
  removeSavedCourse: (courseId: string) => void;

  completedLessons: CompletedLessons;
  toggleLessonCompleted: (courseId: string, lessonTitle: string) => void;
  completeAllLessons: (courseId: string, lessonTitles: string[]) => void;
  
  completedProjects: string[];
  toggleProjectCompleted: (projectId: string, xp: number) => void;

  levelInfo: LevelInfo;

  clearAssessment: () => void;
  setAssessmentData: (data: Partial<AssessmentFormData>) => void;
}

const defaultAssessmentData: AssessmentFormData = {
  name: "",
  age: "",
  phone: "",
  school: "",
  email: "",
  address: "",
  education: "",
  gender: undefined,
  role: "student",
  plan: "Basic",
  avatarUrl: placeholderImages.defaultUserAvatar.src,
  skills: "",
  interests: "",
  values: "",
  savedCourses: [],
  completedLessons: {},
  experiencePoints: 0,
  isProUser: false,
  completedProjects: [],
};


const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [assessmentData, setAssessmentDataState] = useState<AssessmentFormData>(defaultAssessmentData);
  const [careerSuggestions, setCareerSuggestions] = useState<CareerPathSuggestionsOutput | null>(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [errorSuggestions, setErrorSuggestions] = useState<string | null>(null);
  const [roadmaps, setRoadmaps] = useState<RoadmapDataStore>({});
  const [isAdminView, setIsAdminView] = useState(false);
  
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const pathname = usePathname();
  
  const isAdmin = useMemo(() => assessmentData?.role === 'admin', [assessmentData]);
  
  const isProUser = useMemo(() => {
    return !!(assessmentData.isProUser || assessmentData.plan === 'Premium' || assessmentData.plan === 'Standard');
  }, [assessmentData]);


  const clearAssessment = useCallback(() => {
    // Keep user's core info but reset assessment-related fields
    setAssessmentDataState(prev => ({
        ...defaultAssessmentData, // Start with defaults
        id: prev.id, // Keep ID
        name: prev.name,
        email: prev.email,
        phone: prev.phone,
        age: prev.age,
        address: prev.address,
        education: prev.education,
        school: prev.school,
        gender: prev.gender,
        avatarUrl: prev.avatarUrl,
        role: prev.role,
        plan: prev.plan,
        experiencePoints: prev.experiencePoints,
        savedCourses: prev.savedCourses,
        completedLessons: prev.completedLessons,
        completedProjects: prev.completedProjects,
        isProUser: prev.isProUser
        // Omit skills, interests, values, hollandCode, mbtiType, scores, and careerSuggestions
    }));
    setCareerSuggestions(null);
    setIsLoadingSuggestions(true);
    setErrorSuggestions(null);
    setRoadmaps({});
    setIsAdminView(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setIsAuthLoading(true);
      setIsUserLoading(true);

      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          const role = userDoc.exists() && userDoc.data().role === 'admin' ? 'admin' : 'student';

          let userData: Partial<AssessmentFormData> = {
            id: user.uid,
            email: user.email!,
            role: role,
          };
          
          if (role === 'student') {
              const studentDocRef = doc(db, 'students', user.uid);
              const studentDoc = await getDoc(studentDocRef);
              if (studentDoc.exists()) {
                  const studentData = studentDoc.data() as AssessmentFormData;
                  userData = { ...defaultAssessmentData, ...studentData, ...userData, role: 'student' };
              }
          } else if (role === 'admin') {
              // This is the key fix: ensure admin role is explicitly set in the state
              userData.name = user.email!; 
              userData.role = 'admin';
          }
          
          setAssessmentDataState(userData as AssessmentFormData);
          
          if (userData.careerSuggestions) {
            setCareerSuggestions(userData.careerSuggestions);
          } else {
            setCareerSuggestions(null);
          }
        } catch (e) {
            console.error("Error fetching user data:", e);
            // If fetching fails, treat as logged out
            setAssessmentDataState(defaultAssessmentData);
            setCareerSuggestions(null);
        }
      } else {
        // No user, reset to default state
        setAssessmentDataState(defaultAssessmentData);
        setCareerSuggestions(null);
        setIsAdminView(false);
      }
      setIsAuthLoading(false);
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const setAssessmentData = (data: Partial<AssessmentFormData>) => {
    // This function is for direct, non-persisted state updates (e.g., admin view, login)
    setAssessmentDataState(prev => ({ ...prev, ...data }));
  };

  const updateAndPersistData = useCallback(async (newData: Partial<AssessmentFormData>) => {
    // Optimistically update local state for immediate UI feedback
    const updatedData = { ...assessmentData, ...newData };
    setAssessmentDataState(updatedData);
    
    // Asynchronously save to Firestore if it's a user action (not admin view)
    if (updatedData.id && !isAdminView) {
        const result = await updateStudentDataAction({ id: updatedData.id, ...newData });
        if (!result.success) {
            toast({
                title: "Sync Error",
                description: "Could not save your progress to the server. Your changes are saved locally for now.",
                variant: "destructive",
            });
        }
    }
  }, [assessmentData, isAdminView]);

  const updateAssessmentData = (newData: Partial<AssessmentFormData>) => {
    updateAndPersistData(newData);
  };


  const addSavedCourse = (course: SavedCourse) => {
    const updatedCourses = [...(assessmentData.savedCourses || []), course];
    updateAssessmentData({ savedCourses: updatedCourses });
  };

  const removeSavedCourse = (courseId: string) => {
    const updatedCourses = (assessmentData.savedCourses || []).filter(c => c.id !== courseId);
    updateAssessmentData({ savedCourses: updatedCourses });
  };

  const toggleLessonCompleted = (courseId: string, lessonTitle: string) => {
    const completedLessons = assessmentData.completedLessons || {};
    const currentCompletedForCourse = completedLessons[courseId] || [];
    const isCompleted = currentCompletedForCourse.includes(lessonTitle);
    
    const updatedLessonsForCourse = isCompleted
      ? currentCompletedForCourse.filter(title => title !== lessonTitle)
      : [...currentCompletedForCourse, lessonTitle];
      
    const currentPoints = assessmentData.experiencePoints || 0;
    // Award 10 points for completing, take away 10 for un-completing
    const updatedPoints = isCompleted ? currentPoints - 10 : currentPoints + 10;

    const newCompletedLessons = {
        ...completedLessons,
        [courseId]: updatedLessonsForCourse
    };

    updateAssessmentData({ 
      completedLessons: newCompletedLessons,
      experiencePoints: Math.max(0, updatedPoints) // Ensure points don't go below zero
    });
  };
  
  const completeAllLessons = (courseId: string, allLessonTitles: string[]) => {
    const completedLessons = assessmentData.completedLessons || {};
    const currentCompletedForCourse = completedLessons[courseId] || [];
    const newLessonsToComplete = allLessonTitles.filter(title => !currentCompletedForCourse.includes(title));

    if (newLessonsToComplete.length === 0) {
      // All lessons are already complete, do nothing.
      return;
    }

    const pointsToAdd = newLessonsToComplete.length * 10;
    const currentPoints = assessmentData.experiencePoints || 0;
    const updatedPoints = currentPoints + pointsToAdd;

    const newCompletedLessons = {
      ...completedLessons,
      [courseId]: allLessonTitles,
    };
    
    updateAssessmentData({
      completedLessons: newCompletedLessons,
      experiencePoints: updatedPoints,
    });
  };
  
  const toggleProjectCompleted = (projectId: string, xp: number) => {
    const completedProjects = assessmentData.completedProjects || [];
    const isCompleted = completedProjects.includes(projectId);
    const updatedProjects = isCompleted
      ? completedProjects.filter(id => id !== projectId)
      : [...completedProjects, projectId];
      
    const currentPoints = assessmentData.experiencePoints || 0;
    const updatedPoints = isCompleted ? currentPoints - xp : currentPoints + xp;

    updateAssessmentData({
      completedProjects: updatedProjects,
      experiencePoints: Math.max(0, updatedPoints)
    });
  };
  
  const getLevelInfo = (xp: number = 0): LevelInfo => {
    const pointsPerLevel = 100; // Let's make levels a bit more meaningful
    const currentLevel = Math.floor(xp / pointsPerLevel) + 1;
    const pointsForCurrentLevel = (currentLevel - 1) * pointsPerLevel;
    const pointsInLevel = xp - pointsForCurrentLevel;
    const pointsToNextLevel = pointsPerLevel;
    const pointsForNextLevel = pointsToNextLevel - pointsInLevel;
    const progressPercentage = Math.round((pointsInLevel / pointsToNextLevel) * 100);

    return {
      currentLevel,
      pointsInLevel,
      pointsToNextLevel,
      pointsForNextLevel,
      progressPercentage,
    };
  };

  const levelInfo = getLevelInfo(assessmentData.experiencePoints);


  const getRoadmapState = (careerTitle: string) => {
    return roadmaps[careerTitle] || { isLoading: false, error: null };
  };

  const setRoadmapLoading = (careerTitle: string, isLoading: boolean) => {
    setRoadmaps(prev => ({
      ...prev,
      [careerTitle]: { ...prev[careerTitle], isLoading, error: null }
    }));
  };
  
  const setRoadmapSuccess = (careerTitle: string, roadmap: string) => {
    setRoadmaps(prev => ({
      ...prev,
      [careerTitle]: { roadmap, isLoading: false, error: null }
    }));
  };

  const setRoadmapError = (careerTitle: string, error: string) => {
    setRoadmaps(prev => ({
      ...prev,
      [careerTitle]: { ...prev[careerTitle], isLoading: false, error }
    }));
  };

  const savedCourses = assessmentData.savedCourses || [];
  const completedLessons = assessmentData.completedLessons || {};
  const completedProjects = assessmentData.completedProjects || [];

  return (
    <AssessmentContext.Provider value={{ 
      assessmentData, updateAssessmentData,
      careerSuggestions, setCareerSuggestions,
      isLoadingSuggestions, setIsLoadingSuggestions,
      errorSuggestions, setErrorSuggestions,
      isAdminView, setIsAdminView,
      isProUser,
      isAdmin, isAuthLoading, isUserLoading,
      roadmaps, getRoadmapState, setRoadmapLoading, setRoadmapSuccess, setRoadmapError,
      savedCourses, addSavedCourse, removeSavedCourse,
      completedLessons, toggleLessonCompleted, completeAllLessons,
      completedProjects, toggleProjectCompleted,
      levelInfo,
      clearAssessment,
      setAssessmentData
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = (): AssessmentContextType => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
