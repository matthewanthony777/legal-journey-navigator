import { format, parseISO } from 'date-fns';
import type { Article, ArticleMetadata } from '../types/article';

// Mock function to load articles - replace with actual MDX loading logic
export async function getAllArticles(): Promise<Article[]> {
  // This is where you'll implement the actual MDX loading
  // For now, returning a mock article
  return [
    {
      title: "Sample Legal Article",
      date: "2024-03-19",
      author: "Jane Doe",
      description: "A sample legal article about contract law",
      tags: ["legal", "contracts"],
      category: "legal",
      slug: "sample-legal-article",
      content: "Sample content",
      readingTime: "5 min read"
    }
  ];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export function sortArticlesByDate(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function formatDate(date: string): string {
  return format(parseISO(date), 'MMMM dd, yyyy');
}