import React from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthView from './components/Auth/AuthView'; // AuthView.tsx will be created next

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthView />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome! You are authenticated.</h1>
      {/* This will be the main application content once authenticated */}
    </div>
  );
};

export default App;
