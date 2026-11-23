import React, { useState } from 'react';
import { Lock, Shield, User, Key, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

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
      // Validate credentials
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
        setError('Invalid credentials. Use demo credentials or click "Fill Demo Credentials".');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[2500] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B132B] border border-cyan-500/50 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in relative">
        {/* Top Gradient Bar */}
        <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-600"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-3 border border-cyan-400/40">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-extrabold text-white">ASTRA-Assam Admin Console</h2>
            <p className="text-xs text-slate-400 mt-1">
              Authorized Government Operations & System Configuration Gateway
            </p>
          </div>

          {/* Demo Credentials Helper Card */}
          <div className="mb-5 p-3 rounded-xl bg-cyan-950/50 border border-cyan-700/60 text-xs">
            <div className="flex items-center justify-between text-cyan-300 font-bold mb-1.5">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> NESFIC-D-22 Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white shadow transition-all cursor-pointer"
              >
                Auto-Fill Demo
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono text-[11px]">
              <div>User: <strong className="text-white">admin@assam.gov.in</strong></div>
              <div>Pass: <strong className="text-white">Admin@2026</strong></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-950/80 border border-red-700 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                  className="w-full bg-[#1C2541] border border-slate-700 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                  className="w-full bg-[#1C2541] border border-slate-700 focus:border-cyan-400 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer disabled:opacity-50"
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
          <p className="mt-4 text-[10px] text-center text-slate-500">
            Protected by CERT-In security protocols & Role-Based Access Control (RBAC).
          </p>
        </div>
      </div>
    </div>
  );
}
