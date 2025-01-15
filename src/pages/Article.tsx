import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticleBySlug, formatDate } from '../utils/articleUtils';
import { MDXProvider } from '@mdx-js/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 ml-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 ml-4 space-y-2" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600" {...props} />
  ),
  img: (props: any) => {
    const src = props.src.startsWith('http') ? props.src : `/images/${props.src}`;
    return (
      <div className="my-8">
        <img
          src={src}
          alt={props.alt || ''}
          className="w-full rounded-lg shadow-lg object-cover max-h-[600px]"
          loading="lazy"
        />
        {props.alt && (
          <p className="text-sm text-gray-500 mt-2 text-center">{props.alt}</p>
        )}
      </div>
    );
  },
  video: (props: any) => {
    const src = props.src.startsWith('http') ? props.src : `/videos/${props.src}`;
    return (
      <div className="my-8">
        <video
          className="w-full rounded-lg shadow-lg"
          controls
          preload="metadata"
          playsInline
          {...props}
          src={src}
          onLoadStart={(e) => {
            const video = e.currentTarget;
            video.playbackRate = 1.0; // Ensure smooth playback
            if (video.readyState >= 2) {
              video.play().catch(() => {}); // Attempt autoplay if metadata is loaded
            }
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  },
  pre: (props: any) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm" {...props} />
  ),
  code: (props: any) => {
    const isInline = typeof props.children === 'string';
    return isInline ? (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />
    ) : (
      <code {...props} />
    );
  },
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const isCareerInsight = location.pathname.includes('career-insights');
  
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
      <div className="mb-8">
        <Link to={isCareerInsight ? "/career-insights" : "/articles"}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {isCareerInsight ? "Career Insights" : "Articles"}
          </Button>
        </Link>
      </div>
      <article className="prose lg:prose-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
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
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
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
