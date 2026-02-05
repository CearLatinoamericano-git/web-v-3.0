import { motion } from 'motion/react';
import svgPaths from '../../imports/svg-94lqq5fqrh';

interface Testimonial {
  name: string;
  role: string;
  course: string;
  text: string;
  rating: number;
  image: string;
}

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: Testimonial | null;
}

export function TestimonialModal({ isOpen, onClose, testimonial }: TestimonialModalProps) {
  if (!isOpen || !testimonial) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            {/* Name and Stars */}
            <div className="flex flex-col gap-3">
              {/* Name */}
              <p className="font-semibold leading-tight not-italic text-[#111827] text-xl md:text-2xl">
                {testimonial.name}
              </p>
              
              {/* Stars */}
              <div className="flex gap-1 h-5 items-start">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="relative shrink-0 w-5 h-5">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6534 20.6534">
                      <g>
                        <path d={svgPaths.p1d0f7400} fill="#FDC700" stroke="#FDC700" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.72111" />
                      </g>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Text - Full */}
            <div className="relative w-full">
              <p className="font-normal leading-relaxed text-[#1e2939] text-lg md:text-xl text-justify">
                "{testimonial.text}"
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all shadow-lg hover:shadow-xl font-medium"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

