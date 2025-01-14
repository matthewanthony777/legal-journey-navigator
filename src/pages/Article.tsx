import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleBySlug, formatDate } from '../utils/articleUtils';
import { MDXProvider } from '@mdx-js/react';

const components = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 ml-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 ml-4" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
  ),
  img: (props: any) => (
    <img className="w-full rounded-lg my-6" {...props} alt={props.alt || ''} />
  ),
  video: (props: any) => (
    <div className="my-6">
      <video className="w-full rounded-lg" {...props} />
    </div>
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 px-2 py-1 rounded" {...props} />
  ),
};

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

  const Content = article.content;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500">
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <span>{article.author}</span>
            {article.readingTime && (
              <>
                <span>•</span>
                <span>{article.readingTime}</span>
              </>
            )}
          </div>
        </div>
        <div className="mt-8">
          <MDXProvider components={components}>
            <Content />
          </MDXProvider>
        </div>
        {article.tags && article.tags.length > 0 && (
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
        )}
      </article>
    </div>
  );
};

export default Article;