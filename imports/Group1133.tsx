import svgPaths from "./svg-mt6gv0djaa";

function Icon1() {
  return (
    <div className="absolute contents inset-[8.33%_16.67%_8.33%_16.66%]" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.3375 32.1903">
            <path d={svgPaths.p24ea0b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector_2">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.7056 11.7056">
            <path d={svgPaths.p21073a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector_3">
        <div className="absolute inset-[-1.46px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.85278 2.92639">
            <path d="M4.38959 1.4632H1.4632" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector_4">
        <div className="absolute inset-[-1.46px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.632 2.92639">
            <path d="M13.1688 1.4632H1.4632" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector_5">
        <div className="absolute inset-[-1.46px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.632 2.92639">
            <path d="M13.1688 1.4632H1.4632" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.92639" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[35.117px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[35.117px] top-0" data-name="Icon9">
      <Icon />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Icon2 />
    </div>
  );
}