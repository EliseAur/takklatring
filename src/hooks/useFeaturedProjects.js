import { getFeaturedProjects } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

export function useFeaturedProjects({ limit = 3 } = {}) {
  const resource = useAsyncResource(() => getFeaturedProjects({ limit }), {
    initialData: [],
    dependencies: [limit],
  });

  return { projects: resource.data, loading: resource.loading, error: resource.error };
}
