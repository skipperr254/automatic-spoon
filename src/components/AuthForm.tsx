import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

type AuthFormProps = {
  type: "login" | "signup";
  onSuccess?: () => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (type === "login") {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        if (!fullName.trim()) {
          throw new Error("Full name is requied");
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='w-full max-w-md'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          {type === "login" ? "Sign In" : "Create Account"}
        </h2>

        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400'>
            {error}
          </div>
        )}

        {type === "signup" && (
          <div className='mb-4'>
            <label
              htmlFor='fullName'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Full Name
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none'>
                <User size={18} className='text-gray-400' />
              </div>
              <input
                type='text'
                id='fullName'
                value={fullName}
                className='shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='John Doe'
                required
                onChange={(e) => setFullName(e.target.value)}
                autoComplete='off'
              />
            </div>
          </div>
        )}

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Email
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Mail size={18} className='text-gray-400' />
            </div>
            <input
              type='email'
              id='email'
              value={email}
              className='shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='email@example.com'
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
            />
          </div>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            Password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-evenst-none'>
              <Lock size={18} className='text-gray-400' />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              value={password}
              className='shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              placeholder='********'
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 pr-3 flex-items-center cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className='text-gray-400' />
              ) : (
                <Eye size={18} className='text-gray-400' />
              )}
            </button>
          </div>
        </div>

        <div className='flex items-center-justify-between'>
          <button
            type='submit'
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='oopacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                {type === "login" ? "Signing In..." : "Creating Account..."}
              </span>
            ) : (
              <>{type === "login" ? "Sign In" : "Create Account"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
