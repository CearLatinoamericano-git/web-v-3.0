import { X, BookOpen } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-[#0B95BA]" />
            </div>
            <h2 className="text-white text-2xl font-bold">
              Términos y condiciones
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-700 space-y-4">
          <p className="text-justify">
            El presente documento establece los Términos y Condiciones de Uso aplicables al acceso y utilización de los servicios educativos virtuales CEAR LATINOAMERICANO, incluyendo el sitio web institucional, el campus virtual, la pasarela de pagos y demás plataformas digitales vinculadas a la oferta académica. Al acceder y utilizar estos servicios, el usuario declara haber leído, comprendido y aceptado íntegramente estos términos, comprometiéndose a respetarlos y cumplirlos durante toda su relación con el centro.
          </p>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">1. OBJETIVO</h3>
            <p className="text-justify">
              Establecer las condiciones legales que regulan el uso del sitio web oficial, el campus virtual, la pasarela de pagos y demás plataformas tecnológicas administradas por el Centro de Formación Continua de CEAR LATINOAMERICANO.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">2. MARCO LEGAL</h3>
            <p className="text-justify mb-2">
              Estos términos se rigen por la legislación peruana vigente, particularmente por:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ley Nº 29733 – Ley de Protección de Datos Personales</li>
              <li>D.S. Nº 016-2024-JUS – Reglamento de la Ley de Protección de Datos Personales</li>
              <li>Ley Nº 29571 – Código de Protección y Defensa del Consumidor</li>
              <li>Ley Nº 27291 – Ley de Firmas y Certificados Digitales</li>
              <li>Código Civil peruano, y otras normas aplicables en materia de protección al usuario.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">3. DEFINICIONES</h3>
            <p className="text-justify mb-2">
              A efectos de la presente política, y en concordancia con el marco normativo, se entenderá por:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Usuario:</strong> Persona natural que se registra, accede o utiliza los servicios académicos ofrecidos por CEAR LATINOAMERICANO.</li>
              <li><strong>Campus virtual:</strong> Plataforma digital donde se desarrollan los programas académicos, incluyendo clases en vivo, materiales, tareas y evaluaciones.</li>
              <li><strong>Pasarela de pago:</strong> Medio seguro a través del cual el usuario puede realizar pagos en línea con tarjeta de crédito o débito.</li>
              <li><strong>Servicios académicos:</strong> Todos los cursos, diplomados, talleres y eventos académicos ofrecidos por CEAR LATINOAMERICANO.</li>
              <li><strong>Términos y condiciones:</strong> El presente documento, que regula el uso institucional de los servicios digitales.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">4. ALCANCE DE APLICACIÓN</h3>
            <p className="text-justify mb-2">
              Estos términos se aplican a todas las personas naturales que utilicen o interactúen con los servicios de formación continua ofrecidos por CEAR LATINOAMERICANO, incluyendo:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>El sitio web institucional y páginas asociadas.</li>
              <li>El campus virtual.</li>
              <li>La plataforma de pagos electrónicos.</li>
              <li>Canales oficiales de comunicación académica y administrativa.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">5. FORMULARIOS DE CONTACTO Y ASESORÍA PERSONALIZADA</h3>
            <p className="text-justify">
              Los programas de formación continua se encuentran publicados en el sitio web institucional y pueden ser solicitados mediante formularios de contacto o canales de atención directa (como WhatsApp). Al completar un formulario, el usuario acepta ser contactado por un asesor del Área Comercial o de Marketing, quien proporcionará información detallada sobre el contenido del programa, condiciones académicas, cronograma, requisitos y tarifas correspondientes. Este primer contacto no genera ninguna obligación contractual hasta que se realice el pago y se confirme la inscripción.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">6. PROCESO DE COMPRA</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>El usuario deberá manifestar su decisión de participar en un programa y/o evento y efectuar el pago correspondiente a través de los canales y medios autorizados por CEAR LATINOAMERICANO.</li>
              <li>Se aceptan pagos mediante tarjetas de crédito o débito, así como transferencias bancarias u otros medios formalmente habilitados.</li>
              <li>Una vez realizado el pago, el usuario recibirá un mensaje de confirmación, y será requerido para completar la ficha de inscripción respectiva.</li>
              <li>Todas las compras son consideradas finales. No se permiten devoluciones, salvo los casos expresamente contemplados.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">7. FICHA DE INSCRIPCIÓN Y RECOPILACIÓN DE DATOS</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Luego del pago, el usuario deberá completar una ficha de inscripción con sus datos personales, laborales y académicos.</li>
              <li>Es obligación del usuario brindar información veraz, actualizada y completa. Esta información será utilizada para efectos académicos, administrativos y de certificación.</li>
              <li>El envío y validación de la ficha es condición indispensable para completar el proceso de inscripción en el campus virtual.</li>
              <li>El tratamiento de los datos personales será realizado conforme a la Política de Tratamiento de Datos vigente, la Ley Nº 29733 y su Reglamento.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">8. ACCESO AL CAMPUS VIRTUAL</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>El acceso al campus virtual será habilitado una vez verificados el pago y la ficha de inscripción.</li>
              <li>El usuario recibirá sus credenciales personales a través del correo electrónico indicado en su ficha, las cuales son confidenciales, intransferibles y de uso exclusivo.</li>
              <li>El usuario es responsable de custodiar su usuario y contraseña. En caso de uso indebido o sospecha de acceso no autorizado, deberá informar de inmediato a CEAR LATINOAMERICANO.</li>
              <li>CEAR LATINOAMERICANO se reserva el derecho de suspender temporal o permanentemente el acceso en caso de uso fraudulento o indebido de la plataforma.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">9. RESPONSABILIDAD DEL USUARIO</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>El usuario es responsable de proporcionar datos verídicos y actualizados.</li>
              <li>La información de pago ingresada debe corresponder al titular del servicio o contar con la debida autorización.</li>
              <li>CEAR LATINOAMERICANO no se responsabiliza por errores o perjuicios derivados del ingreso de datos incorrectos.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">10. POLÍTICA DE REEMBOLSOS</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Se realizarán reembolsos únicamente en casos debidamente justificados, como errores de facturación imputables a CEAR LATINOAMERICANO.</li>
              <li>Para solicitar un reembolso, el usuario deberá enviar una solicitud formal al correo oficial de atención dentro de los 7 días hábiles posteriores al pago.</li>
              <li>La evaluación de la solicitud se realizará dentro de un plazo de 15 días hábiles.</li>
              <li>No se reembolsará el pago por cambios de decisión personal o por no uso del servicio una vez iniciado el programa.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">11. SEGURIDAD Y PRIVACIDAD</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Toda transacción se realiza mediante una pasarela de pagos segura y con cifrado de datos.</li>
              <li>CEAR LATINOAMERICANO no almacena información de tarjetas bancarias ni otros datos sensibles del medio de pago.</li>
              <li>El tratamiento de datos personales se realiza conforme a la Ley Nº 29733 y su Reglamento, bajo estrictas medidas de seguridad físicas y digitales.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">12. PROPIEDAD INTELECTUAL</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Todos los contenidos, materiales, clases grabadas, presentaciones, documentos y recursos del campus virtual son propiedad intelectual de CEAR LATINOAMERICANO o de sus autores.</li>
              <li>Queda prohibida la reproducción, distribución, modificación o uso no autorizado de los mismos sin el consentimiento expreso del titular de derechos.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">13. CONDUCTA Y USO ADECUADO DEL CAMPUS</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>El usuario se compromete a respetar la integridad del entorno educativo virtual.</li>
              <li>Está prohibido realizar actividades que interfieran con el normal desarrollo de las sesiones académicas, incluyendo spam, lenguaje ofensivo, acoso o conductas contrarias al reglamento interno.</li>
              <li>CEAR LATINOAMERICANO podrá suspender el acceso a usuarios que infrinjan las normas de convivencia académica.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">14. LIMITACIÓN DE RESPONSABILIDAD</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>CEAR LATINOAMERICANO no se responsabiliza por interrupciones en el servicio por causas externas (fallas de proveedor de internet, apagones, fuerza mayor, etc.).</li>
              <li>Asimismo, no garantiza que el uso del servicio será libre de errores, aunque se compromete a implementar correctivos oportunos.</li>
              <li>La institución no se hace responsable por el uso indebido de las plataformas por parte del usuario.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">15. MODIFICACIONES DE LOS TÉRMINOS</h3>
            <p className="text-justify">
              CEAR LATINOAMERICANO se reserva el derecho de modificar en cualquier momento estos Términos y Condiciones para adaptarlos a cambios normativos, técnicos o institucionales. La versión vigente estará disponible en el sitio web oficial y regirá desde su fecha de publicación.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2">16. CANALES DE CONSULTA Y ATENCIÓN</h3>
            <p className="text-justify mb-2">
              Los titulares podrán presentar sus consultas, dudas o solicitudes mediante:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Correo electrónico a: academico@cearlatinoamericano.edu.pe</li>
              <li>Dirección física en: Av. Faustino Sánchez Carrión 615, Jesús María - Oficina 306</li>
            </ul>
            <p className="text-justify mt-2">
              La respuesta será emitida dentro del plazo legal establecido en el marco normativo vigente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}