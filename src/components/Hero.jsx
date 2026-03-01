import { Link } from "react-router-dom";
import fallbackHeroImage from "../images/hero-img-1920-4.jpg";
import iconVerified from "../images/icon-verified-orange.svg";

/**
 * Hero component displays the main introduction section of the page.
 *
 * Features:
 * - Hero image
 * - Main title, subtitle and short description
 * - Button to scroll to the services or order section / pages
 *
 * @component
 * @example
 * return (
 *   <Hero />
 * )
 */
export default function Hero({ hero }) {
  const title = hero?.hero_title || "Main title";
  const subtitle = hero?.hero_subtitle || "Subtitle";
  const descriptionDesktop = hero?.hero_description_desktop || "Description desktop";
  const descriptionMobile = hero?.hero_description_mobile || "Description mobile";
  const usps = hero?.hero_usps?.length ? hero.hero_usps : ["USP 1", "USP 2", "USP 3"];

  console.log("WP hero_description:", hero?.hero_description_desktop);
  console.log("Used description:", descriptionDesktop);

  const imageSrc = hero?.hero_image_url || fallbackHeroImage;
  const imageAlt = hero?.hero_image_alt || "";

  return (
    <section id="top" className="overflow-hidden w-full min-h-[calc(100vh-89px)] lg:min-h-[calc(100vh-104px)]">
      <div className="heroImage relative flex min-h-[calc(100vh-89px)] lg:min-h-[calc(100vh-104px)]">
        <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover object-center md:object-right bg-darkblue origin-right lg:pl-96" />
        <div className="absolute inset-0 bg-gradient-to-b from-darkblue/60 via-darkblue/60 to-darkblue/60 lg:bg-gradient-to-r lg:from-darkblue/100 lg:via-darkblue/70 lg:via-[25%] lg:to-transparent lg:ml-96" />

        <div className="relative z-20 my-auto flex flex-col md:mx-20 px-7 md:px-0 h-full max-w-[500px] md:max-w-[540px]">
          <h1 className="text-neutral-100 font-headings text-5xl md:text-6xl mb-2 lg:mb-4 break-words md:leading-tight font-bold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{title}</h1>
          <p className="text-neutral-100 font-body uppercase font-semibold text-md lg:text-lg max-w-[225px] lg:max-w-[255px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{subtitle}</p>
          <div className="my-3 h-[3px] w-20 bg-orange rounded-sm" />

          <p className="text-neutral-100 hidden md:block font-body sm:text-md md:text-lg mb-7 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{descriptionDesktop}</p>
          <p className="text-neutral-100 md:hidden font-body text-sm md:text-lg mb-6 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{descriptionMobile}</p>
          <div className="text-neutral-100 font-body text-sm md:text-lg mb-6 lg:mb-10 font-bold flex flex-col md:flex-row justify-between gap-1 md:gap-3">
            {usps.map((text, i) => (
              <div key={i} className="flex flex-row gap-2 items-center">
                <img src={iconVerified} alt="" className="w-7 h-7 md:w-8 md:h-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" />
                <p className="text-sm md:text-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-row gap-2 sm:gap-5">
            <Link
              to="/kontakt"
              className="flex-1 text-center bg-orange text-darkblue font-headings uppercase text-md lg:text-lg font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.02]"
            >
              Få tilbud
            </Link>
            <Link
              to="/tjenester"
              className="flex-1 text-center bg-neutral-100 text-darkblue font-headings uppercase text-md lg:text-lg font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.02]"
            >
              Tjenester
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
