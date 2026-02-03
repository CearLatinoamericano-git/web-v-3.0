import svgPaths from "./svg-sj41ieqzoe";


function Image() {
  return (
    <div className="absolute h-[693px] left-0 opacity-20 top-0 w-[382px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={''} />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#0b95ba] h-[693px] left-0 overflow-clip top-[-0.42px] w-[382px]" data-name="Container">
      <Image />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-white h-[692.648px] left-0 top-0 w-[381.747px]" data-name="Container">
      <Container />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[22.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4997 22.4997">
        <g id="Icon">
          <path d={svgPaths.p1d292200} fill="var(--fill-0, #0B95BA)" id="Vector (Stroke)" />
          <path d={svgPaths.p35bbaf80} fill="var(--fill-0, #0B95BA)" id="Vector (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center pl-[1.088px] pr-[1.105px] py-[1.088px] relative rounded-[15.25px] size-[53.989px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.088px] border-solid inset-0 pointer-events-none rounded-[15.25px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)]" />
      <Icon />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <div className="absolute inset-[0_67.53%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.686 26.2426">
          <path d={svgPaths.p3eae45f0} fill="var(--fill-0, #D91023)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_33.77%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.686 26.2426">
          <path d={svgPaths.p3eae45f0} fill="var(--fill-0, #EEEEEE)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0_67.53%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.686 26.2426">
          <path d={svgPaths.p3eae45f0} fill="var(--fill-0, #D91023)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[26.243px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function PeruFlag() {
  return (
    <div className="h-[26.243px] relative shrink-0 w-[35.993px]" data-name="PeruFlag">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Pe() {
  return (
    <div className="absolute h-[16.364px] left-[1.8px] top-[6.72px] w-[24.747px]" data-name="PE">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7473 16.3637">
        <g id="PE">
          <path d={svgPaths.pb6cca80} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p15a66500} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[31.489px] relative shrink-0 w-[28.006px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Pe />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[14.988px] h-[52.969px] items-center left-[26px] pl-[23.995px] pr-0 py-0 rounded-[18px] shadow-[0px_0px_25px_0px_rgba(0,0,0,0.3)] top-[608.58px] w-[120.978px]" data-name="Container">
      <PeruFlag />
      <Text />
    </div>
  );
}

function BienvenidoAl() {
  return (
    <div className="absolute contents left-[3.06px] top-[9.37px]" data-name="Bienvenido al">
      <div className="absolute h-[23.025px] left-[191.95px] top-[9.46px] w-[2.001px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.00119 23.0249">
          <path d={svgPaths.p10d100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.898px] left-[173.47px] top-[14.98px] w-[13.154px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1539 17.8983">
          <path d={svgPaths.p1b194300} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.865px] left-[145.83px] top-[14.98px] w-[15.2px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2001 17.8646">
          <path d={svgPaths.p39650800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[23.385px] left-[126.41px] top-[9.46px] w-[14.604px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6042 23.3847">
          <path d={svgPaths.p20aeb380} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[23.115px] left-[119.52px] top-[9.37px] w-[2.991px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99055 23.1149">
          <path d={svgPaths.p151acc50} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.494px] left-[101.64px] top-[14.99px] w-[13.064px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.064 17.4936">
          <path d={svgPaths.p3efd0600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.865px] left-[82.36px] top-[14.98px] w-[14.874px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.874 17.8646">
          <path d={svgPaths.p33a63900} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.269px] left-[65.2px] top-[15.22px] w-[14.75px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.7504 17.2687">
          <path d={svgPaths.p29db7800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.494px] left-[48.86px] top-[14.99px] w-[13.064px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.064 17.4936">
          <path d={svgPaths.p3caae030} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[17.865px] left-[29.58px] top-[14.98px] w-[14.874px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.874 17.8646">
          <path d={svgPaths.p3c418200} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[23.115px] left-[22.69px] top-[9.37px] w-[2.991px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.99054 23.1149">
          <path d={svgPaths.p1ea9cc40} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[23.025px] left-[3.06px] top-[9.46px] w-[15.425px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.4249 23.0249">
          <path d={svgPaths.pfb3800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[44.308px] relative shrink-0 w-full" data-name="Paragraph">
      <BienvenidoAl />
    </div>
  );
}

function Campus() {
  return (
    <div className="absolute contents left-[2.87px] top-[12.86px]" data-name="CAMPUS">
      <div className="absolute h-[42.598px] left-[217.58px] top-[12.86px] w-[32.784px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.7836 42.5984">
          <path d={svgPaths.p263e2e00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[42.032px] left-[177.34px] top-[13.43px] w-[34.362px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.362 42.0318">
          <path d={svgPaths.p29644d00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[140.45px] top-[13.43px] w-[31.205px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.2051 41.4449">
          <path d={svgPaths.p1c74ca00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[88.3px] top-[13.43px] w-[44.926px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.9256 41.4449">
          <path d={svgPaths.p3818b00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[43.43px] top-[13.43px] w-[39.887px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.8867 41.4449">
          <path d={svgPaths.p1e94be80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[42.578px] left-[2.87px] top-[12.86px] w-[37.296px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2964 42.5782">
          <path d={svgPaths.p1c4e6f80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Virtual() {
  return (
    <div className="absolute contents left-[1.36px] top-[84.64px]" data-name="VIRTUAL">
      <div className="absolute h-[41.445px] left-[221.86px] top-[84.64px] w-[26.53px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.5304 41.4449">
          <path d={svgPaths.p10e7c600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[176.99px] top-[84.64px] w-[39.887px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.8867 41.4449">
          <path d={svgPaths.p5c6ba00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[42.032px] left-[137.67px] top-[84.64px] w-[34.362px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.362 42.0318">
          <path d={svgPaths.pa1c0100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[98.02px] top-[84.64px] w-[34.038px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.0382 41.4449">
          <path d={svgPaths.p1d07c100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[62.2px] top-[84.64px] w-[32.682px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.6824 41.4449">
          <path d={svgPaths.pcbe2070} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[46.23px] top-[84.64px] w-[8.763px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.76252 41.4449">
          <path d={svgPaths.p14ef1100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[41.445px] left-[1.36px] top-[84.64px] w-[39.887px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.8867 41.4449">
          <path d={svgPaths.p3ca62fa0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[142.417px] relative shrink-0 w-full" data-name="Heading 1">
      <Campus />
      <Virtual />
    </div>
  );
}

function ComprometidosConTuCrecimientoProfesional() {
  return (
    <div className="absolute contents left-[1.58px] top-[13.26px]" data-name="¡Comprometidos con tu crecimiento profesional!">
      <div className="absolute h-[20.874px] left-[312.46px] top-[59.97px] w-[2.914px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.9141 20.8742">
          <path d={svgPaths.p5511f00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[20.722px] left-[305.84px] top-[59.97px] w-[1.801px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.80108 20.7224">
          <path d={svgPaths.p331ef630} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.108px] left-[289.21px] top-[64.94px] w-[11.839px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8385 16.1085">
          <path d={svgPaths.p387efc80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[273.48px] top-[64.95px] w-[11.758px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7576 15.7442">
          <path d={svgPaths.p33973200} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[255.85px] top-[64.94px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.68 16.0781">
          <path d={svgPaths.p293fd00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[20.803px] left-[249.65px] top-[59.89px] w-[2.691px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.6915 20.8034">
          <path d={svgPaths.pc6b5c00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[234.7px] top-[64.94px] w-[11.414px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4135 16.0781">
          <path d={svgPaths.p12dec600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[218.09px] top-[64.94px] w-[13.387px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3866 16.0781">
          <path d={svgPaths.p2f41c800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[21.684px] left-[208.29px] top-[59.01px] w-[8.408px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.40836 21.6837">
          <path d={svgPaths.p2f92e480} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[191.91px] top-[64.94px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.68 16.0781">
          <path d={svgPaths.p293fd00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.775px] left-[183.02px] top-[64.92px] w-[7.083px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.08287 15.7746">
          <path d={svgPaths.p2868bee0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[21.583px] left-[165.94px] top-[64.94px] w-[13.134px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1337 21.5825">
          <path d={svgPaths.p26b37600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[140.29px] top-[64.94px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6801 16.0781">
          <path d={svgPaths.p3131b700} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[19.498px] left-[129.75px] top-[61.43px] w-[7.913px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.91258 19.4981">
          <path d={svgPaths.p3dc1c600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[114.54px] top-[64.95px] w-[11.758px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7576 15.7442">
          <path d={svgPaths.p1f9d7300} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[97.19px] top-[64.94px] w-[13.387px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3866 16.0781">
          <path d={svgPaths.p35125400} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[20.803px] left-[90.99px] top-[59.89px] w-[2.691px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.69149 20.8034">
          <path d={svgPaths.p3a87a480} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[66.93px] top-[64.95px] w-[19.69px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6904 15.7442">
          <path d={svgPaths.p30ffaf40} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[20.803px] left-[59.93px] top-[59.89px] w-[2.691px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.69149 20.8034">
          <path d={svgPaths.p268a5f00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[43.68px] top-[64.94px] w-[12.8px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7998 16.0781">
          <path d={svgPaths.pafead00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[27.12px] top-[64.94px] w-[13.387px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3866 16.0781">
          <path d={svgPaths.p1c086100} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.775px] left-[18.24px] top-[64.92px] w-[7.083px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.08287 15.7746">
          <path d={svgPaths.pb3ca800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[1.58px] top-[64.94px] w-[12.8px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7998 16.0781">
          <path d={svgPaths.p13cdb00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[297.88px] top-[18.72px] w-[11.677px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6766 15.7442">
          <path d={svgPaths.p13d7ad00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[19.498px] left-[286.38px] top-[15px] w-[7.913px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.91257 19.4981">
          <path d={svgPaths.p2562ba80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[263.16px] top-[18.52px] w-[11.758px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7576 15.7442">
          <path d={svgPaths.p9da4700} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[245.52px] top-[18.51px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.68 16.0781">
          <path d={svgPaths.p1886aa40} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[229.66px] top-[18.51px] w-[12.8px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7998 16.0781">
          <path d={svgPaths.p1c680a00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[207.09px] top-[18.51px] w-[11.414px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4135 16.0781">
          <path d={svgPaths.p373cae00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[190.21px] top-[18.51px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.68 16.0781">
          <path d={svgPaths.p1886aa40} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[21.046px] left-[172.73px] top-[13.54px] w-[13.144px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1438 21.0462">
          <path d={svgPaths.p17a63200} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[20.803px] left-[166.53px] top-[13.46px] w-[2.691px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.69149 20.8034">
          <path d={svgPaths.p3e1adf00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[19.498px] left-[155.43px] top-[15px] w-[7.913px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.91258 19.4981">
          <path d={svgPaths.p3dc1c600} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[139.37px] top-[18.51px] w-[13.387px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3866 16.0781">
          <path d={svgPaths.pa6b4a00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[115.71px] top-[18.52px] w-[19.69px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6904 15.7442">
          <path d={svgPaths.p3e5820f1} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[98.08px] top-[18.51px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6801 16.0781">
          <path d={svgPaths.p615fb00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.775px] left-[89.19px] top-[18.49px] w-[7.083px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.08287 15.7746">
          <path d={svgPaths.p3c8a5500} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[21.583px] left-[72.11px] top-[18.51px] w-[13.134px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1337 21.5825">
          <path d={svgPaths.p1687d300} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[15.744px] left-[47.65px] top-[18.52px] w-[19.69px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.6904 15.7442">
          <path d={svgPaths.p39081300} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[16.078px] left-[30.02px] top-[18.51px] w-[13.68px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6801 16.0781">
          <path d={svgPaths.p2dc1b800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[21.289px] left-[9.58px] top-[13.26px] w-[17.161px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1608 21.2891">
          <path d={svgPaths.p2add92c0} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute h-[20.874px] left-[2.43px] top-[18.65px] w-[2.914px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.91409 20.8742">
          <path d={svgPaths.p8509b00} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[92.633px] relative shrink-0 w-full" data-name="Paragraph">
      <ComprometidosConTuCrecimientoProfesional />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12.649px] h-[318px] items-start left-[30px] top-[260.58px] w-[322px]" data-name="Container">
      <Paragraph />
      <Heading />
      <Paragraph1 />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <Container1 />
      <div className="absolute flex items-center justify-center left-[294px] size-[53.989px] top-[607.58px]">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <Button />
        </div>
      </div>
      <Container2 />
      <Container3 />
    </div>
  );
}