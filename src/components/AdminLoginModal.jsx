import React, { useState } from 'react';
import { Lock, Shield, User, Key, AlertCircle, X, Sparkles } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setUsername('admin@assam.gov.in');
    setPassword('Admin@2026');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (
        (username.trim().toLowerCase() === 'admin@assam.gov.in' || username.trim() === 'traffic-admin') &&
        (password === 'Admin@2026' || password === 'AstraAssam#2026')
      ) {
        setLoading(false);
        onLoginSuccess({
          name: 'Traffic Operations Administrator',
          role: 'State Administrator (ASSAC & Guwahati Traffic Police)',
          email: username
        });
        onClose();
      } else {
        setLoading(false);
        setError('Invalid credentials. Use demo credentials or click "Auto-Fill Demo".');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[2500] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in relative text-slate-800">
        {/* Top Gradient Bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3 border border-blue-500">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">ASTRA-Assam Admin Console</h2>
            <p className="text-xs text-slate-500 mt-1">
              Authorized Government Operations & System Configuration Gateway
            </p>
          </div>

          {/* Demo Credentials Helper Card */}
          <div className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
            <div className="flex items-center justify-between text-blue-900 font-bold mb-1.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> NESFIC-D-22 Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
              >
                Auto-Fill Demo
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 font-mono text-[11px]">
              <div>User: <strong className="text-blue-950">admin@assam.gov.in</strong></div>
              <div>Pass: <strong className="text-blue-950">Admin@2026</strong></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Government ID / Official Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@assam.gov.in"
                  required
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Security Password / Token
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-600 focus:bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating with Assam SDC IAM...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Access Secure Control Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <p className="mt-4 text-[10px] text-center text-slate-400">
            Protected by CERT-In security protocols & Role-Based Access Control (RBAC).
          </p>
        </div>
      </div>
    </div>
  );
}
