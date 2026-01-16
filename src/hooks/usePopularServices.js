import { useEffect, useState } from "react";
import { getPopularServices } from "../api/wp";

export function usePopularServices(limit = 3) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPopularServices({ limit });
        setServices(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [limit]);

  return { services, loading, error };
}
