import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader, FormAlert } from "../components";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const res = await fetch("https://takklatring.no/innhold/wp-json/takklatring/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Noe gikk galt.");
      }

      setIsSuccess(true);
      setStatusMessage("Takk! Meldingen er sendt. Vi tar kontakt så snart som mulig.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);

      console.log("Svar fra WordPress:", data);
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(
        "Feil ved innsending: " +
          (error.message || "Noe gikk galt.") +
          " Prøv igjen senere eller kontakt oss på mail eller telefon som du finner nederst på siden.",
      );

      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);

      console.error("Feil ved innsending:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Kontakt"
        title="Ta kontakt og få et tilbud"
        description="Vi vil gjerne komme i kontakt med deg! Om du har spørsmål knyttet til våre tjeneser, ønsker et uforpliktende tilbud, eller ønsker å ta en prat om arbeid vi har gjort for deg eller andre, er det bare å kontakte oss."
        divClassName="max-w-3xl mx-auto px-6 lg:px-10 py-12"
        actions={
          <>
            <Link
              to="/tjenester"
              className="inline-flex text-center border border-neutral-100/40 text-neutral-100 font-headings tracking-wider uppercase text-sm lg:text-md px-6 py-3 rounded-sm hover:border-orange transition"
            >
              Se tjenester
            </Link>
            <Link
              to="/prosjekter"
              className="inline-flex text-center border border-neutral-100/40 text-neutral-100 font-headings tracking-wider uppercase text-sm lg:text-md px-6 py-3 rounded-sm hover:border-orange transition"
            >
              Se prosjekter
            </Link>
          </>
        }
      />

      <section className="bg-neutral-100 py-6 md:py-12 max-w-3xl mx-auto" ref={formRef}>
        <div className="px-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-md shadow-md p-6 md:p-10 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-headings font-bold text-darkblue mb-1">
                Send oss en melding
              </h2>
              <p className="text-neutral-700 mb-8">
                Fyll ut skjemaet under, så tar vi kontakt så snart som mulig.
              </p>
            </div>
            {statusMessage && (
              <FormAlert message={statusMessage} type={isSuccess ? "success" : "error"} />
            )}
            <div className="mb-7">
              <label htmlFor="name" className="block text-sm font-semibold text-darkblue mb-1">
                Navn
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                required
              />
            </div>
            <div className="mb-7">
              <label htmlFor="email" className="block text-sm font-semibold text-darkblue mb-1">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                required
              />
            </div>
            <div className="mb-7">
              <label htmlFor="phone" className="block text-sm font-semibold text-darkblue mb-1">
                Telefon (valgfritt)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
              />
            </div>
            <div className="mb-7">
              <label htmlFor="subject" className="block text-sm font-semibold text-darkblue mb-1">
                Emne
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                required
              />
            </div>
            <div className="mb-7">
              <label htmlFor="message" className="block text-sm font-semibold text-darkblue mb-1">
                Melding
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-block bg-orange text-darkblue font-headings uppercase text-sm md:text-base font-bold py-3 px-6 rounded-sm hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sender..." : "Send melding"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
