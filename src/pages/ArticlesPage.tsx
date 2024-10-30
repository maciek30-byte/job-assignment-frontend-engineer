import { ArticleList } from "../components/ArticlesList/ArticleList";
import { MainBaner } from "../components/shared/MainBaner";
import { TagList } from "../components/shared/TagList";
import { ToggleFeed } from "../components/shared/ToggleFeed";

export default function ArticlesPage(): JSX.Element {
    return (
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
    );
}
