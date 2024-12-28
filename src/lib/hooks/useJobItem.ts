import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import { JobItemFull } from "../types";
import { handleError } from "../utils";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemFull;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export default function useJobItem(id: number | null) {
  const { data, isInitialLoading: isLoading } = useQuery(
    ["jobItem", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  // const jobItem = data?.jobItem;

  return { jobItem: data?.jobItem, isLoading } as const;
}
