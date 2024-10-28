import { Article, ArticlesResponse } from "./useArticles";


export const selectArticleBySlug = (data: ArticlesResponse[] | undefined, slug: string): Article | undefined => {
    if (!data) return undefined;
    for (const page of data) {
        const article = page.articles.find((a) => a.slug === slug);
        if (article) return article;
    }
    return undefined;
};