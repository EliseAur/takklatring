import { useEffect, useState } from "react";
import { getAboutUsContent } from "../api/wp";

export function useAboutUsContent() {
  const [aboutUsContent, setAboutUsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAboutUsContent();

        if (isMounted) setAboutUsContent(data);
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

  return { aboutUsContent, loading, error };
}
