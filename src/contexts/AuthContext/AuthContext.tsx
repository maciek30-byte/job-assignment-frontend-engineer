import React, { createContext, useContext, useState } from 'react';

interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
}

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const testUser: User = {
    email: 'alice@example.com',
    token: 'test-token',
    username: 'Alice',
    bio: 'Test user bio',
    image: 'http://i.imgur.com/Qr71crq.jpg',
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [user, setUser] = useState<User | null>(testUser);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}