import { X, Calendar, FileText, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { storeDenuncias, type DenunciaFormData } from '../services/denuncias';

interface ComplaintFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComplaintFormModal({ isOpen, onClose }: ComplaintFormModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    dateFrom: '',
    dateTo: '',
    isContinuing: false,
    involved: '',
    email: '',
    files: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const denunciaData: DenunciaFormData = {
        hecho: formData.description,
        desde: formData.dateFrom,
        hasta: formData.dateTo || undefined,
        continua: formData.isContinuing ? "1" : "0",
        involucrados: formData.involved,
        correo: formData.email,
        prueba: formData.files,
      };

      await storeDenuncias(denunciaData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        // Reset form
        setFormData({
          description: '',
          dateFrom: '',
          dateTo: '',
          isContinuing: false,
          involved: '',
          email: '',
          files: []
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al enviar la denuncia. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setFormData({ ...formData, files: [...formData.files, ...filesArray].slice(0, 5) });
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFormData({
      ...formData,
      files: formData.files.filter((_, index) => index !== indexToRemove)
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-[#0BDDB3] font-bold">FORMULARIO DE DENUNCIA</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Correo */}
          <div>
            <label className="block text-gray-900 mb-2 font-bold">
              CORREO:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="El correo ingresado no debe contener sus datos"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent"
            />
          </div>

          {/* Presunto Hecho Irregular */}
          <div>
            <label className="block text-gray-900 mb-2 font-bold">
              PRESUNTO HECHO IRREGULAR
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción de los hechos"
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent resize-none"
            />
          </div>

          {/* Fechas */}
          <div>
            <label className="block text-gray-900 mb-3 font-bold">
              FECHAS
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#0BDDB3] text-sm mb-2">
                  Desde:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dateFrom}
                    onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                    required={!formData.isContinuing}
                    disabled={formData.isContinuing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[#0BDDB3] text-sm mb-2">
                  Hasta:
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.dateTo}
                    onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                    required={!formData.isContinuing}
                    disabled={formData.isContinuing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isContinuing}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  isContinuing: e.target.checked,
                  dateFrom: e.target.checked ? '' : formData.dateFrom,
                  dateTo: e.target.checked ? '' : formData.dateTo
                })}
                className="w-4 h-4 text-[#0BDDB3] border-gray-300 rounded focus:ring-[#0BDDB3]"
              />
              <span className="text-gray-700 text-sm">Continúa ocurriendo</span>
            </label>
          </div>

          {/* Involucrados */}
          <div>
            <label className="block text-gray-900 mb-2 font-bold">
              INVOLUCRADOS
            </label>
            <p className="text-[#0BDDB3] text-sm mb-2">
              ¿Conoce datos de los involucrados?
            </p>
            <textarea
              value={formData.involved}
              onChange={(e) => setFormData({ ...formData, involved: e.target.value })}
              placeholder="Escriba aquí..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent resize-none"
            />
          </div>

          {/* Prueba de los Hechos */}
          <div>
            <label className="block text-gray-900 mb-2 font-bold">
              PRUEBA DE LOS HECHOS
            </label>
            <p className="text-[#0BDDB3] text-sm mb-2">
              ¿Cuenta con pruebas de hechos?
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept="image/*,.pdf,.doc,.docx"
              className="w-full px-4 py-3 border-2 border-[#0B95BA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#0B95BA] file:text-white hover:file:bg-[#0a7c9a] file:cursor-pointer"
            />
            <p className="text-gray-500 text-xs mt-2">
              Peso máximo por archivo: 10 MB. Puede seleccionar hasta 5 archivos.
            </p>
            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="w-5 h-5 text-[#0B95BA] flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Su denuncia ha sido enviada correctamente. Será tratada con estricta confidencialidad.</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#0BDDB3] text-white rounded-lg hover:bg-[#09c5a1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          </div>
        </form>
      </div>
    </div>
  );
}