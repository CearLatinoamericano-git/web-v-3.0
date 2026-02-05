import { X, FileText, Loader2, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { useState, useRef } from 'react';
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
  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[FORM] Submit iniciado');
    console.log('[FORM] Datos del formulario:', formData);
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

      console.log('[FORM] Datos preparados para enviar:', denunciaData);
      console.log('[FORM] Llamando a storeDenuncias...');
      await storeDenuncias(denunciaData);
      console.log('[FORM] storeDenuncias completado exitosamente');
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar la denuncia. Por favor, intente nuevamente.';
      setError(errorMessage);
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
                    ref={dateFromRef}
                    type="date"
                    value={formData.dateFrom}
                    onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                    required={!formData.isContinuing}
                    disabled={formData.isContinuing}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0 [&::-webkit-calendar-picker-indicator]:h-0 [&::-moz-calendar-picker-indicator]:hidden"
                    style={{
                      colorScheme: 'light'
                    }}
                  />
                  <Calendar 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-[#0BDDB3] transition-colors" 
                    onClick={() => {
                      if (!formData.isContinuing && dateFromRef.current) {
                        dateFromRef.current.focus();
                        if (dateFromRef.current.showPicker) {
                          dateFromRef.current.showPicker();
                        } else {
                          dateFromRef.current.click();
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#0BDDB3] text-sm mb-2">
                  Hasta:
                </label>
                <div className="relative">
                  <input
                    ref={dateToRef}
                    type="date"
                    value={formData.dateTo}
                    onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                    required={!formData.isContinuing}
                    disabled={formData.isContinuing}
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BDDB3] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-0 [&::-webkit-calendar-picker-indicator]:h-0 [&::-moz-calendar-picker-indicator]:hidden"
                    style={{
                      colorScheme: 'light'
                    }}
                  />
                  <Calendar 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-[#0BDDB3] transition-colors" 
                    onClick={() => {
                      if (!formData.isContinuing && dateToRef.current) {
                        dateToRef.current.focus();
                        if (dateToRef.current.showPicker) {
                          dateToRef.current.showPicker();
                        } else {
                          dateToRef.current.click();
                        }
                      }
                    }}
                  />
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
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-3 w-full px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-[#0BDDB3] transition-all cursor-pointer group focus-within:ring-2 focus-within:ring-[#0BDDB3] focus-within:border-transparent"
              >
                <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#0BDDB3] transition-colors" />
                <span className="text-gray-600 group-hover:text-[#0BDDB3] transition-colors">
                  {formData.files.length > 0 
                    ? `${formData.files.length} archivo${formData.files.length > 1 ? 's' : ''} seleccionado${formData.files.length > 1 ? 's' : ''}`
                    : 'Haga clic para seleccionar archivos o arrástrelos aquí'}
                </span>
              </label>
            </div>
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
                      <FileText className="w-5 h-5 text-[#0B95BA] shrink-0" />
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
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm">Su denuncia ha sido enviada correctamente. Será tratada con estricta confidencialidad.</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-[#0BDDB3] text-white rounded-lg hover:bg-[#09c5a1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
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