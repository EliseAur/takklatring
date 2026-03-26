export default function MessageCard({ message }) {
  return (
    <div className="max-w-2xl bg-white p-8 rounded-md shadow-sm border-l-4 border-orange">
      <p className="text-neutral-800 md:text-lg">{message}</p>
    </div>
  );
}
