import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faAt, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer({ hero, footer }) {
  const title = hero?.hero_title || "Tak og FasadeKlatring AS";
  const subtitle = hero?.hero_subtitle || "Alt av håndverk i høyden";
  const descriptionMobile =
    hero?.hero_description_mobile ||
    "Vi tilbyr profesjonell og trygg utførelse av arbeid på tak og fasader.";
  const phoneNumber = footer?.phone_number || "Kan ikke hente telefonnummer";
  const email = footer?.email || "Kan ikke hente e-post";

  return (
    <footer className="bg-darkblue text-neutral-400 border-t border-neutral-700">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        <div className="md:mx-auto">
          <h3 className="font-headings text-3xl font-bold text-neutral-100 mb-2">{title}</h3>
          <p className="max-w-xs uppercase text-sm text-neutral-200">{subtitle}</p>
          <p className="max-w-xs mt-1">{descriptionMobile}</p>
        </div>

        <nav className="md:mx-auto">
          <h4 className="font-headings text-lg font-bold text-neutral-100 mb-2">Navigasjon</h4>
          <ul className="space-y-2 text-neutral-200 marker:text-orange list-disc list-inside">
            <li>
              <a href="/tjenester" className="hover:text-orange transition">
                Tjenester
              </a>
            </li>
            <li>
              <a href="/prosjekter" className="hover:text-orange transition">
                Prosjekter
              </a>
            </li>
            <li>
              <a href="/bestilling" className="hover:text-orange transition">
                Bestilling
              </a>
            </li>
            <li>
              <a href="/om-oss" className="hover:text-orange transition">
                Om oss
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:mx-auto">
          <h4 className="font-headings text-lg font-bold text-neutral-100 mb-2">Kontakt</h4>
          <ul className="space-y-2">
            <li>
              <FontAwesomeIcon icon={faPhone} className="text-xl text-orange mr-2" />
              <a href={`tel:${phoneNumber}`} className="hover:text-orange transition">
                {phoneNumber}
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faAt} className="text-xl text-orange mr-2" />
              <a href={`mailto:${email}`} className="hover:text-orange transition">
                {email}
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="text-xl text-orange mr-2 " />
              <Link to="/kontakt" className="hover:text-orange transition">
                Kontaktskjema
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-700">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-neutral-500 text-center">
          © {new Date().getFullYear()} Tak og FasadeKlatring AS. Alle rettigheter reservert.
        </div>
      </div>
    </footer>
  );
}
