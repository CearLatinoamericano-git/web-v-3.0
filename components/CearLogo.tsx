import Capa1 from '../imports/Capa1';

// Logo CEAR LATINOAMERICANO con globo terráqueo
export default function CearLogo() {
  return (
    <div 
      className="w-full h-full flex items-center justify-start"
      style={{
        ['--fill-0' as string]: '#0B95BA'
      }}
    >
      <Capa1 />
    </div>
  );
}
