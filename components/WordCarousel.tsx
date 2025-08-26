"use client";

import { useState, useEffect } from 'react';
import { carouselWords } from '@/lib/carousel-words';

interface WordCarouselProps {
  className?: string;
}

export function WordCarousel({ className = "" }: WordCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselWords.length);
    }, 3000); // Slower for smoother effect

    return () => clearInterval(interval);
  }, []);

  // Find the longest word to set container width
  const longestWord = carouselWords.reduce((longest, word) => 
    word.length > longest.length ? word : longest, ""
  );

  // Get the 7 words to display (3 before, current, 3 after) for smoother transitions
  const getDisplayWords = () => {
    const words = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + carouselWords.length) % carouselWords.length;
      words.push({
        word: carouselWords[index],
        position: i,
        key: `${index}-${currentIndex}`
      });
    }
    return words;
  };

  const displayWords = getDisplayWords();

  return (
    <span 
      className={`relative inline-block ${className}`} 
      style={{ 
        width: `${longestWord.length * 0.6}em`, // Dynamic width based on longest word
        height: '1.2em', // Back to normal text height
        verticalAlign: 'baseline' // Ensure baseline alignment
      }}
    >
      {displayWords.map(({ word, position, key }) => {
        // Calculate styles based on position - all words move upward
        let opacity = 0;
        let translateY = 0;
        let scale = 1;
        let zIndex = 1;

        switch (position) {
          case -3:
            opacity = 0.05;
            translateY = 90; // Further below
            scale = 0.85;
            zIndex = 1;
            break;
          case -2:
            opacity = 0.1;
            translateY = 60; // Below
            scale = 0.9;
            zIndex = 2;
            break;
          case -1:
            opacity = 0.25;
            translateY = 30; // Slightly below
            scale = 0.95;
            zIndex = 3;
            break;
          case 0: // Center word - exactly on baseline
            opacity = 1;
            translateY = 0;
            scale = 1;
            zIndex = 5;
            break;
          case 1:
            opacity = 0.25;
            translateY = -30; // Slightly above
            scale = 0.95;
            zIndex = 3;
            break;
          case 2:
            opacity = 0.1;
            translateY = -60; // Above
            scale = 0.9;
            zIndex = 2;
            break;
          case 3:
            opacity = 0.05;
            translateY = -90; // Further above
            scale = 0.85;
            zIndex = 1;
            break;
        }

        return (
          <span
            key={key}
            className="absolute left-0 top-0 transition-all duration-1000 ease-out whitespace-nowrap"
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              color: position === 0 ? 'inherit' : '#9CA3AF',
              zIndex,
              transformOrigin: 'left baseline',
            }}
          >
            {word}
          </span>
        );
      })}
      {/* Invisible baseline word to maintain proper spacing */}
      <span className="invisible">
        {longestWord}
      </span>
    </span>
  );
}
