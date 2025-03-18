import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { api } from "../utils/api";

const CategoryProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading, loadProducts } = useProducts();
  const [category, setCategory] = useState<
    Awaited<ReturnType<typeof api.categories.list>>[0] | null
  >(null);

  useEffect(() => {
    const loadCategory = async () => {
      if (!slug) return;
      const categories = await api.categories.list();
      const category = categories.find((b) => b.slug === slug);
      console.log(category);
      setCategory(category || null);
    };

    loadCategory();
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadProducts({ category: slug });
    }
  }, [loadProducts, slug]);

  if (!category) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Category not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>{category.name}</h1>
        {category.description && (
          <p className='mt-2 text-gray-600'>{category.description}</p>
        )}
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : products.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500'>No products found for this category</p>
          <Link
            to='/products'
            className='text-blue-600 text-2xl hover:text-blue-800 hover:underline'
          >
            Go back to shopping
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
