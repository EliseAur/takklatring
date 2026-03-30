import { useEffect, useState } from "react";
import { getServiceBySlug } from "../api/wp";

export function useServiceDetail(slug) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getServiceBySlug(slug);

        if (isMounted) setService(data);
      } catch (e) {
        if (isMounted) setError(e?.message || "Ukjent feil");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { service, loading, error };
}
