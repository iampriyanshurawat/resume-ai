
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-indigo-500/30">
            <Navbar />
            <main className="pt-24 px-4 pb-12 max-w-7xl mx-auto">
                {children}
            </main>

            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[120px]"></div>
            </div>
        </div>
    );
};

export default Layout;
