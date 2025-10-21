import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-blue-50 to-orange-50">
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
    <div className="bg-white shadow-lg border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold bg-linear-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">📚 ReadMore</h1>
          <nav className="flex gap-4 text-sm font-semibold">
            <Link to="/" className="text-gray-600 hover:text-blue-600">🏠 Home</Link>
            {isAuthenticated && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600">� Admin</Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : isAuthenticated ? (
            <>
              <div className="px-3 py-1 bg-orange-100 rounded-full">
                <span className="text-sm text-orange-700 font-medium">{userEmail}</span>
              </div>
              <button onClick={handleSignOut} className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200">� Sign Out</button>
            </>
          ) : (
            <Link to="/unauthenticated" className="text-sm text-gray-600 hover:text-blue-600">🔒 Sign In</Link>
          )}
        </div>
      </div>
    </div>
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
