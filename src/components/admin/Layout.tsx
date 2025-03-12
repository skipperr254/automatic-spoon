import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Tags,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Sidebar for mobile */}
      <div className='lg:hidden'>
        <div className='fixed inset-0 flex z-40'>
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className='absolute top-0 right-0 -mr-12 pt-2'>
              <button
                className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className='h-6 w-6 text-white' />
              </button>
            </div>

            <div className='flex-1 h-0 pt-5 pb-4 overflow-y-auto'>
              <div className='flex-shrink-0 flex items-center px-4'>
                <span className='text-xl font-bold text-gray-900'>
                  Admin Panel
                </span>
              </div>
              <nav className='mt-5 px-2 space-y-1'>
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                        isActive
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon
                        className={`mr-4 h-6 w-6 ${
                          isActive
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className='hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0'>
        <div className='flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white'>
          <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <span className='text-xl font-bold text-gray-900'>
                Admin Panel
              </span>
            </div>
            <nav className='mt-5 flex-1 px-2 space-y-1'>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${
                        isActive
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='lg:pl-64 flex flex-col flex-1'>
        <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
          <button
            type='button'
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden'
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className='h-6 w-6' />
          </button>

          <div className='flex-1 px-4 flex justify-between'>
            <div className='flex-1 flex'>
              {/* Add search or other controls here */}
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              <div className='relative'>
                <button
                  type='button'
                  className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <span className='sr-only'>Open user menu</span>
                  <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-sm font-medium text-gray-600'>
                      {user?.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <span className='hidden md:flex md:items-center'>
                    <span className='ml-3 text-sm font-medium text-gray-700'>
                      {user?.email}
                    </span>
                    <ChevronDown className='ml-2 h-4 w-4 text-gray-400' />
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'>
                    <button
                      onClick={handleSignOut}
                      className='w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      <LogOut className='mr-3 h-4 w-4 text-gray-400' />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className='flex-1'>
          <div className='py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
