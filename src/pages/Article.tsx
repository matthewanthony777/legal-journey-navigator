import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleBySlug, formatDate } from '../utils/articleUtils';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug || ''),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Article not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500">
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
        <div className="mt-8">
          {/* This is where the MDX content will be rendered */}
          <div className="prose">{article.content}</div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Article;