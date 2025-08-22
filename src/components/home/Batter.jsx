import { useEffect, useState } from "react";
import video1 from "../../assets/batters/avees red.mp4";
import video2 from "../../assets/batters/avees yellow.mp4";

export default function BatterSec() {
  const features = [
    {
      title: "Idile Batter",
      description: "Experience unparalleled efficiency with.",
      video: video1,
      cta: "Learn More"
    },
    {
      title: "Dosa Batter",
      description: "Our user-centered approach ensures seamless.",
      video: video2,
      cta: "Learn More"
    },
    {
      title: "Palappam Batter",
      description: "Connect effortlessly with your existing ecosy.",
      video: video1,
      cta: "Learn More"
    }
  ];

  return (
    <section className="bg-white py-16 px-4">
      {/* Header and Description */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Our Features
        </h2>
        <p className="text-gray-600 text-xl">
          Discover the amazing features that make our product stand out from the competition.
          Simple, intuitive, and designed with you in mind.
        </p>
      </div>

      {/* Feature Items */}
      <div className="container mx-auto space-y-14">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-10`}
          >
            {/* Video Section */}
            <div className="w-full md:max-w-lg md:w-2/5">
              <div className="rounded-xl overflow-hidden shadow-xl w-full aspect-square relative">
                <video 
                  className="w-full h-full object-cover absolute top-0 left-0" 
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={feature.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="w-full md:w-3/5">
              <div className={`${index % 2 === 0 ? 'pl-0 md:pl-10' : 'pr-0 md:pr-10'}`}>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{feature.title}</h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {feature.description}
                </p>
                <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium transition-colors duration-300">
                  {feature.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}