import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "../utils/api";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.images[0]?.url || "https://via.placeholder.com/400";

  return (
    <div className='group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
      <Link to={`/product/${product.slug}`} className='block'>
        <div className='aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden'>
          <img
            src={mainImage}
            alt={product.name}
            className='w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300'
          />
        </div>
        <div className='p-4'>
          {product.brand && (
            <p className='text-sm text-gray-500 mb-1'>{product.brand.name}</p>
          )}
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            {product.name}
          </h3>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <p className='text-xl font-bold text-gray-900'>
                ${product.price}
              </p>
              {product.compare_at_price && (
                <p className='text-sm text-gray-500 line-through'>
                  ${product.compare_at_price}
                </p>
              )}
            </div>
            <div className='flex items-center'>
              <Star className='h-5 w-5 text-yellow-400 fill-current' />
              <span className='ml-1 text-sm text-gray-600'>
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <button
        className='absolute bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200'
        onClick={(e) => {
          e.preventDefault();
          // Add to cart functionality will be implemented later
        }}
      >
        <ShoppingCart className='h-5 w-5' />
      </button>
    </div>
  );
};

export default ProductCard;
