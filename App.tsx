import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DocumentVerifier from './components/CollegePredictor'; // Repurposed file
import AnalyticsDashboard from './components/StudyMaterials'; // Repurposed file
import ContactPage from './components/ContactPage';
import Chatbot from './components/Chatbot';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { Page } from './types';

type AuthView = 'login' | 'signup';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authView, setAuthView] = useState<AuthView>('login');

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setAuthView('login');
      setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage navigateTo={navigateTo} />;
      case 'verification':
        return <DocumentVerifier />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'contact':
        return <ContactPage />;
      default:
        return <LandingPage navigateTo={navigateTo} />;
    }
  };

  if (!isAuthenticated) {
    if (authView === 'login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => setAuthView('signup')} />;
    }
    return <SignupPage onSignupSuccess={handleSignupSuccess} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      <Header currentPage={currentPage} navigateTo={navigateTo} onLogout={handleLogout} />
      <main>{renderPage()}</main>
      <Chatbot />
    </div>
  );
};

export default App;
