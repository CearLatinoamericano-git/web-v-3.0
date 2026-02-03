import { useEffect } from 'react';

/**
 * Componente que asegura la configuración correcta del viewport para iOS
 * Previene zoom automático y problemas de reescalado
 */
export function ViewportFix() {
  useEffect(() => {
    // Asegurar que exista el meta viewport correcto
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    
    // Configuración óptima para iOS
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
    );

    // Prevenir zoom en inputs en iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (input instanceof HTMLElement) {
        const fontSize = window.getComputedStyle(input).fontSize;
        const size = parseFloat(fontSize);
        
        // iOS hace zoom automático si el font-size es menor a 16px
        if (size < 16) {
          input.style.fontSize = '16px';
        }
      }
    });

    // Prevenir bounce en iOS (rubber band effect)
    const preventBounce = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest('[style*="overflow"]') || 
                        target.closest('.overflow-auto') ||
                        target.closest('.overflow-y-auto') ||
                        target.closest('.overflow-x-auto');
      
      if (!scrollable) {
        e.preventDefault();
      }
    };

    // Solo en iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    if (isIOS) {
      document.body.addEventListener('touchmove', preventBounce, { passive: false });
    }

    return () => {
      if (isIOS) {
        document.body.removeEventListener('touchmove', preventBounce);
      }
    };
  }, []);

  return null;
}
