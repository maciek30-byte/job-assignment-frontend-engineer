import { formatDate } from '../../utils/date';

import { FavoriteCounterButton } from '../EngagmentButtons/FavoriteCounterButton';
import {getUserImage} from "../../utils/getUserImage";
import {useRedirect} from "../../hooks/useRedirect";

interface ArticleItemProps {
    slug: string;
    title: string;
    description: string;
    img: string;
    author: string;
    favoritesCount: number;
    favorited: boolean;
    createdAt: string;
}

export const ArticleItem = ({
    slug,
    title,
    description,
    img,
    author,
    createdAt,
    favoritesCount,
    favorited
}: ArticleItemProps): JSX.Element => {
    const { redirectTo } = useRedirect();

    return (
        <div className="article-preview">
            <div className="article-meta">
                <img src={getUserImage(img)} alt={author} />
                <div className="info">
                    <span
                        style={{ cursor: "pointer" }}
                        className="author"
                        onClick={() => redirectTo(`/profile/${author}`)}
                    >
                        {author}
                    </span>
                    <span className="date">{formatDate(createdAt)}</span>
                </div>
                <div className="pull-xs-right">
                    <FavoriteCounterButton
                        favoritesCount={favoritesCount}
                        slug={slug}
                        favorited={favorited}
                    />
                </div>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <span style={{ cursor: "pointer" }} onClick={() => redirectTo(`/${slug}`)}>
                Read more...
            </span>
        </div>
    );
};