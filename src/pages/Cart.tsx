import { useEffect, useState } from "react";
import { api, CartItem } from "../utils/api";
import { Trash, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await api.cart.getItems();
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    await api.cart.updateQuantity(itemId, quantity);
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeItem = async (itemId: string) => {
    await api.cart.removeItem(itemId);
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className='max-w-4xl mx-auto pt-20 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <>
          <h3 className='text-xl'>Your cart is empty.</h3>
          <Link to='/products' className='text-blue-800'>
            Continue Shopping
          </Link>
        </>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between p-4 border-b'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={item.product.images[0]?.url || "placeholder.jpg"}
                  alt={item.product.name}
                  className='w-16 h-16 object-cover rounded'
                />
                <div>
                  <h2 className='text-lg font-semibold'>{item.product.name}</h2>
                  <p className='text-gray-600'>
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className='p-2 bg-gray-200 rounded cursor-pointer'
                >
                  <Minus size={16} />
                </button>
                <span className='w-8 text-center'>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className='p-2 bg-gray-200 rounded cursor-pointer'
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className='p-2 text-red-600 cursor-pointer'
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
          <div className='flex justify-between items-center mt-4 p-4 bg-gray-100 rounded'>
            <p className='text-lg font-semibold'>
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button className='px-4 py-2 bg-blue-600 text-white rounded cursor-pointer'>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
