import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, Product } from "../../utils/api";
import { Plus, Minus, Upload } from "lucide-react";
import AdminLayout from "../../components/admin/Layout";
import { PostgrestError } from "@supabase/supabase-js";

type Image = {
  url: string;
  alt: string;
};

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<Image[]>([{ url: "", alt: "" }]);
  const [categories, setCategories] = useState<
    Awaited<ReturnType<typeof api.categories.list>>
  >([]);
  const [brands, setBrands] = useState<
    Awaited<ReturnType<typeof api.brands.list>>
  >([]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    compareAtPrice: "",
    categoryId: "",
    brandId: "",
    stock: "0",
    featured: false,
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!slug) throw new Error("Product slug is required");
        const data = await api.products.getBySlug(slug);
        setProduct(data);

        const productFormData = {
          name: data.name,
          slug: data.slug,
          description: data.description || "",
          price: data.price.toString(),
          compareAtPrice: data.compare_at_price?.toString() || "",
          categoryId: data?.category_id || "",
          brandId: data?.brand_id || "",
          stock: data.stock?.toString() || "",
          featured: data.featured || false,
        };

        const fetchedImages = data.images;
        const newFetchedImages = fetchedImages.map((image) => ({
          url: image.url,
          alt: image?.alt || "",
        }));

        setImages([...newFetchedImages, ...images]);

        setFormData(productFormData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          api.categories.list(),
          api.brands.list(),
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const validImages = images.filter((img) => img.url.trim());
      if (validImages.length === 0) {
        throw new Error("At least one image is required");
      }

      await api.products.update(product!.id, {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        price: parseFloat(formData.price),
        compare_at_price: formData.compareAtPrice
          ? parseFloat(formData.compareAtPrice)
          : undefined,
        category_id: formData.categoryId || undefined,
        brand_id: formData.brandId || undefined,
        stock: parseInt(formData.stock),
        featured: formData.featured,
        images: validImages,
      });

      navigate("/admin/products");
    } catch (err) {
      setError(
        err instanceof Error || err instanceof PostgrestError
          ? err.message
          : "Failed to update product"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (
    index: number,
    field: keyof Image,
    value: string
  ) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    setImages(newImages);
  };

  const addImage = () => {
    setImages([...images, { url: "", alt: "" }]);
  };

  const removeImage = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  return (
    <AdminLayout>
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>
              Edit "{product?.name}"
            </h1>

            {error && (
              <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className='space-y-6 bg-white shadow rounded-lg p-6'
            >
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  type='text'
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-600 focus:border-blue-500 sm:text-sm p-2'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Slug (optional)
                </label>
                <input
                  type='text'
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                  placeholder='auto-generated-if-empty'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Price
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type='number'
                      required
                      min='0'
                      step='0.01'
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className='block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Compare at price
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type='number'
                      min='0'
                      step='0.01'
                      value={formData.compareAtPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          compareAtPrice: e.target.value,
                        })
                      }
                      className='block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                    />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                  >
                    <option value=''>Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Brand
                  </label>
                  <select
                    value={formData.brandId}
                    onChange={(e) =>
                      setFormData({ ...formData, brandId: e.target.value })
                    }
                    className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                  >
                    <option value=''>Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Stock
                </label>
                <input
                  type='number'
                  required
                  min='0'
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                />
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='featured'
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='featured'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Featured product
                </label>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-4'>
                  Images
                </label>
                {images.map((image, index) => (
                  <div key={index} className='flex items-center space-x-4 mb-4'>
                    <div className='flex-grow'>
                      <input
                        type='url'
                        placeholder='Image URL'
                        value={image.url}
                        onChange={(e) =>
                          handleImageChange(index, "url", e.target.value)
                        }
                        className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                      />
                      <input
                        type='text'
                        placeholder='Alt text'
                        value={image.alt}
                        onChange={(e) =>
                          handleImageChange(index, "alt", e.target.value)
                        }
                        className='mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2'
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => removeImage(index)}
                      className='p-2 text-gray-400 hover:text-gray-500 cursor-pointer'
                    >
                      <Minus className='h-5 w-5' />
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={addImage}
                  className='mt-2 flex items-center text-sm text-blue-600 hover:text-blue-500'
                >
                  <Plus className='h-4 w-4 mr-1' />
                  Add another image
                </button>
              </div>

              <div className='flex justify-end space-x-4'>
                <button
                  type='button'
                  onClick={() => navigate("/admin/products")}
                  className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer'
                >
                  {loading ? (
                    <>
                      <svg
                        className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Upload className='h-4 w-4 mr-1' />
                      Edit Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
