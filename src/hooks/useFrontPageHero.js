import { useEffect, useState } from "react";
import { getFrontPageHero } from "../api/wp";

export function useFrontPageHero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getFrontPageHero();

        if (isMounted) setHero(data);
      } catch (e) {
        if (isMounted) setError(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { hero, loading, error };
}
