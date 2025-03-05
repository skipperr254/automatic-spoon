import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const from = location?.state?.from?.pathname || "/";

  // redirect if already logged in
  useEffect(() => {
    if (user) navigate(from);
  }, [user, navigate]);

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
        Sign in to your account
      </h2>
      <p className='mt-2 text-center text-sm text-gray-600'>
        Or{" "}
        <Link
          to='/signup'
          className='font-medium text-blue-600 hover:text-blue-500'
        >
          create a new account
        </Link>
      </p>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <AuthForm type='login' onSuccess={() => navigate("/dashboard")} />
      </div>
    </div>
  );
};

export default Login;
