'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Define interface for testimonial data
interface Testimonial {
  quote: string;
  author: string;
  location: string;
  image: string;
}

// Define props interface for the TestimonialCard component
interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: "Carefinder made it so easy to find a hospital near me and book an appointment!",
      author: "Aisha",
      location: "Lagos",
      image: "/arnob-sadi-20KJuXb0Ouo-unsplash-removebg-preview.png",
    },
    {
      quote: "The export feature is a lifesaver for sharing hospital info with my community.",
      author: "Chidi",
      location: "Abuja",
      image: "/elegant-businessman-with-thumbs-up-removebg-preview.png",
    },
    {
      quote: "I found reliable home care services for my elderly parents through Carefinder.",
      author: "Fatima",
      location: "Kaduna",
      image: "/happy-young-female-professional-posing-with-arms-folded-removebg-preview.png",
    },
    {
      quote: "The emergency services section helped me act fast during a critical moment.",
      author: "Emeka",
      location: "Port Harcourt",
      image: "/portrait-handsome-young-black-african-smiling-man-removebg-preview (1).png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#056968] mb-8">
          What Our Users Say
        </h2>
        
        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? 'bg-[#056968]' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Carousel Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevTestimonial}
              className="bg-[#056968] text-white p-2 rounded-full hover:bg-[#edb13b] transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-[#056968] text-white p-2 rounded-full hover:bg-[#edb13b] transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Extracted TestimonialCard component with proper type definition
function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Image
        
          width={48}
          height={48}
          src={testimonial.image}
          alt={`${testimonial.author}'s photo`}
          className="w-12 h-12 rounded-full mr-3 object-cover"
        />
        <div>
          <p className="font-semibold text-[#056968]">{testimonial.author}</p>
          <p className="text-sm text-[#edb138]">{testimonial.location}</p>
        </div>
      </div>
      <p className="text-[#056968] italic flex-grow">"{testimonial.quote}"</p>
    </div>
  );
}