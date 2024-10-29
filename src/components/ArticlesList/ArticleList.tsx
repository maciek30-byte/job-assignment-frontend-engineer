import { useArticles } from "../../hooks/useArticles";
import { ArticleItem } from "./ArticleItem";
import { DEFAULT_PLACEHOLDER } from "../../utils/getUserImage";
import { useInfiniteScroll } from "../../hooks/useInfinityScroll";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { ErrorMessage } from "../shared/ErrorMessage";
import { Message } from "../shared/Message";

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

    const observerRef = useInfiniteScroll({
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    });

    if (isLoading) return <LoadingSpinner text="Loading articles..." />;
    if (isError) {
        console.error("Error fetching articles:", error);
        return <ErrorMessage message={error instanceof Error ? error.message : "Unknown error"} />;
    }
    if (!data) return <Message type="info" message="No articles found" />;

    return (
        <div>
            {data.pages.map((page) =>
                page.articles.map((article) => (
                    <ArticleItem
                        key={article.slug}
                        title={article.title}
                        description={article.description}
                        img={article.author.image || DEFAULT_PLACEHOLDER}
                        author={article.author.username}
                        favoritesCount={article.favoritesCount}
                        favorited={article.favorited}
                        createdAt={article.createdAt}
                        slug={article.slug}
                    />
                ))
            )}
            <div ref={observerRef} style={{ height: "20px", margin: "20px 0", textAlign: "center" }}>
                {isFetchingNextPage && (
                    <div className="loading-indicator">
                        <i className="ion-load-c"></i> Loading next articles...
                    </div>
                )}
            </div>
        </div>
    );
};