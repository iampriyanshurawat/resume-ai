
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await api.get('/analyze/history/');
                setHistory(data);
            } catch (err) {
                console.error(err);
                setError('Could not load history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return (
        <div className="flex justify-center mt-20">
            <Loader2 size={40} className="animate-spin text-indigo-500" />
        </div>
    );

    if (error) return (
        <div className="max-w-2xl mx-auto mt-20 text-center text-red-400 bg-red-500/10 p-6 rounded-xl border border-red-500/20">
            <AlertCircle size={32} className="mx-auto mb-3" />
            <p>{error}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold mb-8">Analysis History</h1>

            {history.length === 0 ? (
                <div className="card text-center p-12">
                    <FileText size={48} className="text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-6">No analysis history found.</p>
                    <Link to="/dashboard" className="btn btn-primary inline-flex">
                        Start New Analysis
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item.id} className="card p-0 overflow-hidden hover:border-indigo-500/30 group">
                            <Link to="/results" state={{ results: item }} className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-6">
                                    <div
                                        className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg 
                            ${item.score >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                (item.score >= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-red-500/10 text-red-400 border border-red-500/20')}`}
                                    >
                                        {item.score}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1 group-hover:text-indigo-400 transition-colors">
                                            {item.job_title || 'Job Description'}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1.5">
                                                <FileText size={14} /> Resume
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} />
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <ChevronRight size={20} className="text-slate-600 group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
