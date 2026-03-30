export default function ErrorAlertSection({ message }) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-md border-l-4 border-red-400 bg-errorBg px-5 py-4">
        <p className="text-red-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
