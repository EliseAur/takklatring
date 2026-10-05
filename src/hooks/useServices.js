import { getServices } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

const getErrorMessage = (error) => error?.message || "Ukjent feil";

export function useServices() {
  const resource = useAsyncResource(() => getServices(), {
    initialData: [],
    getError: getErrorMessage,
  });

  return { services: resource.data, loading: resource.loading, error: resource.error };
}
