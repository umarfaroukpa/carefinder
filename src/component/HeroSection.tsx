import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '../component/auth/AuthContext';

export default function Hero() {
  const { currentUser, loading } = useAuth();
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Initialize default dimensions (will be updated on the client)
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  const springConfig = { stiffness: 100, damping: 30 };
  const transformX = useSpring(useTransform(mouseX, [0, windowWidth || 1000], [-10, 10]), springConfig); // Fallback to 1000 if windowWidth is 0
  const transformY = useSpring(useTransform(mouseY, [0, windowHeight || 1000], [-10, 10]), springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    if (mediaQuery.matches || isMobile) {
      mouseX.set(0);
      mouseY.set(0);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mouseX, mouseY]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-[80vh] sm:min-h-screen bg-gradient-to-br from-[#056968] via-[#04807D] to-[#02A69A]  py-12 sm:py-20 overflow-hidden relative"
    >
      <motion.div
        style={{ x: transformX.get() * -1, y: transformY.get() * -1 }}
        className="absolute left-16 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-0 hidden md:block"
      >
        <Image src="/hook.png" alt="Left Chain Hook" width={300} height={280} priority className="opacity-20" />
      </motion.div>

      <motion.div
        style={{ x: transformX, y: transformY }}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-0 hidden md:block"
      >
        <Image src="/hook.png" alt="Right Chain Hook" width={300} height={280} priority className="opacity-20 rotate-180" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#02A69A] rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#04807D] rounded-full blur-3xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-4 relative z-10">
        <motion.div variants={itemVariants} className="flex flex-col justify-center text-center md:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight"
          >
            Find Healthcare Near You
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-md mx-auto md:mx-0"
          >
            Carefinder helps you locate, book, and share hospital information across Nigeria.
          </motion.p>
          <motion.a
            variants={itemVariants}
            href={currentUser ? "/useraccount" : "/authpage"}
            aria-label="Get started with Carefinder"
            className="inline-block w-36 sm:w-40 bg-[#edb13b] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-[#f1c35e] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mx-auto md:mx-0"
          >
            {currentUser ? "Get Started" : "Get Started"}
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center mt-20 md:mt-0">
          <Image
            src="/bgs.png"
            alt="Healthcare Illustration"
            width={320}
            height={160}
            priority
            className="object-contain w-full max-w-[320px] sm:max-w-[400px]"
          />
        </motion.div>
      </div>
    </motion.header>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};