import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import AdminLayout from "../../components/admin/Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

interface Order {
  id: string;
  customer: string;
  total: number;
  status: string;
  date: Date;
}

interface Stats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  totalProducts: number;
  lowStockProducts: number;
  recentOrders: Order[];
  salesData: SalesData;
}

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    recentOrders: [],
    salesData: {
      labels: [],
      datasets: [],
    },
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // In a real app, you would fetch this data from your API
        // For now, we'll use mock data
        const mockData = {
          totalOrders: 156,
          totalCustomers: 892,
          totalRevenue: 15679.45,
          totalProducts: 234,
          lowStockProducts: 12,
          recentOrders: [
            {
              id: "1",
              customer: "John Doe",
              total: 129.99,
              status: "processing",
              date: new Date(),
            },
            {
              id: "2",
              customer: "Jane Doe",
              total: 1599.99,
              status: "processing",
              date: new Date(),
            },
            // Add more mock orders...
          ],
          salesData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Sales",
                data: [3000, 3500, 4200, 3800, 4800, 5200],
                fill: false,
                borderColor: "rgb(59, 130, 246)",
                tension: 0.1,
              },
            ],
          },
        };

        setStats(mockData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className='flex justify-center items-center h-96'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className='bg-red-50 border-l-4 border-red-400 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <AlertCircle className='h-5 w-5 text-red-400' />
            </div>
            <div className='ml-3'>
              <p className='text-sm text-red-700'>{error}</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className='space-y-6'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 rounded-full bg-blue-100 text-blue-600'>
                <Package className='h-6 w-6' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Total Orders
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {stats.totalOrders}
                </p>
              </div>
            </div>
            <div className='mt-4 flex items-center text-sm'>
              <TrendingUp className='h-4 w-4 text-green-500' />
              <span className='text-green-500 ml-1'>12% increase</span>
              <span className='text-gray-500 ml-2'>from last month</span>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 rounded-full bg-green-100 text-green-600'>
                <Users className='h-6 w-6' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Total Customers
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {stats.totalCustomers}
                </p>
              </div>
            </div>
            <div className='mt-4 flex items-center text-sm'>
              <TrendingUp className='h-4 w-4 text-green-500' />
              <span className='text-green-500 ml-1'>8% increase</span>
              <span className='text-gray-500 ml-2'>from last month</span>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 rounded-full bg-yellow-100 text-yellow-600'>
                <DollarSign className='h-6 w-6' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Total Revenue
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
            <div className='mt-4 flex items-center text-sm'>
              <TrendingDown className='h-4 w-4 text-red-500' />
              <span className='text-red-500 ml-1'>3% decrease</span>
              <span className='text-gray-500 ml-2'>from last month</span>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-center'>
              <div className='p-3 rounded-full bg-purple-100 text-purple-600'>
                <ShoppingBag className='h-6 w-6' />
              </div>
              <div className='ml-4'>
                <p className='text-sm font-medium text-gray-500'>
                  Total Products
                </p>
                <p className='text-2xl font-semibold text-gray-900'>
                  {stats.totalProducts}
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <Link
                to='/admin/products'
                className='text-sm text-blue-600 hover:text-blue-500'
              >
                {stats.lowStockProducts} products low in stock →
              </Link>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Sales Overview
            </h3>
            <Line data={stats.salesData} options={{ responsive: true }} />
          </div>

          <div className='bg-white rounded-lg shadow p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Recent Orders
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Order
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Customer
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Total
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        #{order.id}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {order.customer}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        ${order.total.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {format(order.date, "MMM d, yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
