import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
/**
 * LoadingSpinner component renders a loading spinner with a "Loading..." message.
 * It is used to indicate that content is being loaded.
 *
 * @component
 * @returns {JSX.Element} A loading spinner with a message.
 *
 * @example
 * <LoadingSpinner />
 */
export default function GlobalLoadingSpinner() {
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-darkblue/80 backdrop-blur-sm z-50">
      <div className="loader ease-linear rounded-full border-10 border-t-10 border-neutral-100 h-20 w-20"></div>
      <div className="text-xl pt-5 text-neutral-100">Loading...</div>
    </div>
  );
}
