import React from "react";
import { Link } from "react-router-dom";

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300",
    link: "/brand/nike",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=300",
    link: "/brand/adidas",
  },
  {
    id: 3,
    name: "Zara",
    logo: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=300",
    link: "/brand/zara",
  },
  {
    id: 4,
    name: "H&M",
    logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=300",
    link: "/brand/hm",
  },
  {
    id: 5,
    name: "Gucci",
    logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=300",
    link: "/brand/gucci",
  },
  {
    id: 6,
    name: "Puma",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=300",
    link: "/brand/puma",
  },
];

const BrandSection: React.FC = () => {
  return (
    <div className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Official Stores
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={brand.link}
              className='group relative bg-gray-50 overflow-hidden rounded-lg p-4 hover:shadow-md transition-shadow duration-200'
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className='h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200'
              />
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-800 to-transparent text-white text-center py-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                {brand.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
