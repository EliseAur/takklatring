import { useEffect, useState } from "react";
import { getFrontPageHero } from "../api/wp";

export function useFrontPageHero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await getFrontPageHero();
        if (alive) setHero(data);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { hero, loading, error };
}
