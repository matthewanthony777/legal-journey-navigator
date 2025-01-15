import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAllCareerInsights, formatDate } from '../utils/articleUtils';

const CareerInsights = () => {
  const { data: insights, isLoading, error } = useQuery({
    queryKey: ['careerInsights'],
    queryFn: getAllCareerInsights
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading career insights...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading career insights</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-light mb-8">Career Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights?.map((insight) => (
          <article key={insight.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <Link 
              to={`/career-insights/${insight.slug}`}
              className="block aspect-video relative overflow-hidden bg-gray-100"
            >
              {insight.coverVideo && (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={insight.videoPoster || "/placeholder.svg"}
                  preload="metadata"
                  muted
                  loop
                  autoPlay
                  playsInline
                >
                  <source src={insight.coverVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {!insight.coverVideo && insight.coverImage && (
                <img
                  src={insight.coverImage}
                  alt={insight.imageAlt || insight.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </Link>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{formatDate(insight.date)}</span>
                  <span>•</span>
                  <span>{insight.readingTime}</span>
                </div>
                <Link 
                  to={`/career-insights/${insight.slug}`}
                  className="block group"
                >
                  <h2 className="text-xl font-medium group-hover:text-gray-600 transition-colors line-clamp-2">
                    {insight.title}
                  </h2>
                </Link>
                <p className="text-gray-600 line-clamp-2">{insight.description}</p>
                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {insight.tags.map((tag) => (
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

export default CareerInsights;