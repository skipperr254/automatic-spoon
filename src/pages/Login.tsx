import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-4 text-center'>Login</h1>
      <p className='text-center mb-6'>Welcome back!</p>

      {error && (
        <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='email'>
            Email
          </label>
          <input
            type='text'
            id='email'
            className='w-full p-2 border rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='off'
          />
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 mb-2' htmlFor='email'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full p-2 border rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
          />

          <div className='mt-2 text-right'>
            <Link to='/reset-password' className='text-blue-600 text-sm'>
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer'
          disabled={loading}
        >
          {loading ? "Loading" : "Login"}
        </button>
      </form>

      <div className='mt-4 text-center text-sm'>
        Don't have an account?{" "}
        <Link to='/signup' className='text-blue-600'>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
