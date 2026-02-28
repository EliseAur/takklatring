import { useEffect, useState, useContext } from "react";
import { getPopularServices } from "../api/wp";
import { LoadingContext } from "../context/LoadingContext";

export function usePopularServices(limit = 3) {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setIsLoading(true);
        const data = await getPopularServices({ limit });
        if (alive) setServices(data);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setIsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [limit, setIsLoading]);

  return { services, error };
}
