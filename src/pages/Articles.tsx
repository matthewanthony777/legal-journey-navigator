import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllArticles } from '../utils/articleUtils';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/articleUtils';

const Articles = () => {
  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getAllArticles
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading articles</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-light mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <article key={article.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="aspect-video relative overflow-hidden bg-gray-100 h-48">
              {article.coverVideo && (
                <video
                  className="w-full h-full object-cover"
                  poster={article.videoPoster || "/placeholder.svg"}
                  preload="metadata"
                  muted
                  loop
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                >
                  <source src={article.coverVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {!article.coverVideo && article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.imageAlt || article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{formatDate(article.date)}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>
                <Link 
                  to={`/articles/${article.slug}`}
                  className="block group"
                >
                  <h2 className="text-xl font-medium group-hover:text-gray-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 line-clamp-2">{article.description}</p>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Articles;