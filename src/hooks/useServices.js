import { useEffect, useState } from "react";
import { getServices } from "../api/wp";

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getServices();

        if (isMounted) setServices(data);
      } catch (e) {
        if (isMounted) setError(e?.message || "Ukjent feil");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { services, loading, error };
}
