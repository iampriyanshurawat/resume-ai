
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import History from './pages/History';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />

        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />

        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/results" element={
          <ProtectedRoute>
            <Layout>
              <Results />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <Layout>
              <History />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
