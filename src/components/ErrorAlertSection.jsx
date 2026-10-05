import Alert from "./Alert";

export default function ErrorAlertSection({ message }) {
  return (
    <div className="max-w-6xl mx-auto">
      <Alert message={<p>{message}</p>} className="px-5 py-4" />
    </div>
  );
}
