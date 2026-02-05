import { X } from 'lucide-react';

interface ModelClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModelClassModal({ isOpen, onClose }: ModelClassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-600 hover:text-gray-800 transition-colors rounded-full p-2 shadow-lg hover:shadow-xl z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          {/* Título */}
          <h2 className="text-center text-[#0B95BA] mb-6 font-bold text-[48px]">
            Clase modelo
          </h2>

          {/* Reproductor de YouTube */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/P3H0oaHKGXQ?si=DHClyG2MkBXtE7U8"
              title="Clase modelo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-[#0B95BA] text-white rounded-xl hover:bg-[#087A98] transition-all shadow-lg hover:shadow-xl font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
