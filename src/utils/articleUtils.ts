import { Article } from '../types/article';

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getAllArticles = async (): Promise<Article[]> => {
  // Using explicit path to content/articles directory
  const articles = import.meta.glob('/content/articles/*.mdx', { 
    eager: true,
    import: 'default'
  });
  
  return Object.entries(articles)
    .map(([path, module]: [string, any]) => ({
      ...module.metadata,
      content: module.default,
      slug: path.split('/').pop()?.replace('.mdx', '') || ''
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getAllCareerInsights = async (): Promise<Article[]> => {
  // Using explicit path to content/career-insights directory
  const insights = import.meta.glob('/content/career-insights/*.mdx', {
    eager: true,
    import: 'default'
  });
  
  return Object.entries(insights)
    .map(([path, module]: [string, any]) => ({
      ...module.metadata,
      content: module.default,
      slug: path.split('/').pop()?.replace('.mdx', '') || ''
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const articles = await getAllArticles();
  const insights = await getAllCareerInsights();
  const allContent = [...articles, ...insights];
  return allContent.find(article => article.slug === slug) || null;
};