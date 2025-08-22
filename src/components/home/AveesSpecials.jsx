import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import desktopBanner from "../../assets/aveesspecial/train go away.gif";
import tabletBanner from "../../assets/aveesspecial/PHONE BANNER 06.webp";
import mobileBanner from "../../assets/aveesspecial/PHONE BANNER 06.webp";

export default function AveesSpecials() {
  // State to track current screen size
  const [bannerSrc, setBannerSrc] = useState(desktopBanner);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBannerSrc(mobileBanner);
      } else if (window.innerWidth < 1024) {
        setBannerSrc(tabletBanner);
      } else {
        setBannerSrc(desktopBanner);
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
        staggerChildren: 0.5,
        delayChildren: 0.3
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
      x: -300, // Start from left
      scale: 1.2 
    },
    visible: {
      opacity: 1,
      x: 0, // Move to center
      scale: 1,
      transition: {
        duration: 1.0,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 300, // Exit to the right
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.section 
      className="relative w-full  flex items-center justify-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.05 }}
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
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