// pages/admin.tsx
"use client";

import Head from "next/head";
import ProtectedRoute from "../../component/auth/ProtectedRoute";
import ProtectedAction from "../../component/auth/ProtectedAction";
import MarkdownEditor from "../../component/MarkdownEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LogOut, PlusCircle, HospitalIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().required("Hospital name is required"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  city: yup.string().required("City is required"),
  region: yup.string().required("Region is required"),
  description: yup.string().required("Description is required"),
});

type HospitalFormData = yup.InferType<typeof schema>;

export default function Admin() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HospitalFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      city: searchTerm,
      region: "",
      description: "",
    },
  });

  useEffect(() => {
    console.log("Admin useEffect: Checking localStorage for pendingHospitalData");
    const pendingHospitalData = localStorage.getItem("pendingHospitalData");
    if (pendingHospitalData) {
      try {
        const hospitalData = JSON.parse(pendingHospitalData);
        console.log("Parsed hospitalData from localStorage:", hospitalData);
        setValue("name", hospitalData.name || "");
        setValue("address", hospitalData.address || "");
        setValue("phone", hospitalData.phone || "");
        setValue("email", hospitalData.email || "");
        setValue("city", hospitalData.city || searchTerm || "");
        setValue("region", hospitalData.region || "");
        setValue("description", hospitalData.description || "");
        toast.success("Loaded hospital data for editing");
        localStorage.removeItem("pendingHospitalData");
        console.log("Cleared pendingHospitalData from localStorage");
      } catch (error) {
        console.error("Error parsing hospital data from localStorage:", error);
        setSubmitMessage({ type: "error", text: "Failed to load hospital data. Please enter manually." });
        toast.error("Failed to load hospital data");
      }
    } else if (searchTerm) {
      console.log("Setting city to searchTerm:", searchTerm);
      setValue("city", searchTerm);
    } else {
      console.log("No pendingHospitalData or searchTerm found");
    }
  }, [searchTerm, setValue]);

  const handleSave = async (data: HospitalFormData) => {
    console.log("handleSave called with data:", data);
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await axios.post("/api/hospitals", data);
      console.log("Hospital added successfully:", response.data);
      setSubmitMessage({ type: "success", text: "Hospital added successfully!" });
      toast.success("Hospital added successfully");
      reset();
    } catch (error) {
      console.error("Error adding hospital:", error);
      setSubmitMessage({ type: "error", text: "Failed to add hospital. Please try again." });
      toast.error("Failed to add hospital");
    } finally {
      setIsSubmitting(false);
      console.log("handleSave completed, isSubmitting reset");
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement actual logout logic
  };

  return (
    <ProtectedRoute requiredRole="admin" redirectTo="/authpage">
      <Head>
        <title>Carefinder - Admin Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1 pt-24">
          <aside className="w-80 bg-white shadow-md p-6 fixed h-full">
            <div className="flex items-center mb-8">
              <HospitalIcon className="w-8 h-8 text-[#edb138] mr-2" />
              <h2 className="text-xl font-bold text-[#056968]">Admin Panel</h2>
            </div>
            <nav className="space-y-4">
              <a href="#" className="flex items-center text-[#056968] hover:text-[#edb138] transition">
                <PlusCircle className="w-5 h-5 mr-2 text-[#edb138]" />
                Add Provider
              </a>
            </nav>
            <button
              onClick={handleLogout}
              className="absolute bottom-6 flex items-center text-[#056968] hover:text-[#edb138] transition"
            >
              <LogOut className="w-5 h-5 mr-2 text-[#edb138]" />
              Logout
            </button>
          </aside>

          <main className="flex-1 ml-64 p-8">
            <h1 className="text-3xl font-bold text-[#056968] text-center mb-8">Admin Dashboard</h1>

            {(searchTerm || localStorage.getItem("pendingHospitalData")) && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      {localStorage.getItem("pendingHospitalData")
                        ? "Editing a new healthcare provider. Please review and save the details below."
                        : `Adding a new healthcare provider for "${searchTerm}". Please fill in the details below.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(handleSave)}
              className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto space-y-6 transform transition-all hover:shadow-xl"
            >
              <h2 className="text-2xl text-center font-semibold text-[#056968] flex items-center justify-center">
                <PlusCircle className="w-6 h-6 mr-2 text-[#edb13b]" />
                Add New Provider
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#056968] mb-1">
                    Hospital Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                    placeholder="Enter hospital name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#056968] mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    {...register("address")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                    placeholder="Enter hospital address"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#056968] mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    {...register("phone")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                    placeholder="e.g., +2341234567890"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#056968] mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                    placeholder="Enter hospital email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-[#056968] mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    {...register("city")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-[#056968] mb-1">
                    Region
                  </label>
                  <input
                    id="region"
                    {...register("region")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                    placeholder="Enter region"
                  />
                  {errors.region && (
                    <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.region.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#056968] mb-2">Description (Markdown)</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <MarkdownEditor
                      initialContent={field.value}
                      onSave={(content) => field.onChange(content)}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1 animate-fade-in">{errors.description.message}</p>
                )}
              </div>
              <ProtectedAction requiredRole="admin">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#edb13b] text-white py-3 rounded-md hover:bg-[#056968] disabled:bg-gray-400 transition flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h-8z"
                      />
                    </svg>
                  ) : (
                    <PlusCircle className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? "Saving..." : "Add Provider"}
                </button>
              </ProtectedAction>
              {submitMessage && (
                <p
                  className={`text-sm text-center p-2 rounded-md ${
                    submitMessage.type === "success" ? "text-[#056968] bg-green-100" : "text-red-600 bg-red-100"
                  } animate-fade-in`}
                >
                  {submitMessage.text}
                </p>
              )}
            </form>
          </main>
        </div>
        <footer className="bg-[#056968] text-white py-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Carefinder</h3>
              <p className="text-sm">Making healthcare accessible across Nigeria</p>
            </div>
            <div className="flex space-x-6">
              <a href="/aboutUs" className="text-sm hover:text-[#edb13b] transition">
                About Us
              </a>
              <a href="/contactUs" className="text-sm hover:text-[#edb13b] transition">
                Contact Us
              </a>
              <a href="/services" className="text-sm hover:text-[#edb13b] transition">
                Services
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-sm">
              <p>© {new Date().getFullYear()} Carefinder. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}