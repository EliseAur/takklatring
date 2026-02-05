export default function Footer() {
  return (
    <footer className="bg-darkblue text-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* Logo / firma */}
        <div className="md:mx-auto">
          <h3 className="font-headings text-2xl font-bold text-neutral-100 mb-2">Tak og FasadeKlatring AS</h3>
          <p className=" text-neutral-400 max-w-xs">Alt av håndverk i høyden. Profesjonell og trygg utførelse av arbeid på tak og fasader.</p>
        </div>

        {/* Navigasjon */}
        <nav className="md:mx-auto">
          <h4 className="font-headings text-lg font-bold text-neutral-100 mb-2">Navigasjon</h4>
          <ul className="space-y-2">
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

        {/* Kontakt */}
        <div className="md:mx-auto">
          <h4 className="font-headings text-lg font-bold text-neutral-100 mb-2">Kontakt</h4>
          <ul className="space-y-2 text-neutral-400">
            <li>📞 99 99 99 99</li>
            <li>✉️ post@takogfasade.no</li>
            <li>📍 Oslo og omegn</li>
          </ul>
        </div>
      </div>

      {/* Bunnlinje */}
      <div className="border-t border-neutral-700">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-neutral-500 text-center">© {new Date().getFullYear()} Tak og FasadeKlatring AS. Alle rettigheter reservert.</div>
      </div>
    </footer>
  );
}
