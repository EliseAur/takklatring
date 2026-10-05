import { getAboutUsContent } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

const getErrorMessage = (error) => error?.message || "Ukjent feil";

export function useAboutUsContent() {
  const resource = useAsyncResource(() => getAboutUsContent(), {
    initialData: null,
    getError: getErrorMessage,
  });

  return { aboutUsContent: resource.data, loading: resource.loading, error: resource.error };
}
