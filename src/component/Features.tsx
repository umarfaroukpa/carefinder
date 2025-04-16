import React from 'react';
import { Search, FileDown, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const iconContainerVariants = {
        hidden: { scale: 0.2, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.1
            }
        }
    };

    // For the icons to spin and pulse
    const iconVariants = {
        hidden: { rotate: -30, opacity: 0 },
        visible: {
            rotate: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        hover: {
            scale: 1.15,
            rotate: 15,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };



    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl font-bold text-[#056968] mb-4">Why Choose Carefinder?</h2>
                    <motion.div
                        className="h-1 w-24 bg-[#056968] mx-auto"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    ></motion.div>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Feature 1 */}
                    <motion.div
                        className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300"
                        variants={itemVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className="flex justify-center mb-6"
                            variants={iconContainerVariants}
                        >
                            <motion.div
                                className="p-4 bg-blue-100 rounded-full"
                                whileHover={{
                                    backgroundColor: ["hsl(210,100%,95%)", "hsl(210,100%,90%)", "hsl(210,100%,95%)"],
                                    transition: { duration: 1, repeat: Infinity }
                                }}
                            >
                                <motion.div variants={iconVariants} whileHover="hover">
                                    <Search size={32} className="text-[#056968]" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.h3
                            className="text-2xl font-semibold mb-4 text-center text-[#056968]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Easy Search
                        </motion.h3>
                        <motion.p
                            className="text-[#056968] text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Find hospitals near you with a simple search by city or region. Quick and user-friendly.
                        </motion.p>
                        <motion.div
                            className="w-0 h-1 bg-[#056968] mx-auto mt-6"
                            whileHover={{ width: "80%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300"
                        variants={itemVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className="flex justify-center mb-6"
                            variants={iconContainerVariants}
                        >
                            <motion.div
                                className="p-4 bg-green-100 rounded-full"
                                whileHover={{
                                    backgroundColor: ["hsl(140,100%,95%)", "hsl(140,100%,90%)", "hsl(140,100%,95%)"],
                                    transition: { duration: 1, repeat: Infinity }
                                }}
                            >
                                <motion.div variants={iconVariants} whileHover="hover">
                                    <FileDown size={32} className="text-[#edb13b]" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.h3
                            className="text-2xl font-semibold mb-4 text-center text-[#056968]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Export & Share
                        </motion.h3>
                        <motion.p
                            className="text-[#056968] text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Download hospital lists as CSV or share them with others via email or social media.
                        </motion.p>
                        <motion.div
                            className="w-0 h-1 bg-[#edb13b] mx-auto mt-6"
                            whileHover={{ width: "80%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="bg-white rounded-lg p-8 shadow-lg transition-all duration-300"
                        variants={itemVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className="flex justify-center mb-6"
                            variants={iconContainerVariants}
                        >
                            <motion.div
                                className="p-4 bg-purple-100 rounded-full"
                                whileHover={{
                                    backgroundColor: ["hsl(270,100%,95%)", "hsl(270,100%,90%)", "hsl(270,100%,95%)"],
                                    transition: { duration: 1, repeat: Infinity }
                                }}
                            >
                                <motion.div variants={iconVariants} whileHover="hover">
                                    <Settings size={32} className="text-[#056968]" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.h3
                            className="text-2xl font-semibold mb-4 text-center text-[#056968]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Admin Tools
                        </motion.h3>
                        <motion.p
                            className="text-[#056968] text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Admins can add and manage hospital data with full markdown support for rich content.
                        </motion.p>
                        <motion.div
                            className="w-0 h-1 bg-[#056968] mx-auto mt-6"
                            whileHover={{ width: "80%" }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}