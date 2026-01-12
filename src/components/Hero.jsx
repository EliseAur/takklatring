import heroImage from "../images/hero-img-1920-4.jpg";
import iconVerified from "../images/icon-verified-orange.svg";

/**
 * Hero component displays the main introduction section of the portfolio.
 *
 * Features:
 * - Hero image
 * - Main heading and short description
 * - Button to scroll to the services or order section / pages
 *
 * @component
 * @example
 * return (
 *   <Hero />
 * )
 */
export default function Hero() {
  return (
    <section id="top" className="overflow-hidden w-full" style={{ minHeight: "calc(100vh - 94px)" }}>
      <div className="heroImage relative flex" style={{ minHeight: "calc(100vh - 94px)" }}>
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-right bg-darkblue origin-right lg:pl-96" />
        <div className="absolute inset-0 bg-gradient-to-b  from-darkblue/50 via-darkblue/50 to-darkblue/50 lg:bg-gradient-to-r lg:from-darkblue/100 lg:via-darkblue/30 lg:via-[25%] lg:to-transparent lg:ml-96" />

        <div className="relative z-20 my-auto flex flex-col md:mx-20 px-7 md:px-0 h-full w-[620px]">
          <h1 className="text-neutral-100 font-headings text-5xl  md:text-6xl mb-4 break-words leading-tight font-bold tracking-tight ">Tak og Fasadeklatring</h1>
          <p className="text-neutral-100 font-body uppercase font-semibold text-md lg:text-lg mb-5 border-b-3 border-orange pb-5 max-w-[225px] lg:max-w-[255px]">Alt av håndverk i høyden</p>
          <p className="text-neutral-100 font-body sm:text-md md:text-lg mb-7 font-bold ">
            Vi tilbyr profesjonell og trygg utførelse av arbeid på tak og fasader – alt fra inspeksjon og vedlikehold til spesialoppdrag.{" "}
            <span className="hidden md:inline">Med fokus på kvalitet, sikkerhet og effektivitet hjelper vi deg med små og store prosjekter i høyden</span>.
          </p>
          <div className="text-neutral-100 font-body sm:text-sm md:text-lg mb-10 font-bold flex flex-col md:flex-row justify-between gap-1">
            <div className="flex flex-row gap-2 items-center">
              <img src={iconVerified} alt="" className=" w-7 h-7 md:w-8 md:h-8" />
              <p className="text-sm md:text-md">Sertifisert for arbeid i høyden</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img src={iconVerified} alt="" className="w-7 h-7 md:w-8 md:h-8" />
              <p className="text-sm md:text-md">HMS i fokus</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img src={iconVerified} alt="" className="w-7 h-7 md:w-8 md:h-8" />
              <p className="text-sm md:text-md">Lang erfaring</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 sm:gap-5">
            <a href="#services" className="flex-1 text-center bg-orange text-darkblue font-bold py-3 px-8 sm:px-12 rounded-xs hover:cursor-pointer uppercase">
              Tjenester
            </a>
            <a href="#projects" className="flex-1 text-center bg-neutral-100 text-darkblue font-bold py-3 px-8 sm:px-12 rounded-xs hover:cursor-pointer uppercase">
              Bestilling
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
