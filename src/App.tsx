import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoute from './components/auth/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AgentsPage from './pages/AgentsPage';
import CategoriesPage from './pages/CategoriesPage';
import AgentDetailsPage from './pages/AgentDetailsPage';
import SubmitAgentPage from './pages/SubmitAgentPage';
import FeatureSubmissionPage from './pages/FeatureSubmissionPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/agent/:id" element={<AgentDetailsPage />} />
              <Route path="/submit" element={<SubmitAgentPage />} />
              <Route path="/feature" element={<FeatureSubmissionPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}