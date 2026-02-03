import { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { workshops, Workshop } from '../data/workshops';

interface WorkshopsSliderProps {
  onShowLogin: () => void;
}

export function WorkshopsSlider({ onShowLogin }: WorkshopsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % workshops.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + workshops.length) % workshops.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentWorkshop = workshops[currentIndex];

  return null;
}