import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import desktopBanner from "../../assets/aveesspecial/BANNER Re.gif";
import tabletBanner from "../../assets/aveesspecial/PHONE BANNER Re.gif";
import mobileBanner from "../../assets/aveesspecial/PHONE BANNER Re.gif";

export default function AveesSpecials() {
  // State to track current screen size
  const [bannerSrc, setBannerSrc] = useState(desktopBanner);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBannerSrc(mobileBanner);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setBannerSrc(tabletBanner);
        setIsMobile(false);
      } else {
        setBannerSrc(desktopBanner);
        setIsMobile(false);
      }
    };

    // Set initial image
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation variants for left-to-right motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Reduced for faster animation
        delayChildren: 0.1    // Reduced for faster animation
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: -100, // Reduced starting distance for faster appearance
      scale: 1.1 // Reduced scale for faster appearance
    },
    visible: {
      opacity: 1,
      x: 0, // Move to center
      scale: 1,
      transition: {
        duration: 0.8, // Reduced duration for faster animation
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 100, // Reduced exit distance for faster disappearance
      transition: {
        duration: 0.6, // Reduced duration for faster animation
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.section 
      className="relative w-full flex items-center justify-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: isMobile ? 0.01 : 0.05 }} // Even lower threshold for mobile
      variants={containerVariants}
    >
      {/* Responsive banner image with left-to-right animation */}
      <motion.img 
        src={bannerSrc} 
        alt="Avees Specials" 
        className="w-full h-full object-cover"
        loading="lazy"
        variants={imageVariants}
      />
    </motion.section>
  );
}