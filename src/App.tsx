import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { signOut } from './lib/auth';
import Home from './pages/Home';
import Unauthenticated from './pages/Auth/Unauthenticated';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

export default function App() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <BrowserRouter>
  <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-100 to-orange-50">
        <Header userEmail={user?.email} isAuthenticated={isAuthenticated} loading={loading} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unauthenticated" element={<Unauthenticated />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Header({ userEmail, isAuthenticated, loading }: { userEmail?: string; isAuthenticated: boolean; loading: boolean }) {
  async function handleSignOut() {
    try { await signOut(); } catch (e) { console.error(e); }
  }

  return (
    <header className="bg-linear-to-br from-orange-400 via-blue-300 to-orange-200 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-block mr-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="28" height="20" rx="4" fill="#60A5FA"/>
              <rect x="10" y="6" width="24" height="20" rx="4" fill="#FBBF24"/>
              <rect x="14" y="14" width="20" height="20" rx="4" fill="#34D399"/>
            </svg>
          </span>
          <h1 className="text-3xl font-bold text-gray-900">ReadMore</h1>
          <nav className="flex gap-4 text-base font-medium ml-6">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-gray-700 hover:text-blue-700"}>🏠 Home</NavLink>
            {isAuthenticated && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? "text-orange-700 font-bold" : "text-gray-700 hover:text-orange-700"}>👑 Admin</NavLink>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <span className="px-3 py-1 bg-orange-100 rounded-full text-sm text-orange-700">{userEmail}</span>
              <button onClick={handleSignOut} className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200">Sign Out</button>
            </>
          ) : (
            <NavLink to="/unauthenticated" className={({ isActive }) => isActive ? "text-blue-700 font-bold" : "text-sm text-gray-600 hover:text-blue-600"}>🔒 Sign In</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-10">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">404 - Not Found</h2>
        <p className="text-gray-600 mb-4">The page you're looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow hover:shadow-md">Return Home</Link>
      </div>
    </div>
  );
}
