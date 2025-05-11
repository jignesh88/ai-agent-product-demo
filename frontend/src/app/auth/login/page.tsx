import Link from 'next/link';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to your account to continue
          </p>
        </div>
        
        <div className="card">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="input" 
                placeholder="Enter your email address"
                required 
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label">Password</label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="input" 
                placeholder="Enter your password"
                required 
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                Remember me
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="btn-secondary flex w-full justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9313 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                </svg>
                Facebook
              </button>
              <button
                type="button"
                className="btn-secondary flex w-full justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 17.523 6.47731 22 12.0003 22C17.5233 22 22.0003 17.523 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2ZM12.0003 4C16.4183 4 20.0003 7.582 20.0003 12C20.0003 16.418 16.4183 20 12.0003 20C7.58231 20 4.00031 16.418 4.00031 12C4.00031 7.582 7.58231 4 12.0003 4ZM12.0003 6C9.79131 6 8.00031 7.791 8.00031 10C8.00031 12.209 9.79131 14 12.0003 14C14.2093 14 16.0003 12.209 16.0003 10C16.0003 7.791 14.2093 6 12.0003 6ZM12.0003 16C9.33331 16 4.00031 17.337 4.00031 20V22H20.0003V20C20.0003 17.337 14.6673 16 12.0003 16Z" />
                </svg>
                Google
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-600 hover:underline dark:text-gray-400"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
