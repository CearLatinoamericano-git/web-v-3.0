import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B95BA] to-[#087A98] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#0B95BA]" />
            </div>
            <h2 className="text-white text-2xl font-bold">
              Política de privacidad
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
        <div className="flex-1 overflow-y-auto p-6 text-xs text-gray-700 space-y-4">
          <p className="text-justify">
            CEAR LATINOAMERICANO, en su calidad de responsable del tratamiento de datos personales, garantiza que la información proporcionada por los usuarios será tratada conforme a los principios de legalidad, consentimiento, finalidad, proporcionalidad y seguridad. El tratamiento de los datos se realiza exclusivamente para fines académicos, institucionales, administrativos e informativos relacionados con sus programas de capacitación y servicios arbitrales. En ningún caso los datos personales serán utilizados para finalidades distintas o incompatibles con aquellas para las cuales fueron recopilados.
          </p>

          <p className="text-justify">
            Los datos personales recopilados a través de formularios físicos o digitales pueden incluir nombres y apellidos, documento de identidad, número telefónico, correo electrónico y cualquier otra información proporcionada voluntariamente por el titular. El suministro de dicha información es facultativo; sin embargo, la negativa a proporcionarla puede impedir la atención de solicitudes de información o la prestación de determinados servicios institucionales. El titular declara que los datos proporcionados son veraces, actualizados y exactos, liberando a CEAR LATINOAMERICANO de responsabilidad por información incorrecta o inexacta.
          </p>

          <p className="text-justify">
            CEAR LATINOAMERICANO no transfiere, comunica ni cede datos personales a terceros, salvo cuando exista una obligación legal, mandato de autoridad competente o consentimiento previo, expreso e informado del titular. En caso de encargos de tratamiento, estos se realizarán bajo acuerdos que garanticen el cumplimiento de la normativa vigente en materia de protección de datos personales. Asimismo, podrán realizarse transferencias cuando sean necesarias para el cumplimiento de obligaciones contractuales o institucionales debidamente informadas.
          </p>

          <p className="text-justify">
            CEAR LATINOAMERICANO implementa medidas técnicas, organizativas y legales razonables para garantizar la confidencialidad, integridad y disponibilidad de los datos personales. No obstante, el usuario reconoce que ningún sistema de seguridad es infalible y que CEAR LATINOAMERICANO no será responsable por accesos no autorizados derivados de causas ajenas a su control razonable. En caso de incidentes de seguridad, se adoptarán las acciones correctivas conforme a la normativa aplicable.
          </p>

          <p className="text-justify">
            El titular de los datos personales podrá ejercer sus derechos de acceso, rectificación, cancelación y oposición, conforme a los procedimientos y plazos previstos en la legislación vigente. Dichos derechos podrán ejercerse mediante comunicación dirigida al correo administracion@cearlatinoamericano.pe, acompañando la información necesaria para acreditar su identidad. CEAR LATINOAMERICANO se reserva el derecho de verificar la identidad del solicitante antes de atender cualquier requerimiento.
          </p>

          <p className="text-justify">
            El tratamiento de los datos personales se rige por la Ley Nº 29733, Ley de Protección de Datos Personales, su Reglamento aprobado por el Decreto Supremo Nº 016-2024-JUS, y las normas complementarias que resulten aplicables. Asimismo, se aplica lo dispuesto en el numeral 6 del artículo 2 de la Constitución Política del Perú, relativo a la protección de datos personales. El uso del sitio web y el envío de información mediante sus formularios implican la aceptación expresa de la presente Política de Privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}
