import { useEffect, useRef } from "react";
import { useArticles } from "../../hooks/useArticles";
import { ArticleItem } from "./ArticleItem";
import { DEFAULT_PLACEHOLDER } from "../../utils/getUserImage";

export const ArticleList = (): JSX.Element => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useArticles();

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);



    if (isLoading) return <div>Loading articles...</div>;
    if (isError) {
        console.error("Error fetching articles:", error);
        return <div>Error: {error instanceof Error ? error.message : "Unknown error"}</div>;
    }
    if (!data) return <div>No articles found</div>;

    return (
        <div>
            {data.pages.map((page) => (
                page.articles.map((article) => (
                    <ArticleItem
                        key={article.slug}
                        title={article.title}
                        description={article.description}
                        img={article.author.image || DEFAULT_PLACEHOLDER}
                        author={article.author.username}
                        favoritesCount={article.favoritesCount}
                        createdAt={article.createdAt}
                        slug={article.slug}
                    />
                ))
            ))}
            <div ref={observerRef} style={{ height: "20px", margin: "20px 0", textAlign: "center" }}>
                {isFetchingNextPage && (
                    <div className="loading-indicator">
                        <i className="ion-load-c"></i> Loading next articles...
                    </div>
                )}
            </div>
        </div>
    );
}
