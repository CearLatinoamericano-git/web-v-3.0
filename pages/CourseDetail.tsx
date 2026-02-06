import { useState, useEffect, useLayoutEffect } from "react";
import { CourseHeroSection } from "../components/CourseHeroSection";
import { CourseBenefitsSection } from "../components/CourseBenefitsSection";
import { InstructorsCarousel } from "../components/InstructorsCarousel";
import { CourseSyllabus } from "../components/CourseSyllabus";
import { CertificationSection } from "../components/CertificationSection";
import { CoursePurchase } from "../components/CoursePurchase";
import { CoursesGrid } from "../components/CoursesGrid";
import { EnrollmentModal } from "../components/EnrollmentModal";

interface Instructor {
    name: string;
    title: string;
    bio: string;
    image: string;
}

interface SubModule {
    title: string;
    topics: string[];
}

interface Module {
    module: string;
    topics?: string[]; // Para compatibilidad con cursos existentes
    subModules?: SubModule[]; // Nueva estructura con submódulos
}

interface Installment {
    label: string;
    date: string;
    amount: number;
}

interface PricingOption {
    type: "regular" | "corporativa" | "comunidad" | "pronto";
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
    brochure?: string;
    description?: string;
    shortDescription: string;
    fullDescription?: string;
    image: string;
    category?: string;
    duration: string;
    modality: string;
    certification: string | {
        issuedBy: string;
        partnerInstitution: string;
        requirements: string[];
    };
    frequency: string;
    schedule: string;
    hours: string;
    price: number;
    startDate: string;
    enrollmentDeadline?: string;
    instructors: Instructor[];
    syllabus: Module[];
    benefits?: string | string[];
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

export default function CourseDetail({
    course,
    relatedCourses = [],
    onNavigate,
}: CourseDetailProps) {
    const [showPaymentGateway, setShowPaymentGateway] = useState(false);
    const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
    const [selectedPricing, setSelectedPricing] =
        useState<PricingOption | null>(null);

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

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = "0";
        document.body.style.width = "100%";

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
            if (
                window.scrollY !== 0 ||
                document.documentElement.scrollTop !== 0
            ) {
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

        window.addEventListener("scroll", handleScroll, { passive: false });
        document.addEventListener("scroll", handleScroll, { passive: false });

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
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [course.id]);

    // Función para obtener precios y cuotas específicas por curso
    const getCoursePricing = (courseId: string) => {
        const pricingData: Record<
            string,
            {
                prices: {
                    regular: number;
                    pronto: number;
                    corporativa: number;
                    comunidad: number;
                };
                installments: {
                    regular: Installment[];
                    corporativa: Installment[];
                    comunidad: Installment[];
                };
                discount: {
                    regular: number;
                    corporativa: number;
                    comunidad: number;
                };
                promoDates: { start: string; end: string };
            }
        > = {
            "diplomado-derecho-administrativo-ii": {
                prices: {
                    regular: 4500,
                    pronto: 4200,
                    corporativa: 4300,
                    comunidad: 4300,
                },
                installments: {
                    regular: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 1000,
                        },
                        { label: "Segunda cuota", date: "05/02", amount: 1200 },
                        { label: "Tercera cuota", date: "05/03", amount: 1200 },
                        { label: "Cuarta cuota", date: "05/04", amount: 1100 },
                    ],
                    corporativa: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 1000,
                        },
                        { label: "Segunda cuota", date: "05/02", amount: 1100 },
                        { label: "Tercera cuota", date: "05/03", amount: 1100 },
                        { label: "Cuarta cuota", date: "05/04", amount: 1100 },
                    ],
                    comunidad: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 1000,
                        },
                        { label: "Segunda cuota", date: "05/02", amount: 1100 },
                        { label: "Tercera cuota", date: "05/03", amount: 1100 },
                        { label: "Cuarta cuota", date: "05/04", amount: 1100 },
                    ],
                },
                discount: { regular: 0, corporativa: 200, comunidad: 200 },
                promoDates: { start: "01/01/26", end: "30/01/26" },
            },
            "curso-cp": {
                prices: {
                    regular: 2800,
                    pronto: 2600,
                    corporativa: 2700,
                    comunidad: 2700,
                },
                installments: {
                    regular: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 700,
                        },
                        { label: "Segunda cuota", date: "27/02", amount: 700 },
                        { label: "Tercera cuota", date: "20/03", amount: 700 },
                        { label: "Cuarta cuota", date: "15/04", amount: 700 },
                    ],
                    corporativa: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 680,
                        },
                        { label: "Segunda cuota", date: "27/02", amount: 680 },
                        { label: "Tercera cuota", date: "20/03", amount: 670 },
                        { label: "Cuarta cuota", date: "15/04", amount: 670 },
                    ],
                    comunidad: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 680,
                        },
                        { label: "Segunda cuota", date: "27/02", amount: 680 },
                        { label: "Tercera cuota", date: "20/03", amount: 670 },
                        { label: "Cuarta cuota", date: "15/04", amount: 670 },
                    ],
                },
                discount: { regular: 0, corporativa: 100, comunidad: 100 },
                promoDates: { start: "01/01/26", end: "30/01/26" },
            },
            "curso-contratacion-publica-ii": {
                prices: {
                    regular: 2800,
                    pronto: 2600,
                    corporativa: 2700,
                    comunidad: 2700,
                },
                installments: {
                    regular: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 700,
                        },
                        { label: "Segunda cuota", date: "27/02", amount: 700 },
                        { label: "Tercera cuota", date: "20/03", amount: 700 },
                        { label: "Cuarta cuota", date: "15/04", amount: 700 },
                    ],
                    corporativa: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 680,
                        },
                        { label: "Segunda cuota", date: "27/02", amount: 680 },
                        { label: "Tercera cuota", date: "20/03", amount: 670 },
                        { label: "Cuarta cuota", date: "15/04", amount: 670 },
                    ],
                    comunidad: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 680,
                        },
                        { label: "Segunda cuota", date: "27/02", amount: 680 },
                        { label: "Tercera cuota", date: "20/03", amount: 670 },
                        { label: "Cuarta cuota", date: "15/04", amount: 670 },
                    ],
                },
                discount: { regular: 0, corporativa: 100, comunidad: 100 },
                promoDates: { start: "01/01/26", end: "30/01/26" },
            },
            "diplomado-jprd-ii": {
                prices: {
                    regular: 4500,
                    pronto: 4200,
                    corporativa: 4300,
                    comunidad: 4300,
                },
                installments: {
                    regular: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 800,
                        },
                        { label: "Segunda cuota", date: "05/03", amount: 1200 },
                        { label: "Tercera cuota", date: "05/04", amount: 1250 },
                        { label: "Cuarta cuota", date: "05/05", amount: 1250 },
                    ],
                    corporativa: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 800,
                        },
                        { label: "Segunda cuota", date: "05/03", amount: 1200 },
                        { label: "Tercera cuota", date: "05/04", amount: 1150 },
                        { label: "Cuarta cuota", date: "05/05", amount: 1150 },
                    ],
                    comunidad: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 800,
                        },
                        { label: "Segunda cuota", date: "05/03", amount: 1200 },
                        { label: "Tercera cuota", date: "05/04", amount: 1150 },
                        { label: "Cuarta cuota", date: "05/05", amount: 1150 },
                    ],
                },
                discount: { regular: 0, corporativa: 200, comunidad: 200 },
                promoDates: { start: "01/01/26", end: "15/02/26" },
            },
            "curso-inversion-privada": {
                prices: {
                    regular: 2800,
                    pronto: 2600,
                    corporativa: 2700,
                    comunidad: 2700,
                },
                installments: {
                    regular: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 700,
                        },
                        { label: "Segunda cuota", date: "15/03", amount: 700 },
                        { label: "Tercera cuota", date: "03/04", amount: 700 },
                        { label: "Cuarta cuota", date: "17/04", amount: 700 },
                    ],
                    corporativa: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 680,
                        },
                        { label: "Segunda cuota", date: "15/03", amount: 680 },
                        { label: "Tercera cuota", date: "03/04", amount: 670 },
                        { label: "Cuarta cuota", date: "17/04", amount: 670 },
                    ],
                    comunidad: [
                        {
                            label: "Cuota inicial",
                            date: "Antes de fecha de inicio",
                            amount: 680,
                        },
                        { label: "Segunda cuota", date: "15/03", amount: 680 },
                        { label: "Tercera cuota", date: "03/04", amount: 670 },
                        { label: "Cuarta cuota", date: "17/04", amount: 670 },
                    ],
                },
                discount: { regular: 0, corporativa: 100, comunidad: 100 },
                promoDates: { start: "01/01/26", end: "15/02/26" },
            },
        };

        // Si el curso tiene datos específicos, usarlos; si no, usar valores por defecto
        const courseData = pricingData[courseId];
        if (courseData) {
            return courseData;
        }

        // Valores por defecto para cursos no especificados
        const isDiplomado = course.type === "diplomado";
        return {
            prices: isDiplomado
                ? {
                      regular: 4500,
                      pronto: 4200,
                      corporativa: 4300,
                      comunidad: 4300,
                  }
                : {
                      regular: 2800,
                      pronto: 2600,
                      corporativa: 2700,
                      comunidad: 2700,
                  },
            installments: {
                regular: isDiplomado
                    ? [
                          {
                              label: "Cuota inicial",
                              date: "Antes de fecha de inicio",
                              amount: 1000,
                          },
                          {
                              label: "Segunda cuota",
                              date: "05/02",
                              amount: 1200,
                          },
                          {
                              label: "Tercera cuota",
                              date: "05/03",
                              amount: 1200,
                          },
                          {
                              label: "Cuarta cuota",
                              date: "05/04",
                              amount: 1100,
                          },
                      ]
                    : [
                          {
                              label: "Cuota inicial",
                              date: "Antes de fecha de inicio",
                              amount: 700,
                          },
                          {
                              label: "Segunda cuota",
                              date: "05/02",
                              amount: 700,
                          },
                          {
                              label: "Tercera cuota",
                              date: "05/03",
                              amount: 700,
                          },
                          { label: "Cuarta cuota", date: "05/04", amount: 700 },
                      ],
                corporativa: isDiplomado
                    ? [
                          {
                              label: "Cuota inicial",
                              date: "Antes de fecha de inicio",
                              amount: 1000,
                          },
                          {
                              label: "Segunda cuota",
                              date: "05/02",
                              amount: 1100,
                          },
                          {
                              label: "Tercera cuota",
                              date: "05/03",
                              amount: 1100,
                          },
                          {
                              label: "Cuarta cuota",
                              date: "05/04",
                              amount: 1100,
                          },
                      ]
                    : [
                          {
                              label: "Cuota inicial",
                              date: "Antes de fecha de inicio",
                              amount: 680,
                          },
                          {
                              label: "Segunda cuota",
                              date: "05/02",
                              amount: 680,
                          },
                          {
                              label: "Tercera cuota",
                              date: "05/03",
                              amount: 670,
                          },
                          { label: "Cuarta cuota", date: "05/04", amount: 670 },
                      ],
                comunidad: isDiplomado
                    ? [
                          {
                              label: "Cuota inicial",
                              date: "Antes de fecha de inicio",
                              amount: 1000,
                          },
                          {
                              label: "Segunda cuota",
                              date: "05/02",
                              amount: 1100,
                          },
                          {
                              label: "Tercera cuota",
                              date: "05/03",
                              amount: 1100,
                          },
                          {
                              label: "Cuarta cuota",
                              date: "05/04",
                              amount: 1100,
                          },
                      ]
                    : [
                          {
                              label: "Cuota inicial",
                              date: "Antes de fecha de inicio",
                              amount: 680,
                          },
                          {
                              label: "Segunda cuota",
                              date: "05/02",
                              amount: 680,
                          },
                          {
                              label: "Tercera cuota",
                              date: "05/03",
                              amount: 670,
                          },
                          { label: "Cuarta cuota", date: "05/04", amount: 670 },
                      ],
            },
            discount: isDiplomado
                ? { regular: 0, corporativa: 200, comunidad: 200 }
                : { regular: 0, corporativa: 100, comunidad: 100 },
            promoDates: { start: "01/01/26", end: "30/01/26" },
        };
    };

    // Generar opciones de precio basadas en el precio base del curso
    const pricingOptions: PricingOption[] = (() => {
        // Si es taller, solo mostrar una opción de pago único
        if (course.type === "taller") {
            return [
                {
                    type: "regular",
                    label: "Inscripción",
                    total: course.price,
                    features: [
                        "Acceso completo al taller",
                        "Certificado oficial",
                        "Material descargable",
                        "Pago único",
                    ],
                },
            ];
        }

        const coursePricing = getCoursePricing(course.id);
        const prices = coursePricing.prices;
        const installments = coursePricing.installments;
        const discounts = coursePricing.discount;
        const promoDates = coursePricing.promoDates;

        // Calcular descuento de pronto pago
        const prontoDiscount =
            ((prices.regular - prices.pronto) / prices.regular) * 100;

        return [
            {
                type: "regular",
                label: "Tarifa regular",
                installments: installments.regular,
                total: prices.regular,
                features: [
                    "Acceso completo al programa",
                    "Certificado oficial",
                    "Material descargable",
                    "Soporte académico",
                    "Pago en 4 cuotas",
                ],
            },
            {
                type: "corporativa",
                label: "Tarifa corporativa",
                installments: installments.corporativa,
                total: prices.corporativa,
                features: [
                    "Acceso completo al programa",
                    "Certificado oficial",
                    "Material descargable",
                    "Soporte académico prioritario",
                    "Pago en 4 cuotas",
                    "Descuento corporativo",
                ],
                badge: `Ahorra S/ ${discounts.corporativa}`,
            },
            {
                type: "comunidad",
                label: "Comunidad CEAR",
                installments: installments.comunidad,
                total: prices.comunidad,
                features: [
                    "Acceso completo al programa",
                    "Certificado oficial",
                    "Material descargable",
                    "Soporte académico",
                    "Pago en 4 cuotas",
                    "Beneficio exclusivo",
                ],
                badge: `Ahorra S/ ${discounts.comunidad}`,
            },
            {
                type: "pronto",
                label: "Pronto pago",
                total: prices.pronto,
                features: [
                    "Acceso completo al programa",
                    "Certificado oficial",
                    "Material descargable",
                    "Soporte académico",
                    "Pago único",
                    "Mejor precio garantizado",
                ],
                badge: "¡Mejor Oferta!",
                discount: Number(prontoDiscount.toFixed(2)),
                promoStartDate: promoDates.start,
                promoEndDate: promoDates.end,
            },
        ];
    })();

    // Calcular fecha límite
    function calculateDeadline(
        startDate: string,
        daysBeforeStart: number,
    ): string {
        let start: Date;

        // Detectar formato DD-MM-YY o DD/MM/YY
        const dashMatch = startDate.match(/^(\d{2})[-/](\d{2})[-/](\d{2,4})$/);
        if (dashMatch) {
            const [, day, month, year] = dashMatch;
            // Si el año tiene 2 dígitos, asumir 20XX
            const fullYear =
                year.length === 2 ? parseInt(`20${year}`) : parseInt(year);
            const monthNum = parseInt(month);
            const dayNum = parseInt(day);
            // Crear fecha usando constructor con números para evitar problemas de zona horaria
            start = new Date(fullYear, monthNum - 1, dayNum);
        } else {
            // Intentar parsear como fecha estándar
            start = new Date(startDate);
        }

        // Verificar que la fecha sea válida
        if (isNaN(start.getTime())) {
            return startDate; // Retornar el string original si no se puede parsear
        }

        start.setDate(start.getDate() - daysBeforeStart);
        return start.toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    // Handler para cuando se completa la compra
    const handlePurchase = (
        selectedOption: PricingOption,
        couponCode?: string,
    ) => {
        setSelectedPricing(selectedOption);
        setShowEnrollmentModal(true);
    };

    // Scroll to enrollment section
    const handleEnroll = () => {
        const enrollSection = document.querySelector(
            '[data-section="enrollment"]',
        );
        if (enrollSection) {
            enrollSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Handler para descargar brochure
    const handleBrochure = () => {
        if (course.brochure) {
            window.open(course.brochure, "_blank");
        }
    };

    // Handler para contactar asesor (WhatsApp)
    const handleContactAdvisor = () => {
        const courseType =
            course.type === "taller"
                ? "taller"
                : course.type === "diplomado"
                  ? "diplomado"
                  : "curso";
        const message = encodeURIComponent(
            `Hola, necesito información sobre el ${courseType}: ${course.title}`,
        );
        window.open(
            `https://api.whatsapp.com/send/?phone=51944004447&text=${message}&type=phone_number&app_absent=0`,
            "_blank",
        );
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

    const isTaller = course.type === "taller";

    return (
        <div key={course.id} className="bg-white">
            {/* Hero Section */}
            <CourseHeroSection
                title={course.title}
                description={course.shortDescription}
                image={course.image}
                type={
                    (course.type as "diplomado" | "curso" | "taller") || "curso"
                }
                stats={heroStats}
                onEnroll={handleEnroll}
                onBrochure={course.brochure ? handleBrochure : undefined}
                onContactAdvisor={handleContactAdvisor}
                startDate={isTaller ? course.startDate : undefined}
            />

            {/* Benefits/Results Section */}
            {course.benefits && (
                <CourseBenefitsSection
                    description={Array.isArray(course.benefits) ? course.benefits.join(' ') : course.benefits}
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
                <CourseSyllabus
                    modules={course.syllabus}
                    courseTitle={course.title}
                />
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
                    enrollmentDeadline={
                        course.enrollmentDeadline ||
                        calculateDeadline(course.startDate, 7)
                    }
                    courseType={course.type}
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
                        console.log("Enrollment completed:", enrollmentData);
                        alert(
                            "¡Inscripción exitosa! Serás redirigido al campus virtual.",
                        );
                        setShowEnrollmentModal(false);
                        onNavigate("/campus");
                    }}
                />
            )}
        </div>
    );
}
