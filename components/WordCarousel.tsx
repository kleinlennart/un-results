"use client";

import { useState, useEffect } from 'react';
import carouselWords from '@/lib/action_words.json';

interface WordCarouselProps {
  className?: string;
}

const START_DELAY = 300;
const TICK_INTERVAL = 3000;
const MOTION = "duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)]";

// A word waits invisibly one line below, rises into place, then drifts up and
// fades away. Index 0 is the current word, the rest are the lines above it.
const WAITING_STYLE = { opacity: 0, scale: 1 };
const WORD_STYLES = [
  { opacity: 1, scale: 1 },
  { opacity: 0.14, scale: 0.95 },
  { opacity: 0.07, scale: 0.9 },
  { opacity: 0.03, scale: 0.85 },
  { opacity: 0, scale: 0.8 },
];
const REACH = WORD_STYLES.length - 1;

function shuffled(words: string[]) {
  const result = [...words];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function WordCarousel({ className = "" }: WordCarouselProps) {
  // Start with a fixed order to avoid hydration mismatch
  const [order, setOrder] = useState(carouselWords);
  // Number of the current word, counting up forever. At -1 the first word is
  // still waiting below, so the server renders nothing visible.
  const [step, setStep] = useState(-1);

  // Shuffle only on the client after hydration, then bring in the first word
  useEffect(() => {
    const start = setTimeout(() => {
      setOrder(shuffled(carouselWords));
      setStep(0);
    }, START_DELAY);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => clearTimeout(start);
    }

    const interval = setInterval(() => {
      setStep((prevStep) => prevStep + 1);
    }, TICK_INTERVAL);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, []);

  // Find the longest word to set container width
  const longestWord = carouselWords.reduce((longest, word) =>
    word.length > longest.length ? word : longest, ""
  );

  // Get the fading words above the current one, plus the one waiting below
  const getDisplayWords = () => {
    const words = [];
    for (let n = Math.max(step - REACH, 0); n <= step + 1; n++) {
      words.push({
        word: order[n % order.length],
        position: n - step,
        key: n
      });
    }
    return words;
  };

  const displayWords = getDisplayWords();

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        width: `${longestWord.length * 0.6}em`,
        height: '1.2em',
        verticalAlign: 'baseline'
      }}
    >
      {displayWords.map(({ word, position, key }) => {
        const { opacity, scale } = position > 0 ? WAITING_STYLE : WORD_STYLES[-position];

        return (
          <span
            key={key}
            aria-hidden={position !== 0}
            className={`absolute left-0 top-0 whitespace-nowrap transition-[transform,opacity] motion-reduce:transition-none ${MOTION}`}
            style={{
              opacity,
              transform: `translateY(${position * 1.25}em) scale(${scale})`,
              zIndex: position === 0 ? 1 : 0,
              transformOrigin: 'left center',
            }}
          >
            {word}
          </span>
        );
      })}

      {/* Invisible baseline word to maintain proper spacing */}
      <span className="invisible">{longestWord}</span>
    </span>
  );
}
