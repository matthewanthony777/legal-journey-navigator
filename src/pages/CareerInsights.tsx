import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAllCareerInsights, formatDate } from '../utils/articleUtils';
import Navigation from '../components/Navigation';

const CareerInsights = () => {
  const { data: insights, isLoading, error } = useQuery({
    queryKey: ['careerInsights'],
    queryFn: getAllCareerInsights
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-pulse text-xl">Loading career insights...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-red-500">Error loading career insights</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-light mb-8">Career Insights</h1>
        <div className="space-y-8">
          {insights?.map((insight) => (
            <article key={insight.slug} className="border-b border-gray-200 dark:border-gray-800 pb-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(insight.date)}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-600">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{insight.readingTime}</span>
                </div>
                <Link 
                  to={`/career-insights/${insight.slug}`}
                  className="block group"
                >
                  <h2 className="text-2xl font-medium group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {insight.title}
                  </h2>
                </Link>
                <p className="text-gray-600 dark:text-gray-300">{insight.description}</p>
                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {insight.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;