const variantClasses = {
  error: "border-errorBorder bg-errorBg text-errorText",
  success: "border-successBorder bg-successBg text-successText",
};

export default function Alert({ message, variant = "error", className = "" }) {
  const classes = variantClasses[variant] || variantClasses.error;

  return (
    <div className={`rounded-md border-l-4 font-medium ${classes} ${className}`}>{message}</div>
  );
}