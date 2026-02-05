import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-94lqq5fqrh';
import styles from './TestimonialsCarousel.module.css';
import { TestimonialModal } from './modals/TestimonialModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  // Auto-play functionality - pausa cuando el modal está abierto
  useEffect(() => {
    // No ejecutar auto-play si el modal está abierto
    if (isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Reducido a 4 segundos para movimiento más dinámico

    return () => clearInterval(interval);
  }, [isModalOpen, testimonials.length]);

  // Check if text is truncated
  useEffect(() => {
    const checkTruncation = () => {
      if (quoteTextRef.current) {
        const element = quoteTextRef.current;
        setIsTextTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Main Testimonial Card */}
      <div className={styles.testimonialCard}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardInner}>
            {/* Navigation Buttons Container - Inside */}
            <div className={styles.navigationButtons}>
              {/* Left Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className={styles.navButton}
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className={styles.navIcon} strokeWidth={2.065} />
              </motion.button>

              {/* Right Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className={styles.navButton}
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className={styles.navIcon} strokeWidth={2.065} />
              </motion.button>
            </div>
            {/* Quote Icon Decoration - Top Left */}
            <div className={styles.quoteIcon}>
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
            <div className={styles.contentFrame}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={styles.contentWrapper}
                >
                  {/* Profile Image Container */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={styles.profileImageContainer}
                  >
                    {/* Decorative blur background */}
                    <div className="absolute bg-[rgba(255,255,255,0.8)] blur-[22.03px] left-[-8.26px] opacity-20 rounded-full size-[96px] sm:size-[106px] md:size-[116px] lg:size-[146px] top-[-8.26px]" />

                    {/* Image */}
                    <div className={styles.profileImageWrapper}>
                      <div className={styles.profileImageInner}>
                        <ImageWithFallback
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className={styles.profileImage}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={styles.contentSection}
                  >
                    {/* Stars */}
                    <div className={styles.starsContainer}>
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <div key={i} className={styles.starWrapper}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6534 20.6534">
                            <g>
                              <path d={svgPaths.p1d0f7400} fill="#FDC700" stroke="#FDC700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72111" />
                            </g>
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* Quote Text */}
                    <div className={styles.quoteTextContainer}>
                      <p ref={quoteTextRef} className={styles.quoteText}>
                        "{testimonials[currentIndex].text}"
                      </p>
                      {isTextTruncated && (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className={styles.verMasButton}
                        >
                          Ver más
                        </button>
                      )}
                    </div>

                    {/* Author Info Container */}
                    <div className={styles.authorInfoContainer}>
                      {/* Name */}
                      <div className={styles.authorName}>
                        <p className={styles.authorNameText}>
                          {testimonials[currentIndex].name}
                        </p>
                      </div>

                      {/* Role */}
                      <div className={styles.authorRole}>
                        <p className={styles.authorRoleText}>
                          {testimonials[currentIndex].role}
                        </p>
                      </div>

                      {/* Course */}
                      <div className={styles.authorCourse}>
                        <p className={styles.authorCourseText}>
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
          <div aria-hidden="true" className={styles.borderShadow} />
        </div>
      </div>

      {/* Auto-play indicator - Puntos indicadores */}
      <div className={styles.autoPlayIndicator}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.indicatorDot} ${currentIndex === index ? styles.indicatorDotActive : ''}`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>

      {/* Testimonial Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonial={testimonials[currentIndex]}
      />
    </div>
  );
}
