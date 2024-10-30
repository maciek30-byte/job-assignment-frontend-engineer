import { AuthorResponse } from '../hooks/author.types';
import { API_URL } from '../utils/constants';

export const authorApi = {
    getProfile: async (username: string): Promise<AuthorResponse> => {
        const response = await fetch(`${API_URL}/profiles/${username}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }
};