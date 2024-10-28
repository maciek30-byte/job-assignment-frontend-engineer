import { useQuery, UseQueryResult } from '@tanstack/react-query';

export interface AuthorProfile {
    profile: {
        username: string;
        bio: string;
        image: string;
        following: boolean;
        articles: {
            slug: string;
            title: string;
            description: string;
            createdAt: string;
            favoritesCount: number;
        }[];
    }

}

const fetchAuthor = async (username: string): Promise<AuthorProfile> => {
    const response = await fetch(`http://localhost:3000/api/profiles/${username}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const useAuthor = (username: string): UseQueryResult<AuthorProfile, Error> => {
    return useQuery({
        queryKey: ['author', username],
        queryFn: () => fetchAuthor(username),
        enabled: !!username,
    });
};