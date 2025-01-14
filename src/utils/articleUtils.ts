import { Article } from '../types/article';

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getAllArticles = async (): Promise<Article[]> => {
  const articles = import.meta.glob('/content/articles/*.mdx', { eager: true });
  return Object.values(articles)
    .map((article: any) => ({
      ...article.frontmatter,
      content: article.default
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getAllCareerInsights = async (): Promise<Article[]> => {
  const insights = import.meta.glob('/content/career-insights/*.mdx', { eager: true });
  return Object.values(insights)
    .map((insight: any) => ({
      ...insight.frontmatter,
      content: insight.default
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const articles = await getAllArticles();
  const insights = await getAllCareerInsights();
  const allContent = [...articles, ...insights];
  return allContent.find(article => article.slug === slug) || null;
};