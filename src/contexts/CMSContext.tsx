import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, doc, onSnapshot, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import defaultTeacherImage from '../assets/images/teacher_amina_real_1780714637543.png';
import amina1 from '../assets/images/teacher_amina_1780714114607.png';
import aminaPfc from '../assets/images/teacher_amina_pfc_1780714918614.png';
import aminaProfessional from '../assets/images/teacher_amina_professional_1780716672183.png';
import aminaVector from '../assets/images/teacher_amina_vector_illustration_1780716690942.png';
import aminaBrownHijab from '../assets/images/teacher_amina_real_brown_hijab_1780717175166.png';

const aminaInstagramPic = "https://instagram.floo1-1.fna.fbcdn.net/v/t51.82787-19/705749231_17951208918170885_2262895318284253937_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.floo1-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2gGQCfW6blWcTw5Oa_zDmBMrBhJKHVnnaq3eabZIZjzotE5ETg46za0EvbDTTmZkgyo&_nc_ohc=li9oRlL1CywQ7kNvwE2E-M-&_nc_gid=UI_zpEoSmVhTZVNHCmE7yw&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_Af_YjAvZlbmEHu2fQjrUEF0dswXTfsKxFtEcwKI41WPc6w&oe=6A2961A0&_nc_sid=7a9f4b";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface MediaImage {
  id: string;
  name: string;
  url: string;
  isDefault: boolean;
  createdAt: number;
}

// Default Data
const defaultContent = {
  heroTitle: "Master English With Confidence",
  heroSubtitle: "Inspiring a passion for learning that endures. Learn English step by step with Miss Amina and unlock new opportunities.",
  aboutTitle: "Meet Miss Amina",
  aboutText: "English language teacher dedicated to helping students improve their communication skills, build confidence, and achieve fluency through engaging lessons and practical learning methods.",
  aboutImage: aminaInstagramPic, // use the real Instagram profile picture as the main default header
  footerQuote: "Inspiring a passion for learning that endures.",
  instagramUrl: "https://www.instagram.com/eduxmina/",
  contactLocation: "Laghouat, Algeria",
  mediaGallery: [
    {
      id: "amina-instagram-pic",
      name: "حساب الإنستغرام الحالي للأستاذة (الافتراضية الأولى)",
      url: aminaInstagramPic,
      isDefault: true,
      createdAt: 1780718000000
    },
    {
      id: "amina-brown-hijab",
      name: "أستاذة أمينة (واقعية - حجاب بني وسترة زيتية)",
      url: aminaBrownHijab,
      isDefault: true,
      createdAt: 1780717175166
    },
    {
      id: "professional-portrait",
      name: "صورة بورتريه احترافي للأستاذة",
      url: aminaProfessional,
      isDefault: true,
      createdAt: 1780716672183
    },
    {
      id: "vector-illustration",
      name: "رسمة توضيحية للموقع الإلكتروني",
      url: aminaVector,
      isDefault: true,
      createdAt: 1780716690942
    },
    {
      id: "default-amina-real",
      name: "صورة افتراضية أولى (واقعية)",
      url: defaultTeacherImage,
      isDefault: true,
      createdAt: 1780714637543
    },
    {
      id: "default-amina-bg",
      name: "صورة افتراضية ثانية",
      url: amina1,
      isDefault: true,
      createdAt: 1780714114607
    },
    {
      id: "default-amina-pfc",
      name: "صورة افتراضية ثالثة",
      url: aminaPfc,
      isDefault: true,
      createdAt: 1780714918614
    }
  ] as MediaImage[]
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
        const data = docSnap.data();
        let mergedGallery = data.mediaGallery || [];
        const existingIds = new Set(mergedGallery.map((img: any) => img.id));
        
        // Ensure all default system images (including the new premium amina-brown-hijab) are present in memory in the gallery
        defaultContent.mediaGallery.forEach((item) => {
          if (!existingIds.has(item.id)) {
            mergedGallery = [item, ...mergedGallery];
          }
        });

        const nextAboutImage = data.aboutImage || aminaInstagramPic;

        setContent(prev => ({ 
          ...prev, 
          ...data,
          aboutImage: nextAboutImage,
          mediaGallery: mergedGallery
        }));
      } else {
        // Init with default content ONLY if admin user is signed in
        if (auth.currentUser) {
          setDoc(doc(db, 'content', 'singleton'), defaultContent).catch((err) => {
            handleFirestoreError(err, OperationType.WRITE, 'content/singleton');
          });
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'content/singleton');
    });

    // Listen to Courses
    const coursesUnsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
      const coursesData: any[] = [];
      snapshot.forEach(docSnap => coursesData.push({ id: docSnap.id, ...docSnap.data() }));
      
      if (coursesData.length > 0) {
        // Sort by ID to keep consistent order if IDs are numeric like initially
        setCourses(coursesData.sort((a,b) => String(a.id).localeCompare(String(b.id))));
      } else {
        // Init defaults ONLY if admin user is signed in
        if (auth.currentUser) {
          defaultCourses.forEach(c => {
            setDoc(doc(db, 'courses', c.id), c).catch((err) => {
              handleFirestoreError(err, OperationType.WRITE, `courses/${c.id}`);
            });
          });
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'courses');
    });

    // Listen to Registrations ONLY when user is authenticated!
    let registrationsUnsubscribe = () => {};

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      // Unsubscribe any existing listener first
      registrationsUnsubscribe();
      
      if (user) {
        // User logged in (admin) - subscribe to registrations
        registrationsUnsubscribe = onSnapshot(
          collection(db, 'registrations'), 
          (snapshot) => {
            const registrationsData: Registration[] = [];
            snapshot.forEach(docSnap => registrationsData.push({ id: docSnap.id, ...docSnap.data() } as Registration));
            setRegistrations(registrationsData.sort((a,b) => b.createdAt - a.createdAt));
          }, 
          (err) => {
            handleFirestoreError(err, OperationType.LIST, 'registrations');
          }
        );
      } else {
        // User logged out - clear registrations state
        setRegistrations([]);
        registrationsUnsubscribe = () => {};
      }
    });

    return () => {
      contentUnsubscribe();
      coursesUnsubscribe();
      registrationsUnsubscribe();
      authUnsubscribe();
    }
  }, []);

  const updateContent = async (newContent: Partial<typeof defaultContent>) => {
    try {
      await updateDoc(doc(db, 'content', 'singleton'), newContent);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, 'content/singleton');
    }
  };

  const addCourse = async (course: any) => {
    try {
      const newId = Date.now().toString();
      await setDoc(doc(db, 'courses', newId), { ...course });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `courses`);
    }
  };

  const updateCourse = async (id: string, newCourse: any) => {
    try {
      await updateDoc(doc(db, 'courses', id), newCourse);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `courses/${id}`);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `courses/${id}`);
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
      handleFirestoreError(e, OperationType.CREATE, 'registrations');
    }
  };

  const updateRegistrationStatus = async (id: string, status: Registration['status']) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `registrations/${id}`);
    }
  };

  const deleteRegistration = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'registrations', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `registrations/${id}`);
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
