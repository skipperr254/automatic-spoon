import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20'>
        <div className='relative z-10 text-center md:text-left md:flex md:items-center md:justify-between'>
          <div className='mb-8 md:mb-0 md:mr-8'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Spring Collection 2025
            </h2>
            <p className='text-lg md:text-xl mb-6 text-purple-100'>
              Get up to 50% off on selected items
            </p>
            <Link
              to='/products'
              className='inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-purple-600 transition-colors duration-200'
            >
              Shop Now
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </div>
          <div className='hidden md:block'>
            <img
              src='https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'
              alt='Spring Collection'
              className='rounded-lg shadow-xl'
            />
          </div>
        </div>
      </div>
      <div className='absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50'></div>
    </div>
  );
};

export default Banner;
