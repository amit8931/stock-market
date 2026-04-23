import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Role, setSession } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const next = useMemo(() => {
    const n = router.query.next;
    return typeof n === 'string' ? n : '';
  }, [router.query.next]);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('user');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Demo session until user-service auth is wired.
    setSession({ role, email: email || undefined, issuedAt: new Date().toISOString() });

    const destination = next || (role === 'admin' ? '/admin' : '/app');
    await router.push(destination);
  };

  return (
    <>
      <Head>
        <title>Login - Stock Intelligence</title>
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="mt-1 text-sm text-gray-600">
            Demo login for UI panels. Later we’ll connect this to `user-service` + JWT.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`px-3 py-2 rounded border text-sm ${role === 'user' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`px-3 py-2 rounded border text-sm ${role === 'admin' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white hover:bg-gray-50'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded px-3 py-2 hover:bg-gray-800"
            >
              Continue
            </button>

            <div className="text-sm text-gray-600 flex justify-between">
              <Link className="text-blue-700 hover:underline" href="/">
                Back to home
              </Link>
              {next ? <span className="text-gray-500">Redirecting after login</span> : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
