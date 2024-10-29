import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
    threshold?: number;
}

export const useInfiniteScroll = ({
    fetchNextPage,
    hasNextPage = false,
    isFetchingNextPage,
    threshold = 0.5
}: UseInfiniteScrollProps): React.RefObject<HTMLDivElement> => {
    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold]);

    return observerRef;
};