import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, TrendingUp as Trending, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Feed', icon: <Home className="w-5 h-5" /> },
    { path: '/top-users', label: 'Top Users', icon: <BarChart2 className="w-5 h-5" /> },
    { path: '/trending', label: 'Trending', icon: <Trending className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <BarChart2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">SocialMetrics</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium 
                  ${location.pathname === item.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }`}
                >
                  {item.icon}
                  <span className="ml-1">{item.label}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block pl-3 pr-4 py-2 text-base font-medium flex items-center
                  ${location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:border-l-4 hover:border-gray-300'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 SocialMetrics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;