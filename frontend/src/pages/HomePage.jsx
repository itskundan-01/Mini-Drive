import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Upload, Lock, Zap, Users, Shield, Check, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Welcome to Mini Drive
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
            Your secure, fast, and reliable cloud storage solution for all your files and documents
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-block bg-white text-indigo-600 px-8 py-3.5 rounded-lg font-semibold text-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-lg font-semibold text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span>{user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-6">
              <Upload className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Easy File Upload</h3>
            <p className="text-slate-600 leading-relaxed">
              Upload your files securely with drag & drop or browse. Support for images, documents, videos, and more.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-6">
              <Lock className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Secure Storage</h3>
            <p className="text-slate-600 leading-relaxed">
              Your files are encrypted and stored safely in the cloud with enterprise-grade security and authentication.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 hover:shadow-md transition-all duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-6">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800">Fast Access</h3>
            <p className="text-slate-600 leading-relaxed">
              Access your files instantly from anywhere, on any device. Lightning-fast downloads and previews.
            </p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-xl shadow-sm p-8 text-white">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-semibold">For Users</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Personal cloud storage space</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Organize and manage your files</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Track storage usage and statistics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Quick upload and download</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-600 rounded-xl shadow-sm p-8 text-white">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-semibold">For Admins</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Complete user management system</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Platform-wide analytics and insights</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Role-based access control</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Monitor all files and activity</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        {!user && (
          <div className="mt-20 text-center bg-white rounded-xl border border-slate-200 shadow-sm p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of users who trust Mini Drive with their files
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
