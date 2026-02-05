
import { useState, useEffect } from 'react';
import { HeroEducretNew } from '../../components/HeroEducretNew';
import { CoursesGrid } from '../../components/CoursesGrid';
import { PartnersSection } from '../../components/PartnersSection';
import { ISOSection } from '../../components/ISOSection';
import { TestimonialsCarousel } from '../../components/TestimonialsCarousel';
import { CoursePopup } from '../../components/CoursePopup';
import { courses, testimonials } from '../../data/coursesUpdated';
import Group1136 from '../../imports/Group1136';
import styles from './Home.module.css';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup when component loads
    setShowPopup(true);
  }, []);

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
    <div className={styles.container}>
      {/* Course Popup */}
      <CoursePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onNavigate={onNavigate}
        courseId="curso-cp"
      />

      {/* Hero Section */}
      <HeroEducretNew onExploreCourses={handleExploreCourses} />

      {/* Stats Section - Directly below hero with white rounded card */}
      <section className={styles.statsSection}>
        <div className={styles.statsContent}>
          <div>
            <Group1136 />
          </div>

          {/* Nuestros Logros Section */}
          <div className="mt-8 mb-8 lg:mt-12 lg:mb-12 pb-4">
            {/* Title - Uniformizado */}
            <h2 className={styles.statsTitle}>
              NUESTROS LOGROS
            </h2>

            {/* Subtitle - Uniformizado con gradiente */}
            <p className={styles.statsSubtitle}>
              Resultados que respaldan nuestra{' '}
              <span className={styles.statsSubtitleGradient}>
                formación especializada
              </span>
            </p>

            {/* Testimonials Carousel */}
            <div className={styles.testimonialsContainer}>
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
      <section className={styles.coursesSection} id="courses-section">
        <div className={styles.coursesContainer}>
          <div className="text-center mb-10 lg:mb-14">
            <h2 className={styles.coursesTitle}>
              Programas<br />
              de formación especializada
            </h2>
            <p className={styles.coursesSubtitle}>
              Descubre nuestra oferta académica
            </p>
          </div>

          <CoursesGrid courses={featuredCourses} onCourseClick={handleCourseClick} />

          <div className={styles.buttonContainer}>
            <button
              onClick={() => onNavigate('/courses')}
              className={styles.verTodosButton}
            >
              Ver todos los programas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

