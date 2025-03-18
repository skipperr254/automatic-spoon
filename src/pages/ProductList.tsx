import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { api } from "../utils/api";
import ProductCard from "../components/ProductCard";
import { Filter, Search } from "lucide-react";

const ProductList: React.FC = () => {
  const { products, loading, loadProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<
    Awaited<ReturnType<typeof api.categories.list>>
  >([]);
  const [brands, setBrands] = useState<
    Awaited<ReturnType<typeof api.brands.list>>
  >([]);

  const category = searchParams.get("category") || undefined;
  const brand = searchParams.get("brand") || undefined;
  const search = searchParams.get("q") || undefined;

  useEffect(() => {
    const loadFilters = async () => {
      const [categoriesData, brandsData] = await Promise.all([
        api.categories.list(),
        api.brands.list(),
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
    };

    loadFilters();
  }, []);

  useEffect(() => {
    loadProducts({ category, brand, search });
  }, [loadProducts, category, brand, search]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    if (search) {
      searchParams.set("q", search);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams);
  };

  const handleFilter = (type: "category" | "brand", value: string | null) => {
    if (value) {
      searchParams.set(type, value);
    } else {
      searchParams.delete(type);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20'>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Filters */}
        <div className='w-full md:w-64 flex-shrink-0'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-lg font-semibold mb-4 flex items-center'>
              <Filter className='h-5 w-5 mr-2' />
              Filters
            </h2>

            {/* Categories */}
            <div className='mb-6'>
              <h3 className='font-medium mb-2'>Categories</h3>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='all-categories'
                    name='category'
                    checked={!category}
                    onChange={() => handleFilter("category", null)}
                    className='h-4 w-4 text-blue-600'
                  />
                  <label
                    htmlFor='all-categories'
                    className='ml-2 text-sm text-gray-700'
                  >
                    All Categories
                  </label>
                </div>
                {categories.map((cat) => (
                  <div key={cat.id} className='flex items-center'>
                    <input
                      type='radio'
                      id={cat.slug}
                      name='category'
                      checked={category === cat.slug}
                      onChange={() => handleFilter("category", cat.slug)}
                      className='h-4 w-4 text-blue-600'
                    />
                    <label
                      htmlFor={cat.slug}
                      className='ml-2 text-sm text-gray-700'
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className='font-medium mb-2'>Brands</h3>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <input
                    type='radio'
                    id='all-brands'
                    name='brand'
                    checked={!brand}
                    onChange={() => handleFilter("brand", null)}
                    className='h-4 w-4 text-blue-600'
                  />
                  <label
                    htmlFor='all-brands'
                    className='ml-2 text-sm text-gray-700'
                  >
                    All Brands
                  </label>
                </div>
                {brands.map((b) => (
                  <div key={b.id} className='flex items-center'>
                    <input
                      type='radio'
                      id={b.slug}
                      name='brand'
                      checked={brand === b.slug}
                      onChange={() => handleFilter("brand", b.slug)}
                      className='h-4 w-4 text-blue-600'
                    />
                    <label
                      htmlFor={b.slug}
                      className='ml-2 text-sm text-gray-700'
                    >
                      {b.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className='flex-1'>
          {/* Search */}
          <div className='mb-6'>
            <form onSubmit={handleSearch} className='flex gap-2'>
              <div className='relative flex-1'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Search className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  type='search'
                  name='search'
                  defaultValue={search}
                  placeholder='Search products...'
                  className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  autoComplete='off'
                />
              </div>
              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : products.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-500'>No products found</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
