import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import AdminLayout from "../../components/admin/Layout";
import { User, Mail, Calendar, XCircle } from "lucide-react";

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCustomers(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load customers"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  return (
    <AdminLayout>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>Customers</h1>
        </div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
          <div className='py-4'>
            {loading ? (
              <div className='flex justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
              </div>
            ) : error ? (
              <div className='bg-red-50 border-l-4 border-red-400 p-4'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <XCircle className='h-5 w-5 text-red-400' />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm text-red-700'>{error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Customer
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Email
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Joined
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {customers.map((customer) => (
                            <tr key={customer.id}>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                  <div className='flex-shrink-0 h-10 w-10'>
                                    {customer.avatar_url ? (
                                      <img
                                        className='h-10 w-10 rounded-full'
                                        src={customer.avatar_url}
                                        alt=''
                                      />
                                    ) : (
                                      <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                                        <User className='h-6 w-6 text-gray-400' />
                                      </div>
                                    )}
                                  </div>
                                  <div className='ml-4'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      {customer.full_name || "No name provided"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center text-sm text-gray-500'>
                                  <Mail className='h-4 w-4 mr-2' />
                                  {customer.email}
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center text-sm text-gray-500'>
                                  <Calendar className='h-4 w-4 mr-2' />
                                  {new Date(
                                    customer.created_at
                                  ).toLocaleDateString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
