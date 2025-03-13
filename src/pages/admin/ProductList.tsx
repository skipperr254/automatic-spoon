import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, Product } from "../../utils/api";
import AdminLayout from "../../components/admin/Layout";
import { Edit, Trash2, Plus } from "lucide-react";

const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.products.list();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.products.delete(id);
      await loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  // if (loading) {
  //   return;
  // }

  return loading ? (
    <AdminLayout>
      <div className='min-h-screen bg-gray-50 pt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  ) : (
    <AdminLayout>
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Products</h1>
            <Link
              to='/admin/products/new'
              className='flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'
            >
              <Plus className='h-4 w-4 mr-1' />
              Add Product
            </Link>
          </div>

          {error && (
            <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
              {error}
            </div>
          )}

          <div className='bg-white shadow overflow-hidden sm:rounded-md'>
            <ul className='divide-y divide-gray-200'>
              {products.map((product) => (
                <li key={product.id}>
                  <div className='px-4 py-4 flex items-center sm:px-6'>
                    <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-12 w-12'>
                          <img
                            className='h-12 w-12 rounded-md object-cover'
                            src={product.images[0]?.url}
                            alt={product.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <h3 className='text-lg font-medium text-gray-900'>
                            {product.name}
                          </h3>
                          <div className='mt-1 flex items-center'>
                            <p className='text-sm text-gray-500'>
                              ${product.price.toFixed(2)}
                            </p>
                            {product.compare_at_price && (
                              <p className='ml-2 text-sm text-gray-500 line-through'>
                                ${product.compare_at_price.toFixed(2)}
                              </p>
                            )}
                            {product.featured && (
                              <span className='ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 sm:mt-0'>
                        <div className='flex items-center space-x-4'>
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            className='text-gray-400 hover:text-gray-500'
                          >
                            <Edit className='h-5 w-5' />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className='text-red-400 hover:text-red-500'
                          >
                            <Trash2 className='h-5 w-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminProductList;
