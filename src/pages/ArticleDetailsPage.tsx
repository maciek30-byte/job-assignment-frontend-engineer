import React from "react";
import { MainBaner } from "../components/shared/MainBaner";
import { NavBar } from "../components/shared/NavBar";
import { Footer } from "../components/shared/Footer";
import { PostComments } from "../components/shared/PostComments";
import { ArticleDetails } from "../components/ArticleDetails/ArticleDetails";
export default function ArticleDetailsPage(): JSX.Element | null {
    return (
        <>
            <NavBar />
            <div className="article-page">
                <MainBaner />
                <div className="container page">
                    <ArticleDetails />
                    <PostComments />
                </div>
            </div>
            <Footer />
        </>
    );
}
