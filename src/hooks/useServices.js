import { useEffect, useState, useContext } from "react";
import { getServices } from "../api/wp";
import { LoadingContext } from "../context/LoadingContext";

export function useServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setIsLoading(true);
        const data = await getServices();
        if (alive) setServices(data);
      } catch (e) {
        if (alive) setError(e?.message || "Ukjent feil");
      } finally {
        if (alive) {
          setIsLoading(false);
          window.scrollTo(0, 0);
        }
      }
    })();

    return () => {
      alive = false;
    };
  }, [setIsLoading]);

  return { services, error };
}
