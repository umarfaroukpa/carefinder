// components/HospitalList.tsx
"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Building, Activity } from "lucide-react";
import toast from "react-hot-toast";
import { Hospital } from "../types/Hospital";
import { useAuth } from "./auth/AuthContext";
import { useRouter,  usePathname  } from "next/navigation";

interface HospitalListProps {
    hospitals: Hospital[];
    onHospitalAdded?: (updatedHospital: Hospital) => void;
}

export default function HospitalList({ hospitals, onHospitalAdded }: HospitalListProps) {
    const { currentUser, isAdmin } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isBooking, setIsBooking] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState<string | null>(null);

    const exportToCSV = () => {
        console.log("Exporting hospitals to CSV");
        const headers = ["Name,Location,Address,Phone,Specializations"];
        const rows = hospitals.map((h) =>
            `${h.name},${h.location || h.city || ""},${h.address || ""},${h.contactNumber || h.phone || ""},${h.specializations?.join(";") || ""}`
        );
        const csvContent = [headers, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "hospitals.csv";
        link.click();
        window.URL.revokeObjectURL(url);
        console.log("CSV export completed");
    };

    const handleBookHospital = async (hospital: Hospital) => {
        console.log("handleBookHospital called for:", hospital.name);
        if (!currentUser) {
            toast.error("Please log in to book a hospital");
            return;
        }

        setIsBooking(hospital.id);
        try {
            toast.success(`Successfully booked ${hospital.name}`);
            if (onHospitalAdded) {
                onHospitalAdded({ ...hospital });
            }
        } catch (error: unknown) {
            console.error("Error creating booking:", error);
            toast.error("Error: Failed to create booking");
        } finally {
            setIsBooking(null);
        }
    };

    // Updated handleAddHospital function for HospitalList.tsx

    const handleAddHospital = (hospital: Hospital) => {
        setIsAdding(hospital.id);

        try {
            const hospitalData = {
                name: hospital.name || "",
                address: hospital.address || "",
                phone: hospital.contactNumber || hospital.phone || "",
                email: hospital.email?.[0] || "",
                city: hospital.city || (hospital.location ? hospital.location.split(",")[0]?.trim() : "") || "",
                region: hospital.region || (hospital.location ? hospital.location.split(",")[1]?.trim() : "") || "",
                description: hospital.description || `Added from external search: ${hospital.name}`,
                specializations: hospital.specializations || [],
            };

            // Store in localStorage
            localStorage.setItem("pendingHospitalData", JSON.stringify(hospitalData));

            // Navigate to admin page
            const searchTerm = encodeURIComponent(hospitalData.city || hospitalData.name);
            toast.success("Redirecting to admin page...");

            // Small delay to allow toast to show
            setTimeout(() => {
                router.push(`/admin?searchTerm=${searchTerm}`);
            }, 500);
        } catch (error: unknown) {
            console.error("Error in handleAddHospital:", error);
            toast.error("Failed to prepare hospital data for admin");
        } finally {
            setIsAdding(null);
        }
    };
    if (!hospitals || hospitals.length === 0) {
        console.log("No hospitals to display");
        return <p className="text-[#056968] text-center py-8">No hospitals found.</p>;
    }

    return (
        <div>
            <button
                onClick={exportToCSV}
                className="mb-6 bg-[#056968] hover:bg-[#edb138] text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                Export to CSV
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map((hospital) => (
                    <div
                        key={hospital.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="bg-[#edb138] h-3 w-full"></div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-[#056968] mb-2">{hospital.name}</h2>

                            <div className="space-y-3 text-[#056968]">
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 mr-2 text-[#edb138] flex-shrink-0 mt-0.5" />
                                    <p>
                                        {hospital.address ||
                                            hospital.location ||
                                            `${hospital.city || "Unknown"}, ${hospital.region || "Unknown"}`}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-2 text-[#edb138]" />
                                    <p>{hospital.contactNumber || hospital.phone || "Contact information not provided"}</p>
                                </div>

                                {hospital.email && hospital.email[0] && (
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 mr-2 text-[#edb138]" />
                                        <p className="truncate">{hospital.email[0]}</p>
                                    </div>
                                )}

                                {hospital.city && (
                                    <div className="flex items-center">
                                        <Building className="h-5 w-5 mr-2 text-[#edb138]" />
                                        <p>{hospital.city}, {hospital.region || "Unknown"}</p>
                                    </div>
                                )}

                                {hospital.specializations && hospital.specializations.length > 0 && (
                                    <div className="flex items-start">
                                        <Activity className="h-5 w-5 mr-2 text-[#edb138] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium mb-1">Specializations:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {hospital.specializations.map((spec, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-100 text-[#056968] text-xs px-2 py-1 rounded-full"
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center">
                                <a
                                    href={`/hospitals/${hospital.id}`}
                                    className="text-[#edb138] hover:text-[#056968] font-medium inline-flex items-center"
                                >
                                    View Details
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </a>
                                <div className="flex gap-2">
                                    {hospital.isExternal && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!currentUser) {
                                                    toast.error("Please log in to add a hospital");
                                                    router.push('/authpage');
                                                    return;
                                                }

                                                // Check if user is admin using the isAdmin from AuthContext
                                                if (!isAdmin) {
                                                    try {
                                                      const hospitalData = {
                                                        name: hospital.name || "",
                                                        address: hospital.address || "",
                                                        phone: hospital.contactNumber || hospital.phone || "",
                                                        email: hospital.email?.[0] || "",
                                                        city: hospital.city || (hospital.location ? hospital.location.split(",")[0]?.trim() : "") || "",
                                                        region: hospital.region || (hospital.location ? hospital.location.split(",")[1]?.trim() : "") || "",
                                                        description: hospital.description || `Added from external search: ${hospital.name}`,
                                                        specializations: hospital.specializations || [],
                                                      };
                            
                                                      localStorage.setItem("pendingHospitalData", JSON.stringify(hospitalData));
                                                      toast.error("You need admin privileges to add hospitals. Please log in as an admin or contact support@carefinder.com.");
                                                      if (pathname !== '/authpage') { // Use pathname from usePathname
                                                        router.push('/authpage');
                                                      }
                                                    } catch (error) {
                                                      console.error("Error storing hospital data:", error);
                                                      toast.error("Failed to prepare hospital data. Please try again.");
                                                    }
                                                    return;
                                                  }
                                                // If we get here, user is admin, so proceed with handleAddHospital
                                                handleAddHospital(hospital);
                                            }}
                                            className="bg-[#056968] text-white px-4 py-2 rounded hover:bg-[#edb138] disabled:bg-gray-400"
                                            disabled={isAdding === hospital.id}
                                        >
                                            {isAdding === hospital.id ? "Preparing..." : "Add to Database"}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleBookHospital(hospital)}
                                        className="bg-[#056968] text-white px-4 py-2 rounded hover:bg-[#edb138] disabled:bg-gray-400"
                                        disabled={isBooking === hospital.id}
                                    >
                                        {isBooking === hospital.id ? "Booking..." : "Book Now"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}