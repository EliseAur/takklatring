import { getProjects } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

const getErrorMessage = (error) => error?.message || "Ukjent feil";

export function useProjects() {
  const resource = useAsyncResource(() => getProjects(), {
    initialData: [],
    getError: getErrorMessage,
  });

  return { projects: resource.data, loading: resource.loading, error: resource.error };
}
