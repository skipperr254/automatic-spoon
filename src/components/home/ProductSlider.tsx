import { ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const products = [
  {
    id: 1,
    name: "Limited Edition Watch",
    description: "Elegant timepiece with premium leather strap",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Designer Sunglasses",
    description: "Protect your eyes in style",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Premium Headphones",
    description: "Immersive sound experience",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
  },
];

const ProductSlider: React.FC = () => {
  return (
    <div className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Product of the Week
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className='rounded-lg overflow-hidden'
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className='relative h-[400px] bg-white'>
                <div className='absolute inset-0'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center'>
                  <div className='text-white p-8 max-w-lg'>
                    <h3 className='text-3xl font-bold mb-4'>{product.name}</h3>
                    <p className='text-lg mb-6'>{product.description}</p>
                    <p className='text-2xl font-bold mb-6'>${product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className='inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-200'
                    >
                      <ShoppingBag className='mr-2 h-5 w-5' />
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
