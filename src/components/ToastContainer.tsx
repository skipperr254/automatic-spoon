import React, { useEffect } from "react";
import { useToast } from "../hooks/useToast";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const timeoutIds = toasts.map(
      (toast) =>
        setTimeout(() => {
          removeToast(toast.id);
        }, 5000) // Auto-remove toast after 5 seconds
    );

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  return (
    <div className='fixed bottom-5 right-5 space-y-2 z-50'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type} p-4 rounded-md shadow-lg text-white`}
        >
          <div className='flex justify-between'>
            <span>{toast.message}</span>
            <button
              className='ml-2 text-xl'
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
