import React from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ArticlesResponse } from "../../hooks/useArticles";
import { selectArticleBySlug } from "../../hooks/utils";
import {formatDate} from "../../utils/date";
import {useRedirect} from "../../hooks/useRedirect";
import {Message} from "../shared/Message";
import {getUserImage} from "../../utils/getUserImage";


interface ArticleContentProps {
    title: string;
    description: string;
    body: string;
    updatedAt: string;
}

const ArticleContent = ({ title, description, body, updatedAt }: ArticleContentProps) => {

    return (
        <div className="container page">
            <div className="row article-content">
                <div className="col-md-12">
                    <p>{description}</p>
                    <h2 id="introducing-ionic">{title}.</h2>
                    <p>{body}</p>
                    <span className="date">{formatDate(updatedAt)}</span>
                </div>
            </div>
        </div>
    );
};




export const ArticleDetails = (): JSX.Element => {
    const { slug } = useParams<{ slug: string }>();
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<{ pages: ArticlesResponse[] }>(['articles']);
    const article = selectArticleBySlug(data?.pages, slug);

    const { redirectTo } = useRedirect();
    if (!article) {
        return <Message message="Article not found" type="warning" />
    }

    const { title, description, body, author, createdAt, favoritesCount, updatedAt } = article;

    return (
        <>
            <ArticleContent title={title} description={description} body={body} updatedAt={updatedAt} />
            <hr />
            <div className="article-actions">
                <div className="article-meta">

                    <img src={getUserImage(author.image)} />

                    <div className="info">
                        <a style={{ cursor: "pointer" }} className="author" onClick={() => redirectTo(`/profile/${author.username}`)}>
                            {author.username}
                        </a>
                        <span className="date">{formatDate(createdAt)}</span>
                    </div>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => redirectTo(`/profile/${author.username}`)}>
                        <i className="ion-plus-round" />
                        &nbsp; Follow {author.username}
                    </button>
                    &nbsp;
                    <button className="btn btn-sm btn-outline-primary">
                        <i className="ion-heart" />
                        &nbsp; Favorite Post <span className="counter">{favoritesCount}</span>
                    </button>
                </div>
            </div>
        </>

    )
}
