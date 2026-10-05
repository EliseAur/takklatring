import Alert from "./Alert";

export default function ErrorAlertPage({ message }) {
  return (
    <section className="py-12 bg-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <Alert message={<p>{message}</p>} className="px-5 py-4" />
      </div>
    </section>
  );
}
