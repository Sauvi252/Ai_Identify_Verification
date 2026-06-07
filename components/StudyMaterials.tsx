
import React, { useEffect, useState } from 'react';
import { MOCK_STATS } from '../constants';
import { api } from '../services/api';
import { VerificationLog } from '../types';
import { TargetIcon, DocumentIcon, SparklesIcon } from './icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-slate-800/50 p-6 border border-slate-700 rounded-xl hover:border-slate-500 transition-colors">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{title}</h3>
            <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold text-slate-100">{value}</p>
    </div>
);

const AnalyticsDashboard: React.FC = () => {
    const [logs, setLogs] = useState<VerificationLog[]>([]);
    
    useEffect(() => {
        const fetchLogs = async () => {
            const data = await api.fetchRecentLogs();
            setLogs(data);
        };
        fetchLogs();
    }, []);

    return (
        <div className="py-12 sm:py-20 animate-fade-in">
            <div className="container mx-auto px-6">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-100">Fraud Prevention Analytics</h1>
                        <p className="text-slate-400 mt-1">Real-time overview of verification requests and threats</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <span className="bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                            System Operational
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard 
                        title="Total Verified" 
                        value={MOCK_STATS.totalVerified.toLocaleString()} 
                        icon={<DocumentIcon className="h-5 w-5 text-blue-400" />}
                        color="bg-blue-500"
                    />
                     <StatCard 
                        title="Fraud Prevented" 
                        value={MOCK_STATS.fraudDetected} 
                        icon={<TargetIcon className="h-5 w-5 text-red-400" />}
                        color="bg-red-500"
                    />
                     <StatCard 
                        title="Pending Review" 
                        value={MOCK_STATS.pendingReview} 
                        icon={<SparklesIcon className="h-5 w-5 text-amber-400" />}
                        color="bg-amber-500"
                    />
                     <StatCard 
                        title="Accuracy Rate" 
                        value={MOCK_STATS.accuracyRate} 
                        icon={<div className="h-5 w-5 text-emerald-400 font-bold">%</div>}
                        color="bg-emerald-500"
                    />
                </div>

                {/* Recent Logs */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-100">Recent Transactions (Encrypted Storage)</h2>
                        <button className="text-sm text-emerald-400 hover:text-emerald-300">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Request ID</th>
                                    <th className="px-6 py-4 font-medium">Document</th>
                                    <th className="px-6 py-4 font-medium">Timestamp</th>
                                    <th className="px-6 py-4 font-medium">Fraud Score</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500 italic">
                                            No records found. Perform a verification to see logs here.
                                        </td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4 text-slate-300 font-mono text-sm">{log.id}</td>
                                        <td className="px-6 py-4 text-slate-300">{log.docType}</td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">{log.timestamp}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full ${log.fraudScore < 20 ? 'bg-emerald-500' : log.fraudScore < 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                        style={{ width: `${log.fraudScore}%` }}
                                                    ></div>
                                                </div>
                                                <span className={`text-xs font-bold ${log.fraudScore < 20 ? 'text-emerald-400' : log.fraudScore < 60 ? 'text-amber-400' : 'text-red-400'}`}>
                                                    {log.fraudScore}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold
                                                ${log.status === 'Verified' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/20' : 
                                                  log.status === 'Rejected' ? 'bg-red-900/30 text-red-400 border border-red-500/20' : 
                                                  'bg-amber-900/30 text-amber-400 border border-amber-500/20'}
                                            `}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
