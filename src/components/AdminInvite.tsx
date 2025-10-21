import { useState } from 'react';
import { sendMagicLink } from '../lib/auth';

export default function AdminInvite() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentEmails, setSentEmails] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await sendMagicLink(email);
      setStatus('success');
      setSentEmails(prev => [...prev, email]);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send invite');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-blue-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage invitations and users</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main invite card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send Invitation</h2>
                  <p className="text-gray-600">Invite new users via magic link</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    disabled={status === 'sending'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending' || !email.trim()}
                  className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    '✉️ Send Invitation'
                  )}
                </button>
              </form>

              {status === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">✅</span>
                    <p className="text-green-800 font-medium">Invitation sent successfully!</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">❌</span>
                    <div>
                      <p className="text-red-800 font-medium">Failed to send invitation</p>
                      <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats card */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-orange-100 text-sm font-medium">Total Invites Sent</span>
                <span className="text-3xl">📊</span>
              </div>
              <p className="text-4xl font-bold">{sentEmails.length}</p>
            </div>

            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-100 text-sm font-medium">Session Status</span>
                <span className="text-3xl">🔐</span>
              </div>
              <p className="text-xl font-semibold">Active</p>
            </div>
          </div>
        </div>

        {/* Sent invitations list */}
        {sentEmails.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📋</span>
              <h2 className="text-xl font-bold text-gray-900">Recent Invitations</h2>
            </div>
            <div className="space-y-2">
              {sentEmails.map((sentEmail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-orange-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <span className="font-medium text-gray-700">{sentEmail}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                    Just now
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
