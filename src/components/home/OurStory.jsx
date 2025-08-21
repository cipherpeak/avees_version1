import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ourstorybanner from "../../assets/ourstory/1640X922.63 (02) (1).webp";
import ourstorybannerMobile from "../../assets/ourstory/PHONE BANNER 07.webp"; 

function OurStory() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useEffect to handle media query on client side only
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Set loaded to true after a small delay to ensure proper rendering
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants with exit animations
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
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 300,
      scale: 1.2 
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -300, // Exit to the left
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };

  const overlayVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 0.3,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut"
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

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: -300
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.0,
        duration: 1.0,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -300, // Exit to the left
      transition: {
        duration: 0.7,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 50, // Exit downward
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    }
  };

  // Don't render until we've determined the screen size
  if (!isLoaded) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-3">
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      </section>
    );
  }

  return (
    <motion.section 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden group mt-3"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.5 }} // Changed once to false
      variants={containerVariants}
    >
      {/* Background Image */}
      <motion.div
        className="w-full h-full"
        variants={imageVariants}
      >
        <img
          src={isMobile ? ourstorybannerMobile : ourstorybanner}
          alt="Our Story Banner"
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/30"
        variants={overlayVariants}
      />

      {/* Content Container */}
      <motion.div 
        className="absolute flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-white"
        variants={contentVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold inline-block relative">
            Our Story
            <motion.span 
              className="absolute -bottom-2 sm:-bottom-3 left-0 h-1 bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 2.5, duration: 1.2 }}
            />
          </h1>
        </motion.div>

        <motion.div 
          className={`flex flex-col items-start w-full ${isMobile ? 'max-w-full' : 'max-w-[90%] md:max-w-[80%] lg:max-w-[50%]'} mt-9 bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl lg:backdrop-blur-lg border border-white/20 shadow-2xl`}
          variants={itemVariants}
          whileHover={{ 
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)"
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 md:mb-8 text-left leading-relaxed">
            {isMobile ? (
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis cumque, harum quas soluta expedita fuga labore excepturi tenetur provident corporis odit aspernatur.
              </>
            ) : (
              <>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda sit officia eveniet eaque facilis. Rem unde et sint quaerat soluta? Debitis perferendis quos ratione quibusdam voluptatibus, tempore expedita labore minima. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </>
            )}
            Avees is a passionate team dedicated to creating innovative solutions that
          </p>

          <motion.button 
            className="relative px-6 py-2 sm:px-8 sm:py-3 bg-red-600 text-white font-semibold rounded-lg overflow-hidden"
            variants={itemVariants}
            whileHover={{ 
              backgroundColor: "#b91c1c",
              boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-sm sm:text-base">Know More</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default OurStory;