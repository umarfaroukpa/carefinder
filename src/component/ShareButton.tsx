"use client";

import { Hospital } from "../types/Hospital";
import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  hospitals: Hospital[];
}

export default function ShareButton({ hospitals }: ShareButtonProps) {
  const handleShare = () => {
    if (hospitals.length === 0) {
      toast.error("No hospitals to share");
      return;
    }
    
    const text = `Found ${hospitals.length} hospitals on Carefinder! Top results: ${hospitals.slice(0, 3).map(h => h.name).join(", ")}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Carefinder Hospitals',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Results copied to clipboard!');
    }
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-6 py-3 bg-[#056968] hover:bg-[#047c78] text-white font-medium rounded-lg transition-colors shadow-sm"
      >
        <Share2 size={20} />
        Share {hospitals.length} Hospital{hospitals.length !== 1 ? 's' : ''}
      </button>
    </div>
  );
}