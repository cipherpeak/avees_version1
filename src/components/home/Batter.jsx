import { useEffect, useState, useRef } from "react";
import video1 from "../../assets/batters/avees red.mp4";
import video2 from "../../assets/batters/avees yellow.mp4";
import video3 from "../../assets/batters/Comp 1 (1).mp4";
import { TextHoverEffect } from "../ui/text-hover-effect";
import { motion, useInView } from "framer-motion";

export default function BatterSec() {
  const features = [
    {
      title: "Idli Batter",
      video: video1,
      description: "Perfectly fermented batter for soft, fluffy idlis every time."
    },
    {
      title: "Dosa Batter",
      video: video2,
      description: "Crispy, golden dosas made from our traditional recipe."
    },
    {
      title: "Palappam Batter",
      video: video3,
      description: "Authentic batter for soft and lacy appams with perfect edges."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-white to-amber-50 py-16 px-4 md:py-24 lg:py-28 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 md:mb-16 lg:mb-20"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="mb-6 md:mb-8">
            <TextHoverEffect text="AVEES  BATTERS" duration={0.3} />
          </div>
          
          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed -mt-9 px-4 md:px-0"
            variants={descriptionVariants}
          >
            Experience our chef's signature batters crafted with the finest ingredients 
            using traditional methods for authentic South Indian flavors. Our carefully 
            fermented batters bring the taste of homemade goodness to your kitchen.
          </motion.p>
        </motion.div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center group"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              {/* Video Container with Hover Effect */}
              <div className="w-full aspect-square max-w-md relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                
                <video 
                  className="w-full h-full object-cover absolute top-0 left-0 transform group-hover:scale-105 transition-transform duration-700" 
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={feature.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl md:text-2xl font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Title for Mobile */}
              <div className="mt-4 md:hidden">
                <h3 className="text-xl font-bold text-gray-800 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center mt-1 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <button className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Explore All Batters
          </button>
        </motion.div>
      </div>
    </section>
  );
}