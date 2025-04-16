"use client";

import { useAuth } from '../../component/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../component/auth/ProtectedAction';
import {
  Calendar, LogIn, LogOut, Home, Heart,
  Baby, Stethoscope, User, Clock, Activity, BriefcaseMedical
} from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';


interface BookingDetails {
  hospitalName: string;
  date: string;
  status: string;
}

interface ServiceDetails {
  providerName: string;
  date: string;
  status: string;
}

interface AuthDetails {
  email: string;
  method?: string;
}


// Type guards to narrow down the type of activity.details
const isBookingDetails = (details: unknown, type: string): details is BookingDetails => {
  return type === 'booking' && typeof details === 'object' && details !== null &&
    'hospitalName' in details && 'date' in details && 'status' in details;
};

const isServiceDetails = (details: unknown, type: string): details is ServiceDetails => {
  return (
    (type === 'seniorCare' || type === 'emergencyCare' || type === 'homeService' || type === 'pediatricService') &&
    typeof details === 'object' && details !== null &&
    'providerName' in details && 'date' in details && 'status' in details
  );
};

const isAuthDetails = (details: unknown, type: string): details is AuthDetails => {
  return (type === 'login' || type === 'logout') &&
    typeof details === 'object' && details !== null &&
    'email' in details;
};

// Activity category mapping
const activityIcons = {
  booking: <Calendar className="h-5 w-5 text-white" />,
  seniorCare: <Heart className="h-5 w-5 text-white" />,
  emergencyCare: <Stethoscope className="h-5 w-5 text-white" />,
  homeService: <Home className="h-5 w-5 text-white" />,
  pediatricService: <Baby className="h-5 w-5 text-white" />,
  login: <LogIn className="h-5 w-5 text-white" />,
  logout: <LogOut className="h-5 w-5 text-white" />
};

const activityColors = {
  booking: "bg-indigo-500",
  seniorCare: "bg-pink-500",
  emergencyCare: "bg-red-500",
  homeService: "bg-green-500",
  pediatricService: "bg-blue-500",
  login: "bg-purple-500",
  logout: "bg-gray-500"
};

