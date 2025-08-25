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
    <section id="top" className="px-3 bg-neutral-100  py-4 lg:py-10 flex flex-col " style={{ minHeight: "calc(100vh - 94px)" }}>
      <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5 lg:gap-0">
        <div className="">
          <img src={heroImageUrl} alt="Profile" className="h-80 w-80 object-cover lg:h-[500px] lg:w-[500px] xl:h-[520px] xl:w-[530px] " />
        </div>
        <div className=" flex flex-col items-center justify-center lg:h-[500px] lg:w-[500px] xl:h-[520px] xl:w-[650px] sm:px-30 md:px-50 lg:px-10 xl:pl-0 xl:pr-20">
          <h1 className="font-headings font-bold text-center text-4xl lg:text-5xl xl:text-6xl mb-2 break-words ">Velkommen til Tak og Fasadeklatring AS </h1>
          <p className="font-body uppercase font-semibold text-md lg:text-lg mb-3">Alt av håndverk i høyden</p>
          <p className="text-center font-body xs:text-sm sm:text-md xl:text-md mb-6 font-bold">
            Vi tilbyr profesjonell og trygg utførelse av arbeid på tak og fasader – alt fra inspeksjon og vedlikehold til spesialoppdrag. Med fokus på kvalitet, sikkerhet og effektivitet hjelper vi
            deg med små og store prosjekter i høyden.
          </p>
          <div className="flex flex-row gap-2 sm:gap-5 md:w-80 justify-center">
            <a href="#services" className="flex-1 text-center bg-black text-white py-3 px-8 sm:px-12 rounded-xs hover:cursor-pointer hover:bg-orange-500 uppercase">
              Tjenester
            </a>
            <a href="#projects" className="flex-1 text-center bg-black text-white py-3 px-8 sm:px-12 rounded-xs hover:cursor-pointer hover:bg-orange-500 uppercase">
              Bestilling
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
