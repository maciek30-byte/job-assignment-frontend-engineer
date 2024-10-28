import { NavBar } from "../components/shared/NavBar";
import { MainBaner } from "../components/shared/MainBaner";
import { TagList } from "../components/shared/TagList";
import { ToggleFeed } from "../components/shared/ToggleFeed";
import { ArticleList } from "../components/ArticlesList/ArticleList";
import { Footer } from "../components/shared/Footer";

export default function ArticlesPage(): JSX.Element {
    return (
        <>
            <NavBar />
            <div className="home-page">
                <MainBaner />
                <div className="container page">
                    <div className="row">
                        <div className="col-md-9">
                            <ToggleFeed />
                            <ArticleList />
                        </div>
                        <TagList />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
