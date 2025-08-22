"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration
}) => {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [lines, setLines] = useState([]);

  // Split text into lines based on newline characters
  useEffect(() => {
    if (text) {
      setLines(text.split('\n'));
    }
  }, [text]);

  // Update mask position every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random positions within the SVG
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      
      setMaskPosition({
        cx: `${randomX}%`,
        cy: `${randomY}%`,
      });
    }, 300); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 300 ${100 + (lines.length > 0 ? (lines.length - 1) * 30 : 0)}`}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="select-none">
      <defs>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 1, ease: "easeOut" }}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      
      {/* First text layer (hidden when not hovered) */}
      {lines.map((line, index) => (
        <text
          key={`hidden-${index}`}
          x="50%"
          y={50 + (index * 30)}
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent stroke-red-600  text-4xl font-bold"
          style={{ opacity: hovered ? 0.7 : 0 }}>
          {line}
        </text>
      ))}
      
      {/* Animated outline text */}
      {lines.map((line, index) => (
        <motion.text
          key={`outline-${index}`}
          x="50%"
          y={50 + (index * 30)}
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          className="fill-transparent stroke-red-600  text-4xl font-bold dark:stroke-red-600"
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{
            strokeDashoffset: 0,
            strokeDasharray: 1000,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
          }}>
          {line}
        </motion.text>
      ))}
      
      {/* Main text with mask effect */}
      {lines.map((line, index) => (
        <text
          key={`main-${index}`}
          x="50%"
          y={50 + (index * 30)}
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.3"
          mask="url(#textMask)"
          className="fill-red-600 stroke-red-600  text-4xl font-bold ">
          {line}
        </text>
      ))}
    </svg>
  );
};