import { X, Send, MapPin, Phone, Mail, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { storeContacto, type ContactFormData } from '../../services/solicitudes';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    celular: '',
    estado_politica: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const contactoData: ContactFormData = {
        nombre: formData.fullName,
        email: formData.email,
        celular: formData.celular || '',
        mensaje: formData.message,
        estado_politica: formData.estado_politica,
      };

      await storeContacto(contactoData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          message: '',
          celular: '',
          estado_politica: false
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al enviar el mensaje. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#0B95BA] to-[#087A98] rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors flex items-center gap-2"
          >
            <X className="w-6 h-6" />
            <span>Volver</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulario de contacto */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0B95BA] rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-[#0B95BA] text-2xl">Contáctanos</h2>
              </div>
              
              <p className="text-gray-600 text-sm mb-6 text-justify">
                Complete el formulario y nos pondremos en contacto con usted
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre completo */}
                <div>
                  <label htmlFor="fullName" className="block text-[#0B95BA] mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-[#0B95BA] placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Correo */}
                <div>
                  <label htmlFor="email" className="block text-[#0B95BA] mb-2">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-[#0B95BA] placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="celular" className="block text-[#0B95BA] mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    placeholder="+51 999 999 999"
                    value={formData.celular}
                    onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-[#0B95BA] placeholder:text-gray-400"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-[#0B95BA] mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    placeholder="Escribe tu mensaje aquí"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-[#0B95BA] placeholder:text-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Política de privacidad */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="estado_politica"
                    checked={formData.estado_politica}
                    onChange={(e) => setFormData({ ...formData, estado_politica: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[#0B95BA] border-gray-300 rounded focus:ring-[#0B95BA]"
                    required
                  />
                  <label htmlFor="estado_politica" className="text-sm text-gray-600">
                    Acepto la política de privacidad y tratamiento de datos personales *
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 text-red-600 bg-red-50 p-3 rounded-xl border-2 border-red-200">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="flex items-center gap-3 text-green-600 bg-green-50 p-3 rounded-xl border-2 border-green-200">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.</span>
                  </div>
                )}

                {/* Botón enviar */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.estado_politica}
                  className="w-full bg-[#0B95BA] hover:bg-[#087A98] text-white py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar'
                  )}
                </button>
              </form>
            </div>

            {/* Información de contacto y ubicación */}
            <div className="space-y-6">
              {/* Mapa */}
              <div className="bg-white rounded-2xl p-4 shadow-xl">
                <h3 className="text-[#0B95BA] mb-4">Ubicación</h3>
                <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                  {/* Google Maps iframe */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3384747891547!2d-77.04935492419614!3d-12.084899342743857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9c8a4e4e4e5%3A0x5e5e5e5e5e5e5e5e!2sCentro%20de%20Arbitraje%20CEAR%20LATINOAMERICANO!5e0!3m2!1ses!2spe!4v1234567890123!5m2!1ses!2spe"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación CEAR LATINOAMERICANO"
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* Información de contacto */}
              <div className="bg-white rounded-2xl p-6 shadow-xl space-y-4">
                {/* Dirección */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 text-left text-[16px] pt-[9px] pr-[0px] pb-[0px] pl-[0px]">
                      Av. Faustino Sánchez Carrión 615 – Jesús María, Lima
                    </p>
                  </div>
                </div>

                {/* Teléfono y Email agrupados */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 text-[16px]">+51 986 605 219</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}