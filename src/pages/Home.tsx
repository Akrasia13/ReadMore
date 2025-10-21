import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    
  <div className="min-h-screen p-6 bg-linear-to-br from-orange-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-orange-500">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">📖</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Main Application</h2>
              <p className="text-gray-600 mt-1">Your reading journey starts here</p>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <span className="text-3xl mb-2 block">📚</span>
                <h3 className="font-bold text-gray-900 mb-2">Your Library</h3>
                <p className="text-sm text-gray-600">Manage your reading collection</p>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <span className="text-3xl mb-2 block">📊</span>
                <h3 className="font-bold text-gray-900 mb-2">Statistics</h3>
                <p className="text-sm text-gray-600">Track your reading progress</p>
              </div>
              <div className="bg-linear-to-br from-orange-50 to-blue-100 rounded-xl p-6 border border-orange-200">
                <span className="text-3xl mb-2 block">🎯</span>
                <h3 className="font-bold text-gray-900 mb-2">Goals</h3>
                <p className="text-sm text-gray-600">Set and achieve reading goals</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">You are not signed in.</p>
              <Link to="/unauthenticated" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow hover:shadow-md">🔑 Sign In</Link>
            </div>
          )}
        </div>
        {user && (
          <div className="mt-6 text-sm text-gray-500">Signed in as {user.email}</div>
        )}
      </div>
    </div>
  );
}
