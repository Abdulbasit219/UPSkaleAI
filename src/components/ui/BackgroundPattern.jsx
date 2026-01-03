"use client";
import React from "react";
import { useSelector } from "react-redux";


const createPatternUrl = (strokeColor) => {
  const svg = `
    <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="${strokeColor}" stroke-width="0.5" opacity="0.03"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  `;
  return `url("data:image/svg+xml;base64,${btoa(svg)}")`;
};

export default function BackgroundPattern() {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const darkColor = "white"; 
  const lightColor = "gray"; 

  const backgroundUrl = createPatternUrl(isDark ? darkColor : lightColor);
  const opacity = isDark ? 0.3 : 0.2;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: backgroundUrl,
        opacity,
        zIndex: 0,
      }}
    />
  );
}
