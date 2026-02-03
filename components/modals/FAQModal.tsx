import { X, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories: FAQCategory[] = [
    {
      title: 'Inscripción y matrícula',
      items: [
        {
          question: '¿Cómo puedo inscribirme en un programa?',
          answer: 'Puede inscribirse seleccionando el programa de su interés en la sección "Catálogo de programas" y completando el formulario de inscripción. Una vez enviado, el sistema registrará su solicitud y le mostrará las instrucciones para proceder con el pago correspondiente.'
        },
        {
          question: '¿Cuándo se confirma mi matrícula?',
          answer: 'Su matrícula se confirma automáticamente cuando el sistema verifica el pago de la primera cuota o del monto total del programa. Una vez confirmada, el programa aparecerá en su sección "Mis programas" dentro del campus virtual.'
        },
        {
          question: '¿Qué debo hacer si mi matrícula no aparece en el campus?',
          answer: 'Si, luego de realizar el pago, su programa no se muestra en la sección "Mis programas", comuníquese con el Área de Soporte mediante "Mensajería" o "Contactar soporte", o al número oficial +51 994 392 420, adjuntando el comprobante correspondiente.'
        },
        {
          question: '¿Puedo cambiarme de programa después de haberme matriculado?',
          answer: 'Los cambios de programa están sujetos a evaluación administrativa. Para solicitarlo, debe ingresar a la sección Solicitudes y seleccionar Solicitud de retiro o el trámite que corresponda, indicando el motivo de la reubicación académica.'
        },
        {
          question: '¿Qué métodos de pago están disponibles?',
          answer: 'El campus permite pagos con tarjeta de débito, tarjeta de crédito y otras opciones habilitadas por la pasarela de pago. Toda la información se encuentra en la sección Pagos, junto con sus cuotas y vencimientos.'
        }
      ]
    },
    {
      title: 'Acceso y cuenta',
      items: [
        {
          question: '¿Cómo puedo acceder al campus virtual?',
          answer: 'Para acceder al campus virtual, ingrese su usuario y contraseña en la pantalla de inicio de sesión. Si lo desea, puede activar la opción "Recordar contraseña" para facilitar futuros ingresos desde el mismo dispositivo. Una vez validadas sus credenciales, el sistema le permitirá ingresar y visualizar los programas en los que esté inscrito.'
        },
        {
          question: '¿Cómo puedo recuperar mi contraseña?',
          answer: 'Seleccione la opción "¿Olvidaste tu contraseña?" en la pantalla de inicio e ingrese su correo electrónico para recibir un código de verificación. Una vez recibido el mensaje, siga las instrucciones para restablecer su contraseña de manera segura.'
        },
        {
          question: '¿Qué hago si no recibo el código de verificación?',
          answer: 'Verifique primero que el correo ingresado esté escrito correctamente. Si no recibe el código en su bandeja de entrada, revise la carpeta de spam o correos no deseados. En caso persista el inconveniente, comuníquese con el Área de Soporte para solicitar asistencia (+51 994 392 420).'
        },
        {
          question: '¿Puedo actualizar mis datos personales?',
          answer: 'Sí. Usted puede actualizar su información ingresando a la sección "Mi perfil", donde se encuentran sus datos personales, profesionales y de contacto. Para realizar modificaciones, seleccione la opción "Editar perfil" y guarde los cambios correspondientes.'
        },
        {
          question: '¿Cómo puedo cambiar mi contraseña?',
          answer: 'Para actualizar su contraseña, ingrese a la sección "Seguridad de la cuenta" de la cuenta dentro de su perfil. Allí deberá ingresar su contraseña actual, establecer una nueva y confirmarla siguiendo los requisitos indicados por el sistema. Una vez completados los campos, seleccione "Actualizar contraseña" para finalizar el proceso.'
        }
      ]
    },
    {
      title: 'Programas y contenido académico',
      items: [
        {
          question: '¿Dónde encuentro mis cursos y diplomados?',
          answer: 'Puede visualizar todos los programas en los que está inscrito ingresando a la sección "Mis programas" del menú principal. Allí encontrará sus cursos y diplomados clasificados en "En progreso" y "Completados", junto con su nivel de avance y próximos eventos académicos.'
        },
        {
          question: '¿Cómo sé qué actividades debo completar?',
          answer: 'Dentro de cada programa, la sección "Contenido" le mostrará todas las sesiones, actividades y materiales organizados por módulo. Cada actividad indica su estado, lo que le permitirá identificar claramente lo que aún debe desarrollar. Además, podrá visualizar las próximas clases y evaluaciones programadas para mantener un seguimiento adecuado de su avance académico.'
        },
        {
          question: '¿Qué significa el porcentaje de progreso?',
          answer: 'El porcentaje de progreso refleja el avance total que usted ha alcanzado dentro del programa. Este cálculo considera las sesiones, actividades, evaluaciones y materiales obligatorios que haya completado. A medida que desarrolle cada componente, el sistema actualizará automáticamente su porcentaje de avance.'
        },
        {
          question: '¿Puedo avanzar contenido antes de la fecha programada?',
          answer: 'Algunas actividades, materiales o evaluaciones pueden permanecer como no habilitadas hasta la fecha establecida en el cronograma académico. La posibilidad de acceder de manera anticipada dependerá de la planificación definida para cada programa. Una vez que el contenido se habilite, podrá desarrollarlo sin restricciones.'
        }
      ]
    },
    {
      title: 'Evaluaciones y calificaciones',
      items: [
        {
          question: '¿Dónde veo mis notas?',
          answer: 'Puede revisar sus calificaciones ingresando a la sección "Calificaciones" dentro del programa correspondiente. Allí encontrará el detalle de sus notas por módulo, actividad y evaluación, así como la ponderación de cada componente y su contribución a la nota final. El sistema actualiza esta información de manera automática conforme se califican sus entregas.'
        },
        {
          question: '¿Cómo se calcula mi nota final?',
          answer: 'La nota final se determina mediante la suma ponderada de todas las actividades evaluadas del programa. Cada módulo y cada actividad tiene un peso específico que contribuye proporcionalmente a su calificación global. Una vez registradas todas las evaluaciones, el sistema calcula automáticamente su resultado final según los criterios académicos establecidos.'
        },
        {
          question: '¿Qué hago si deseo una revisión de calificación?',
          answer: 'Si requiere una revisión de calificación, debe ingresar a la sección "Solicitudes" y seleccionar la opción "Revisión de calificación". Allí deberá completar el formulario indicando el programa, el módulo, el tipo de evaluación y el motivo de su solicitud. Una vez enviada, su petición será evaluada por el Área Académica según los procedimientos establecidos.'
        },
        {
          question: '¿Cómo se clasifican los estados de cada actividad?',
          answer: 'Completado: La actividad ha sido enviada o desarrollada correctamente. Pendiente: La actividad está habilitada, pero aún no registra entrega. Próximo: La actividad se habilitará en una fecha futura establecida en el cronograma.'
        }
      ]
    },
    {
      title: 'Asistencia a clases en vivo',
      items: [
        {
          question: '¿Cómo se registra mi asistencia?',
          answer: 'La asistencia se registra de manera automática cuando usted ingresa a la clase en vivo a través de la plataforma. El sistema registra la hora de conexión y verifica el tiempo mínimo requerido para considerar la asistencia como válida. Esta información se refleja posteriormente en el resumen de asistencias y en el detalle por sesión.'
        },
        {
          question: '¿Qué porcentaje necesito para aprobar?',
          answer: 'Para aprobar el programa, usted debe cumplir con un mínimo del 70% de asistencia a las clases en vivo. Este porcentaje se calcula en función del total de sesiones programadas y se actualiza automáticamente conforme el sistema registra su participación.'
        },
        {
          question: '¿Qué pasa si llego tarde?',
          answer: 'Si usted se conecta a la sesión después del tiempo de tolerancia establecido, el sistema registrará su ingreso como tardanza. Dependiendo de la política académica del programa, las tardanzas pueden afectar el porcentaje final de asistencia requerido para la aprobación.'
        },
        {
          question: '¿Cómo justifico una falta?',
          answer: 'Para justificar una falta, debe ingresar a la sección "Solicitudes" y seleccionar la opción "Justificación de inasistencia". Luego, complete el formulario indicando el programa, la fecha de la inasistencia y adjuntando un documento de sustento (como certificado médico o carta laboral). Una vez enviada la solicitud, esta será evaluada según los criterios académicos establecidos.'
        }
      ]
    },
    {
      title: 'Certificados',
      items: [
        {
          question: '¿Cuándo puedo descargar mi certificado?',
          answer: 'Podrá descargar su certificado una vez haya completado el 100% del programa, cumpla con el porcentaje mínimo de asistencia requerido, apruebe las evaluaciones correspondientes y no registre deudas pendientes. El sistema habilitará automáticamente la opción de descarga cuando se verifiquen todos los requisitos académicos y administrativos.'
        },
        {
          question: '¿Dónde descargo mis certificados?',
          answer: 'Puede descargar sus certificados ingresando a la sección "Certificados" dentro del programa correspondiente. Una vez que haya cumplido todos los requisitos académicos y administrativos, el sistema habilitará la opción de descarga de manera automática.'
        },
        {
          question: '¿Qué tipos de certificados entrega CEAR LATINOAMERICANO?',
          answer: 'CEAR LATINOAMERICANO emite dos tipos de documentos oficiales: Certificado de estudios (otorgado al estudiante que aprueba el programa y cumple con todos los requisitos académicos, de asistencia y administrativos establecidos) y Constancia de participación (emitida cuando el estudiante ha llevado el programa completo, pero no obtuvo una nota aprobatoria, acreditando su participación en las actividades académicas).'
        },
        {
          question: '¿Cómo solicito una constancia de participación?',
          answer: 'Para solicitar una constancia, ingrese a la sección "Solicitudes" y seleccione la opción "Constancia de participación". Luego, complete el formulario indicando el programa y el motivo de su solicitud. El sistema verificará que haya cumplido con el porcentaje mínimo de actividades requeridas y, una vez validado, la constancia será emitida conforme a los procedimientos académicos establecidos.'
        }
      ]
    },
    {
      title: 'Pagos y cuotas',
      items: [
        {
          question: '¿Dónde veo mi estado de pagos?',
          answer: 'Puede consultar el estado de pagos ingresando a la sección "Pagos" desde el menú lateral del campus virtual. Allí encontrará el detalle completo de sus cuotas pagadas, pendientes y las fechas de vencimiento de cada una.'
        },
        {
          question: '¿Puedo pagar varias cuotas a la vez?',
          answer: 'Sí. En la sección "Pagos", el sistema le permite seleccionar varias cuotas pendientes y realizar un pago múltiple en una sola operación. Solo marque las cuotas que desea cancelar y continúe con el proceso de pago.'
        },
        {
          question: '¿Qué pasa si no pago una cuota a tiempo?',
          answer: 'Si una cuota no es pagada dentro del plazo establecido, esta será registrada como "Atrasado" en el sistema y permanecerá pendiente hasta su regularización. Si la falta de pago persiste después de 5 días calendarios luego de la fecha de vencimiento, se restringirá el acceso al campus automáticamente. Por ello, es recomendable mantener sus obligaciones económicas al día para asegurar el normal desarrollo de su participación en el programa.'
        }
      ]
    },
    {
      title: 'Solicitudes',
      items: [
        {
          question: '¿Qué tipos de solicitudes puedo presentar?',
          answer: 'En el campus virtual puede presentar seis tipos de solicitudes, cada una diseñada para atender necesidades académicas específicas. Estas son: (i) Solicitud de reprogramación, (ii) revisión de calificación, (iii) justificación de inasistencia, (iv) certificado de estudios, (v) constancia de participación y (vi) solicitud de retiro.'
        },
        {
          question: '¿Qué es una solicitud de reprogramación?',
          answer: 'La solicitud de reprogramación le permite pedir una nueva fecha o plazo para entregar una actividad o rendir una evaluación, siempre que cuente con un motivo válido, un documento de justificación verificable y cumpla con los procedimientos establecidos por CEAR LATINOAMERICANO.'
        },
        {
          question: '¿Qué es una revisión de calificación?',
          answer: 'La revisión de calificación es el proceso mediante el cual un estudiante solicita que se verifique nuevamente la nota obtenida en una actividad o evaluación, con el fin de confirmar que fue calificada correctamente.'
        },
        {
          question: '¿Qué es una justificación de inasistencia?',
          answer: 'La justificación de inasistencia permite informar al Área Académica las razones por las cuales no pudo asistir a una clase en vivo o actividad obligatoria, adjuntando documentos de sustento cuando corresponda.'
        },
        {
          question: '¿Qué es un certificado de estudios?',
          answer: 'El certificado de estudios es un documento oficial que se emite cuando el estudiante aprueba el programa y cumple con todos los requisitos académicos y administrativos, incluyendo no tener deudas pendientes.'
        },
        {
          question: '¿Qué es una constancia de participación?',
          answer: 'La constancia de participación acredita que el estudiante llevó el programa completo, incluso si no obtuvo una nota aprobatoria, siempre que haya cumplido el porcentaje mínimo de actividades requeridas y no tenga deuda pendiente.'
        },
        {
          question: '¿Qué es una solicitud de retiro?',
          answer: 'La solicitud de retiro es el trámite mediante el cual el estudiante formaliza su decisión de dejar el programa en curso, siguiendo las condiciones académicas y administrativas establecidas por CEAR LATINOAMERICANO.'
        },
        {
          question: '¿Dónde veo el estado de mis solicitudes?',
          answer: 'Puede consultar el estado de sus solicitudes ingresando a la sección "Mensajería" del campus virtual, donde se muestran todas las respuestas emitidas por CEAR LATINOAMERICANO, junto con su respectiva clasificación y documentos adjuntos, en caso corresponda. Asimismo, podrá visualizar actualizaciones en el "Panel de notificaciones", ubicado en la parte superior derecha, desde el cual se informan aprobaciones, observaciones, reprogramaciones y otros avisos relevantes relacionados con sus trámites.'
        },
        {
          question: '¿Cuánto demora la respuesta?',
          answer: 'Las solicitudes ingresadas a través del campus virtual son atendidas por CEAR LATINOAMERICANO en un plazo máximo de 5 días hábiles, contados desde la fecha de presentación. Durante ese periodo, podrá recibir notificaciones sobre el avance o la resolución final directamente en la sección de "Mensajería" o mediante el "Panel de notificaciones" del sistema.'
        }
      ]
    },
    {
      title: 'Soporte técnico',
      items: [
        {
          question: '¿Qué debo hacer si no puedo acceder a la clase en vivo?',
          answer: 'En caso de presentar dificultades para ingresar a una clase en vivo, cierre sesión, actualice su navegador e intente acceder nuevamente. Si el inconveniente persiste, comuníquese con el Área de Soporte para solicitar asistencia (+51 994 392 420).'
        },
        {
          question: '¿Qué navegadores recomienda CEAR LATINOAMERICANO?',
          answer: 'CEAR LATINOAMERICANO recomienda utilizar Google Chrome, Mozilla Firefox o Microsoft Edge en sus versiones más recientes, a fin de garantizar el correcto funcionamiento del campus virtual.'
        },
        {
          question: '¿Cómo puedo contactar al Área de Soporte?',
          answer: 'Puede comunicarse con el Área de Soporte a través de la sección "Mensajería" del campus virtual, mediante el botón "Contactar soporte" disponible en la plataforma o, de ser necesario, de manera directa al número +51 994 392 420.'
        }
      ]
    }
  ];

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedQuestion(expandedQuestion === key ? null : key);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-[#0B95BA]" />
            </div>
            <h2 className="text-white text-2xl font-bold">Preguntas frecuentes</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full px-4 py-3 bg-[#0B95BA] hover:bg-[#087A98] transition-colors flex items-center justify-between"
                >
                  <span className="text-white font-bold text-sm">{category.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white transition-transform ${
                      expandedCategory === categoryIndex ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Category Content */}
                {expandedCategory === categoryIndex && (
                  <div className="p-3 space-y-2">
                    {category.items.map((item, questionIndex) => {
                      const questionKey = `${categoryIndex}-${questionIndex}`;
                      const isExpanded = expandedQuestion === questionKey;

                      return (
                        <div
                          key={questionIndex}
                          className="bg-gray-50 rounded-lg overflow-hidden"
                        >
                          {/* Question */}
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                          >
                            <span className="text-sm font-medium text-gray-900 pr-4">
                              {item.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Answer */}
                          {isExpanded && (
                            <div className="px-4 pb-3">
                              <p className="text-xs text-gray-700 text-justify leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
