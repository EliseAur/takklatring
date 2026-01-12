// import profileImage from "../images/image-of-me-version-1.jpg";
const heroImageUrl = "https://images.unsplash.com/photo-1644338785159-6c0a9dd037b2?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
    <section id="top" className="overflow-hidden" style={{ minHeight: "calc(100vh - 94px)" }}>
      <div className="heroImage relative flex" style={{ minHeight: "calc(100vh - 94px)" }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-20 my-auto mx-auto flex flex-col items-center p-6 h-full lg:px-10 xl:pl-0 xl:pr-20 w-[610px] xl:w-[650px]">
          <h1 className="text-neutral-200 font-headings font-bold text-center text-5xl lg:text-6xl xl:text-6xl mb-2 break-words ">Tak og Fasadeklatring AS </h1>
          <p className="text-neutral-200 font-body uppercase font-semibold text-md lg:text-lg mb-6 border-b-4 border-orange pb-6">Alt av håndverk i høyden</p>
          <p className="text-neutral-200 text-center font-body xs:text-sm sm:text-md xl:text-md mb-10 font-bold ">
            Vi tilbyr profesjonell og trygg utførelse av arbeid på tak og fasader – alt fra inspeksjon og vedlikehold til spesialoppdrag. Med fokus på kvalitet, sikkerhet og effektivitet hjelper vi
            deg med små og store prosjekter i høyden.
          </p>
          <div className="flex flex-row gap-2 sm:gap-5 md:w-80 justify-center">
            <a href="#services" className="flex-1 text-center bg-orange text-white font-bold py-3 px-8 sm:px-12 rounded-xs hover:cursor-pointer hover:bg-orange-500 uppercase">
              Tjenester
            </a>
            <a href="#projects" className="flex-1 text-center bg-neutral-200 text-orange font-bold py-3 px-8 sm:px-12 rounded-xs hover:cursor-pointer hover:bg-orange-500 uppercase">
              Bestilling
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
