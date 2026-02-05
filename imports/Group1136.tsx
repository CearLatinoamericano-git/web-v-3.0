export default function Group() {
  return (
    <>
      {/* Versión Desktop - Compacta y profesional */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-lg py-4 lg:py-6 px-4 lg:px-8 hidden md:flex justify-between items-center gap-4 lg:gap-6 mx-auto">
        {/* Estadística 1 */}
        <div className="flex-1 flex flex-col items-center">
          {/* Fila superior: ícono + número */}
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-linear-to-b from-[#0b95ba] to-[#087a98] border-[#1c98b7] border border-solid rounded-lg size-10 lg:size-12 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 lg:w-7 lg:h-7">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <p className="font-bold leading-0 text-[#1c98b7]">
              <span className="text-3xl lg:text-4xl">700</span>
              <span className="text-3xl lg:text-4xl">+</span>
            </p>
          </div>
          {/* Texto abajo */}
          <p className="font-semibold leading-tight text-sm lg:text-base text-center uppercase text-[#1c98b7] max-w-[200px]">
            Profesionales capacitados
          </p>
        </div>

        {/* Estadística 2 */}
        <div className="flex-1 flex flex-col items-center">
          {/* Fila superior: ícono + número */}
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-linear-to-b from-[#0b95ba] to-[#087a98] border-[#1c98b7] border border-solid rounded-lg size-10 lg:size-12 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 lg:w-7 lg:h-7">
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <p className="font-bold leading-0 text-[#1c98b7]">
              <span className="text-3xl lg:text-4xl">20</span>
              <span className="text-3xl lg:text-4xl">+</span>
            </p>
          </div>
          {/* Texto abajo */}
          <p className="font-semibold leading-tight text-sm lg:text-base text-center uppercase text-[#1c98b7] max-w-[200px]">
            Programas especializados
          </p>
        </div>

        {/* Estadística 3 */}
        <div className="flex-1 flex flex-col items-center">
          {/* Fila superior: ícono + número */}
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-linear-to-b from-[#0b95ba] to-[#087a98] border-[#1c98b7] border border-solid rounded-lg size-10 lg:size-12 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 lg:w-7 lg:h-7">
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                <circle cx="12" cy="8" r="6"></circle>
              </svg>
            </div>
            <p className="font-bold leading-0 text-[#1c98b7]">
              <span className="text-3xl lg:text-4xl">95</span>
              <span className="text-3xl lg:text-4xl">+</span>
            </p>
          </div>
          {/* Texto abajo */}
          <p className="font-semibold leading-tight text-sm lg:text-base text-center uppercase text-[#1c98b7] max-w-[200px]">
            Reconocimiento académico
          </p>
        </div>
      </div>

      {/* Versión Mobile - Compacta y profesional */}
      <div className="bg-white flex flex-col items-center px-4 py-4 relative rounded-2xl shadow-lg w-full h-auto md:hidden">
        {/* Fila superior: ícono + número */}
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-linear-to-b from-[#0b95ba] to-[#087a98] border-[#1c98b7] border border-solid relative rounded-lg shrink-0 size-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block w-6 h-6">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <p className="font-bold leading-0 text-[#1c98b7]">
            <span className="text-3xl">700</span>
            <span className="text-3xl">+</span>
          </p>
        </div>

        {/* Texto abajo */}
        <p className="font-semibold leading-tight text-sm text-[#1c98b7] text-center uppercase max-w-[200px]">
          Profesionales capacitados
        </p>
      </div>
    </>
  );
}
