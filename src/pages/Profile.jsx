import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  LogOut,
  Save,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { totalOrdersCount } = useOrders();
  const { cartCount } = useCart();
  const { success, info } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'admin@shopadmin.com',
    phone: user?.phone || '+91 98765 43210',
    location: user?.location || 'Bengaluru, Karnataka, India',
    company: user?.company || 'ShopAdmin Global Logistics',
    role: user?.role || 'Store Administrator',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    info('Logged out from administrative session.');
    navigate('/login');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="pb-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your administrator account details, security settings, and store access roles.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'}
                alt={user?.name || 'Admin'}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20 shadow-md"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';
                }}
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]" title="Active Status">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">{user?.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {user?.status || 'Active'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
              <p className="text-xs font-semibold text-primary mt-1">{user?.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={isEditing ? 'outline' : 'secondary'}
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Information'}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              icon={LogOut}
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Orders Executed
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalOrdersCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Cart Items
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">{cartCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Admin Access Level
            </span>
            <p className="text-sm font-extrabold text-primary mt-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Full System Access
            </p>
          </div>
        </div>

        {/* Profile Information / Edit Form */}
        <div className="pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">
            Account Specifications
          </h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 max-w-xl">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
              />
              <Input
                label="Company / Branch"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
              />
              <div className="pt-2">
                <Button type="submit" variant="primary" icon={Save}>
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Name</span>
                  <span className="font-semibold text-slate-800">{user?.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Email Address</span>
                  <span className="font-semibold text-slate-800">{user?.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Phone</span>
                  <span className="font-semibold text-slate-800">{user?.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Location</span>
                  <span className="font-semibold text-slate-800">{user?.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Organization</span>
                  <span className="font-semibold text-slate-800">{user?.company}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Member Since</span>
                  <span className="font-semibold text-slate-800">{user?.joinedDate}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
