export default function ReviewsSection() {
  const reviews = [
    // {
    //   quote:
    //     "Veldig profesjonelt utført arbeid. God kommunikasjon hele veien og ryddig gjennomføring.",
    //   name: "Kunde i Oslo",
    // },
    // {
    //   quote: "Trygg og effektiv befaring. Fikk gode råd og et tydelig forslag til tiltak.",
    //   name: "Borettslag",
    // },
  ];

  if (!reviews.length) return null;

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-headings font-bold text-darkblue">
            Hva kundene sier
          </h2>
          <p className="md:text-lg mt-3 text-neutral-800">Noen ord fra kunder vi har hjulpet</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review, index) => (
            <blockquote
              key={index}
              className="bg-white p-8 rounded-md shadow-sm border-l-4 border-orange"
            >
              <p className="text-neutral-800 italic leading-relaxed md:text-lg">“{review.quote}”</p>
              <footer className="mt-4 font-semibold text-darkblue md:text-lg">
                – {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
