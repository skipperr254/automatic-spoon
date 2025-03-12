import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { api } from "../utils/api";

const BrandProducts: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading, loadProducts } = useProducts();
  const [brand, setBrand] = useState<
    Awaited<ReturnType<typeof api.brands.list>>[0] | null
  >(null);

  useEffect(() => {
    const loadBrand = async () => {
      if (!slug) return;
      const brands = await api.brands.list();
      const brand = brands.find((b) => b.slug === slug);
      setBrand(brand || null);
    };

    loadBrand();
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadProducts({ brand: slug });
    }
  }, [loadProducts, slug]);

  if (!brand) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900'>Brand not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900'>{brand.name}</h1>
        {brand.description && (
          <p className='mt-2 text-gray-600'>{brand.description}</p>
        )}
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      ) : products.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-gray-500'>No products found for this brand</p>
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

export default BrandProducts;
