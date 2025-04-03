import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import bgImage from '../../public/bgs.png';
import hookImage from '../../public/hook.png';

export default function Hero() {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30 };
    const transformX = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
    const transformY = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
            mouseX.set(event.clientX - rect.left);
            mouseY.set(event.clientY - rect.top);
        }
    };

    // Disable parallax on mobile or reduced motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const isMobile = window.innerWidth < 768;
        if (mediaQuery.matches || isMobile) {
            mouseX.set(0);
            mouseY.set(0);
        }
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <motion.header
            ref={containerRef}
            onMouseMove={handleMouseMove}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full min-h-screen bg-gradient-to-br from-[#056968] via-[#04807D] to-[#02A69A] py-20 overflow-hidden relative"
        >
            <motion.div
                style={{ x: transformX.get() * -1, y: transformY.get() * -1 }}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-0"
            >
                <Image src={hookImage} alt="Left Chain Hook" width={420} height={400} priority className="opacity-30" />
            </motion.div>

            <motion.div
                style={{ x: transformX, y: transformY }}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-0"
            >
                <Image src={hookImage} alt="Right Chain Hook" width={420} height={400} priority className="opacity-30 rotate-180" />
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#02A69A] rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#04807D] rounded-full blur-3xl"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto pl-12 px-4 relative z-10">
                <motion.div variants={itemVariants} className="flex flex-col justify-center">
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight"
                    >
                        Find Healthcare Near You
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 mb-8">
                        Carefinder helps you locate, book, and share hospital information across Nigeria.
                    </motion.p>
                    <motion.a
                        variants={itemVariants}
                        href="#booking"
                        aria-label="Get started with Carefinder"
                        className="inline-block w-40 bg-[#edb13b] text-white px-8 py-3 rounded-lg hover:bg-[#f1c35e] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Get Started
                    </motion.a>
                </motion.div>

                <motion.div variants={itemVariants} className="hidden md:flex items-center justify-center">
                    <Image src={bgImage} alt="Healthcare Illustration" width={400} height={200} priority className="object-contain" />
                </motion.div>
            </div>
        </motion.header>
    );
}