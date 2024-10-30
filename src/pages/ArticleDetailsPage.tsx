import { ArticleDetails } from "../components/ArticleDetails/ArticleDetails";
import { MainBaner } from "../components/shared/MainBaner";
import { PostComments } from "../components/shared/PostComments";
import React from "react";

export default function ArticleDetailsPage(): JSX.Element | null {
    return (

        <div className="article-page">
            <MainBaner />
            <div className="container page">
                <ArticleDetails />
                <PostComments />
            </div>
        </div>


    );
}
