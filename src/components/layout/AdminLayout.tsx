import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../lib/auth';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  async function handleSignOut() {
    try { await signOut(); } catch (e) { console.error(e); }
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50">
      <header className="bg-white shadow-lg border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">📚 ReadMore Admin</h1>
            <nav className="flex gap-4 text-sm font-medium">
              <Link to="/" className="text-gray-600 hover:text-blue-600">🏠 Home</Link>
              <Link to="/admin" className="text-gray-600 hover:text-blue-600">👑 Admin</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-orange-100 rounded-full text-sm text-orange-700">{user?.email}</span>
            <button onClick={handleSignOut} className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200">🚪 Sign Out</button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
