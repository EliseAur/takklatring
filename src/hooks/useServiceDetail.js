import { getServiceBySlug } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

const getErrorMessage = (error) => error?.message || "Ukjent feil";

export function useServiceDetail(slug) {
  const resource = useAsyncResource(() => getServiceBySlug(slug), {
    initialData: null,
    getError: getErrorMessage,
    dependencies: [slug],
  });

  return { service: resource.data, loading: resource.loading, error: resource.error };
}
