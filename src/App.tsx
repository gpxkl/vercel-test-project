import React, { useState } from 'react';
import AuthForm from './AuthForm';
import Dashboard from './Dashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleAuthenticate = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <div className="App">
      {isAuthenticated && userEmail ? (
        <Dashboard userEmail={userEmail} onLogout={handleLogout} />
      ) : (
        <AuthForm onAuthenticate={handleAuthenticate} />
      )}
    </div>
  );
};

export default App;
