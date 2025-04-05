"use client";

import React from 'react';
import { FaSearch, FaPlay, FaUserMd, FaExclamationTriangle } from 'react-icons/fa';

const FloatingActionBar = () => {
    return (
        <div className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl px-4 z-20">
            <div className="bg-[#056968] rounded-full shadow-lg flex justify-around items-center py-4 px-6">
                <button className="flex flex-col items-center text-[#edb13b]  hover:text-white transition-colors duration-300 transform hover:-translate-y-1">
                    <FaSearch size={20} />
                    <span className="text-xs mt-1">Search</span>
                </button>
                <button className="flex flex-col items-center text-[#edb13b]  hover:text-white transition-colors duration-300 transform hover:-translate-y-1">
                    <FaPlay size={20} />
                    <span className="text-xs mt-1">Get Started</span>
                </button>
                <button className="flex flex-col items-center text-[#edb13b]  hover:text-white transition-colors duration-300 transform hover:-translate-y-1">
                    <FaUserMd size={20} />
                    <span className="text-xs mt-1">Find Doctors</span>
                </button>
                <button className="flex flex-col items-center text-[#edb13b] hover:text-white transition-colors duration-300 transform hover:-translate-y-1">
                    <FaExclamationTriangle size={20} />
                    <span className="text-xs mt-1">Emergency</span>
                </button>
            </div>
        </div>
    );
};

export default FloatingActionBar;
