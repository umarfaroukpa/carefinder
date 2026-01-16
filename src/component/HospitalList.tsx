"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Activity, Download, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { Hospital } from "../types/Hospital";
import { useAuth } from "./auth/AuthContext";
import { useRouter } from "next/navigation";

interface HospitalListProps {
  hospitals: Hospital[];
  onHospitalAdded?: (updatedHospital: Hospital) => void;
}

export default function HospitalList({ hospitals }: HospitalListProps) {
  const { currentUser, isAdmin } = useAuth();
  const router = useRouter();
  const [isBooking, setIsBooking] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<string | null>(null);

  if (!hospitals || hospitals.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No hospitals found for this search.</p>
        <p className="text-sm mt-2">Try a different city, name, or specialization.</p>
      </div>
    );
  }

  const exportToCSV = () => {
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
    toast.success("Exported to CSV!");
  };

  const handleBookHospital = (hospital: Hospital) => {
    if (!currentUser) {
      toast.error("Please log in to book");
      return;
    }
    setIsBooking(hospital.id);
    // Your booking logic here...
    toast.success(`Booked: ${hospital.name}`);
    setIsBooking(null);
  };

  const handleAddHospital = (hospital: Hospital) => {
    setIsAdding(hospital.id);
    try {
      const hospitalData = {
        name: hospital.name || "",
        address: hospital.address || "",
        phone: hospital.contactNumber || hospital.phone || "",
        email: hospital.email?.[0] || "",
        city: hospital.city || (hospital.location ? hospital.location.split(",")[0]?.trim() : ""),
        region: hospital.region || (hospital.location ? hospital.location.split(",")[1]?.trim() : ""),
        description: hospital.description || `Added from external search: ${hospital.name}`,
        specializations: hospital.specializations || [],
      };

      localStorage.setItem("pendingHospitalData", JSON.stringify(hospitalData));
      toast.success("Redirecting to add page...");
      setTimeout(() => {
        router.push(`/admin?searchTerm=${encodeURIComponent(hospitalData.city || hospitalData.name)}`);
      }, 800);
    } catch {
      toast.error("Failed to prepare data");
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-[#056968]">
          {hospitals.length} {hospitals.length === 1 ? "Hospital" : "Hospitals"} Found
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#056968] hover:bg-[#047c78] text-white rounded-lg transition-colors shadow-sm"
          >
            <Download size={18} />
            Export CSV
          </button>

          <button
            onClick={() => {
              const text = `Found ${hospitals.length} hospitals! Check them out on Carefinder.`;
              if (navigator.share) {
                navigator.share({ title: "Carefinder Results", text });
              } else {
                navigator.clipboard.writeText(text);
                toast.success("Results copied to clipboard!");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 border border-[#056968] text-[#056968] hover:bg-[#056968]/10 rounded-lg transition-colors"
          >
            <Share2 size={18} />
            Share Results
          </button>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#056968]/30 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Accent bar */}
            <div className="h-2 bg-gradient-to-r from-[#056968] to-[#047c78]"></div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-[#056968] mb-4 line-clamp-2">
                {hospital.name}
              </h3>

              <div className="space-y-3 text-gray-700 flex-grow">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#edb138] mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    {hospital.address || hospital.location || `${hospital.city || "Unknown"}, ${hospital.region || "Unknown"}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#edb138] flex-shrink-0" />
                  <p className="text-sm">
                    {hospital.contactNumber || hospital.phone || "Not available"}
                  </p>
                </div>

                {hospital.email?.[0] && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#edb138] flex-shrink-0" />
                    <p className="text-sm truncate">{hospital.email[0]}</p>
                  </div>
                )}

                {(hospital.specializations ?? []).length > 0 && (
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-[#edb138] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Specializations</p>
                      <div className="flex flex-wrap gap-2">
                        {(hospital.specializations ?? []).map((spec, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-[#056968]/10 text-[#056968] text-xs px-3 py-1 rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3 justify-end">
                <a
                  href={`/hospitals/${hospital.id}`}
                  className="text-[#056968] hover:text-[#047c78] font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  View Details →
                </a>

                <div className="flex gap-2">
                  {hospital.isExternal && (
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          toast.error("Please log in");
                          router.push("/authpage");
                          return;
                        }
                        if (!isAdmin) {
                          toast.error("Admin access required to add");
                          return;
                        }
                        handleAddHospital(hospital);
                      }}
                      disabled={isAdding === hospital.id}
                      className="px-4 py-2 bg-[#056968] hover:bg-[#047c78] text-white text-sm rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isAdding === hospital.id ? "Adding..." : "Add to DB"}
                    </button>
                  )}

                  <button
                    onClick={() => handleBookHospital(hospital)}
                    disabled={isBooking === hospital.id}
                    className="px-4 py-2 bg-[#edb138] hover:bg-[#e0a028] text-[#056968] font-medium text-sm rounded-lg transition-colors disabled:opacity-50"
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