
export default function Unauthenticated() {
  async function handleMagicLink() {
    const email = prompt('Enter your email address:');
    if (!email) return;
    try {
      const { sendMagicLink } = await import('../../lib/auth');
      await sendMagicLink(email);
      alert('Magic link sent! Check your email.');
    } catch (err) {
      alert('Error: ' + (err instanceof Error ? err.message : 'Failed'));
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full text-center border-t-4 border-orange-500">
        <div className="mb-6"><span className="text-6xl">📚</span></div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to ReadMore</h2>
        <p className="text-gray-600 mb-8 text-lg">Invite-only application. Use your magic link to sign in.</p>
  <button onClick={handleMagicLink} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-lg hover:shadow-xl">🔑 Sign In</button>
        <div className="pt-6 border-t border-gray-200 mt-8">
          <p className="text-sm text-gray-500">💡 <span className="font-medium">Need access?</span> Contact an administrator.</p>
        </div>
      </div>
    </div>
  );
}
