import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import { JobItem } from "../types";
import { handleError } from "../utils";

type JobItemsApiResponse = {
  public: boolean;
  jobItems: JobItem[];
  sorted: boolean;
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export default function useSearchQuery(searchText: string) {
  const { data, isInitialLoading: isLoading } = useQuery(
    ["jobItems", searchText],
    () => (searchText ? fetchJobItems(searchText) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );

  // const jobItems = data?.jobItems ?? [];

  return { jobItems: data?.jobItems ?? [], isLoading } as const;
}
