import { getProjectBySlug } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

const getErrorMessage = (error) => error?.message || "Ukjent feil";

export function useProjectDetail(slug) {
  const resource = useAsyncResource(() => getProjectBySlug(slug), {
    initialData: null,
    getError: getErrorMessage,
    dependencies: [slug],
  });

  return { project: resource.data, loading: resource.loading, error: resource.error };
}
