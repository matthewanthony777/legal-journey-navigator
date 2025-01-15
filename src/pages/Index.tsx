const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8">Legal Commentary & Career Insights</h1>
        <p className="text-xl text-gray-600 mb-8">
          Expert legal commentary and career guidance for legal professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Legal Articles</h2>
            <p className="text-gray-600 mb-4">
              In-depth analysis of legal topics and current developments in law.
            </p>
            <a href="/articles" className="text-blue-600 hover:underline">
              Browse Articles →
            </a>
          </div>
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Career Insights</h2>
            <p className="text-gray-600 mb-4">
              Guidance and tips for building a successful legal career.
            </p>
            <a href="/career-insights" className="text-blue-600 hover:underline">
              Explore Insights →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;