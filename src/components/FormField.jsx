const fieldClasses =
  "w-full rounded-md border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange";

export default function FormField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  as = "input",
  rows,
}) {
  const Field = as === "textarea" ? "textarea" : "input";

  return (
    <div className="mb-7">
      <label htmlFor={id} className="block text-sm font-bold text-darkblue mb-1">
        {label}
      </label>
      <Field
        id={id}
        name={name}
        type={Field === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        rows={Field === "textarea" ? rows : undefined}
        className={fieldClasses}
        required={required}
      />
    </div>
  );
}
