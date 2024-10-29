import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

interface FavoriteCounterProps {
    favoritesCount: number;
    slug: string;
    favorited: boolean;
}

export const FavoriteCounterButton = ({
    favoritesCount,
    slug,
    favorited
}: FavoriteCounterProps): JSX.Element | null => {
    const queryClient = useQueryClient();
    const { user } = useAuth();




    const { mutate: toggleFavorite, isLoading } = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`http://localhost:3000/api/articles/${slug}/favorite`, {
                method: favorited ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }

            return response.json();
        },
        onSuccess: (data) => {
            // Aktualizuj cache na podstawie odpowiedzi z serwera
            queryClient.setQueryData(['articles'], (oldData: any) => {
                if (!oldData) return;

                return {
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        articles: page.articles.map((article: any) => {
                            if (article.slug === slug) {
                                return {
                                    ...article,
                                    favorited: data.article.favorited,
                                    favoritesCount: data.article.favoritesCount,
                                };
                            }
                            return article;
                        }),
                    })),
                };
            });
        },
        onError: (err) => {
            console.error('Error updating favorite status:', err);
        },
    });

    const handleFavoriteClick = () => {
        toggleFavorite();
    };

    if (!user) return null;

    return (
        <button
            className={`btn btn-sm pull-xs-right ${favorited ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={handleFavoriteClick}
            disabled={isLoading}
        >
            <i className="ion-heart" /> {favoritesCount}
        </button>
    );
};