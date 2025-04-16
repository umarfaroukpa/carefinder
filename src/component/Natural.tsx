"use client";

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
                    {/* Top left - Accessible */}
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
                                className="absolute inset-0 m-4 flex items-center justify-center"
                                variants={shapeVariants}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 5C25.2 5 5 25.2 5 50C5 74.8 25.2 95 50 95C74.8 95 95 74.8 95 50C95 25.2 74.8 5 50 5ZM75 55H55V75H45V55H25V45H45V25H55V45H75V55Z" fill="#056968"/>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Top right - Seamless Booking */}
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
                                className="absolute inset-0 m-4 flex items-center justify-center"
                                variants={shapeVariants}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M80 15H70V10C70 7.2 67.8 5 65 5H55C52.2 5 50 7.2 50 10V15H40V10C40 7.2 37.8 5 35 5H25C22.2 5 20 7.2 20 10V15H10C6.7 15 4 17.7 4 21V85C4 88.3 6.7 91 10 91H80C83.3 91 86 88.3 86 85V21C86 17.7 83.3 15 80 15ZM59 10H61V25H59V10ZM29 10H31V25H29V10ZM80 85H10V35H80V85ZM80 29H10V21H20V25C20 27.8 22.2 30 25 30H35C37.8 30 40 27.8 40 25V21H50V25C50 27.8 52.2 30 55 30H65C67.8 30 70 27.8 70 25V21H80V29Z" fill="#edb13b"/>
                                    <path d="M30 45H20V55H30V45Z" fill="#edb13b"/>
                                    <path d="M50 45H40V55H50V45Z" fill="#edb13b"/>
                                    <path d="M70 45H60V55H70V45Z" fill="#edb13b"/>
                                    <path d="M30 65H20V75H30V65Z" fill="#edb13b"/>
                                    <path d="M50 65H40V75H50V65Z" fill="#edb13b"/>
                                    <path d="M70 65H60V75H70V65Z" fill="#edb13b"/>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom left - Emergency Ready */}
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
                                className="absolute inset-0 m-4 flex items-center justify-center"
                                variants={shapeVariants}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M85 35L65 35L57.5 15C56.3 11.9 53.3 10 50 10C46.7 10 43.7 11.9 42.5 15L35 35L15 35C11.7 35 9 37.7 9 41C9 41.8 9.2 42.5 9.4 43.2L18.4 75.2C19.8 79.8 24 83 29 83L71 83C75.9 83 80.2 79.8 81.6 75.2L90.6 43.2C90.8 42.5 91 41.8 91 41C91 37.7 88.3 35 85 35ZM50 25C51.7 25 53 26.3 53 28C53 29.7 51.7 31 50 31C48.3 31 47 29.7 47 28C47 26.3 48.3 25 50 25ZM50 70C43.4 70 38 64.6 38 58C38 51.4 43.4 46 50 46C56.6 46 62 51.4 62 58C62 64.6 56.6 70 50 70Z" fill="#edb13b"/>
                                    <path d="M51 51L49 51L49 56L44 56L44 58L49 58L49 63L51 63L51 58L56 58L56 56L51 56L51 51Z" fill="#edb13b"/>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom right - Community Driven */}
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
                                className="absolute inset-0 m-4 flex items-center justify-center"
                                variants={shapeVariants}
                            >
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M60 25C60 31.6 54.6 37 48 37C41.4 37 36 31.6 36 25C36 18.4 41.4 13 48 13C54.6 13 60 18.4 60 25Z" fill="#056968"/>
                                    <path d="M74 35C77.9 35 81 31.9 81 28C81 24.1 77.9 21 74 21C70.1 21 67 24.1 67 28C67 31.9 70.1 35 74 35Z" fill="#056968"/>
                                    <path d="M22 35C25.9 35 29 31.9 29 28C29 24.1 25.9 21 22 21C18.1 21 15 24.1 15 28C15 31.9 18.1 35 22 35Z" fill="#056968"/>
                                    <path d="M30 44.6C26.4 42.1 21.7 42.3 18.4 45.1C13.5 49.4 11 55.9 11 63V77L11.2 77.1L13.9 78.2C19.3 80.5 24.2 81.9 29 82.7V63C29 56.1 30.9 49.8 34.3 44.7C32.8 44.8 31.4 44.8 30 44.6V44.6Z" fill="#056968"/>
                                    <path d="M77.6 45.1C74.2 42.3 69.6 42.1 66 44.6C64.6 44.8 63.1 44.8 61.7 44.7C65.1 49.8 67 56.1 67 63V82.7C71.8 81.9 76.7 80.5 82.1 78.2L84.8 77.1L85 77V63C85 55.9 82.5 49.4 77.6 45.1Z" fill="#056968"/>
                                    <path d="M61 41.9C57.9 39.5 53.8 38 49.5 38H46.5C38.5 38 32 44.5 32 52.5V82.9C39.6 84.4 44.5 85 48 85C51.5 85 56.4 84.4 64 82.9V52.5C64 48.2 62.9 44.8 61 41.9Z" fill="#056968"/>
                                </svg>
                            </motion.div>
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