import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Signup: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.path || "/";

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate]);

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Create a new account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{" "}
          <Link
            to='/login'
            className='font-medium text-blue-600 hover:text-blue-500'
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <AuthForm onSuccess={() => navigate("/login")} type='signup' />
      </div>
    </div>
  );
};

export default Signup;
