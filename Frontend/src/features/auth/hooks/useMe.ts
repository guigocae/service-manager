import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../services/AuthRepository";

export function useMe(enabled: boolean) {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMeRequest,
    enabled,
    retry: false,
  });
}