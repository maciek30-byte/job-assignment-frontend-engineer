import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Article } from './types';

interface FavoriteArticleResponse {
    article: Article;
}

interface MutationContext {
    previousArticles: unknown;
}

export const useArticleFavorite = (slug: string) => {
    const queryClient = useQueryClient();

    return useMutation<FavoriteArticleResponse, Error, { isFavorited: boolean }, MutationContext>({
        mutationFn: async ({ isFavorited }) => {
            const response = await fetch(
                `http://localhost:3000/api/articles/${slug}/favorite`,
                {
                    method: isFavorited ? 'DELETE' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }

            return response.json();
        },
        onMutate: async ({ isFavorited }) => {
            await queryClient.cancelQueries({ queryKey: ['articles'] });

            const previousArticles = queryClient.getQueryData(['articles']);

            queryClient.setQueryData(['articles'], (old: any) => ({
                pages: old.pages.map((page: any) => ({
                    ...page,
                    articles: page.articles.map((article: Article) => {
                        if (article.slug === slug) {
                            return {
                                ...article,
                                favorited: !isFavorited,
                                favoritesCount: isFavorited
                                    ? article.favoritesCount - 1
                                    : article.favoritesCount + 1,
                            };
                        }
                        return article;
                    }),
                })),
            }));

            return { previousArticles };
        },
        onError: (err, variables, context) => {
            if (context?.previousArticles) {
                queryClient.setQueryData(['articles'], context.previousArticles);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });
};