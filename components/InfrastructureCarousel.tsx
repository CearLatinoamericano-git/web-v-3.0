import { useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, Laptop, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Category {
  id: string;
  name: string;
  icon: typeof Building2;
  description: string;
  images: string[];
}

const categories: Category[] = [
  {
    id: 'institucional',
    name: 'Infraestructura institucional',
    icon: Building2,
    description: 'Infraestructura moderna con ubicación estratégica en Lima.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ]
  },
  {
    id: 'tecnologica',
    name: 'Infraestructura tecnológica',
    icon: Laptop,
    description: 'Equipamiento de última generación para la formación digital.',
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
    ]
  },
  {
    id: 'academica',
    name: 'Infraestructura académica',
    icon: BookOpen,
    description: 'Espacios diseñados para el aprendizaje y desarrollo profesional.',
    images: [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
    ]
  }
];

export function InfrastructureCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('institucional');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string>('institucional');

  const activeCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setExpandedCategory(categoryId);
    setCurrentImageIndex(0);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? activeCategory.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === activeCategory.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-[#ededed] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] border-2 sm:border-3 lg:border-4 border-[#ee8a28] p-4 sm:p-6 lg:p-10 relative">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {/* Left Side - Category Buttons */}
        <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-full lg:w-[480px] lg:shrink-0">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id} className="flex flex-col">
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    rounded-[20px] sm:rounded-[26px] lg:rounded-[32px] px-4 sm:px-7 lg:px-11 py-2 sm:py-3 lg:py-4 transition-all duration-300 text-left
                    ${isActive 
                      ? 'bg-[#ee8a28] text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-102'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${isActive ? 'text-white' : 'text-[#ee8a28]'}`} />
                    <span className="font-semibold text-[16px] sm:text-[20px] lg:text-[28px] leading-[20px] sm:leading-[26px] lg:leading-[34px]">
                      {category.name}
                    </span>
                  </div>
                </button>

                {/* Description that expands below button */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 sm:px-3 lg:px-4 py-3 sm:py-4 lg:py-6">
                        <p className="text-[14px] sm:text-[16px] lg:text-[20px] leading-[20px] sm:leading-[22px] lg:leading-[26px] text-black text-center">
                          {category.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side - Image Carousel */}
        <div className="flex-1 relative w-full">
          <div className="aspect-[16/10] rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] overflow-hidden relative bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${selectedCategory}-${currentImageIndex}`}
                src={activeCategory.images[currentImageIndex]}
                alt={`${activeCategory.name} - ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-2.5 lg:p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-900" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-3 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-2.5 lg:p-3 shadow-lg transition-all hover:scale-110"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-900" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-xs sm:text-sm font-medium">
              {currentImageIndex + 1} / {activeCategory.images.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}