import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../lib/firebase';
import { collection, doc, onSnapshot, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Default Data
const defaultContent = {
  heroTitle: "Master English With Confidence",
  heroSubtitle: "Inspiring a passion for learning that endures. Learn English step by step with Miss Amina and unlock new opportunities.",
  aboutTitle: "Meet Miss Amina",
  aboutText: "English language teacher dedicated to helping students improve their communication skills, build confidence, and achieve fluency through engaging lessons and practical learning methods.",
  aboutImage: "https://scontent.cdninstagram.com/v/t51.82787-19/705749231_17951208918170885_2262895318284253937_n.jpg?_nc_cat=105&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=whHQ45jOE2AQ7kNvwEJqpz_&_nc_oc=AdqxRBo5fzb9ryCe7dRRQMZTr7nPhv7baT4-l0skxyKa90XEgEmGc4RVihHIHBQuBoI&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=vMYNzIgKDel3ZPC1gj54fg&_nc_ss=7f6a8&oh=00_Af9r6yAL2m4uOlzBMz9cK-cowDRKZtmolUfCFsueffGwFA&oe=6A22CA20",
  footerQuote: "Inspiring a passion for learning that endures.",
  instagramUrl: "https://www.instagram.com/eduxmina/",
  contactLocation: "Laghouat, Algeria",
};

const defaultCourses: any[] = [
  {
    id: "1",
    title: "Beginner English",
    features: ["Alphabet", "Vocabulary", "Grammar Basics", "Daily Conversations"]
  },
  {
    id: "2",
    title: "Intermediate English",
    features: ["Speaking Practice", "Listening Skills", "Writing Improvement", "Real-Life Communication"]
  },
  {
    id: "3",
    title: "Advanced English",
    features: ["Fluency Development", "Academic English", "Professional Communication", "Advanced Grammar"]
  },
  {
    id: "4",
    title: "Teenagers Program",
    features: ["Fun Learning Activities", "Interactive Challenges", "Speaking Confidence", "Exam Preparation"]
  }
];

export interface Registration {
  id: string;
  fullName: string;
  age: string;
  phone: string;
  email: string;
  englishLevel: string;
  courseSelection: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: number;
}

interface CMSContextType {
  content: typeof defaultContent;
  updateContent: (newContent: Partial<typeof defaultContent>) => void;
  courses: any[];
  addCourse: (course: any) => void;
  updateCourse: (id: string, newCourse: any) => void;
  deleteCourse: (id: string) => void;
  registrations: Registration[];
  addRegistration: (registration: Omit<Registration, 'id' | 'status' | 'createdAt'>) => void;
  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  deleteRegistration: (id: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultContent);
  const [courses, setCourses] = useState(defaultCourses);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    // Listen to Content Singleton
    const contentUnsubscribe = onSnapshot(doc(db, 'content', 'singleton'), (docSnap) => {
      if (docSnap.exists()) {
        setContent(prev => ({ ...prev, ...docSnap.data() }));
      } else {
        // Init with default content
        setDoc(doc(db, 'content', 'singleton'), defaultContent).catch(console.error);
      }
    }, (err) => {
      console.error("Content snapshot error:", err);
    });

    // Listen to Courses
    const coursesUnsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
      const coursesData: any[] = [];
      snapshot.forEach(docSnap => coursesData.push({ id: docSnap.id, ...docSnap.data() }));
      
      if (coursesData.length > 0) {
        // Sort by ID to keep consistent order if IDs are numeric like initially
        setCourses(coursesData.sort((a,b) => String(a.id).localeCompare(String(b.id))));
      } else {
        // Init defaults
        defaultCourses.forEach(c => {
          setDoc(doc(db, 'courses', c.id), c).catch(console.error);
        });
      }
    }, (err) => {
      console.error("Courses snapshot error:", err);
    });

    // Listen to Registrations
    const registrationsUnsubscribe = onSnapshot(collection(db, 'registrations'), (snapshot) => {
      const registrationsData: Registration[] = [];
      snapshot.forEach(docSnap => registrationsData.push({ id: docSnap.id, ...docSnap.data() } as Registration));
      setRegistrations(registrationsData.sort((a,b) => b.createdAt - a.createdAt));
    }, (err) => {
      console.error("Registrations snapshot error:", err);
    });

    return () => {
      contentUnsubscribe();
      coursesUnsubscribe();
      registrationsUnsubscribe();
    }
  }, []);

  const updateContent = async (newContent: Partial<typeof defaultContent>) => {
    try {
      await updateDoc(doc(db, 'content', 'singleton'), newContent);
    } catch (e) {
      console.error("Error updating content:", e);
    }
  };

  const addCourse = async (course: any) => {
    try {
      const newId = Date.now().toString();
      await setDoc(doc(db, 'courses', newId), { ...course });
    } catch (e) {
      console.error("Error adding course", e);
    }
  };

  const updateCourse = async (id: string, newCourse: any) => {
    try {
      await updateDoc(doc(db, 'courses', id), newCourse);
    } catch (e) {
      console.error("Error updating course", e);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
    } catch (e) {
      console.error("Error deleting course", e);
    }
  };

  const addRegistration = async (registration: Omit<Registration, 'id' | 'status' | 'createdAt'>) => {
    try {
      console.log("Adding doc to firestore...");
      
      const addPromise = addDoc(collection(db, 'registrations'), {
        ...registration,
        status: 'pending',
        createdAt: Date.now()
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firebase network timeout. Please check console logs.")), 10000)
      );

      await Promise.race([addPromise, timeoutPromise]);
      console.log("Doc added successfully");
    } catch (e) {
      console.error("Error adding registration", e);
      throw e;
    }
  };

  const updateRegistrationStatus = async (id: string, status: Registration['status']) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
    } catch (e) {
      console.error("Error updating registration status", e);
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'registrations', id));
    } catch (e) {
      console.error("Error deleting registration", e);
    }
  };

  return (
    <CMSContext.Provider value={{
      content, updateContent,
      courses, addCourse, updateCourse, deleteCourse,
      registrations, addRegistration, updateRegistrationStatus, deleteRegistration
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error("useCMS must be used within CMSProvider");
  return context;
}
