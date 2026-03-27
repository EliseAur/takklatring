export default function PageLoader() {
  return (
    <main className="min-h-screen">
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-darkblue/80 backdrop-blur-sm z-50">
        <div className="loader ease-linear rounded-full border-10 border-t-10 border-neutral-100 h-20 w-20"></div>
        <div className="text-xl pt-5 text-neutral-100">Loading...</div>
      </div>
    </main>
  );
}
