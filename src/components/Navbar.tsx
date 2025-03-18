import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isAdmin = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/"
          ? "bg-white shadow"
          : "bg-transparent"
      }`}
    >
      <div className='w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <Link to='/' className='flex-shrink-0 flex items-center'>
              <span
                className={`text-xl font-bold ${
                  isScrolled || location.pathname !== "/"
                    ? "text-gray-900"
                    : "text-white"
                }`}
              >
                Shopee
              </span>
            </Link>
            <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
              <Link
                to='/products'
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isScrolled || location.pathname !== "/"
                    ? "text-gray-900 hover:text-gray-700"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Products
              </Link>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4'>
              {user ? (
                <>
                  <Link
                    to='/cart'
                    className={`relative p-2 rounded-full ${
                      isScrolled || location.pathname !== "/"
                        ? "text-gray-900 hover:text-gray-700"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    <ShoppingCart className='h-6 w-6' />
                    {itemCount > 0 && (
                      <span className='absolute top-0 right-0 -mt-1 -mr-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                        {itemCount}
                      </span>
                    )}
                  </Link>
                  <div className='relative'>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className={`flex items-center space-x-2 cursor-pointer ${
                        isScrolled || location.pathname !== "/"
                          ? "text-gray-900 hover:text-gray-700"
                          : "text-white hover:text-gray-200"
                      }`}
                    >
                      <User className='h-6 w-6' />
                      <ChevronDown className='h-4 w-4' />
                    </button>
                    {userMenuOpen && (
                      <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                        <div className='py-1'>
                          <Link
                            to='/profile'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                          <Link
                            to='/orders'
                            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Orders
                          </Link>
                          {isAdmin && (
                            <Link
                              to='/admin'
                              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                              onClick={() => setUserMenuOpen(false)}
                            >
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={handleSignOut}
                            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className={`text-sm font-medium ${
                      isScrolled || location.pathname !== "/"
                        ? "text-gray-900 hover:text-gray-700"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to='/signup'
                    className='text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className='sm:hidden ml-4'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled || location.pathname !== "/"
                    ? "text-gray-900 hover:text-gray-700"
                    : "text-white hover:text-gray-200"
                }`}
              >
                <span className='sr-only'>Open main menu</span>
                {isOpen ? (
                  <X className='block h-6 w-6 cursor-pointer' />
                ) : (
                  <Menu className='block h-6 w-6 cursor-pointer' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='sm:hidden bg-white'>
          <div className='pt-2 pb-3 space-y-1'>
            <Link
              to='/products'
              className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to='/categories'
              className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              to='/brands'
              className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
              onClick={() => setIsOpen(false)}
            >
              Brands
            </Link>
            {user ? (
              <>
                <Link
                  to='/profile'
                  className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to='/orders'
                  className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
                  onClick={() => setIsOpen(false)}
                >
                  Orderssss
                </Link>
                {user.app_metadata?.role === "admin" && (
                  <Link
                    to='/admin/products'
                    className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className='block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to='/signup'
                  className='block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50'
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