export default function Account() {
  const {
    userData,
    userActivity,
    bookings,
    seniorCare,
    emergencyCare,
    homeServices,
    pediatricServices,
    loading,
    fetchUserActivity,
    fetchBookings,
    fetchSeniorCare,
    fetchEmergencyCare,
    fetchHomeServices,
    fetchPediatricServices,
  } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('activity');
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !userData) {
      router.push('/authpage');
    }
  }, [loading, userData, router]);

  useEffect(() => {
    if (!loading && userData) {
      fetchUserActivity();
      fetchBookings();
      fetchSeniorCare();
      fetchEmergencyCare();
      fetchHomeServices();
      fetchPediatricServices();
    }
  }, [
    loading,
    userData,
    fetchUserActivity,
    fetchBookings,
    fetchSeniorCare,
    fetchEmergencyCare,
    fetchHomeServices,
    fetchPediatricServices,
  ]);

  const handleCancel = async (collection: string, itemId: string) => {
    if (!userData) return;

    setIsCancelling(itemId);
    try {
      const itemRef = doc(db, 'users', userData.uid, collection, itemId);
      await deleteDoc(itemRef);
      toast.success(`${collection} cancelled successfully`);
      // Refresh the relevant data after cancellation
      switch (collection) {
        case 'bookings':
          fetchBookings();
          break;
        case 'seniorCare':
          fetchSeniorCare();
          break;
        case 'emergencyCare':
          fetchEmergencyCare();
          break;
        case 'homeServices':
          fetchHomeServices();
          break;
        case 'pediatricServices':
          fetchPediatricServices();
          break;
      }
      // Refresh the activity timeline
      fetchUserActivity();
    } catch (error) {
      console.error(`Error cancelling ${collection}:`, error);
      if (error instanceof FirebaseError && error.code === 'unavailable') {
        toast.error(`You are offline. The ${collection} will be cancelled when you're back online.`);
      } else {
        toast.error(`Error: Failed to cancel ${collection}`);
      }
    } finally {
      setIsCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#056968] mx-auto"></div>
          <p className="mt-3 text-[#056968] font-medium">Loading your account information...</p>
        </div>
      </div>
    );
  }

  // If userData is null, the useEffect will handle the redirect, so return null here
  if (!userData) {
    return null;
  }

  const formatActivityType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-[#056968] to-[#07938f] px-6 py-4">
              <div className="flex items-center">
                <div className="bg-white p-3 rounded-full shadow-md">
                  <User className="h-8 w-8 text-[#056968]" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">{userData.displayName || 'User'}</h1>
                  <p className="text-teal-100">{userData.role || 'Patient'}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Last Login</p>
                  <p className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {new Date(userData.lastActive).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Account Status</p>
                  <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === 'activity'
                ? 'text-[#056968] border-b-2 border-[#056968]'
                : 'text-gray-500 hover:text-[#056968]'
                }`}
            >
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                Recent Activity
              </div>
            </button>
            <button
              onClick={() => setActiveTab('healthcare')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === 'healthcare'
                ? 'text-[#056968] border-b-2 border-[#056968]'
                : 'text-gray-500 hover:text-[#056968]'
                }`}
            >
              <div className="flex items-center">
                <BriefcaseMedical className="h-4 w-4 mr-2" />
                Manage Healthcare
              </div>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-medium text-sm focus:outline-none ${activeTab === 'profile'
                ? 'text-[#056968] border-b-2 border-[#056968]'
                : 'text-gray-500 hover:text-[#056968]'
                }`}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile Details
              </div>
            </button>
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {activeTab === 'activity' && (
              <div>
                <h2 className="text-xl font-semibold text-[#056968] mb-6 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </h2>

                {userActivity.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No recent activity found.</p>
                    <p className="text-sm text-gray-400">Your activity will appear here once you start using our services.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userActivity.map((activity, index) => (
                      <div key={index} className="bg-white border rounded-lg overflow-hidden transition-all hover:shadow-md">
                        <div className="flex">
                          <div className={`flex items-center justify-center w-14 ${activityColors[activity.type as keyof typeof activityColors] || "bg-gray-500"}`}>
                            {activityIcons[activity.type as keyof typeof activityIcons]}
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-800">
                                {formatActivityType(activity.type)}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {new Date(activity.timestamp).toLocaleString()}
                              </span>
                            </div>

                            <div className="mt-2 text-gray-600 text-sm">
                              {isBookingDetails(activity.details, activity.type) && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div>
                                    <span className="block text-xs text-gray-500">Hospital</span>
                                    <span>{activity.details.hospitalName}</span>
                                  </div>
                                  <div>
                                    <span className="block text-xs text-gray-500">Date</span>
                                    <span>{activity.details.date}</span>
                                  </div>
                                  <div>
                                    <span className="block text-xs text-gray-500">Status</span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${activity.details.status.toLowerCase() === 'confirmed'
                                      ? 'bg-green-100 text-green-800'
                                      : activity.details.status.toLowerCase() === 'cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                      }`}>
                                      {activity.details.status}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {isServiceDetails(activity.details, activity.type) && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div>
                                    <span className="block text-xs text-gray-500">Provider</span>
                                    <span>{activity.details.providerName}</span>
                                  </div>
                                  <div>
                                    <span className="block text-xs text-gray-500">Date</span>
                                    <span>{activity.details.date}</span>
                                  </div>
                                  <div>
                                    <span className="block text-xs text-gray-500">Status</span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${activity.details.status.toLowerCase() === 'completed'
                                      ? 'bg-green-100 text-green-800'
                                      : activity.details.status.toLowerCase() === 'cancelled'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                      }`}>
                                      {activity.details.status}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {isAuthDetails(activity.details, activity.type) && (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div>
                                    <span className="block text-xs text-gray-500">Email</span>
                                    <span>{activity.details.email}</span>
                                  </div>
                                  {activity.type === 'login' && activity.details.method && (
                                    <div>
                                      <span className="block text-xs text-gray-500">Method</span>
                                      <span className="capitalize">{activity.details.method}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'healthcare' && (
              <div>
                <h2 className="text-xl font-semibold text-[#056968] mb-6 flex items-center">
                  <BriefcaseMedical className="h-5 w-5 mr-2" />
                  Manage Healthcare Activities
                </h2>

                {/* Bookings Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Your Bookings</h3>
                  {bookings.length === 0 ? (
                    <p className="text-gray-500">No bookings found. Start by searching for a Nearby Provider!</p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-md font-medium">{booking.hospitalName}</h4>
                            <p className="text-gray-600 text-sm">
                              Date: {new Date(booking.date).toLocaleString()}
                            </p>
                            <p className="text-gray-600 text-sm">Status: {booking.status}</p>
                            <p className="text-gray-500 text-xs">
                              Booked on: {new Date(booking.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            {booking.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancel('bookings', booking.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
                                disabled={isCancelling === booking.id}
                              >
                                {isCancelling === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Senior Care Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Senior Care</h3>
                  {seniorCare.length === 0 ? (
                    <p className="text-gray-500">No senior care activities found.</p>
                  ) : (
                    <div className="space-y-4">
                      {seniorCare.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-md font-medium">{item.providerName}</h4>
                            <p className="text-gray-600 text-sm">
                              Date: {new Date(item.date).toLocaleString()}
                            </p>
                            <p className="text-gray-600 text-sm">Status: {item.status}</p>
                            <p className="text-gray-500 text-xs">
                              Booked on: {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            {item.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancel('seniorCare', item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
                                disabled={isCancelling === item.id}
                              >
                                {isCancelling === item.id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Emergency Care Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Emergency Care</h3>
                  {emergencyCare.length === 0 ? (
                    <p className="text-gray-500">No emergency care activities found.</p>
                  ) : (
                    <div className="space-y-4">
                      {emergencyCare.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-md font-medium">{item.providerName}</h4>
                            <p className="text-gray-600 text-sm">
                              Date: {new Date(item.date).toLocaleString()}
                            </p>
                            <p className="text-gray-600 text-sm">Status: {item.status}</p>
                            <p className="text-gray-500 text-xs">
                              Booked on: {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            {item.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancel('emergencyCare', item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
                                disabled={isCancelling === item.id}
                              >
                                {isCancelling === item.id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Home Services Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Home Services</h3>
                  {homeServices.length === 0 ? (
                    <p className="text-gray-500">No home services found.</p>
                  ) : (
                    <div className="space-y-4">
                      {homeServices.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-md font-medium">{item.providerName}</h4>
                            <p className="text-gray-600 text-sm">
                              Date: {new Date(item.date).toLocaleString()}
                            </p>
                            <p className="text-gray-600 text-sm">Status: {item.status}</p>
                            <p className="text-gray-500 text-xs">
                              Booked on: {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            {item.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancel('homeServices', item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
                                disabled={isCancelling === item.id}
                              >
                                {isCancelling === item.id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pediatric Services Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Pediatric Services</h3>
                  {pediatricServices.length === 0 ? (
                    <p className="text-gray-500">No pediatric services found.</p>
                  ) : (
                    <div className="space-y-4">
                      {pediatricServices.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h4 className="text-md font-medium">{item.providerName}</h4>
                            <p className="text-gray-600 text-sm">
                              Date: {new Date(item.date).toLocaleString()}
                            </p>
                            <p className="text-gray-600 text-sm">Status: {item.status}</p>
                            <p className="text-gray-500 text-xs">
                              Booked on: {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            {item.status !== 'cancelled' && (
                              <button
                                onClick={() => handleCancel('pediatricServices', item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
                                disabled={isCancelling === item.id}
                              >
                                {isCancelling === item.id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-[#056968] mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Personal Information</h3>
                    <div className="bg-gray-50 rounded-lg p-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Display Name</label>
                          <p className="font-medium">{userData.displayName || 'Not set'}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                          <p className="font-medium">{userData.email}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Role</label>
                          <p className="font-medium">{userData.role || 'Patient'}</p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Member Since</label>
                          <p className="font-medium">{new Date(userData.lastActive).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Account Settings</h3>
                    <div className="flex flex-col space-y-3">
                      <button className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                        <span className="font-medium">Change Password</span>
                        <span className="text-[#056968]">→</span>
                      </button>
                      <button className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                        <span className="font-medium">Notification Preferences</span>
                        <span className="text-[#056968]">→</span>
                      </button>
                      <button className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                        <span className="font-medium">Privacy Settings</span>
                        <span className="text-[#056968]">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}