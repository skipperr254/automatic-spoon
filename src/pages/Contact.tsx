import React, { useState } from "react";
import Footer from "../components/Footer";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Simulating API call for form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" }); // Clear form after submission
    } catch (err) {
      setError("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900'>Contact Us</h1>
          <p className='mt-4 text-lg text-gray-600'>
            We'd love to hear from you! Whether you have questions, feedback, or
            need assistance, reach out to us and we'll get back to you as soon
            as possible.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className='mt-12 lg:items-start max-w-xl mx-auto'>
          <div className='mb-8 lg:mb-0 shadow-md p-10 rounded-xl'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {success && (
                <div className='text-green-600 font-medium'>
                  Your message has been sent successfully!
                </div>
              )}
              {error && <div className='text-red-600 font-medium'>{error}</div>}

              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Your Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Your Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700'
                >
                  Your Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div className='mt-6'>
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 disabled:opacity-50 cursor-pointer'
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
