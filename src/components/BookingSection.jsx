import bgImageBooking from "../images/hero-sunset.jpg";

export default function BookingSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-white to-darkblue/30">
      <img src={bgImageBooking} alt="Booking background" className="absolute inset-0 h-full w-full object-cover object-center origin-right z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-darkblue/50 via-darkblue/35 to-darkblue/25 z-10" />
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <div className="bg-white/85 backdrop-blur-md rounded-md px-8 py-14 shadow-md">
          <h2 className="text-3xl font-headings font-bold text-darkblue mb-4">Bestill befaring eller ta kontakt</h2>

          <p className="text-darkblue mb-8">Usikker på hva som trengs? Vi tilbyr uforpliktende befaring og hjelper deg med å finne riktig løsning for ditt tak eller din fasade.</p>

          <a href="/kontakt" className="inline-block bg-orange text-darkblue font-headings uppercase font-bold text-md px-8 py-4 rounded-sm hover:opacity-90 transition">
            Bestill befaring
          </a>
        </div>
      </div>
    </section>
  );
}
