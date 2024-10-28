import React from "react";
import { getUserImage } from "../../utils/getUserImage";
import { formatDate } from './../../utils/date';

interface AuthorArticlePreviewItemProps {
    date: string;
    title: string;
    description: string;
    image: string;
    slug: string;
}

export const AuthorArticlePreviewItem = ({ image, date, title, description, slug }: AuthorArticlePreviewItemProps): JSX.Element => {
    return (
        <div className="article-preview">
            <div className="article-meta">
                <a href="/#/profile/ericsimmons">
                    <img src={getUserImage(image)} />
                </a>
                <div className="info">
                    <a href="/#/profile/ericsimmons" className="author">
                        Eric Simons
                    </a>
                    <span className="date">{formatDate(date)}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart" /> 29
                </button>
            </div>
            <a href="/#/how-to-build-webapps-that-scale" className="preview-link">
                <h1>{title}</h1>
                <p>{description}</p>
                <span>Read more...</span>
            </a>
        </div>
    )
};

