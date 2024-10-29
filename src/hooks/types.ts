export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    favorited: boolean; // Dodane pole
    favoritesCount: number;
    author: {
        username: string;
        bio: string;
        image: string;
    };
}