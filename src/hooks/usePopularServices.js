import { useEffect, useState } from "react";
import { getPopularServices } from "../api/wp";

export function usePopularServices(limit = 3) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularServices({ limit });
        if (isMounted) setServices(data);
      } catch (e) {
        if (isMounted) setError(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { services, loading, error };
}
