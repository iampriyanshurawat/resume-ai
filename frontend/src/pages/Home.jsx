
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Zap, Target, LineChart, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="max-w-5xl mx-auto relative z-10 w-full animate-fade-in">

                    <h1 className="text-8xl md:text-[16.5rem] font-bold mb-12 leading-none tracking-tighter">
                        Optimize Your Resume <span className="text-indigo-400">with AI</span>
                    </h1>

                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Stand out from the crowd. Upload your resume and job <br className="hidden md:block" />
                        description to get instant, AI-powered feedback and tailoring <br className="hidden md:block" />
                        suggestions.
                    </p>

                    <div className="flex items-center justify-center gap-6">
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                                Go to Dashboard <LayoutDashboard size={18} />
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
                                    Get Started Free <ArrowRight size={18} />
                                </Link>
                                <Link to="/login" className="px-6 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
            </section>

            {/* Features Grid */}
            <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
                <div className="grid md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<CheckCircle size={24} className="text-blue-400" />}
                        title="Instant Analysis"
                        description="Get immediate feedback on your resume's strengths and weaknesses compared to the job description."
                        delay="0.4s"
                    />
                    <FeatureCard
                        icon={<CheckCircle size={24} className="text-blue-400" />}
                        title="Job Matching"
                        description="See exactly how well you match the role with a precise compatibility score."
                        delay="0.5s"
                    />
                    <FeatureCard
                        icon={<CheckCircle size={24} className="text-blue-400" />}
                        title="Actionable Insights"
                        description="Receive specific, step-by-step suggestions to improve your resume and increase your interview chances."
                        delay="0.6s"
                    />
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <div className="card hover:border-indigo-500/30 group animate-fade-in" style={{ animationDelay: delay }}>
        <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 w-fit group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">
            {description}
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Learn more <ArrowRight size={16} />
        </div>
    </div>
);

export default Home;
