export default function FormAlert({ message, type = "success" }) {
  const baseClasses = "rounded-md border-l-4 px-4 py-6 text-md font-medium";

  const variantClasses =
    type === "success"
      ? "border-successBorder bg-successBg text-successText"
      : "border-errorBorder bg-errorBg text-errorText";

  return <div className={`${baseClasses} ${variantClasses}`}>{message}</div>;
}
