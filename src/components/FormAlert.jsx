import Alert from "./Alert";

export default function FormAlert({ message, type = "success" }) {
  return (
    <Alert
      message={message}
      variant={type === "success" ? "success" : "error"}
      className="px-4 py-6 text-md"
    />
  );
}
