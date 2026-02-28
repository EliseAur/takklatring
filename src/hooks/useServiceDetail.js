import { useEffect, useState, useContext } from "react";
import { getServiceBySlug } from "../api/wp";
import { LoadingContext } from "../context/LoadingContext";

export function useServiceDetail(slug) {
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setIsLoading(true);
        const data = await getServiceBySlug(slug);
        if (alive) setService(data);
      } catch (e) {
        if (alive) setError(e?.message || "Ukjent feil");
      } finally {
        if (alive) {
          setIsLoading(false);
          // Scroll til topp ETTER data er lastet
          window.scrollTo(0, 0);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, setIsLoading]);

  return { service, error };
}
