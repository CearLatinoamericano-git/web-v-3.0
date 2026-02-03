import React from 'react';

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export function ImagePlaceholder({ 
  width = '100%', 
  height = '100%', 
  className = '',
  style,
  alt = 'Placeholder'
}: ImagePlaceholderProps) {
  const defaultStyle: React.CSSProperties = {
    width,
    height,
    backgroundColor: '#e5e7eb', // gray-200
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  };

  return (
    <div 
      className={`bg-gray-200 ${className}`}
      style={defaultStyle}
      role="img"
      aria-label={alt}
    >
      {/* Opcional: puedes agregar un icono o texto aquí si quieres */}
    </div>
  );
}

