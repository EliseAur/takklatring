export default function ErrorAlert({ message }) {
  return (
    <div className="max-w-3xl rounded-md border-l-4 border-red-400 bg-red-500/10 px-5 py-4">
      <p className="text-red-700 font-medium">{message}</p>
    </div>
  );
}
