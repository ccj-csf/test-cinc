"use client";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import "./Marquee.css";
interface MarqueeTextProps {
  text: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useLayoutEffect(() => {
    const node = textRef.current;
    if (node) {
      setShouldAnimate(node.scrollWidth > node.clientWidth);
    }
  }, [text]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const node = textRef.current;

      if (node) {
        setShouldAnimate(node.scrollWidth > node.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        ref={textRef}
        className={`transition-transform duration-300 ease-linear ${
          shouldAnimate ? "animate" : ""
        }`}
      >
        {text}
        {shouldAnimate && text}
      </div>
    </div>
  );
};

export default MarqueeText;
