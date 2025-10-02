import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings, FileText } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setShowDropdown(false);
  };

  const isAdmin = user?.role === 'admin';
  const isOnAdminDashboard = location.pathname === '/admin/dashboard';
  const isOnUserDashboard = location.pathname === '/dashboard';

  // Get user initials
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-slate-800">Mini Drive</span>
            </Link>
          </div>

          {/* Right side - User menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Dashboard Toggle for Admin */}
              {isAdmin && (isOnAdminDashboard || isOnUserDashboard) && (
                <Link
                  to={isOnAdminDashboard ? '/dashboard' : '/admin/dashboard'}
                  className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  {isOnAdminDashboard ? (
                    <>
                      <FileText className="h-4 w-4" />
                      <span>My Files</span>
                    </>
                  ) : (
                    <>
                      <Settings className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </>
                  )}
                </Link>
              )}

              {/* User Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  {/* User Avatar */}
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {getInitials(user.name)}
                      </span>
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-medium text-slate-700">{user.name}</p>
                      {isAdmin && (
                        <p className="text-xs text-slate-500">Admin</p>
                      )}
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-700">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link
                      to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
