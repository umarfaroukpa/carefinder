import React from 'react';
import { MapPin, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
            }
        }
    };

    const numberVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    // For the connecting lines
    const lineVariants = {
        hidden: { scaleX: 0, originX: 0 },
        visible: {
            scaleX: 1,
            transition: { duration: 0.8, delay: 0.5 }
        }
    };

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl font-bold text-[#056968] mb-4">How It Works</h2>
                    <motion.div
                        className="h-1 w-24 bg-[#056968] mx-auto"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    ></motion.div>
                    <motion.p
                        className="mt-6 text-[#056968] max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        Follow these simple steps to find and connect with healthcare providers near you.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div className="relative" variants={itemVariants}>
                        <div className="flex justify-center mb-8">
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-[#056968] text-white text-2xl font-bold shadow-lg"
                                variants={numberVariants}
                            >
                                1
                            </motion.div>
                        </div>
                        <div className="hidden md:block absolute top-8 left-56 w-full h-0.5 bg-blue-200 transform -translate-x-4">
                            <motion.div
                                className="w-full h-full bg-[#056968]"
                                variants={lineVariants}
                            ></motion.div>
                        </div>
                        <div className="text-center">
                            <motion.div
                                className="flex justify-center mb-4"
                                variants={iconVariants}
                            >
                                <MapPin size={28} className="text-[#056968]" />
                            </motion.div>
                            <h3 className="text-2xl font-semibold mb-4 text-[#056968]">Search</h3>
                            <p className="text-[#056968]">Enter your location or criteria to find nearby hospitals that meet your needs.</p>
                        </div>
                    </motion.div>

                    <motion.div className="relative" variants={itemVariants}>
                        <div className="flex justify-center mb-8">
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-[#056968] text-white text-2xl font-bold shadow-lg"
                                variants={numberVariants}
                            >
                                2
                            </motion.div>
                        </div>
                        <div className="hidden md:block absolute top-8 left-56 w-full h-0.5 bg-blue-200 transform -translate-x-4">
                            <motion.div
                                className="w-full h-full bg-[#056968]"
                                variants={lineVariants}
                            ></motion.div>
                        </div>
                        <div className="text-center">
                            <motion.div
                                className="flex justify-center mb-4"
                                variants={iconVariants}
                            >
                                <Calendar size={28} className="text-[#056968]" />
                            </motion.div>
                            <h3 className="text-2xl font-semibold mb-4 text-[#056968]">Book</h3>
                            <p className="text-[#056968]">Schedule an appointment with your chosen hospital quickly and conveniently.</p>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <div className="flex justify-center mb-8">
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-[#056968] text-white text-2xl font-bold shadow-lg"
                                variants={numberVariants}
                            >
                                3
                            </motion.div>
                        </div>
                        <div className="text-center">
                            <motion.div
                                className="flex justify-center mb-4"
                                variants={iconVariants}
                            >
                                <Share2 size={28} className="text-[#056968]" />
                            </motion.div>
                            <h3 className="text-2xl font-semibold mb-4 text-[#056968]">Share</h3>
                            <p className="text-[#056968]">Share hospital details and your experience with friends or family members.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}