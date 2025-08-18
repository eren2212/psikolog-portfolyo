"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

// Toast tipi
type ToastType = "success" | "error" | "warning" | "info";

// Toast interface
interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// Toast Context
interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: Toast = {
        ...toast,
        id,
        duration: toast.duration || 5000,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (title: string, message?: string) => {
      showToast({ type: "success", title, message });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message?: string) => {
      showToast({ type: "error", title, message });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string) => {
      showToast({ type: "warning", title, message });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string) => {
      showToast({ type: "info", title, message });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container
const ToastContainer: React.FC<{
  toasts: Toast[];
  removeToast: (id: string) => void;
}> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Toast Item
const ToastItem: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
}> = ({ toast, onRemove }) => {
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-200",
          icon: <FaCheckCircle className="text-green-500" />,
          titleColor: "text-green-800",
          messageColor: "text-green-600",
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          icon: <FaExclamationTriangle className="text-red-500" />,
          titleColor: "text-red-800",
          messageColor: "text-red-600",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          icon: <FaExclamationTriangle className="text-yellow-500" />,
          titleColor: "text-yellow-800",
          messageColor: "text-yellow-600",
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-200",
          icon: <FaInfoCircle className="text-blue-500" />,
          titleColor: "text-blue-800",
          messageColor: "text-blue-600",
        };
      default:
        return {
          bg: "bg-gray-50 border-gray-200",
          icon: <FaInfoCircle className="text-gray-500" />,
          titleColor: "text-gray-800",
          messageColor: "text-gray-600",
        };
    }
  };

  const styles = getToastStyles(toast.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${styles.bg} border rounded-xl shadow-lg p-4 max-w-sm w-full backdrop-blur-sm`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          <h4 className={`font-semibold text-sm ${styles.titleColor}`}>
            {toast.title}
          </h4>
          {toast.message && (
            <p className={`text-sm mt-1 ${styles.messageColor}`}>
              {toast.message}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
