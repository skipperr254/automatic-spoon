import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Star,
  ShoppingCart,
  TruckIcon,
  RefreshCcw,
  Shield,
} from "lucide-react";
import { api, Product } from "../utils/api";

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!slug) throw new Error("Product slug is required");
        const data = await api.products.getBySlug(slug);
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load product")
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-96'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900'>Error</h2>
          <p className='mt-2 text-gray-600'>
            {error?.message || "Product not found"}
          </p>
          <Link
            to='/products'
            className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700'
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
        {/* Image gallery */}
        <div className='flex flex-col'>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className='aspect-w-1 aspect-h-1 rounded-lg overflow-hidden'
          >
            {product.images.map((image) => (
              <SwiperSlide key={image.id}>
                <img
                  src={image.url}
                  alt={image.alt || product.name}
                  className='w-full h-full object-center object-cover'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product info */}
        <div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
          {/* Breadcrumbs */}
          <nav className='mb-8'>
            <ol className='flex items-center space-x-2 text-sm text-gray-500'>
              <li>
                <Link to='/products' className='hover:text-gray-900'>
                  Products
                </Link>
              </li>
              <li>&gt;</li>
              {product.category && (
                <>
                  <li>
                    <Link
                      to={`/category/${product.category.slug}`}
                      className='hover:text-gray-900'
                    >
                      {product.category.name}
                    </Link>
                  </li>
                  <li>&gt;</li>
                </>
              )}
              <li className='text-gray-900'>{product.name}</li>
            </ol>
          </nav>

          <div className='mb-8'>
            {product.brand && (
              <Link
                to={`/brand/${product.brand.slug}`}
                className='text-sm text-gray-500 hover:text-gray-900'
              >
                {product.brand.name}
              </Link>
            )}
            <h1 className='text-3xl font-bold text-gray-900 mt-1'>
              {product.name}
            </h1>
          </div>

          {/* Price and rating */}
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center space-x-4'>
              <p className='text-3xl font-bold text-gray-900'>
                ${product.price}
              </p>
              {product.compare_at_price && (
                <p className='text-xl text-gray-500 line-through'>
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

          {/* Description */}
          <div className='prose prose-sm text-gray-500 mb-8'>
            <p>{product.description}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className='mb-8'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center border border-gray-300 rounded-md'>
                <button
                  type='button'
                  className='p-2 text-gray-600 hover:text-gray-700'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type='number'
                  min='1'
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className='w-16 text-center border-0 focus:ring-0'
                />
                <button
                  type='button'
                  className='p-2 text-gray-600 hover:text-gray-700'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                type='button'
                className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2'
              >
                <ShoppingCart className='h-5 w-5' />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className='border-t border-gray-200 pt-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='flex items-center space-x-3'>
                <TruckIcon className='h-8 w-8 text-blue-500' />
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Free Shipping
                  </h3>
                  <p className='text-sm text-gray-500'>On orders over $100</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <RefreshCcw className='h-8 w-8 text-blue-500' />
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Easy Returns
                  </h3>
                  <p className='text-sm text-gray-500'>30-day return policy</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Shield className='h-8 w-8 text-blue-500' />
                <div>
                  <h3 className='text-sm font-medium text-gray-900'>
                    Secure Shopping
                  </h3>
                  <p className='text-sm text-gray-500'>100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
