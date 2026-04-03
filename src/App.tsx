import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthView from './components/Auth/AuthView';
import TermsOfService from './components/Legal/TermsOfService';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';

type CurrentPage = 'auth' | 'terms' | 'privacy';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<CurrentPage>('auth');

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  if (isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Welcome! You are authenticated.</h1>
        {/* This will be the main application content once authenticated */}
      </div>
    );
  }

  // Not authenticated, show auth flow or legal pages
  switch (currentPage) {
    case 'auth':
      return <AuthView onNavigate={handleNavigate} />;
    case 'terms':
      return <TermsOfService />;
    case 'privacy':
      return <PrivacyPolicy />;
    default:
      return <AuthView onNavigate={handleNavigate} />;
  }
};

export default App;
