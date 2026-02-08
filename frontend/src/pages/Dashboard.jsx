
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Briefcase, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(''); // 'uploading', 'processing', 'analyzing'
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
        }
    };

    const handleAnalyze = async () => {
        if (!file || !jobDescription.trim() || !jobTitle.trim()) {
            setError('Please provide a resume, job title, and job description.');
            return;
        }

        setIsAnalyzing(true);
        setError('');

        try {
            // 1. Upload Resume
            setStep('Uploading resume...');
            const resumeFormData = new FormData();
            resumeFormData.append('file', file);
            const resumeData = await api.postFormData('/resumes/', resumeFormData);

            // 2. Create Job Description
            setStep('Processing job description...');
            const jdData = await api.post('/job_descriptions/', {
                title: jobTitle,
                company: company,
                description: jobDescription
            });

            // 3. Analyze
            setStep('Analyzing match...');
            const analysisResult = await api.post('/analyze/', {
                resume_id: resumeData.id,
                job_description_id: jdData.id
            });

            navigate('/results', { state: { results: analysisResult } });

        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred during analysis.');
            setIsAnalyzing(false);
            setStep('');
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-slate-400 mb-8">Upload your resume and the job description to get a detailed match analysis.</p>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-start gap-3 text-red-400 animate-fade-in">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <span className="whitespace-pre-line">{error}</span>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Resume Upload Section */}
                <div className="card">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                        <FileText size={24} />
                        <h2 className="text-xl font-semibold m-0 text-white">Resume</h2>
                    </div>

                    <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-xl p-8 text-center transition-colors cursor-pointer bg-slate-800/30 relative">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                                <Upload size={24} className="text-indigo-400" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-300">
                                    {file ? file.name : "Click or drag to upload PDF"}
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF files only"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {file && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 p-2 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Ready to upload
                        </div>
                    )}
                </div>

                {/* Job Description Section */}
                <div className="card space-y-4">
                    <div className="flex items-center gap-3 text-purple-400">
                        <Briefcase size={24} />
                        <h2 className="text-xl font-semibold m-0 text-white">Job Details</h2>
                    </div>

                    <input
                        type="text"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all outline-none"
                        placeholder="Job Title (e.g. Senior React Developer)"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all outline-none"
                        placeholder="Company Name (Optional)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <textarea
                        className="w-full h-40 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none outline-none"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !file || !jobDescription.trim() || !jobTitle.trim()}
                    className={`btn btn-primary px-12 py-4 text-lg rounded-xl flex items-center gap-3 ${isAnalyzing ? 'opacity-75 cursor-wait' : ''}`}
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            {step}
                        </>
                    ) : (
                        <>
                            Start Analysis
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
