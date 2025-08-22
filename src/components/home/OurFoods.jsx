import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import food1 from "../../assets/foods/RAH03819-min.JPG"
import food2 from "../../assets/foods/RAH03836-min.JPG"
import food3 from "../../assets/foods/RAH03850-min.JPG"
import food4 from "../../assets/foods/RAH03857-min.JPG"
import aveesLogo from "../../assets/logo/Avees main logo.png" 

const HotelFoodsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.05 })
  const [activeCard, setActiveCard] = useState(null)

  const foodItems = [
    {
      id: 1,
      name: "Grilled Salmon Fillet",
      image: food4,
    },
    {
      id: 2,
      name: "Beef Wellington",
      image: food1,
    },
    {
      id: 3,
      name: "Lobster Thermidor",
      image: food2,
    },
    {
      id: 4,
      name: "Truffle Risotto",
      image: food3,
    },
  ]

  const handleCardClick = (id) => {
    if (activeCard === id) {
      setActiveCard(null)
    } else {
      setActiveCard(id)
    }
  }

  // Animation variants for the cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  // Stagger animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      }
    }
  }

  // Header animation variants
  const headerVariants = {
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
    }
  }

  const dividerVariants = {
    hidden: { 
      width: 0 
    },
    visible: { 
      width: "6rem",
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }

  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 px-4 bg-background"
      initial="hidden"
      animate={isInView ? "visible" : "exit"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Motion */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl md:text-9xl font-bold text-foreground mb-4"
            variants={headerVariants}
          >
            CULINARY EXCELLENCE
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto mb-6"
            variants={dividerVariants}
          ></motion.div>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={descriptionVariants}
          >
            Experience our chef's signature dishes crafted with the finest ingredients and presented with artistic flair
            in our elegant dining atmosphere.
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
                transition: { duration: 0.2 }
              }}
              className="food-card shadow-lg relative h-64 overflow-hidden group cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              <div className={`food-card-inner w-full h-full transition-transform duration-500 ${activeCard === item.id ? 'rotate-y-180' : ''}`}>
                {/* Front of card - Full image */}
                <div className="food-card-front absolute inset-0 w-full h-full backface-hidden">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Back of card - Red background with name and logo */}
                <div className="food-card-back absolute inset-0 backface-hidden bg-red-600 flex flex-col items-center justify-center p-4 rotate-y-180">
                  <div className="absolute top-2 right-2 w-10 h-10">
                    <img 
                      src={aveesLogo || "/placeholder.svg"} 
                      alt="Avees Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center font-sans">{item.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            View Full Menu
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default HotelFoodsSection