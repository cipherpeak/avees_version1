import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import desktopBanner from "../../assets/aveesspecial/train go away5.mp4";
import tabletBanner from "../../assets/aveesspecial/PHONE BANNER Re4.mp4";
import mobileBanner from "../../assets/aveesspecial/PHONE BANNER Re4.mp4";

export default function AveesSpecials() {
  const [bannerSrc, setBannerSrc] = useState(desktopBanner);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log("Autoplay prevented:", error);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, [bannerSrc]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const videoVariants = {
    hidden: { opacity: 0, x: -100, scale: 1.1 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { opacity: 0, x: 100, transition: { duration: 0.6, ease: "easeIn" } }
  };

  return (
    <motion.section
      className="relative w-full flex items-center justify-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: isMobile ? 0.01 : 0.05 }}
      variants={containerVariants}
    >
      {/* Responsive banner video */}
      <motion.video
        ref={videoRef}
        src={bannerSrc}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
        variants={videoVariants}
      />

<div className="absolute bottom-2 lg:bottom-8 w-full flex justify-center z-10">
  <button className="lg:px-6 lg:py-3 px-4 py-1 cursor-pointer bg-red-600 text-white border border-red-600 text-sm md:text-xl font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
    Explore Our Puttu
  </button>
</div>

    </motion.section>
  );
}
