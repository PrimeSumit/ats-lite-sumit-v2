import Link from "next/link";
import { Mail } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <div className="mb-6 rounded-full bg-blue-500/10 p-6 ring-1 ring-blue-500/20 animate-in zoom-in-50 duration-500">
        <Mail className="h-12 w-12 text-blue-500" />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-white tracking-tight">
        Check your inbox
      </h1>

      <p className="mb-8 max-w-md text-slate-400 text-lg">
        We've sent a verification link to your email address. <br />
        Please click the link to activate your account.
      </p>

      <div className="flex flex-col gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-white px-6 py-3 font-bold text-slate-950 hover:bg-slate-200 transition-colors"
        >
          Back to Login
        </Link>
      </div>

      <p className="mt-8 text-sm text-slate-600">
        Didn't receive the email? Check your Spam folder.
      </p>
    </div>
  );
}
