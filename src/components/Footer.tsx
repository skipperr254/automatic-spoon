import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  RefreshCw,
  Shield,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Features */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-gray-800'>
          <div className='flex flex-col items-center text-center'>
            <Truck className='h-8 w-8 mb-4 text-blue-500' />
            <h3 className='font-semibold mb-2'>Free Shipping</h3>
            <p className='text-sm text-gray-400'>On orders over $100</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <RefreshCw className='h-8 w-8 mb-4 text-blue-500' />
            <h3 className='font-semibold mb-2'>Easy Returns</h3>
            <p className='text-sm text-gray-400'>30-day return policy</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <Shield className='h-8 w-8 mb-4 text-blue-500' />
            <h3 className='font-semibold mb-2'>Secure Shopping</h3>
            <p className='text-sm text-gray-400'>100% secure checkout</p>
          </div>
          <div className='flex flex-col items-center text-center'>
            <CreditCard className='h-8 w-8 mb-4 text-blue-500' />
            <h3 className='font-semibold mb-2'>Multiple Payment Options</h3>
            <p className='text-sm text-gray-400'>All major cards accepted</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className='py-12 grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>About Us</h3>
            <p className='text-sm text-gray-400 mb-4'>
              We're dedicated to providing the best shopping experience with
              quality products and exceptional service.
            </p>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-400 hover:text-white'>
                <Facebook className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <Twitter className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <Instagram className='h-5 w-5' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white'>
                <Youtube className='h-5 w-5' />
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link to='/about' className='text-gray-400 hover:text-white'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-400 hover:text-white'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to='/terms' className='text-gray-400 hover:text-white'>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='text-gray-400 hover:text-white'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/faq' className='text-gray-400 hover:text-white'>
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Customer Service</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/track-order'
                  className='text-gray-400 hover:text-white'
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link to='/shipping' className='text-gray-400 hover:text-white'>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to='/returns' className='text-gray-400 hover:text-white'>
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to='/size-guide'
                  className='text-gray-400 hover:text-white'
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to='/gift-cards'
                  className='text-gray-400 hover:text-white'
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Info</h3>
            <ul className='space-y-4'>
              <li className='flex items-start'>
                <MapPin className='h-5 w-5 mr-2 text-gray-400' />
                <span className='text-gray-400'>
                  123 Fashion Street
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className='flex items-center'>
                <Phone className='h-5 w-5 mr-2 text-gray-400' />
                <a
                  href='tel:+1234567890'
                  className='text-gray-400 hover:text-white'
                >
                  (123) 456-7890
                </a>
              </li>
              <li className='flex items-center'>
                <Mail className='h-5 w-5 mr-2 text-gray-400' />
                <a
                  href='mailto:info@example.com'
                  className='text-gray-400 hover:text-white'
                >
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='py-6 border-t border-gray-800 text-center text-sm text-gray-400'>
          <p>© 2025 Your E-commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
