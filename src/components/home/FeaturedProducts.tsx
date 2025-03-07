import { ShoppingCart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: 89.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400",
    brand: "Nike",
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    price: 129.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400",
    brand: "Michael Kors",
  },
  {
    id: 3,
    name: "Slim Fit Denim Jacket",
    price: 79.99,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=400",
    brand: "Levi's",
  },
  {
    id: 4,
    name: "Summer Floral Dress",
    price: 59.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400",
    brand: "Zara",
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className='py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Featured Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div
              key={product.id}
              className='group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
            >
              <Link to={`/product/${product.id}`} className='block'>
                <div className='aspect-square rounded-t-lg overflow-hidden'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div className='p-4'>
                  <p className='text-sm text-gray-500 mb-1'>{product.brand}</p>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    {product.name}
                  </h3>
                  <div className='flex items-center justify-between'>
                    <p className='text-xl font-bold text-gray-900'>
                      ${product.price}
                    </p>
                    <div className='flex items-center'>
                      <Star className='h-5 w-5 text-yellow-400 fill-current' />
                      <span className='ml-1 text-sm text-gray-600'>
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <button className='p-2 absolute bottom-16 right-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer'>
                <ShoppingCart className='h-5 w-5' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
