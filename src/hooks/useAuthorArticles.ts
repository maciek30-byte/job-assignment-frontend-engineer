import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ArticlesResponse } from './useArticles';

interface AuthorProfile {
    bio: string;
    following: boolean;
    image: string;
    username: string;
}

interface Article {
    author: AuthorProfile;
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
}

interface AuthorArticlesResponse {
    articles: Article[];
    articlesCount: number;
}
const fetchAuthorArticles = async (username: string): Promise<AuthorArticlesResponse> => {
    const response = await fetch(`http://localhost:3000/api/articles?author=${username}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useAuthorArticles = (username: string): UseQueryResult<ArticlesResponse, Error> => {
    return useQuery({
        queryKey: ['authorArticles', username],
        queryFn: () => fetchAuthorArticles(username),
        enabled: !!username,
    });
};