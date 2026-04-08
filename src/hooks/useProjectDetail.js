import { useEffect, useState } from "react";
import { getProjectBySlug } from "../api/wp";

export function useProjectDetail(slug) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProjectBySlug(slug);

        if (isMounted) setProject(data);
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

  return { project, loading, error };
}
