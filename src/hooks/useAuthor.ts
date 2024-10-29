import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface AuthorProfile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

const fetchAuthor = async (username: string): Promise<{ profile: AuthorProfile }> => {
    const response = await fetch(`http://localhost:3000/api/profiles/${username}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const useAuthor = (username: string): UseQueryResult<{ profile: AuthorProfile }, Error> => {
    return useQuery({
        queryKey: ['profile', username],
        queryFn: () => fetchAuthor(username),
        enabled: !!username,
    });
};