import Capa1 from '../imports/Capa1';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white';
}

export function Logo({ className = "h-8 w-auto", variant = 'color' }: LogoProps) {
  const fillColor = variant === 'white' ? '#FFFFFF' : '#0B95BA';
  
  return (
    <div 
      className={className}
      style={{
        display: 'block',
        flexShrink: 0,
        ['--fill-0' as string]: fillColor
      }}
    >
      <Capa1 />
    </div>
  );
}