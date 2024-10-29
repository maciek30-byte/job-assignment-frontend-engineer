import { formatDate } from '../../utils/date';
import { useHistory } from 'react-router-dom';
import { getUserImage } from 'utils/getUserImage';

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
}: ArticleItemProps): JSX.Element => {
    const history = useHistory();

    const handleArticleClick = () => {
        history.push(`/${slug}`);
    };

    const handleAuthorClick = () => {
        history.push(`/profile/${author}`);
    };

    return (
        <div className="article-preview">
            <div className="article-meta">
                <img src={getUserImage(img)} alt={author} />
                <div className="info">
                    <span
                        style={{ cursor: "pointer" }}
                        className="author"
                        onClick={handleAuthorClick}
                    >
                        {author}
                    </span>
                    <span className="date">{formatDate(createdAt)}</span>
                </div>
                <div className="pull-xs-right">

                </div>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <span style={{ cursor: "pointer" }} onClick={handleArticleClick}>
                Read more...
            </span>
        </div>
    );
};