"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const NaturalMedicineSection = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
                duration: 0.5
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.8
            }
        }
    };

    const quadrantVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                duration: 0.6
            }
        }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 1.2 }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
        },
        tap: { scale: 0.95 }
    };

    const shapeVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 8,
                stiffness: 100,
                duration: 0.8,
                delay: 0.3
            }
        }
    };

    return (
        <motion.div
            className="bg-[#e5e7eb] py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* Header */}
            <motion.header
                className="container mx-auto pt-8 pb-8 text-center"
                variants={headerVariants}
            >
                <h1 className="text-3xl font-serif text-[#056968] mb-4">We connect you to healthcare facilities across Nigeria for seamless access and care.</h1>
                <motion.p
                    className="text-lg text-[#056968] max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    We focus on the connection between the mind and body
                    and the power of alternative therapies to promote healing.
                </motion.p>
            </motion.header>

            {/* Four-quadrant feature section */}
            <section className="container mx-auto p-4 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Top left */}
                    <motion.div
                        className="flex"
                        variants={quadrantVariants}
                    >
                        <div className="w-1/2 p-6">
                            <h3 className="text-2xl font-serif text-[#056968] mb-3">Accessible</h3>
                            <p className="text-[#056968]">
                                Find hospitals near you, no matter where you are in Nigeria.
                            </p>
                        </div>
                        <div className="w-1/2 relative">
                            <motion.div
                                className="absolute inset-0 m-4 bg-[#056968] rounded-tl-full rounded-bl-full"
                                variants={shapeVariants}
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* Top right */}
                    <motion.div
                        className="flex flex-row-reverse"
                        variants={quadrantVariants}
                    >
                        <div className="w-1/2 p-6">
                            <h3 className="text-2xl font-serif text-[#056968] mb-3">Seamless Booking</h3>
                            <p className="text-[#056968]">
                                Book appointments with ease through our platform.
                            </p>
                        </div>
                        <div className="w-1/2 relative">
                            <motion.div
                                className="absolute inset-0 m-4 bg-[#edb13b] rounded-tr-full rounded-br-full"
                                variants={shapeVariants}
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom left */}
                    <motion.div
                        className="flex flex-row-reverse"
                        variants={quadrantVariants}
                    >
                        <div className="w-1/2 p-6">
                            <h3 className="text-2xl font-serif text-[#056968] mb-3">Emergency Ready</h3>
                            <p className="text-[#056968]">
                                Locate emergency services quickly when you need them most.
                            </p>
                        </div>
                        <div className="w-1/2 relative">
                            <motion.div
                                className="absolute inset-0 m-4 bg-[#edb13b] rounded-tl-full rounded-bl-full"
                                variants={shapeVariants}
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom right */}
                    <motion.div
                        className="flex"
                        variants={quadrantVariants}
                    >
                        <div className="w-1/2 p-6">
                            <h3 className="text-2xl font-serif text-[#056968] mb-3">Community Driven</h3>
                            <p className="text-[#056968]">
                                Share hospital information with others to help the community.
                            </p>
                        </div>
                        <div className="w-1/2 relative">
                            <motion.div
                                className="absolute inset-0 m-4 bg-[#056968] rounded-tr-full rounded-br-full"
                                variants={shapeVariants}
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Learn More button */}
                <div className="flex justify-center mt-8">
                    <motion.button
                        className="bg-[#edb13b] text-white font-medium py-3 px-8 rounded-full"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Learn More
                    </motion.button>
                </div>
            </section>
        </motion.div>
    );
};

export default NaturalMedicineSection;