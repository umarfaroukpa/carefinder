"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SESSION_TIMEOUT = 30 * 60 * 1000;

type UserRole = 'user' | 'admin' | 'moderator';

interface Booking {
  id: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface SeniorCare {
  id: string;
  providerName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface EmergencyCare {
  id: string;
  providerName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface HomeService {
  id: string;
  providerName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface PediatricService {
  id: string;
  providerName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface UserActivity {
  type: 'booking' | 'seniorCare' | 'emergencyCare' | 'homeService' | 'pediatricService' | 'login' | 'logout';
  timestamp: number;
  details: Booking | SeniorCare | EmergencyCare | HomeService | PediatricService | { email: string; method?: string };
}

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  role: UserRole;
  lastActive: number;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  bookings: Booking[];
  seniorCare: SeniorCare[];
  emergencyCare: EmergencyCare[];
  homeServices: HomeService[];
  pediatricServices: PediatricService[];
  userActivity: UserActivity[];
  loading: boolean;
  logoutUser: () => Promise<void>;
  isAdmin: boolean;
  isModerator: boolean;
  checkUserRole: () => Promise<UserRole>;
  fetchBookings: () => Promise<void>;
  fetchSeniorCare: () => Promise<void>;
  fetchEmergencyCare: () => Promise<void>;
  fetchHomeServices: () => Promise<void>;
  fetchPediatricServices: () => Promise<void>;
  fetchUserActivity: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProviderContext({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [seniorCare, setSeniorCare] = useState<SeniorCare[]>([]);
  const [emergencyCare, setEmergencyCare] = useState<EmergencyCare[]>([]);
  const [homeServices, setHomeServices] = useState<HomeService[]>([]);
  const [pediatricServices, setPediatricServices] = useState<PediatricService[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  const updateActivity = React.useCallback(async () => {
    if (!currentUser || !initialized) return;

    const now = Date.now();
    if (now - (userData?.lastActive || 0) <= 60000) return;

    const userRef = doc(db, 'users', currentUser.uid);
    try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: currentUser.email,
          displayName: currentUser.displayName,
          role: 'user',
          createdAt: now,
          lastActive: now,
        });
      } else {
        await updateDoc(userRef, { lastActive: now });
      }

      if (userData) {
        setUserData(prev => prev ? { ...prev, lastActive: now } : null);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }

    resetSessionTimer();
  }, [currentUser, userData, initialized]);

  const resetSessionTimer = React.useCallback(() => {
    if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);

    sessionTimeoutRef.current = setTimeout(() => {
      logoutUser();
      toast.error("Session expired - You've been logged out due to inactivity");
    }, SESSION_TIMEOUT);
  }, []); 

  const fetchUserData = React.useCallback(async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role: userData.role || 'user',
          lastActive: userData.lastActive || Date.now(),
        });
      } else {
        const now = Date.now();
        const newUserData = {
          email: user.email,
          displayName: user.displayName,
          role: 'user',
          createdAt: now,
          lastActive: now,
        };

        await setDoc(userRef, newUserData);

        setUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role: 'user',
          lastActive: now,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      const now = Date.now();
      setUserData({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        role: 'user',
        lastActive: now,
      });
    }
  }, []);

  const fetchBookings = React.useCallback(async () => {
    if (!currentUser || loading) return;

    try {
      const bookingSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'bookings'));
      const bookingsData = bookingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[];
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings. Please try again.");
    }
  }, [currentUser]);

  const fetchSeniorCare = React.useCallback(async () => {
    if (!currentUser) return;

    try {
      const seniorCareSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'seniorCare'));
      const seniorCareData = seniorCareSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as SeniorCare[];
      setSeniorCare(seniorCareData);
    } catch (error) {
      console.error("Error fetching senior care:", error);
      toast.error("Failed to load your senior care activities. Please try again.");
    }
  }, [currentUser]);

  const fetchEmergencyCare = React.useCallback(async () => {
    if (!currentUser || loading) return;

    try {
      const emergencyCareSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'emergencyCare'));
      const emergencyCareData = emergencyCareSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as EmergencyCare[];
      setEmergencyCare(emergencyCareData);
    } catch (error) {
      console.error("Error fetching emergency care:", error);
      toast.error("Failed to load your emergency care activities. Please try again.");
    }
  }, [currentUser]);

  const fetchHomeServices = React.useCallback(async () => {
    if (!currentUser || loading) return;

    try {
      const homeServicesSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'homeServices'));
      const homeServicesData = homeServicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as HomeService[];
      setHomeServices(homeServicesData);
    } catch (error) {
      console.error("Error fetching home services:", error);
      toast.error("Failed to load your home services. Please try again.");
    }
  }, [currentUser]);

  const fetchPediatricServices = React.useCallback(async () => {
    if (!currentUser || loading) return;

    try {
      const pediatricServicesSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'pediatricServices'));
      const pediatricServicesData = pediatricServicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as PediatricService[];
      setPediatricServices(pediatricServicesData);
    } catch (error) {
      console.error("Error fetching pediatric services:", error);
      toast.error("Failed to load your pediatric services. Please try again.");
    }
  }, [currentUser]);

  const fetchUserActivity = React.useCallback(async () => {
    if (!currentUser || loading) return;

    try {
      const bookingSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'bookings'));
      const bookingsData = bookingSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          type: 'booking' as const,
          timestamp: new Date(data.createdAt).getTime(),
          details: { id: doc.id, ...data },
        };
      }) as UserActivity[];

      const seniorCareSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'seniorCare'));
      const seniorCareData = seniorCareSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          type: 'seniorCare' as const,
          timestamp: new Date(data.createdAt).getTime(),
          details: { id: doc.id, ...data },
        };
      }) as UserActivity[];

      const emergencyCareSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'emergencyCare'));
      const emergencyCareData = emergencyCareSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          type: 'emergencyCare' as const,
          timestamp: new Date(data.createdAt).getTime(),
          details: { id: doc.id, ...data },
        };
      }) as UserActivity[];

      const homeServicesSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'homeServices'));
      const homeServicesData = homeServicesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          type: 'homeService' as const,
          timestamp: new Date(data.createdAt).getTime(),
          details: { id: doc.id, ...data },
        };
      }) as UserActivity[];

      const pediatricServicesSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'pediatricServices'));
      const pediatricServicesData = pediatricServicesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          type: 'pediatricService' as const,
          timestamp: new Date(data.createdAt).getTime(),
          details: { id: doc.id, ...data },
        };
      }) as UserActivity[];

      const activitySnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'activity'));
      const activityData = activitySnapshot.docs.map(doc => ({
        type: doc.data().type,
        timestamp: new Date(doc.data().timestamp).getTime(),
        details: doc.data().details,
      })) as UserActivity[];

      const allActivity = [
        ...bookingsData,
        ...seniorCareData,
        ...emergencyCareData,
        ...homeServicesData,
        ...pediatricServicesData,
        ...activityData,
      ].sort((a, b) => b.timestamp - a.timestamp);

      setUserActivity(allActivity);
    } catch (error) {
      console.error("Error fetching user activity:", error);
      toast.error("Failed to load your activity. Please try again.");
    }
  }, [currentUser]);

  const logoutUser = async () => {
    try {
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
      toast.loading("Logging out...");

      if (currentUser) {
        const activityRef = doc(collection(db, 'users', currentUser.uid, 'activity'));
        try {
          await setDoc(activityRef, {
            type: 'logout',
            timestamp: new Date().toISOString(),
            details: { email: currentUser.email },
          });
        } catch (activityError) {
          console.error("Failed to log logout activity:", activityError);
        }
      }

      await signOut(auth);
      toast.dismiss();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.dismiss();
      toast.error("Error: Failed to log out");
      console.error("Logout error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await fetchUserData(user);
        await fetchBookings();
        await fetchSeniorCare();
        await fetchEmergencyCare();
        await fetchHomeServices();
        await fetchPediatricServices();
        await fetchUserActivity();
        resetSessionTimer();
      } else {
        setUserData(null);
        setBookings([]);
        setSeniorCare([]);
        setEmergencyCare([]);
        setHomeServices([]);
        setPediatricServices([]);
        setUserActivity([]);
        if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
        router.push('/');
      }

      setLoading(false);
      setInitialized(true);
    });

    return unsubscribe;
  }, [
    fetchUserData,
    fetchBookings,
    fetchSeniorCare,
    fetchEmergencyCare,
    fetchHomeServices,
    fetchPediatricServices,
    fetchUserActivity,
    resetSessionTimer,
    router,
  ]);

  useEffect(() => {
    if (!initialized) return;

    const handleActivity = () => {
      updateActivity();
    };

    const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (sessionTimeoutRef.current) clearTimeout(sessionTimeoutRef.current);
    };
  }, [updateActivity, initialized]);

  const checkUserRole = async (): Promise<UserRole> => {
    if (!currentUser) return 'user';

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        return userData.role || 'user';
      }
    } catch (error) {
      console.error("Error checking user role:", error);
    }

    return 'user';
  };

  const value = {
    currentUser,
    userData,
    bookings,
    seniorCare,
    emergencyCare,
    homeServices,
    pediatricServices,
    userActivity,
    loading,
    logoutUser,
    checkUserRole,
    fetchBookings,
    fetchSeniorCare,
    fetchEmergencyCare,
    fetchHomeServices,
    fetchPediatricServices,
    fetchUserActivity,
    isAdmin: userData?.role === 'admin',
    isModerator: userData?.role === 'moderator' || userData?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}