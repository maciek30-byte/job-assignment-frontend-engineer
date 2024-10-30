import { authorApi } from "../api/author.api";
import { QUERY_KEYS } from "../api/config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AuthorResponse } from "./author.types";

export const useAuthor = (username: string): UseQueryResult<AuthorResponse, Error> => {
    return useQuery({
        queryKey: [QUERY_KEYS.profile, username],
        queryFn: () => authorApi.getProfile(username),
        enabled: Boolean(username),
    });
};