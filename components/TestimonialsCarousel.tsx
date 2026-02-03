import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-94lqq5fqrh';

interface Testimonial {
  name: string;
  role: string;
  course: string;
  text: string;
  rating: number;
  image: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  return (
    <div className="content-stretch flex flex-col gap-[16px] md:gap-[20px] items-center relative w-full max-w-full overflow-visible m-0 px-2 md:px-4 py-4">
      {/* Main Testimonial Card */}
      <div className="relative w-full">
        <div className="min-h-[380px] sm:min-h-[320px] md:min-h-[280px] lg:min-h-[280px] relative rounded-[16px] md:rounded-[20px] lg:rounded-[24.784px] w-full" style={{ backgroundImage: "linear-gradient(164.585deg, rgb(249, 250, 251) 0%, rgb(255, 255, 255) 100%)" }}>
          <div className="overflow-visible relative rounded-[inherit] size-full">
            {/* Navigation Buttons Container - Inside */}
            <div className="absolute content-stretch flex h-[40px] md:h-[45px] lg:h-[49.568px] items-center justify-between left-2 right-2 sm:left-3 sm:right-3 md:left-4 md:right-4 lg:left-[20px] lg:right-[20px] top-1/2 -translate-y-1/2 z-10">
              {/* Left Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className="bg-[#35b8bd] relative rounded-full shrink-0 size-[38px] sm:size-[40px] md:size-[45px] lg:size-[49.568px] flex items-center justify-center transition-transform"
                style={{ boxShadow: '0px 0px 22.948px 0px rgba(0,0,0,0.3)' }}
              >
                <ChevronLeft className="size-[18px] sm:size-[20px] md:size-[22px] lg:size-[24.784px] text-white" strokeWidth={2.065} />
              </motion.button>

              {/* Right Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className="bg-[#35b8bd] relative rounded-full shrink-0 size-[38px] sm:size-[40px] md:size-[45px] lg:size-[49.568px] flex items-center justify-center transition-transform"
                style={{ boxShadow: '0px 0px 22.948px 0px rgba(0,0,0,0.3)' }}
              >
                <ChevronRight className="size-[18px] sm:size-[20px] md:size-[22px] lg:size-[24.784px] text-white" strokeWidth={2.065} />
              </motion.button>
            </div>
            {/* Quote Icon Decoration - Top Left */}
            <div className="absolute left-3 sm:left-4 lg:left-[36px] size-[40px] sm:size-[45px] md:size-[50px] lg:size-[60px] top-3 sm:top-4 lg:top-[36px] z-0">
              <div className="absolute inset-[-5.56%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82.6136 82.6135">
                  <g>
                    <path d={svgPaths.p3c2a86d0} stroke="#0B95BA" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.39" strokeWidth="8.26135" />
                    <path d={svgPaths.p34219340} stroke="#0B95BA" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.39" strokeWidth="8.26135" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Content Frame */}
            <div className="px-12 sm:px-14 md:px-16 lg:px-[90px] py-6 sm:py-7 md:py-8 lg:py-[45px] w-full h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="content-stretch flex flex-col md:flex-row gap-5 sm:gap-5 md:gap-6 lg:gap-[40px] items-center w-full"
                >
                  {/* Profile Image Container */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative shrink-0 size-[80px] sm:size-[90px] md:size-[100px] lg:size-[130px]"
                  >
                    {/* Decorative blur background */}
                    <div className="absolute bg-[rgba(255,255,255,0.8)] blur-[22.03px] left-[-8.26px] opacity-20 rounded-full size-[96px] sm:size-[106px] md:size-[116px] lg:size-[146px] top-[-8.26px]" />

                    {/* Image - Removed overflow-clip to show shadow properly */}
                    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-center justify-center left-0 rounded-full size-[80px] sm:size-[90px] md:size-[100px] lg:size-[130px] top-0" style={{ boxShadow: '0px 0px 22.948px 0px rgba(0,0,0,0.3)' }}>
                      <div className="h-full relative shrink-0 w-full overflow-hidden rounded-full">
                        <ImageWithFallback
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="absolute inset-0 max-w-none object-cover object-center pointer-events-none size-full"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="content-stretch flex flex-col gap-[10px] sm:gap-[11px] md:gap-[12px] lg:gap-[14px] items-start md:items-start flex-1 w-full max-w-full overflow-hidden"
                  >
                    {/* Stars */}
                    <div className="content-stretch flex gap-[3px] sm:gap-[4px] h-[16px] sm:h-[17px] md:h-[18px] lg:h-[20px] items-start shrink-0">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <div key={i} className="relative shrink-0 size-[16px] sm:size-[17px] md:size-[18px] lg:size-[20px]">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6534 20.6534">
                            <g>
                              <path d={svgPaths.p1d0f7400} fill="#FDC700" stroke="#FDC700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72111" />
                            </g>
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* Quote Text */}
                    <div className="relative shrink-0 w-full overflow-hidden">
                      <p className="font-normal italic leading-relaxed text-[#1e2939] text-sm sm:text-base lg:text-lg text-justify wrap-break-word">
                        "{testimonials[currentIndex].text}"
                      </p>
                    </div>

                    {/* Author Info Container */}
                    <div className="content-stretch flex flex-col gap-1 sm:gap-1.5 items-start w-full overflow-hidden mt-2 sm:mt-3">
                      {/* Name */}
                      <div className="relative shrink-0 w-full overflow-hidden">
                        <p className="font-semibold leading-tight not-italic text-[#111827] text-base sm:text-lg truncate">
                          {testimonials[currentIndex].name}
                        </p>
                      </div>

                      {/* Role */}
                      <div className="relative shrink-0 w-full overflow-hidden">
                        <p className="font-normal leading-relaxed not-italic text-[#35b8bd] text-sm sm:text-base truncate">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>

                      {/* Course */}
                      <div className="relative shrink-0 w-full overflow-hidden">
                        <p className="font-normal leading-relaxed not-italic text-[#4b5563] text-xs sm:text-sm truncate">
                          {testimonials[currentIndex].course}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Border shadow */}
          <div aria-hidden="true" className="absolute border-[0.918px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px] md:rounded-[20px] lg:rounded-[24.784px]" style={{ boxShadow: '0px 0px 22.948px 0px rgba(0,0,0,0.3)' }} />
        </div>
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-[14px] sm:h-[15px] md:h-[16px] relative flex items-center justify-center gap-1.5 sm:gap-2"
        >
          {/* <div className="bg-[#1c98b7] opacity-90 rounded-full size-[7px] sm:size-[8px]" /> */}
          {/* <p className="font-normal leading-normal not-italic text-[#6a7282] text-xs sm:text-sm text-center">
            Reproducción automática
          </p> */}
        </motion.div>
      )}
    </div>
  );
}
