import { Clock, Award, ArrowRight, BookOpen } from 'lucide-react';
import type { Course } from '../data/coursesUpdated';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  colorVariant?: 'default' | 'blue' | 'dark';
}

export function CourseCard({ course, onClick, colorVariant = 'default' }: CourseCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${
        colorVariant === 'dark' ? 'hover:border-[#0A8DA8]/30' : 'hover:border-[#0B95BA]/30'
      }`}
    >
      {/* Image con zoom effect */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {course.featured && (
          <div className="absolute top-4 right-4 px-4 py-1.5 bg-[rgb(216,216,216)] text-[rgb(39,39,39)] text-xs rounded-full shadow-lg">
            Virtual
          </div>
        )}
        <div className={`absolute top-4 left-4 px-4 py-1.5 text-white text-xs rounded-full shadow-md flex items-center justify-center ${
          course.type === 'diplomado' 
            ? 'bg-[#F18B01]' 
            : course.type === 'curso'
            ? 'bg-[#7C37FE]'
            : 'bg-[#0BDDB3]'
        }`}>
          {course.type === 'diplomado' ? 'Diplomado' : course.type === 'curso' ? 'Curso' : 'Taller'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <h3 className={`mb-3 text-gray-900 transition-colors min-h-18 ${
          colorVariant === 'dark' ? 'group-hover:text-[#0A8DA8]' : 'group-hover:text-[#0B95BA]'
        }`}>
          {course.title}
        </h3>
        
        {/* Meta info */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className={`w-4 h-4 ${colorVariant === 'dark' ? 'text-[#0A8DA8]' : 'text-[#0B95BA]'}`} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className={`w-4 h-4 ${colorVariant === 'dark' ? 'text-[#0A8DA8]' : 'text-[#0B95BA]'}`} />
            <span>{course.certification}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className={`w-4 h-4 ${colorVariant === 'dark' ? 'text-[#0A8DA8]' : 'text-[#0B95BA]'}`} />
            <span className={`text-sm font-semibold ${colorVariant === 'dark' ? 'text-[#0A8DA8]' : 'text-[#0B95BA]'}`}>
              {course.hours}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-200">
          <div>
            <div className="text-sm text-gray-600 mb-1">Inversión</div>
            <div className={`text-2xl ${colorVariant === 'dark' ? 'text-[#0A8DA8]' : 'text-[#0B95BA]'}`}>
              S/ {course.price.toLocaleString()}
            </div>
          </div>
          <div className={`flex items-center gap-2 group-hover:gap-3 transition-all ${
            colorVariant === 'dark' ? 'text-[#0A8DA8]' : 'text-[#0B95BA]'
          }`}>
            <span className="text-sm">Ver más</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}