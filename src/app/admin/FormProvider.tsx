'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

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

type HospitalFormData = yup.InferType<typeof schema>;

export default function FormProvider() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
    try {
      await axios.post('/api/hospitals', data);
      reset();
    } catch (error) {
      console.error('Error adding hospital:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto space-y-6 transform transition-all hover:shadow-xl"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#056968] mb-1">
          Hospital Name
        </label>
        <input
          id="name"
          {...register('name')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter hospital name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[#056968] mb-1">
          Address
        </label>
        <input
          id="address"
          {...register('address')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter hospital address"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#056968] mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          {...register('phone')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="e.g., +2341234567890"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#056968] mb-1">
          Email
        </label>
        <input
          id="email"
          {...register('email')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter hospital email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-[#056968] mb-1">
          City
        </label>
        <input
          id="city"
          {...register('city')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter city"
        />
        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
      </div>
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-[#056968] mb-1">
          Region
        </label>
        <input
          id="region"
          {...register('region')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter region"
        />
        {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#056968] mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter description"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#edb138] text-white py-3 rounded-md disabled:bg-gray-400"
      >
        {isSubmitting ? 'Saving...' : 'Add Provider'}
      </button>
    </form>
  );
}