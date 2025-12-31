import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  step: number;
  onLogoClick?: () => void;
  onDashboardClick?: () => void;
  showDashboardLink?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  step,
  onLogoClick,
  onDashboardClick,
  showDashboardLink
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-8">
        <header className="flex justify-between items-center pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <button 
              onClick={onLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-1 group"
              aria-label="Go to homepage"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">M</div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mentorfy</h1>
            </button>
            {showDashboardLink && (
              <button 
                onClick={onDashboardClick}
                className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
              >
                My Dashboard
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 w-6 sm:w-8 rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </header>
        <main className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[600px] flex flex-col relative overflow-hidden">
          <div className="flex-1">
            {children}
          </div>
        </main>
        <footer className="text-center text-gray-400 text-sm py-4">
          &copy; 2025 Mentorfy. Helping the next generation of talent grow.
        </footer>
      </div>
    </div>
  );
};
