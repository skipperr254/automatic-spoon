import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/' className='text-xl font-bold text-blue-600'>
                Authenticator
              </Link>
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
              <Link
                to='/'
                className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
              >
                Home
              </Link>
              {user && (
                <Link
                  to='/dashboard'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Dashboard
                </Link>
              )}
              {user && (
                <Link
                  to='/profile'
                  className='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                >
                  Profile
                </Link>
              )}
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:flex sm:items-center'>
            {user ? (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/profile'
                  className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                >
                  <User size={20} className='mr-1' />
                  {user.user_metadata.username ||
                    user.user_metadata.full_name ||
                    user.email}
                </Link>
                <button
                  onClick={handleSignOut}
                  className='flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer'
                >
                  <LogOut size={16} className='mr-1' />
                  Sign out
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900'
                >
                  Sign in
                </Link>
                <Link
                  to='/signup'
                  className='px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
