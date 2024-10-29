import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { API_URL } from '../utils/constants';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

export interface LoginResponse {
    user: User;
}

export interface LoginError {
    errors: {
        [key: string]: string[];
    };
}

async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: credentials }),
    });

    if (!response.ok) {
        const errorData: LoginError = await response.json();
        throw errorData;
    }

    return response.json();
}

export const useLoginMutation = (): UseMutationResult<
    LoginResponse,
    LoginError,
    LoginCredentials
> => {
    return useMutation({
        mutationFn: loginUser,
    });
};