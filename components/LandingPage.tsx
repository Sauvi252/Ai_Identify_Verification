
import React from 'react';
import { Page } from '../types';
import { ArrowRightIcon, DocumentIcon, TargetIcon, VideoCameraIcon, SparklesIcon } from './icons';

interface LandingPageProps {
  navigateTo: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-emerald-500/50 group hover:-translate-y-2 transition-all duration-300 w-full">
    <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-slate-800 border border-slate-600 text-emerald-400 group-hover:text-emerald-300 mb-6 transition-colors shadow-lg">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ navigateTo }) => {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-900/20 opacity-80 pointer-events-none"></div>
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 15% 50%, #10b981 0%, transparent 25%), radial-gradient(circle at 85% 30%, #0ea5e9 0%, transparent 25%)',
        }}
      ></div>

      <div className="relative container mx-auto px-6 pt-20 md:pt-32 pb-12 text-center text-white flex-grow">
        <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-300">Demo: Aadhaar-like Identity Verification (Synthetic Data)</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 max-w-5xl mx-auto">
          Secure Identity Verification <br className="hidden md:block"/> (Simulated Environment)
        </h1>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-slate-400 leading-relaxed">
          Combat fraud with military-grade AI-OCR and Deep Learning. Validate KYC documents instantly in a simulated environment, detect tampering, and ensure compliance.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-20">
          <button
            onClick={() => navigateTo('verification')}
            className="w-full sm:w-auto bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Start Verification (Demo)</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigateTo('analytics')}
            className="w-full sm:w-auto bg-slate-800 border border-slate-600 text-slate-200 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-700 hover:border-slate-500 hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>View Analytics</span>
            <TargetIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
          <FeatureCard 
            icon={<DocumentIcon className="h-6 w-6" />}
            title="Intelligent OCR"
            description="Extract data from synthetic Aadhaar-like documents, PAN, and Passports with high accuracy in this demo."
          />
          <FeatureCard 
            icon={<VideoCameraIcon className="h-6 w-6" />}
            title="Fraud Detection Simulation"
            description="Deep learning models analyze pixel-level patterns to detect photo manipulation and digital forgeries in test data."
          />
          <FeatureCard 
            icon={<SparklesIcon className="h-6 w-6" />}
            title="Simulated Compliance"
            description="Verification against standard document formats ensuring your onboarding logic meets requirements (No real UIDAI connection)."
          />
        </div>
      </div>

      <footer className="relative container mx-auto px-6 py-6 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm">
          Disclaimer: This application is a student demo using synthetic identity documents. No real Aadhaar or UIDAI data is accessed or verified.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
