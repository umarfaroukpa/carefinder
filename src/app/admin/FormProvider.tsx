"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

// Define TypeScript interface for the component props
interface FormProviderProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  submitMessage: { type: 'success' | 'error'; text: string } | null;
  setSubmitMessage: (message: { type: 'success' | 'error'; text: string } | null) => void;
  MarkdownEditor: React.ComponentType<{
    initialContent: string;
    onSave: (content: string) => void;
  }>;
}

// Validation schema for hospital data
const schema = yup.object({
  name: yup.string().required('Hospital name is required'),
  address: yup.string().required('Address is required'),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  city: yup.string().required('City is required'),
  region: yup.string().required('Region is required'),
  description: yup.string().required('Description is required'),
});

// Type for the form data
type HospitalFormData = yup.InferType<typeof schema>;

export default function FormProvider({ 
  isSubmitting, 
  setIsSubmitting, 
  submitMessage, 
  setSubmitMessage, 
  MarkdownEditor 
}: FormProviderProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<HospitalFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      city: '',
      region: '',
      description: '',
    },
  });

  const handleSave = async (data: HospitalFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      await axios.post('/api/hospitals', data);
      setSubmitMessage({ type: 'success', text: 'Hospital added successfully!' });
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error adding hospital:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to add hospital. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto space-y-6 transform transition-all hover:shadow-xl"
    >
      {/* Rest of the form component remains the same */}
      {/* ... */}
    </form>
  );
}