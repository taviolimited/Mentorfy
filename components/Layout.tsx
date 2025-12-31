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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center selection:bg-indigo-100">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-8">
            <button 
              onClick={onLogoClick}
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-all duration-300">M</div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mentorfy</h1>
            </button>
            {showDashboardLink && (
              <button 
                onClick={onDashboardClick}
                className="hidden md:block text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider"
              >
                My Dashboard
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-10 sm:w-14 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-indigo-600 shadow-sm shadow-indigo-100' : 'bg-slate-200'
                  }`}
                />
              </div>
            ))}
          </div>
        </header>

        <main className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 min-h-[700px] flex flex-col relative animate-slideUp">
          <div className="flex-1">
            {children}
          </div>
        </main>

        <footer className="mt-12 mb-8 flex flex-col items-center space-y-4">
          <div className="flex space-x-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Help Center</a>
          </div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
            &copy; 2025 Mentorfy &bull; Empowering Growth
          </p>
        </footer>
      </div>
    </div>
  );
};