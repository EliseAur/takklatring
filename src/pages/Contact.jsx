import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PageHeader, FormAlert, FormField } from "../components";
import { useContactForm } from "../hooks/useContactForm";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Contact() {
  const { formData, isSubmitting, status, handleChange, handleSubmit } = useContactForm();
  const formRef = useRef(null);

  useEffect(() => {
    if (!status.message) return undefined;

    const timeoutId = setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [status.message]);

  useSeoMeta({
    title: "Kontakt oss",
    description:
      "Ta kontakt for befaring, tilbud eller spørsmål om tak- og fasadearbeid og arbeid i høyden.",
    canonicalPath: "/kontakt",
  });

  return (
    <div>
      <PageHeader
        eyebrow="Kontakt"
        title="Ta kontakt og få et tilbud"
        description="Vi vil gjerne komme i kontakt med deg! Om du har spørsmål knyttet til våre tjeneser, ønsker et uforpliktende tilbud, eller ønsker å ta en prat om arbeid vi har gjort for deg eller andre, er det bare å kontakte oss."
        divClassName="max-w-3xl mx-auto px-6 lg:px-10 py-12"
        actions={
          <>
            <Link to="/tjenester" className="btn-primary">
              Se tjenester
            </Link>

            <Link to="/prosjekter" className="btn-secondary">
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
            {status.message && <FormAlert message={status.message} type={status.type} />}
            <FormField
              id="name"
              name="name"
              label="Navn"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormField
              id="email"
              name="email"
              label="E-post"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormField
              id="phone"
              name="phone"
              label="Telefon (valgfritt)"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <FormField
              id="subject"
              name="subject"
              label="Emne"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <FormField
              id="message"
              name="message"
              label="Melding"
              as="textarea"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? "Sender..." : "Send melding"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
