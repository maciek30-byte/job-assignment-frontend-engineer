import { QueryClient } from '@tanstack/react-query';

const staleTimeInMinutes = 5 * 60 * 1000

const DEFAULT_QUERY_CONFIG = {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: staleTimeInMinutes
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...DEFAULT_QUERY_CONFIG,
        },
    },
});