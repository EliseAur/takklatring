import { useEffect, useState } from "react";
import { getProjects } from "../api/wp";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjects();

        if (isMounted) setProjects(data);
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

  return { projects, loading, error };
}
