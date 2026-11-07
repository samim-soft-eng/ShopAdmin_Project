import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, LayoutDashboard, Package } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 text-center shadow-card">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-5">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-700 tracking-wider">
          ERROR 404
        </span>

        <h1 className="text-2xl font-black text-slate-900 mt-4 mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          The page or resource you requested does not exist or has been relocated within the ShopAdmin platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="md"
            icon={LayoutDashboard}
            onClick={() => navigate('/dashboard')}
            className="flex-1"
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={Package}
            onClick={() => navigate('/products')}
            className="flex-1"
          >
            Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
