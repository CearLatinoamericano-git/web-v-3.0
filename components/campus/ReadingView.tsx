import { Download, X, ZoomIn, ZoomOut, Maximize2, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface ReadingViewProps {
  onClose: () => void;
  title: string;
  pdfUrl: string;
  courseName?: string;
  moduleName?: string;
}

export function ReadingView({ onClose, title, pdfUrl, courseName, moduleName }: ReadingViewProps) {
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0B95BA] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900">{title}</h1>
                  {courseName && moduleName && (
                    <p className="text-sm text-gray-600">
                      {courseName} • {moduleName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  title="Reducir zoom"
                  disabled={zoom <= 50}
                >
                  <ZoomOut className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                  title="Aumentar zoom"
                  disabled={zoom >= 200}
                >
                  <ZoomIn className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Fullscreen */}
              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    document.documentElement.requestFullscreen();
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Pantalla completa"
              >
                <Maximize2 className="w-5 h-5 text-gray-600" />
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-[#0B95BA] hover:bg-[#087A98] text-white rounded-lg transition-colors font-medium"
              >
                <Download className="w-5 h-5" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div 
            className="w-full transition-transform origin-top"
            style={{ 
              height: 'calc(100vh - 180px)',
              transform: `scale(${zoom / 100})`
            }}
          >
            <iframe
              src={pdfUrl}
              className="w-full h-full"
              title={title}
              style={{
                border: 'none',
                width: zoom > 100 ? `${(100 / zoom) * 100}%` : '100%',
                height: zoom > 100 ? `${(100 / zoom) * 100}%` : '100%',
              }}
            />
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <p>
            Utilice los controles superiores para ajustar el zoom o descargar el documento.
          </p>
          <p className="text-xs text-gray-500">
            Documento PDF • Vista de lectura
          </p>
        </div>
      </div>
    </div>
  );
}