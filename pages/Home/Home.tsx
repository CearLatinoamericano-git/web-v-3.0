
import { HeroEducretNew } from '../../components/HeroEducretNew';
import { CoursesGrid } from '../../components/CoursesGrid';
import { PartnersSection } from '../../components/PartnersSection';
import { ISOSection } from '../../components/ISOSection';
import { TestimonialsCarousel } from '../../components/TestimonialsCarousel';
import { courses, testimonials } from '../../data/coursesUpdated';
import Group1136 from '../../imports/Group1136';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export function Home({ onNavigate }: HomeProps) {

  const handleExploreCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCourseClick = (courseId: string) => {
    onNavigate(`/course/${courseId}`);
  };

  const featuredCourses = courses.filter(course => course.featured);

  return (
    <div className="relative w-full max-w-[100vw] overflow-x-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Hero Section */}
      <HeroEducretNew onExploreCourses={handleExploreCourses} />

      {/* Stats Section - Directly below hero with white rounded card */}
      <section className="relative -mt-12 lg:-mt-16 z-20 overflow-hidden">
        <div className="w-[90%] lg:w-[85%] mx-auto px-4 lg:px-8">
          <div className="py-2">
            <Group1136 />
          </div>

          {/* Nuestros Logros Section */}
          <div className="mt-8 mb-8 lg:mt-12 lg:mb-12 pb-4">
            {/* Title - Uniformizado */}
            <h2 className="text-center font-bold leading-tight not-italic text-[#0B95BA] uppercase m-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide">
              NUESTROS LOGROS
            </h2>

            {/* Subtitle - Uniformizado con gradiente */}
            <p className="text-center font-normal leading-relaxed not-italic text-[#111827] mt-3 mb-6 lg:mb-8 text-base sm:text-lg md:text-xl lg:text-2xl">
              Resultados que respaldan nuestra{' '}
              <span
                className="bg-clip-text font-normal not-italic"
                style={{
                  backgroundImage: "linear-gradient(173.66deg, rgb(11, 149, 186) 0%, rgb(8, 122, 152) 100%)",
                  WebkitTextFillColor: "transparent"
                }}
              >
                formación especializada
              </span>
            </p>

            {/* Testimonials Carousel */}
            <div className="w-full mx-auto overflow-hidden px-0">
              <TestimonialsCarousel testimonials={testimonials} />
            </div>
          </div>
        </div>
        {/* Bloquear cualquier luz/transparencia inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-transparent" style={{ boxShadow: 'none' }} />
      </section>

      {/* Background Blur Effects */}
      <div className="absolute h-[1320.453px] left-0 overflow-clip top-[900px] w-full pointer-events-none">
        <div className="absolute bg-[rgba(11,149,186,0.08)] blur-3xl left-[90px] rounded-[33554400px] w-[288px] h-[288px] top-[90px]" />
        <div className="absolute bg-[rgba(11,149,186,0.05)] blur-3xl left-[1212px] rounded-[33554400px] w-[360px] h-[360px] top-[870.45px]" />
      </div>

      {/* Partners Section */}
      <PartnersSection />

      {/* ISO Section */}
      <ISOSection />

      {/* Courses Section */}
      <section className="py-12 lg:py-16 bg-white pt-16 lg:pt-20" id="courses-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-[#0B95BA] uppercase tracking-wide mb-4 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Programas<br />
              de formación especializada
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#111827] leading-relaxed mt-2">
              Descubre nuestra oferta académica
            </p>
          </div>

          <CoursesGrid courses={featuredCourses} onCourseClick={handleCourseClick} />

          <div className="text-center mt-12 lg:mt-16">
            <button
              onClick={() => onNavigate('/courses')}
              className="inline-flex items-center gap-2 px-8 py-3.5 lg:px-10 lg:py-4 bg-[#1F2937] text-white rounded-2xl hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg text-base lg:text-lg font-medium"
            >
              Ver todos los programas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

