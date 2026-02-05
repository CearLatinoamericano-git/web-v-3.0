import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { InstructorProfileModal, InstructorProfile } from './InstructorProfileModal';

interface Instructor {
  name: string;
  title: string;
  bio: string;
  image: string;
  degrees?: string[];
  masterDoctorate?: string[];
  books?: string[];
  articles?: string[];
  universityTeaching?: string[];
  teachingExperience?: string[];
  professionalExperience?: string[];
  awards?: string[];
}

interface InstructorsCarouselProps {
  instructors: Instructor[];
}

export function InstructorsCarousel({ instructors }: InstructorsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorProfile | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % instructors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + instructors.length) % instructors.length);
  };

  const currentInstructor = instructors[currentIndex];

  return (
    <div className="relative">
      {/* Main Content - Horizontal Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-[59px] items-center lg:items-end max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6">
        {/* Oval/Circular Image - Figma dimensions */}
        <div className="relative shrink-0 pt-[21px] pr-[0px] pb-[0px] pl-[0px] p-[0px]">
          <div 
            className="w-[220px] h-[312px] sm:w-[260px] sm:h-[368px] md:w-[300px] md:h-[425px] lg:w-[340px] lg:h-[482px] xl:w-[405.478px] xl:h-[574.327px] rounded-[234.158px] overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src={currentInstructor.image}
              alt={currentInstructor.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4 lg:gap-6 xl:gap-[35.789px] max-w-full lg:max-w-[712.632px] pt-0 pr-0 pl-0 w-full">
          {/* Títulos de sección */}
          <div className="flex flex-col gap-1 lg:gap-2 w-full items-center lg:items-start">
            <div className="flex items-center justify-center lg:justify-start w-full">
              <h2 className="text-[#1c98b7] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[67.368px] xl:leading-[36.09px] uppercase tracking-[1.2632px] font-bold text-center lg:text-left">
                Plana docente
              </h2>
            </div>
            <div className="flex items-center justify-center lg:justify-start w-full">
              <p className="text-[#111827] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[57.076px] xl:leading-[63.021px] font-normal text-center lg:text-left">
                Especialistas en la materia
              </p>
            </div>
          </div>

          {/* Orange Name Badge */}
          <div className="flex justify-center lg:justify-start w-full">
            <div className="bg-[#ee8a28] rounded-[10.702px] px-4 py-2 sm:px-5 sm:py-2.5 lg:px-[11.891px] lg:py-[11.891px] shadow-lg w-full sm:w-auto lg:max-w-[700px]">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-[32.105px] lg:leading-[42.807px] font-bold text-center break-words">
                {currentInstructor.name}
              </h3>
            </div>
          </div>
          
          {/* Bio */}
          <p className="text-sm sm:text-base lg:text-lg xl:text-[18.728px] xl:leading-[30.433px] text-[rgba(0,0,0,0.95)] text-justify max-h-[265.263px] overflow-hidden px-2 sm:px-0">
            {currentInstructor.bio}
          </p>
        </div>
      </div>

      {/* Navigation Controls - Only show if multiple instructors */}
      {instructors.length > 1 && (
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110"
            aria-label="Anterior docente"
          >
            <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-gray-900" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[#1c98b7] font-bold text-lg lg:text-xl">
              {currentIndex + 1}
            </span>
            <span className="text-gray-400 text-lg lg:text-xl">/</span>
            <span className="text-gray-600 text-lg lg:text-xl">
              {instructors.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110"
            aria-label="Siguiente docente"
          >
            <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-gray-900" />
          </button>
        </div>
      )}

      {/* Instructor Profile Modal */}
      {selectedInstructor && (
        <InstructorProfileModal
          instructor={selectedInstructor}
          isOpen={selectedInstructor !== null}
          onClose={() => setSelectedInstructor(null)}
        />
      )}
    </div>
  );
}