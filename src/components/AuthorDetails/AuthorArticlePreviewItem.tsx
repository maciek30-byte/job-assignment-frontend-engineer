import React from "react";
import { getUserImage } from "../../utils/getUserImage";
import { formatDate } from "./../../utils/date";
import { useRedirect } from "../../hooks/useRedirect";
interface AuthorArticlePreviewItemProps {
    date: string;
    title: string;
    description: string;
    image: string;
    slug: string;
    author: string;
}

export const AuthorArticlePreviewItem = ({
    image,
    date,
    title,
    description,
    slug,
    author,
}: AuthorArticlePreviewItemProps): JSX.Element => {
    const { redirectTo } = useRedirect();
    return (
        <div className="article-preview">
            <div className="article-meta">
                <img src={getUserImage(image)} />

                <div className="info">
                    {author}
                    <span className="date">{formatDate(date)}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart" /> 29
                </button>
            </div>


            <h1>{title}</h1>

            <p>{description}</p>
            <a style={{ cursor: "pointer" }} onClick={() => redirectTo(`/${slug}`)}>
                <span>Read more...</span>
            </a>
        </div>
    );
};
