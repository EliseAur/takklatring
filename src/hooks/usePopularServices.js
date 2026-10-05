import { getPopularServices } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

export function usePopularServices(limit = 3) {
  const resource = useAsyncResource(() => getPopularServices({ limit }), {
    initialData: [],
    dependencies: [limit],
  });

  return { services: resource.data, loading: resource.loading, error: resource.error };
}
