import { getFrontPageHero } from "../api/wp";
import { useAsyncResource } from "./useAsyncResource";

export function useFrontPageHero() {
  const resource = useAsyncResource(() => getFrontPageHero(), { initialData: null });

  return { hero: resource.data, loading: resource.loading, error: resource.error };
}
