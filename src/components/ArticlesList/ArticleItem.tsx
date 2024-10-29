import { FavoriteCounter } from 'components/FavoriteCounter/FavoriteCounter';
import { formatDate } from '../../utils/date';
import { getUserImage } from 'utils/getUserImage';
import { useRedirect } from 'hooks/useRedirect';

interface ArticleItemProps {
    slug: string;
    title: string;
    description: string;
    img: string;
    author: string;
    favoritesCount: number;
    createdAt: string;
}
export const ArticleItem = ({
    slug,
    title,
    description,
    img,
    author,
    createdAt,
    favoritesCount
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
                    <FavoriteCounter favoritesCount={favoritesCount} />

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