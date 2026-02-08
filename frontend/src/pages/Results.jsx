
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, Lightbulb } from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const results = location.state?.results;

    if (!results) {
        return (
            <div className="max-w-2xl mx-auto mt-20 text-center animate-fade-in">
                <div className="card inline-block p-12">
                    <AlertTriangle size={64} className="text-indigo-400 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
                    <p className="text-slate-400 mb-8">Please start a new analysis from the dashboard.</p>
                    <Link to="/dashboard" className="btn btn-primary">
                        <ArrowLeft size={18} /> Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const { score, matching_skills, missing_skills } = results;
    let { summary, suggestions } = results;

    // Fallback summary generation
    if (!summary) {
        if (score >= 90) summary = "Excellent match! Your profile strongly aligns with the job requirements.";
        else if (score >= 75) summary = "Good match. You have most key skills, but valid minor gaps exist.";
        else if (score >= 50) summary = "Partial match. Several key requirements are missing.";
        else summary = "Weak match. Significant gaps found against the job description.";
    }

    // Parse suggestions
    let parsedSuggestions = [];
    if (typeof suggestions === 'string') {
        parsedSuggestions = suggestions.split('\n').map(s => s.trim().replace(/^-\s*/, '')).filter(s => s);
    } else if (Array.isArray(suggestions)) {
        parsedSuggestions = suggestions;
    }

    const getScoreColor = (s) => {
        if (s >= 80) return 'text-emerald-400 border-emerald-500/50';
        if (s >= 60) return 'text-amber-400 border-amber-500/50';
        return 'text-red-400 border-red-500/50';
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <div className="card">
                {/* Score Section */}
                <div className="text-center mb-12 relative overflow-hidden">
                    <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl font-bold mx-auto mb-6 relative z-10 bg-slate-900/50 backdrop-blur ${getScoreColor(score)}`}>
                        {score}
                    </div>
                    {/* Glow effect behind score */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-20 blur-[60px] pointer-events-none ${score >= 80 ? 'bg-emerald-500' : (score >= 60 ? 'bg-amber-500' : 'bg-red-500')}`}></div>

                    <h2 className="text-2xl font-bold mb-2">Match Score</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">{summary}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Matching Skills */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 border-b border-white/10 pb-2">
                            <CheckCircle size={20} className="text-emerald-400" />
                            Matching Skills
                        </h3>
                        <div className="space-y-3">
                            {matching_skills && matching_skills.length > 0 ? (
                                matching_skills.map((item, index) => (
                                    <div key={index} className="bg-emerald-500/10 border-l-4 border-emerald-500 p-3 rounded-r-lg text-sm text-slate-200">
                                        {item}
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic">No specific matching skills found.</p>
                            )}
                        </div>
                    </div>

                    {/* Missing Skills */}
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 border-b border-white/10 pb-2">
                            <AlertTriangle size={20} className="text-amber-400" />
                            Missing Skills & Gaps
                        </h3>
                        <div className="space-y-3">
                            {missing_skills && missing_skills.length > 0 ? (
                                missing_skills.map((item, index) => (
                                    <div key={index} className="bg-amber-500/10 border-l-4 border-amber-500 p-3 rounded-r-lg text-sm text-slate-200">
                                        {item}
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic">No significant gaps found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Suggestions */}
                <div className="mt-10">
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 border-b border-white/10 pb-2">
                        <Lightbulb size={20} className="text-indigo-400" />
                        Improvement Suggestions
                    </h3>
                    <ul className="space-y-3">
                        {parsedSuggestions.map((item, index) => (
                            <li key={index} className="flex gap-3 text-slate-300 bg-indigo-500/5 p-4 rounded-lg">
                                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    {index + 1}
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Results;
