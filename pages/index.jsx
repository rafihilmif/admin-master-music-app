import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function index() {
  const router = useRouter();
  const {status } = useSession();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

    const handleLogin = async () => {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      return;
    } else if (status === 'authenticated') {
      router.push('/dashboard');
    } 
  }, [status]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to Admin
          </h2>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-6 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                    name="password"
                  onChange={(e)=> setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

