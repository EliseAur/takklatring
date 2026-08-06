import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewInviteSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold text-darkblue">
            Fornøyd med jobben vi har gjort for deg?
          </h2>
          <p className="md:text-lg mt-2 text-neutral-800">
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
          </p>
          <p className="md:text-lg mt-3 text-neutral-800">
            Vi setter stor pris på om du legger igjen en anmeldelse!
          </p>
          <p className="md:text-lg mt-3 text-neutral-800">
            Din anmeldelse hjelper oss med å forbedre våre tjenester og gir andre innsikt i jobben
            vi gjør.
          </p>
          <p className="md:text-lg mt-2 text-neutral-800">
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
            <FontAwesomeIcon icon={faStar} className="text-orange text-sm" />
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="https://g.page/r/CY56ipKU5LMkEBI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-darkblue text-neutral-100 font-headings uppercase tracking-wide text-md font-bold lg:text-lg py-3 px-12 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] hover:shadow-xl hover:scale-[1.01]"
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-4 text-2xl text-orange" />
            Gi en anmeldelse
          </a>
        </div>
      </div>
    </section>
  );
}
