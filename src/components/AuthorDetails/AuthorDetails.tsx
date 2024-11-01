
import { useParams } from "react-router-dom";
import { useAuthorArticles } from "../../hooks/useAuthorArticles";
import { ToggleFeed } from "../shared/ToggleFeed";
import { AuthorArticlePreviewItem } from "./AuthorArticlePreviewItem";
import { AuthorDetailsInfo } from "./AuthorDetailsInfo";
import {LoadingSpinner} from "../shared/LoadingSpinner";
import {ErrorMessage} from "../shared/ErrorMessage";
import {Message} from "../shared/Message";

export const AuthorDetails = (): JSX.Element => {
    const params = useParams<{ username: string }>();
    const { data, isLoading, error } = useAuthorArticles(params.username);

    if (isLoading) return <LoadingSpinner />
    if (error) return <ErrorMessage message="Error loading profile" />
    if (!data) return <Message type="warning" message="Author not found" />

    const author = data.articles[0].author

    return (
        <div className="profile-page">
            <AuthorDetailsInfo
                username={author.username}
                image={author.image}
                bio={author.bio}
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
                                author={article.author.username}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};