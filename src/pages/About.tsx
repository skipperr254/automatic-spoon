import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const AboutUs: React.FC = () => {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900'>About Us</h1>
          <p className='mt-4 text-lg text-gray-600'>
            Welcome to Shopee! We are passionate about offering high-quality
            products and providing exceptional customer service.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className='mt-16'>
          <h2 className='text-2xl font-bold text-gray-900 text-center'>
            Our Mission
          </h2>
          <p className='mt-4 text-gray-600 text-lg max-w-2xl mx-auto text-center'>
            Our mission is to make shopping for top-quality products online
            easy, convenient, and enjoyable. We strive to offer an expansive
            selection of products, from fashion to electronics, all at
            affordable prices. Our goal is to ensure that our customers have a
            seamless shopping experience from browsing to delivery.
          </p>
        </div>

        {/* Our Story Section */}
        <div className='mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center'>
          <div className='text-center lg:text-left'>
            <h2 className='text-2xl font-bold text-gray-900'>Our Story</h2>
            <p className='mt-4 text-gray-600 text-lg'>
              We started our journey with a simple idea: to provide people with
              high-quality products and an exceptional online shopping
              experience. Over the years, we have grown, but our commitment to
              quality and customer satisfaction remains unchanged. Whether
              you’re searching for the latest trends or everyday essentials, we
              are here to meet your needs.
            </p>
          </div>
          <div className='mt-8 lg:mt-0'>
            <img
              src='https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg' // Replace with your company image
              alt='Our Story'
              className='rounded-lg shadow-xl'
            />
          </div>
        </div>

        {/* Our Values Section */}
        <div className='mt-16'>
          <h2 className='text-2xl font-bold text-gray-900 text-center'>
            Our Values
          </h2>
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            <div className='flex items-center space-x-4 shadow-md p-4 rounded-lg'>
              <div className='h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full'>
                {/* Icon for Quality */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 5v14m7-7H5'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>Quality</h3>
                <p className='text-gray-500'>
                  We ensure that all of our products meet high standards of
                  quality.
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-4 shadow-md p-4 rounded-lg'>
              <div className='h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full'>
                {/* Icon for Customer Service */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 8h10M7 12h10M7 16h10'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  Customer Service
                </h3>
                <p className='text-gray-500'>
                  Our dedicated team is here to assist with any questions or
                  concerns.
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-4 shadow-md p-4 rounded-lg'>
              <div className='h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full'>
                {/* Icon for Innovation */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 7V3L4 12l9 9V13h4V7h-4z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  Innovation
                </h3>
                <p className='text-gray-500'>
                  We embrace new technologies and ideas to improve the shopping
                  experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className='mt-16 text-center'>
          <h2 className='text-2xl font-bold text-gray-900'>Get in Touch</h2>
          <p className='mt-4 text-gray-600 text-lg'>
            Have questions? Reach out to us anytime! We're here to help.
          </p>
          <Link
            to='/contact'
            className='mt-6 inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
          >
            Contact Us
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
