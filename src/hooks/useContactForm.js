import { useState } from "react";
import { submitContactForm } from "../api/wp";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      await submitContactForm(formData);

      setStatus({
        type: "success",
        message: "Takk! Meldingen er sendt. Vi tar kontakt så snart som mulig.",
      });
      setFormData(initialFormData);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Feil ved innsending: " +
          (error.message || "Noe gikk galt.") +
          " Prøv igjen senere eller kontakt oss på mail eller telefon som du finner nederst på siden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { formData, isSubmitting, status, handleChange, handleSubmit };
}
