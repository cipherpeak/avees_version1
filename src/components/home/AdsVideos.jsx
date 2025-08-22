import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import first from "../../assets/adsvdo/AVEES RECIPE FINAL V2.mp4"
import second from "../../assets/adsvdo/AVEES RESTAURANT FINAL.mp4"
import third from "../../assets/adsvdo/Duck mappaas.mp4"
import four from "../../assets/adsvdo/Karimeen Thekathu.mp4"

export default function AdsVideos() {
  const products = [
    {
      id: 1,
      videoSrc: first, // Changed from YouTube ID to local path
      videoPoster: "/videos/kokum-rasam-poster.png",
      overlayTitle: "Kokum Rasam",
      productIcon: "/icons/kokum-rind-icon.png",
      productName: "Urban Platter Dried Kokum Rinds, 100g",
      currentPrice: "₹ 395",
      oldPrice: "₹ 400",
      discount: "1% off",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      videoSrc: four, // Changed from YouTube ID to local path
      videoPoster: "/videos/kokum-rind-powder-poster.png",
      overlayTitle: null,
      productIcon: "/icons/kokum-powder-icon.png",
      productName: "Urban Platter Kokum Rind Powder, 100g",
      currentPrice: "₹ 295",
      oldPrice: "₹ 300",
      discount: "2% off",
      rating: 4.2,
      reviews: 86,
    },
    {
      id: 3,
      videoSrc: third, // Changed from YouTube ID to local path
      videoPoster: four,
      overlayTitle: null,
      productIcon: "/icons/roasted-peanuts-icon.png",
      productName: "Urban Platter Roasted Unsalted Peanuts, 1kg",
      currentPrice: "₹ 545",
      oldPrice: "₹ 550",
      discount: "1% off",
      rating: 4.7,
      reviews: 215,
    },
    {
      id: 4,
      videoSrc: second, // Changed from YouTube ID to local path
      videoPoster: "/videos/fysh-sauce-poster.png",
      overlayTitle: null,
      productIcon: "/icons/fysh-sauce-icon.png",
      productName: "Urban Platter Fysh Sauce [Plant Based], 250ml",
      currentPrice: "₹ 443",
      oldPrice: "₹ 450",
      discount: "2% off",
      rating: 4.3,
      reviews: 157,
    },
  ];

  // Reference and inView hook for the entire section
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.05 });

  // Animation variants for the cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-8 px-4 md:py-12 md:px-6 lg:px-8"
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
    >
      <h2 className="text-center text-2xl md:text-4xl font-bold text-black mb-8 md:mb-12">SHOP THE BEST</h2>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {products.map((product) => (
          <motion.div 
            key={product.id} 
            className="relative bg-white rounded-lg shadow-md overflow-hidden group"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative w-full aspect-[9/16] overflow-hidden">
              {/* Video element with controls and auto-play */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                poster={product.videoPoster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={product.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Optional: Add a play button overlay for better UX */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black bg-opacity-40 rounded-full p-2">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Product info overlay (if needed) */}
            {product.overlayTitle && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                <h3 className="font-bold text-lg">{product.overlayTitle}</h3>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}