

// app/login/page.tsx
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

const LoginPage = () => (
  <main className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Sign in to your account
        </h1>
        <p className="text-sm text-gray-400">
          Enter your email and password to continue
        </p>
      </div>
      
      <AuthForm type="login" />
      
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  </main>
);

export default LoginPage;