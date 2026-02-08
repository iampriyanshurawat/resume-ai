
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, History, FileText, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass-panel fixed top-0 w-full z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                        <FileText size={20} className="text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        ResumeAI
                    </span>
                </Link>

                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="/history" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        <History size={18} /> History
                    </Link>
                </div>

                {/* Desktop Auth Buttons - Right */}
                <div className="hidden md:flex items-center gap-4">
                    {isAuthenticated ? (
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-slate-700/50 p-4 flex flex-col gap-4 animate-fade-in bg-[var(--bg-color)]">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                            <Link to="/history" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                <History size={20} /> History
                            </Link>
                            <button onClick={logout} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-red-400">
                                <LogOut size={20} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="p-2 text-center text-slate-300">Login</Link>
                            <Link to="/register" className="btn btn-primary w-full justify-center">Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
