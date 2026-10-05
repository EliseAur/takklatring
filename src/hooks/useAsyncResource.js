import { useEffect, useState } from "react";

export function useAsyncResource(
  request,
  { initialData, getError = (error) => error, dependencies = [] } = {},
) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await request();

        if (isMounted) setData(result);
      } catch (requestError) {
        if (isMounted) setError(getError(requestError));
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
    // The request function is intentionally controlled by the caller's dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error };
}
