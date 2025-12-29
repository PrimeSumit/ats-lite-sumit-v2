import Link from "next/link";
import { forgotPassword } from "../login/actions";
import { ArrowLeft, Mail } from "lucide-react";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; error?: string }>; // 1. Update type to Promise
}) {
  // 2. Await the params before using them
  const { message, error } = await searchParams;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-950 px-4 text-slate-200">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="w-full max-w-sm space-y-8 rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl backdrop-blur-sm relative z-10">
        {/* Header Icon & Title */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="rounded-lg bg-green-500/10 p-3 text-sm text-green-400 ring-1 ring-green-500/20 text-center animate-in fade-in slide-in-from-top-2">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 ring-1 ring-red-500/20 text-center animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="block w-full rounded-lg border-0 bg-slate-950 py-3 text-white shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-4 transition-all"
            />
          </div>

          <button
            formAction={forgotPassword}
            className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center text-sm">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
