import useSWR from 'swr';
import { api } from '../services/apiClient';

export function useFetchSWR<T = unknown>(url: string) {
  const { data, error, mutate } = useSWR<T>(
    url,
    async () => {
      const { data: apiData } = await api.get(url);

      return apiData;
    },
    { refreshInterval: 5000 }
  );

  return { data, error, mutate };
}
