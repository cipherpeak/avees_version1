import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AdsVideos() {
  const products = [
    {
      id: 1,
      youtubeShortId: "Ky6Lc3Gn1Kc", 
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
      youtubeShortId: "Ug2PsbU-2X0",
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
      youtubeShortId: "TP_3I27H4Ng",
      videoPoster: "/videos/unsalted-peanuts-poster.png",
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
      youtubeShortId: "ROq7qXzrynk",
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
  const isInView = useInView(sectionRef, { once: false, amount: 0.05 }); // Reduced to 5% visibility threshold

  // Animation variants for the cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, // Changed from x:100 to y:50 for vertical entrance
      transition: {
        duration: 0.4, // Reduced duration for faster animation
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1, 
      y: 0, // End at normal position
      transition: {
        duration: 0.6, // Reduced duration for faster animation
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50, // Changed from x:-100 to y:-50 for vertical exit
      transition: {
        duration: 0.4, // Reduced duration for faster animation
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
        staggerChildren: 0.1, // Reduced delay between each card animation
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.08, // Reduced delay for exit
        staggerDirection: -1, // Reverse order for exit
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
            className="relative bg-white rounded-lg shadow-md overflow-hidden"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            {/* Changed aspect ratio from [3/4] to [9/16] for taller cards */}
            <div className="relative w-full aspect-[9/16] overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full object-cover"
                src={`https://www.youtube.com/embed/${product.youtubeShortId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&playlist=${product.youtubeShortId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={product.productName}
                loading="lazy"
              ></iframe>
              
            </div>
            
  
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}