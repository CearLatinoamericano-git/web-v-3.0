import svgPaths from '../imports/svg-hgcrwnfc0e';

interface LogoCompactProps {
  className?: string;
  variant?: 'color' | 'white';
}

export function LogoCompact({ className = "h-28 w-auto", variant = 'color' }: LogoCompactProps) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        // Si es variant white, se mantiene blanco. Si es color, cambia a azul CEAR
        ['--fill-0' as string]: variant === 'white' ? '#FFFFFF' : '#0B95BA'
      }}
    >
      <svg 
        className="block h-full w-auto" 
        fill="none" 
        preserveAspectRatio="xMidYMid meet" 
        viewBox="0 0 102.383 60.5372"
        style={{
          transform: 'scale(1.2)',
          transformOrigin: 'center'
        }}
      >
        <g id="Group">
          <path d={svgPaths.p29ae1100} fill="var(--fill-0, #0B95BA)" id="Vector" />
          <path d={svgPaths.p264b2180} fill="var(--fill-0, #0B95BA)" id="Vector_2" />
          <path d={svgPaths.p31a12500} fill="var(--fill-0, #0B95BA)" id="Vector_3" />
          <path d={svgPaths.p2f012780} fill="var(--fill-0, #0B95BA)" id="Vector_4" />
          <path d={svgPaths.p8d46900} fill="var(--fill-0, #0B95BA)" id="Vector_5" />
          <path d={svgPaths.p27f86140} fill="var(--fill-0, #0B95BA)" id="Vector_6" />
          <path d={svgPaths.p1d80d8f0} fill="var(--fill-0, #0B95BA)" id="Vector_7" />
          <path d={svgPaths.p1123c600} fill="var(--fill-0, #0B95BA)" id="Vector_8" />
          <path d={svgPaths.p1b7e5b80} fill="var(--fill-0, #0B95BA)" id="Vector_9" />
          <path d={svgPaths.p35d72600} fill="var(--fill-0, #0B95BA)" id="Vector_10" />
          <path d={svgPaths.p1b72a2c0} fill="var(--fill-0, #0B95BA)" id="Vector_11" />
          <path d={svgPaths.p3e8c0600} fill="var(--fill-0, #0B95BA)" id="Vector_12" />
          <path d={svgPaths.p275bea00} fill="var(--fill-0, #0B95BA)" id="Vector_13" />
          <path d={svgPaths.p34c1d200} fill="var(--fill-0, #0B95BA)" id="Vector_14" />
          <path d={svgPaths.p14983d80} fill="var(--fill-0, #0B95BA)" id="Vector_15" />
          <path d={svgPaths.p206c5200} fill="var(--fill-0, #0B95BA)" id="Vector_16" />
          <path d={svgPaths.p2c119680} fill="var(--fill-0, #0B95BA)" id="Vector_17" />
          <path d={svgPaths.p27c49080} fill="var(--fill-0, #0B95BA)" id="Vector_18" />
          <path d={svgPaths.p334b2880} fill="var(--fill-0, #0B95BA)" id="Vector_19" />
          <path d={svgPaths.p2e4d8680} fill="var(--fill-0, #0B95BA)" id="Vector_20" />
          <path d={svgPaths.p3d4beb00} fill="var(--fill-0, #0B95BA)" id="Vector_21" />
          <path d={svgPaths.p4ede600} fill="var(--fill-0, #0B95BA)" id="Vector_22" />
          <path d={svgPaths.p1fee9800} fill="var(--fill-0, #0B95BA)" id="Vector_23" />
          <path d={svgPaths.p61eec80} fill="var(--fill-0, #0B95BA)" id="Vector_24" />
          <path d={svgPaths.pf238200} fill="var(--fill-0, #0B95BA)" id="Vector_25" />
          <path d={svgPaths.p2ec5adf0} fill="var(--fill-0, #0B95BA)" id="Vector_26" />
          <path d={svgPaths.p32f4d600} fill="var(--fill-0, #0B95BA)" id="Vector_27" />
        </g>
      </svg>
    </div>
  );
}