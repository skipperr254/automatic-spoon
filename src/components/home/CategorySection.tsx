import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400",
    link: "/category/women",
  },
  {
    id: 2,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=400",
    link: "/category/men",
  },
  {
    id: 3,
    name: "Kids",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400",
    link: "/category/kids",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400",
    link: "/category/accessories",
  },
];

const CategorySection: React.FC = () => {
  return (
    <div className='py-12 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-8'>
          Shop by Category
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'
            >
              <div className='aspect-square'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
              </div>
              <div className='absolute bottom-4 left-4'>
                <h3 className='text-xl font-semibold text-white'>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
