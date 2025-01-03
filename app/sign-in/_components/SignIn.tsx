'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Button } from '../../_shared/_components/Button';
import { GoogleLogo } from '../../_shared/_components/icons/GoogleLogo';
import { HappyBankLogo } from '../../_shared/_components/icons/HappyBankLogo';

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="w-full bg-contain bg-center bg-no-repeat bg-cover bg-login-image" />
        </div>
        <div className="h-screen flex w-1/2 p-6 sm:p-12">
          <div className="flex flex-col items-center inline-block align-middle m-auto">
            <HappyBankLogo />
            <h2 className="mt-16">Welcome to Happy bank!</h2>
            <div className="w-full flex-1 my-8">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                  className="w-3/4 inline-flex items-center justify-center py-4 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                  <GoogleLogo />
                  Continue with Google
                </button>
              </div>

              <div className="mt-6 mb-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or
                </div>
              </div>

              <div className="w-3/4 mx-auto">
                <form
                  onSubmit={handleSubmit(async ({ email, password }) => {
                    signIn('credentials', {
                      email,
                      password,
                      callbackUrl: '/dashboard',
                    });
                  })}
                >
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                  />
                  <p className="mt-2 text-xs text-gray-600 text-right">
                    <a href="#" className="ml-1 border-b border-gray-500 border-dotted">
                      Forgot your password?
                    </a>
                  </p>
                  <Button type="submit" label="Sign in" cssWrapper="w-full mt-16" />
                </form>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don&apos;t have an account?
                  <a href="#" className="ml-1 border-b border-gray-500 border-dotted">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
