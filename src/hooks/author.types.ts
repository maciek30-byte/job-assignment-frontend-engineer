export interface AuthorProfile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface AuthorResponse {
    profile: AuthorProfile;
}