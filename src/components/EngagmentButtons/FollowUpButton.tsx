import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthorProfile } from '../../hooks/useAuthor';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
interface FollowAuthorProps {
    username: string;
}

export const FollowAuthorButton = ({ username }: FollowAuthorProps): JSX.Element | null => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    // Pobieramy aktualne dane autora z cache'u
    const authorData = queryClient.getQueryData<{ profile: AuthorProfile }>(['profile', username]);
    const isFollowed = authorData?.profile.following ?? false;

    const { mutate: toggleFollow, isLoading } = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('Brak tokenu uwierzytelniającego');
            }

            const response = await fetch(`http://localhost:3000/api/profiles/${username}/follow`, {
                method: isFollowed ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Nie udało się zaktualizować statusu obserwowania');
            }

            return response.json();
        },
        onSuccess: (data) => {
            // Aktualizujemy cache profilu autora
            queryClient.setQueryData(['profile', username], data);
        },
        onError: (error) => {
            console.error('Błąd podczas aktualizacji statusu obserwowania:', error);
        },
    });

    const handleFollowClick = () => {
        toggleFollow();
    };

    if (!user) return null;

    return (
        <button
            className={`btn btn-sm ${isFollowed ? 'btn-success' : 'btn-secondary'} action-btn`}
            onClick={handleFollowClick}
            disabled={isLoading}
        >
            <i className="ion-plus-round" />
            &nbsp; {isFollowed ? 'Unfollow' : 'Follow'} {username}
        </button>
    );
};