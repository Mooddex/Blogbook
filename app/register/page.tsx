// app/register/page.tsx
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

const RegisterPage = () => (
  <main className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">
          Create your account
        </h1>
        <p className="text-sm text-gray-400">
          Enter your details to get started
        </p>
      </div>
      
      <AuthForm type="register" />
      
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  </main>
);

export default RegisterPage;