import { Article } from '../types/article';

export const formatDate = (date: string) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date format:', date);
      return 'Date unavailable';
    }
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date unavailable';
  }
};

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const articles = import.meta.glob('/content/articles/*.mdx', { 
      eager: true 
    });
    
    return Object.entries(articles)
      .map(([path, module]: [string, any]) => {
        if (!module?.metadata) {
          console.warn(`Missing metadata for article at path: ${path}`);
          return null;
        }
        
        return {
          ...module.metadata,
          content: module.default,
          slug: module.metadata.slug || path.split('/').pop()?.replace('.mdx', '') || '',
          date: module.metadata.date || new Date().toISOString()
        };
      })
      .filter((article): article is Article => article !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
};

export const getAllCareerInsights = async (): Promise<Article[]> => {
  try {
    const insights = import.meta.glob('/content/career-insights/*.mdx', {
      eager: true
    });
    
    return Object.entries(insights)
      .map(([path, module]: [string, any]) => {
        if (!module?.metadata) {
          console.warn(`Missing metadata for career insight at path: ${path}`);
          return null;
        }
        
        return {
          ...module.metadata,
          content: module.default,
          slug: module.metadata.slug || path.split('/').pop()?.replace('.mdx', '') || '',
          date: module.metadata.date || new Date().toISOString()
        };
      })
      .filter((insight): insight is Article => insight !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading career insights:', error);
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const articles = await getAllArticles();
  const insights = await getAllCareerInsights();
  const allContent = [...articles, ...insights];
  return allContent.find(article => article.slug === slug) || null;
};