import { useParams } from "react-router-dom";
import { Footer } from "../shared/Footer";
import { NavBar } from "../shared/NavBar";
import { ToggleFeed } from "../shared/ToggleFeed";
import { AuthorDetailsInfo } from "./AuthorDetailsInfo";
import { useAuthorArticles } from "../../hooks/useAuthorArticles";
import { AuthorArticlePreviewItem } from "./AuthorArticlePreviewItem";

export const AuthorDetails = (): JSX.Element => {
    const params = useParams<{ username: string }>();
    const { data, isLoading, error } = useAuthorArticles(params.username);

    if (isLoading) return <div>Loading author profile...</div>;
    if (error) return <div>Error loading profile</div>;
    if (!data) return <div>Author not found</div>;

    const firstArticle = data.articles[0];
    const author = firstArticle?.author;

    if (!author) return <div>No author data available</div>;

    return (
        <>
            <NavBar />
            <div className="profile-page">
                <AuthorDetailsInfo
                    username={author.username}
                    image={author.image}
                    bio={author.bio}
                    isFollowed={false}
                />

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <ToggleFeed />
                            {data.articles.map((article) => (
                                <AuthorArticlePreviewItem
                                    key={article.slug}
                                    image={article.author.image}
                                    date={article.createdAt}
                                    title={article.title}
                                    description={article.description}
                                    slug={article.slug}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};