import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Start closing animation slightly before it's actually removed
    const timer = setTimeout(() => setIsClosing(true), 3700);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // match animation duration
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: <CheckCircle className="text-green-500" size={20} /> };
      case 'error':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: <AlertCircle className="text-red-500" size={20} /> };
      case 'warning':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: <AlertTriangle className="text-yellow-500" size={20} /> };
      case 'info':
      default:
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: <Info className="text-blue-500" size={20} /> };
    }
  };

  const styles = getStyles();

  return (
    <div 
      className={`flex items-center gap-3 p-4 min-w-[300px] max-w-sm rounded-lg border shadow-lg transition-all duration-300 ease-in-out transform 
      ${isClosing ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      ${styles.bg} ${styles.border}`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {styles.icon}
      </div>
      <div className={`flex-1 text-sm font-medium ${styles.text}`}>
        {message}
      </div>
      <button 
        onClick={handleClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
      >
        <X size={16} />
      </button>
    </div>
  );
};
