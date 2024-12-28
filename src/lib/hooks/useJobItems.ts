import { useQueries } from "@tanstack/react-query";
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

export default function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["jobItem", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });

  // console.log({ results });

  const jobItems = results
    ?.map((result) => result?.data?.jobItem)
    .filter((jobItem) => jobItem !== undefined);

  const isLoading = results.some((result) => result.isLoading);

  return { jobItems, isLoading };
}
