import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import food1 from "../../assets/foods/RAH03819-min.JPG"
import food2 from "../../assets/foods/RAH03836-min.JPG"
import food3 from "../../assets/foods/RAH03850-min.JPG"
import food4 from "../../assets/foods/RAH03857-min.JPG"

const HotelFoodsSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

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

  // Animation variants for the cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 100, // Start from the right
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1, 
      x: 0, // End at normal position
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100, // Exit to the left
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
        staggerChildren: 0.15, // Delay between each card animation
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // Reverse order for exit
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-sans">Culinary Excellence</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience our chef's signature dishes crafted with the finest ingredients and presented with artistic flair
            in our elegant dining atmosphere.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {foodItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="food-card shadow-lg relative h-64 overflow-hidden group"
            >
              <div className="food-card-inner w-full h-full">
                {/* Front of card - Full image */}
                <div className="food-card-front absolute inset-0 w-full h-full">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>

                {/* Back of card - Name only */}
                <div className="food-card-back absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-2xl font-bold text-primary-foreground text-center px-4 font-sans">{item.name}</h3>
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