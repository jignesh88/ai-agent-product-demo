import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your email address and we'll send you a link to reset your password
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
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Reset Link
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-blue-600 hover:underline"
            >
              Back to Sign in
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
