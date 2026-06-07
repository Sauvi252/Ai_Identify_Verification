
import React, { useState, useRef } from 'react';
import { VerificationResult } from '../types';
import { api } from '../services/api';
import { SparklesIcon, DocumentIcon, SearchIcon, TargetIcon } from './icons';

const StatusBadge: React.FC<{ status: VerificationResult['status'] }> = ({ status }) => {
  const styles = {
    Verified: "bg-emerald-900/50 text-emerald-400 border border-emerald-500/30",
    Rejected: "bg-red-900/50 text-red-400 border border-red-500/30",
    "Manual Review": "bg-amber-900/50 text-amber-400 border border-amber-500/30",
  };
  return (
    <span className={`text-sm font-bold px-4 py-1.5 rounded-full flex items-center space-x-2 ${styles[status]}`}>
        <span className={`h-2 w-2 rounded-full ${status === 'Verified' ? 'bg-emerald-400' : status === 'Rejected' ? 'bg-red-400' : 'bg-amber-400'}`}></span>
        <span>{status}</span>
    </span>
  );
};

interface AadhaarCheckResult {
  aadhaarNumber: string;
  status: VerificationResult['status'];
  fraudScore: number;
  message: string;
}

const DocumentVerifier: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [result, setResult] = useState<VerificationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasConsent, setHasConsent] = useState(false);
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [aadhaarResult, setAadhaarResult] = useState<AadhaarCheckResult | null>(null);
    const [aadhaarLoading, setAadhaarLoading] = useState(false);
    const [aadhaarError, setAadhaarError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Remove data URL prefix for API
                setImage(base64String);
                setResult(null);
                setError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVerify = async () => {
        if (!image || !hasConsent) return;
        
        setIsLoading(true);
        setError(null);
        try {
            // 1. Extract base64 data
            const base64Data = image.split(',')[1];

            // 2. Call AI API
            const data = await api.verifyIdentity(base64Data);
            setResult(data);

            // 3. Store result in secure DB
            await api.saveVerification(data);

        } catch (err) {
            setError('Verification failed. Ensure the image is clear and contains text.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleAadhaarCheck = async () => {
        setAadhaarError(null);
        setAadhaarResult(null);

        const normalized = aadhaarNumber.replace(/\D/g, '');
        if (normalized.length !== 12) {
            setAadhaarError('Enter a valid 12-digit Aadhaar number.');
            return;
        }

        setAadhaarLoading(true);
        try {
            const checkResponse = await api.checkAadhaarNumber(normalized);
            setAadhaarResult({
                aadhaarNumber: normalized.replace(/(.{4})(?=.)/g, '$1 '),
                ...checkResponse
            });
        } catch (err) {
            setAadhaarError('Aadhaar validation failed. Please try again.');
            console.error(err);
        } finally {
            setAadhaarLoading(false);
        }
    };

    return (
        <div className="py-12 sm:py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-block bg-emerald-600/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold mb-4 border border-emerald-500/30">
                        AI ENGINE ENABLED (DEMO MODE)
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">Identity Verification</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Powered by Gemini 2.5 Flash & Azure Document Intelligence principles (Simulated Verification Environment).
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Upload Section */}
                    <div className="bg-slate-800/50 p-8 border border-slate-700 rounded-2xl shadow-2xl">
                        <div className="flex items-center mb-6">
                            <DocumentIcon className="h-6 w-6 text-emerald-400 mr-3" />
                            <h2 className="text-2xl font-bold text-slate-100">Document Upload</h2>
                        </div>
                        
                        <div 
                            onClick={triggerFileUpload}
                            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 h-64 flex flex-col items-center justify-center relative overflow-hidden group
                                ${image ? 'border-emerald-500/50 bg-slate-900/50' : 'border-slate-600 hover:border-emerald-400 hover:bg-slate-700/30'}
                            `}
                        >
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            
                            {image ? (
                                <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-4" />
                            ) : (
                                <>
                                    <div className="bg-slate-700 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <p className="text-slate-300 font-medium text-lg">Upload Identity Document (Demo)</p>
                                    <p className="text-slate-500 text-sm mt-2">Synthetic Aadhaar, PAN, or Passport</p>
                                </>
                            )}
                        </div>
                        
                        {/* Consent & Actions */}
                        <div className="mt-6 space-y-4">
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-xs text-slate-400">
                                <p className="font-bold text-amber-500 mb-1">DISCLAIMER:</p>
                                <p>This application is a student demo using synthetic identity documents. No real Aadhaar or UIDAI data is accessed or verified.</p>
                            </div>

                            <label className="flex items-start space-x-3 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    checked={hasConsent}
                                    onChange={(e) => setHasConsent(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500/50"
                                />
                                <span className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                                    I consent to processing this test data for the purpose of this identity verification demo.
                                </span>
                            </label>

                            <button 
                                onClick={handleVerify} 
                                disabled={isLoading || !image || !hasConsent}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        <span>AI Analysis in Progress...</span>
                                    </>
                                ) : (
                                    <>
                                        <SparklesIcon className="h-5 w-5" />
                                        <span>Analyze Document</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700 mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xl font-semibold text-slate-100">Aadhaar Number Checker</p>
                                    <p className="text-sm text-slate-500">Enter a 12-digit Aadhaar number to run a demo fraud-risk assessment.</p>
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] text-emerald-400">Demo only</span>
                            </div>

                            <div className="grid gap-4">
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={aadhaarNumber}
                                    onChange={(e) => setAadhaarNumber(e.target.value)}
                                    placeholder="1234 5678 9012"
                                    className="w-full px-3 py-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />

                                <button
                                    onClick={handleAadhaarCheck}
                                    disabled={aadhaarLoading || !aadhaarNumber.trim()}
                                    className={`w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition ${aadhaarLoading || !aadhaarNumber.trim() ? 'opacity-60 cursor-not-allowed' : 'shadow-lg shadow-emerald-500/20'}`}
                                >
                                    {aadhaarLoading ? 'Checking Aadhaar...' : 'Check Aadhaar Number'}
                                </button>

                                {aadhaarError && <p className="text-sm text-red-400">{aadhaarError}</p>}
                            </div>
                        </div>
                        
                        {error && <p className="mt-4 text-center text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-900/50">{error}</p>}
                    </div>

                    {/* Results Section */}
                    <div className={`bg-slate-800/50 p-8 border border-slate-700 rounded-2xl shadow-2xl transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                                <SearchIcon className="h-6 w-6 text-emerald-400 mr-3" />
                                <h2 className="text-2xl font-bold text-slate-100">AI Findings (Simulated)</h2>
                            </div>
                            {result && <StatusBadge status={result.status} />}
                        </div>

                        {!result && !aadhaarResult && !isLoading && (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
                                <TargetIcon className="h-10 w-10 mb-3 opacity-20" />
                                <p>AI Analysis results will appear here.</p>
                            </div>
                        )}

                        {aadhaarResult && (
                            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">Aadhaar Number Check</p>
                                        <p className="text-lg font-semibold text-slate-100 break-words">{aadhaarResult.aadhaarNumber}</p>
                                    </div>
                                    <StatusBadge status={aadhaarResult.status} />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase mb-1">Fraud Risk</p>
                                        <p className="text-2xl font-bold text-emerald-400">{aadhaarResult.fraudScore}/100</p>
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase mb-1">Assessment</p>
                                        <p className="font-semibold text-slate-200">{aadhaarResult.message}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-500">This is a simulated Aadhaar number assessment for the demo. Real UIDAI verification requires a secure backend integration.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="h-full min-h-[300px] flex flex-col items-center justify-center">
                                <div className="space-y-4 w-full max-w-xs text-center">
                                    <div className="h-2 bg-slate-700 rounded overflow-hidden">
                                        <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
                                    </div>
                                    <p className="text-emerald-400 text-sm font-medium animate-pulse">Running OCR & Deep Learning Models...</p>
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6 animate-fade-in">
                                {/* Fraud Score Card */}
                                <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Fraud Confidence Score</span>
                                        <span className={`text-3xl font-bold ${result.fraudScore < 20 ? 'text-emerald-400' : result.fraudScore < 60 ? 'text-amber-400' : 'text-red-400'}`}>
                                            {result.fraudScore}/100
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${result.fraudScore < 20 ? 'bg-emerald-500' : result.fraudScore < 60 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                            style={{ width: `${result.fraudScore}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-3 italic">
                                        "{result.reasoning}"
                                    </p>
                                </div>

                                {/* Extracted Data */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase mb-1">Doc Type</p>
                                        <p className="font-semibold text-slate-200 truncate">{result.docType}</p>
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase mb-1">DOB</p>
                                        <p className="font-semibold text-slate-200">{result.dob}</p>
                                    </div>
                                    <div className="col-span-2 bg-slate-800 p-4 rounded-lg border border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase mb-1">Extracted Name</p>
                                        <p className="font-semibold text-slate-200">{result.name}</p>
                                    </div>
                                    <div className="col-span-2 bg-slate-800 p-4 rounded-lg border border-slate-700">
                                        <p className="text-xs text-slate-500 uppercase mb-1">ID Number</p>
                                        <p className="font-mono text-emerald-400 tracking-wide">{result.idNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700">
                                    <span>Engine: Gemini 2.5 Flash</span>
                                    <span className="flex items-center">
                                        {result.isTampered ? (
                                            <span className="text-red-400 flex items-center font-bold">POSSIBLE TAMPERING</span>
                                        ) : (
                                            <span className="text-emerald-400 flex items-center font-bold">VALIDATED</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentVerifier;
