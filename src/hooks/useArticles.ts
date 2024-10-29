import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { Article } from './types';



export interface ArticlesResponse {
    articles: Article[];
    articlesCount: number;
}

const ARTICLES_PER_PAGE = 10;

const fetchArticlesPage = async ({ pageParam = 0 }): Promise<ArticlesResponse> => {
    const response = await fetch(
        `http://localhost:3000/api/articles?offset=${pageParam}&limit=${ARTICLES_PER_PAGE}`
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const useArticles = (): UseInfiniteQueryResult<ArticlesResponse, Error> => {
    return useInfiniteQuery<ArticlesResponse, Error>({
        queryKey: ['articles'],
        queryFn: fetchArticlesPage,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length * ARTICLES_PER_PAGE;
            return nextPage < lastPage.articlesCount ? nextPage : undefined;
        },
    });
}
