import { useState, useEffect, useLayoutEffect } from 'react';
import { CourseHeroSection } from '../components/CourseHeroSection';
import { CourseBenefitsSection } from '../components/CourseBenefitsSection';
import { InstructorsCarousel } from '../components/InstructorsCarousel';
import { CourseSyllabus } from '../components/CourseSyllabus';
import { CertificationSection } from '../components/CertificationSection';
import { CoursePurchase } from '../components/CoursePurchase';
import { CoursesGrid } from '../components/CoursesGrid';
import { EnrollmentModal } from '../components/EnrollmentModal';

interface Instructor {
  name: string;
  title: string;
  bio: string;
  image: string;
}

interface Module {
  module: string;
  topics: string[];
}

interface Installment {
  label: string;
  date: string;
  amount: number;
}

interface PricingOption {
  type: 'regular' | 'corporativa' | 'comunidad' | 'pronto';
  label: string;
  installments?: Installment[];
  total: number;
  features: string[];
  badge?: string;
  discount?: number;
  promoStartDate?: string;
  promoEndDate?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  duration: string;
  modality: string;
  certification: string;
  frequency: string;
  schedule: string;
  hours: string;
  price: number;
  startDate: string;
  enrollmentDeadline?: string;
  instructors: Instructor[];
  syllabus: Module[];
  benefits?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  certificationImage?: string;
  institutionLogos?: string[];
  featured?: boolean;
  type?: string;
}

interface CourseDetailProps {
  course: Course;
  relatedCourses?: Course[];
  onNavigate: (path: string) => void;
}

