export interface ArticleMetadata {
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  category: 'legal' | 'career' | 'consultancy';
  slug: string;
  featured?: boolean;
  readingTime?: string;
  coverVideo?: string;
  coverImage?: string;
  imageAlt?: string;
  videoPoster?: string;
}

export interface Article extends ArticleMetadata {
  content: string;
}