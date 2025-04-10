'use client';
import { useState, useEffect } from 'react';

// Define interfaces for our data types
interface SatisfactionMetric {
  label: string;
  percentage: number;
  color: string;
}

interface RatingData {
  stars: number;
  count: number;
}

export default function UserSatisfaction() {
  // Sample satisfaction metrics data
  const satisfactionMetrics: SatisfactionMetric[] = [
    { label: "Very Satisfied", percentage: 68, color: "#056968" },
    { label: "Satisfied", percentage: 24, color: "#3B82F6" },
    { label: "Neutral", percentage: 5, color: "#6B7280" },
    { label: "Unsatisfied", percentage: 3, color: "#EF4444" },
  ];

  // Sample star ratings distribution
  const ratings: RatingData[] = [
    { stars: 5, count: 842 },
    { stars: 4, count: 531 },
    { stars: 3, count: 217 },
    { stars: 2, count: 89 },
    { stars: 1, count: 42 },
  ];

  // Calculate total ratings for percentages
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);
  
  // Calculate average rating
  const averageRating = ratings.reduce((sum, rating) => sum + (rating.stars * rating.count), 0) / totalRatings;

  // Animation on scroll
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('satisfaction-metrics');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check visibility immediately in case element is already in viewport
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#056968] mb-4">
            Global Ratings
          </h2>
          <p className="text-[#056968] max-w-2xl mx-auto">
            At Carefinder, we prioritize user satisfaction and continuously improve our services based on feedback.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Satisfaction Metrics with animated bars */}
          <div id="satisfaction-metrics" className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#056968] mb-6">User Experience Ratings</h3>
            <div className="space-y-6">
              {satisfactionMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{metric.label}</span>
                    <span className="font-medium">{metric.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${metric.percentage}%` : '0%',
                        backgroundColor: metric.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#056968]">Rating Distribution</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-[#056968] mr-2">{averageRating.toFixed(1)}</div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon 
                      key={star}
                      filled={star <= Math.round(averageRating)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {ratings.map((rating, index) => {
                const percentage = Math.round((rating.count / totalRatings) * 100);
                return (
                  <div key={index} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium mr-1">{rating.stars}</span>
                      <StarIcon filled={true} small={true} />
                    </div>
                    <div className="flex-grow h-3 mx-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#edb13b] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: isVisible ? `${percentage}%` : '0%' }}
                      ></div>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-medium">{rating.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Based on {totalRatings} ratings</p>
              <button className="mt-4 px-6 py-2 bg-[#edb138] text-white rounded-lg hover:bg-[#045453] transition-colors duration-300">
                Leave a Review
              </button>
            </div>
          </div>
        </div>
        
        {/* Key Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <KeyStat value="98%" label="Success Rate" icon={<CheckIcon />} />
          <KeyStat value="24/7" label="Support" icon={<ClockIcon />} />
          <KeyStat value="3.2M+" label="Users Helped" icon={<UserIcon />} />
          <KeyStat value="5K+" label="Healthcare Providers" icon={<HospitalIcon />} />
        </div>
      </div>
    </section>
  );
}

// Star icon component
function StarIcon({ filled = false, small = false }: { filled?: boolean; small?: boolean }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={`${small ? "w-3 h-3" : "w-5 h-5"} ${filled ? "text-[#edb13b]" : "text-gray-300"} inline-block`}
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

// Icon components for stats
function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

// Key stat component
function KeyStat({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#EDF7F7] text-[#056968] mb-4">
        {icon}
      </div>
      <div className="text-2xl font-bold text-[#056968]">{value}</div>
      <div className="text-[#edb138]">{label}</div>
    </div>
  );
}