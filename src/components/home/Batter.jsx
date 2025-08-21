import { useEffect, useState } from "react";
import desktopBanner from "../../assets/batters/Avees Motion.mp4";
import tabletBanner from "../../assets/aveesspecial/PHONE BANNER 06.webp";
import mobileBanner from "../../assets/aveesspecial/PHONE BANNER 06.webp";

export default function BatterSec() {
  const [bannerType, setBannerType] = useState("desktop");
  const isDesktop = bannerType === "desktop";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBannerType("mobile");
      } else if (window.innerWidth < 1024) {
        setBannerType("tablet");
      } else {
        setBannerType("desktop");
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative w-full max-h-[900px] min-h-[300px] flex items-center justify-center overflow-hidden">
      {isDesktop ? (
        // Video for desktop
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={desktopBanner} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Image for tablet and mobile
        <img 
          src={bannerType === "tablet" ? tabletBanner : mobileBanner} 
          alt="Avees Specials" 
          className="w-full h-full object-cover"
          loading="lazy" 
        />
      )}
    </section>
  );
}