export default function CourseDetail({ course, relatedCourses = [], onNavigate }: CourseDetailProps) {
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<PricingOption | null>(null);

  // useLayoutEffect runs synchronously BEFORE browser paint - lock scroll completely
  useLayoutEffect(() => {
    // Scroll to top first
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Lock scroll completely
    const originalOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.width = '100%';
    
    // Unlock after animations would have triggered
    const unlockTimeout = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
    }, 800);
    
    return () => {
      clearTimeout(unlockTimeout);
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
    };
  }, [course.id]);

  // Force scroll to top when course changes or component mounts
  useEffect(() => {
    // Prevent any scroll behavior for the first second
    let isLocked = true;
    
    const forceTop = () => {
      if (window.scrollY !== 0 || document.documentElement.scrollTop !== 0) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };
    
    // Immediate execution
    forceTop();
    
    // Listen for any scroll attempts and force back to top
    const handleScroll = () => {
      if (isLocked) {
        forceTop();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: false });
    document.addEventListener('scroll', handleScroll, { passive: false });
    
    // Keep forcing scroll to top for the first 500ms
    const interval = setInterval(forceTop, 10);
    
    // Release the lock after 500ms
    const lockTimeout = setTimeout(() => {
      isLocked = false;
      clearInterval(interval);
    }, 500);
    
    return () => {
      isLocked = false;
      clearInterval(interval);
      clearTimeout(lockTimeout);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [course.id]);

  // Generar opciones de precio basadas en el precio base del curso
  const pricingOptions: PricingOption[] = (() => {
    const isDiplomado = course.type === 'diplomado';
    
    // Precios base según el tipo de programa
    const prices = isDiplomado 
      ? { regular: 4500, pronto: 4200, corporativa: 4300, comunidad: 4300 }
      : { regular: 2200, pronto: 2000, corporativa: 2100, comunidad: 2100 };
    
    return [
      {
        type: 'regular',
        label: 'Tarifa regular',
        installments: isDiplomado ? [
          { label: 'Cuota inicial', date: 'Antes de fecha de inicio', amount: 1000 },
          { label: 'Segunda cuota', date: '05/02', amount: 1200 },
          { label: 'Tercera cuota', date: '05/03', amount: 1200 },
          { label: 'Cuarta cuota', date: '05/04', amount: 1100 }
        ] : [
          { label: 'Cuota inicial', date: 'Antes de fecha de inicio', amount: 500 },
          { label: 'Segunda cuota', date: '05/02', amount: 600 },
          { label: 'Tercera cuota', date: '05/03', amount: 600 },
          { label: 'Cuarta cuota', date: '05/04', amount: 500 }
        ],
        total: prices.regular,
        features: [
          'Acceso completo al programa',
          'Certificado oficial',
          'Material descargable',
          'Soporte académico',
          'Pago en 4 cuotas'
        ]
      },
      {
        type: 'corporativa',
        label: 'Tarifa corporativa',
        installments: isDiplomado ? [
          { label: 'Cuota inicial', date: 'Antes de fecha de inicio', amount: 1000 },
          { label: 'Segunda cuota', date: '05/02', amount: 1100 },
          { label: 'Tercera cuota', date: '05/03', amount: 1100 },
          { label: 'Cuarta cuota', date: '05/04', amount: 1100 }
        ] : [
          { label: 'Cuota inicial', date: 'Antes de fecha de inicio', amount: 500 },
          { label: 'Segunda cuota', date: '05/02', amount: 550 },
          { label: 'Tercera cuota', date: '05/03', amount: 550 },
          { label: 'Cuarta cuota', date: '05/04', amount: 500 }
        ],
        total: prices.corporativa,
        features: [
          'Acceso completo al programa',
          'Certificado oficial',
          'Material descargable',
          'Soporte académico prioritario',
          'Pago en 4 cuotas',
          'Descuento corporativo'
        ],
        badge: isDiplomado ? 'Ahorra S/ 200' : 'Ahorra S/ 100'
      },
      {
        type: 'comunidad',
        label: 'Comunidad CEAR',
        installments: isDiplomado ? [
          { label: 'Cuota inicial', date: 'Antes de fecha de inicio', amount: 1000 },
          { label: 'Segunda cuota', date: '05/02', amount: 1100 },
          { label: 'Tercera cuota', date: '05/03', amount: 1100 },
          { label: 'Cuarta cuota', date: '05/04', amount: 1100 }
        ] : [
          { label: 'Cuota inicial', date: 'Antes de fecha de inicio', amount: 500 },
          { label: 'Segunda cuota', date: '05/02', amount: 550 },
          { label: 'Tercera cuota', date: '05/03', amount: 550 },
          { label: 'Cuarta cuota', date: '05/04', amount: 500 }
        ],
        total: prices.comunidad,
        features: [
          'Acceso completo al programa',
          'Certificado oficial',
          'Material descargable',
          'Soporte académico',
          'Pago en 4 cuotas',
          'Beneficio exclusivo'
        ],
        badge: isDiplomado ? 'Ahorra S/ 200' : 'Ahorra S/ 100'
      },
      {
        type: 'pronto',
        label: 'Pronto pago',
        total: prices.pronto,
        features: [
          'Acceso completo al programa',
          'Certificado oficial',
          'Material descargable',
          'Soporte académico',
          'Pago único',
          'Mejor precio garantizado'
        ],
        badge: '¡Mejor Oferta!',
        discount: isDiplomado ? 6.67 : 9.09,
        promoStartDate: '01/01/26',
        promoEndDate: '30/01/26'
      },
    ];
  })();

  // Calcular fecha límite
  function calculateDeadline(startDate: string, daysBeforeStart: number): string {
    const start = new Date(startDate);
    start.setDate(start.getDate() - daysBeforeStart);
    return start.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  // Handler para cuando se completa la compra
  const handlePurchase = (selectedOption: PricingOption, couponCode?: string) => {
    setSelectedPricing(selectedOption);
    setShowEnrollmentModal(true);
  };

  // Scroll to enrollment section
  const handleEnroll = () => {
    const enrollSection = document.querySelector('[data-section="enrollment"]');
    if (enrollSection) {
      enrollSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler para descargar brochure
  const handleBrochure = () => {
    // Por ahora solo abrimos una alerta, luego se puede cambiar por descarga real
    alert('Descargando brochure del programa...');
  };

  // Stats para el hero
  const heroStats = {
    certification: course.certification,
    modality: course.modality,
    duration: course.duration,
    frequency: course.frequency,
    schedule: course.schedule,
    hours: course.hours,
  };

  return (
    <div key={course.id} className="bg-white">
      {/* Hero Section */}
      <CourseHeroSection
        title={course.title}
        description={course.shortDescription}
        image={course.image}
        type={course.type}
        stats={heroStats}
        onEnroll={handleEnroll}
        onBrochure={handleBrochure}
      />

      {/* Benefits/Results Section */}
      {course.benefits && (
        <CourseBenefitsSection
          description={course.benefits}
          videoUrl={course.videoUrl}
          videoThumbnail={course.videoThumbnail}
        />
      )}

      {/* Instructors Section */}
      {course.instructors && course.instructors.length > 0 && (
        <section className="py-10 lg:py-14 bg-gray-100">
          <div className="max-w-7xl mx-auto px-8 sm:px-10 md:px-12 lg:px-8">
            <InstructorsCarousel instructors={course.instructors} />
          </div>
        </section>
      )}

      {/* Course Syllabus */}
      {course.syllabus && course.syllabus.length > 0 && (
        <CourseSyllabus modules={course.syllabus} courseTitle={course.title} />
      )}

      {/* Certification Section */}
      <CertificationSection
        certification={course.certification}
        certificationImage={course.certificationImage}
        institutionLogos={course.institutionLogos}
      />

      {/* Purchase Section */}
      <div data-section="enrollment">
        <CoursePurchase
          courseId={course.id}
          courseTitle={course.title}
          pricingOptions={pricingOptions}
          startDate={course.startDate}
          enrollmentDeadline={course.enrollmentDeadline || calculateDeadline(course.startDate, 7)}
          onPurchase={handlePurchase}
        />
      </div>

      {/* Enrollment Modal */}
      {showEnrollmentModal && selectedPricing && (
        <EnrollmentModal
          isOpen={showEnrollmentModal}
          onClose={() => setShowEnrollmentModal(false)}
          courseId={course.id}
          courseTitle={course.title}
          selectedPricing={selectedPricing}
          onComplete={(enrollmentData) => {
            console.log('Enrollment completed:', enrollmentData);
            alert('¡Inscripción exitosa! Serás redirigido al campus virtual.');
            setShowEnrollmentModal(false);
            onNavigate('/campus');
          }}
        />
      )}
    </div>
  );
}