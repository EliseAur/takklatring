import { useEffect, useState } from "react";
import { getFeaturedProjects } from "../api/wp";

export function useFeaturedProjects({ limit = 3 } = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFeaturedProjects({ limit });
        if (isMounted) setProjects(data);
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

  return { projects, loading, error };
}
