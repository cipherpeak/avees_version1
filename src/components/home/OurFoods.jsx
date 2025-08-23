import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import food1 from "../../assets/foods/RAH03819-min.JPG";
import food2 from "../../assets/foods/RAH03836-min.JPG";
import food3 from "../../assets/foods/RAH03850-min.JPG";
import food4 from "../../assets/foods/RAH03857-min.JPG";
import aveesLogo from "../../assets/logo/Avees main logo.png";
import { Star } from "lucide-react";

const HotelFoodsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.05 });
  const [activeCard, setActiveCard] = useState(null);

  const foodItems = [
    {
      id: 1,
      name: "Grilled Salmon Fillet",
      image: food4,
      rating: 5,
      description: "Fresh salmon with herbs and lemon butter sauce",
    },
    {
      id: 2,
      name: "Beef Wellington",
      image: food1,
      rating: 5,
      description: "Prime beef tenderloin wrapped in puff pastry",
    },
    {
      id: 3,
      name: "Lobster Thermidor",
      image: food2,
      rating: 5,
      description: "Lobster cooked in a rich cream sauce with cheese",
    },
    {
      id: 4,
      name: "Truffle Risotto",
      image: food3,
      rating: 5,
      description: "Creamy arborio rice with black truffle and parmesan",
    },
  ];

  const handleCardClick = (id) => {
    if (activeCard === id) {
      setActiveCard(null);
    } else {
      setActiveCard(id);
    }
  };

  // Animation variants for the cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  // Header animation variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const dividerVariants = {
    hidden: {
      width: 0,
    },
    visible: {
      width: "6rem",
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
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

  return (
    <motion.section
      ref={sectionRef}
      className="py-16 px-4 bg-background"
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Motion - Updated to match OurStory component */}
        <motion.div className="text-center mb-16" variants={containerVariants}>
          <motion.div className="inline-block mb-4" variants={headerVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block relative">
              AVEES FOODS
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-red-600"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </h1>
          </motion.div>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-8"
            variants={descriptionVariants}
          >
            Avees has in store for you a number of highly sought after
            delicacies of Kuttanad. They are handpicked from a region which has
            a unique geography - it lies several feet below the sea level - and
            owns a distinct culinary culture, which evolved in a setting of
            fresh water lakes, rivers and canals. Agricultural crops, fish and
            water - birds from the surrounding region have been freshly gathered
            and turned into exquisite cuisine in the Avees Kitchen, also known
            for maintaining the highest standards of cleanliness and hygiene.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {foodItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                scale: activeCard !== item.id ? 1.05 : 1,
                transition: { duration: 0.2 },
              }}
              className="food-card shadow-lg relative h-64 overflow-hidden group cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              <div
                className={`food-card-inner w-full h-full transition-transform duration-500 ${
                  activeCard === item.id ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of card - Full image */}
                <div className="food-card-front absolute inset-0 w-full h-full backface-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Back of card - Red background with name, logo, rating and button */}
                <div className="food-card-back absolute inset-0 backface-hidden bg-red-600 flex flex-col items-center justify-center p-4 rotate-y-180">
                  <div className="absolute md:top-4 top-0 left-0 md:left-4 w-12 h-12">
                    <img
                      src={aveesLogo || "/placeholder.svg"}
                      alt="Avees Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white text-center font-sans mb-2">
                    {item.name}
                  </h3>

                  <p className="text-white text-center text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Rating display */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-white"
                        }`}
                      />
                    ))}
                    <span className="text-white ml-2 text-sm">
                      {item.rating}
                    </span>
                  </div>

                  {/* Order button */}
                  <button
                    className="bg-white cursor-pointer text-red-600 font-semibold py-2 px-6 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle order action here
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            View Full Menu
          </button>
        </div>
      </div>

      {/* Add CSS for flip animation */}
      <style jsx>{`
        .food-card-inner {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </motion.section>
  );
};

export default HotelFoodsSection;
