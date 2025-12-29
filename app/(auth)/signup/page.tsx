import Image from "next/image";
import Link from "next/link";
import { signup } from "../login/actions";
import { LayoutDashboard, Sparkles, LineChart } from "lucide-react";
import GoogleAuthButton from "@/components/google-auth-button"; // Assuming you created this from the previous step

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      {/* LEFT SIDE: Branding (Identical to Login) */}
      <div className="hidden lg:flex w-2/5 flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-12 relative">
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>

        {/* LOGO SECTION */}
        <div className="relative z-10 h-24 w-96">
          <Image
            src="/logo.png"
            alt="ATS Lite Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>

        {/* Hero Text - Slightly adjusted for Signup context */}
        <div className="max-w-md space-y-8 relative z-10 my-auto">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight text-slate-100">
            Join the top 1%. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Beat the Resume Bots.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Create your free account today. Get instant AI resume feedback and
            organize your job search in one place.
          </p>

          <div className="space-y-4 pt-6">
            <FeatureItem
              icon={<Sparkles className="w-5 h-5" />}
              text="Free AI Resume Scoring"
            />
            <FeatureItem
              icon={<LayoutDashboard className="w-5 h-5" />}
              text="Unlimited Job Tracking"
            />
            <FeatureItem
              icon={<LineChart className="w-5 h-5" />}
              text="Career Analytics"
            />
          </div>
        </div>

        <div className="text-sm text-slate-500 relative z-10">
          © 2025 ATS-Lite.
        </div>
      </div>

      {/* RIGHT SIDE: Signup Form */}
      <div className="flex w-full lg:w-3/5 flex-col justify-center items-center bg-slate-950 px-6 py-12 lg:px-16 xl:px-24 overflow-y-auto">
        <div className="w-full max-w-lg space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="relative h-16 w-64">
              <Image
                src="/logo-full.png"
                alt="ATS Lite"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Create an account
            </h2>
            <p className="mt-2 text-base text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-all hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>

          <div className="mt-10">
            {/* Reuse the Google Button Component here */}
            <GoogleAuthButton />

            <div className="relative mt-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-slate-950 px-4 text-slate-500">
                  or sign up with email
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form action={signup} className="space-y-4 mt-8">
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-slate-300"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    className="block w-full rounded-lg border-0 bg-slate-900 py-3.5 text-white shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-4 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-slate-300"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    className="block w-full rounded-lg border-0 bg-slate-900 py-3.5 text-white shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-4 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  className="block w-full rounded-lg border-0 bg-slate-900 py-3.5 text-white shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-4 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-slate-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="block w-full rounded-lg border-0 bg-slate-900 py-3.5 text-white shadow-sm ring-1 ring-inset ring-slate-800 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6 pl-4 transition-all"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all transform active:scale-[0.98] mt-2"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-300/90 group">
      <div className="p-2 rounded-lg bg-slate-800/50 text-blue-400 ring-1 ring-white/5 group-hover:bg-slate-800 group-hover:text-blue-300 transition-colors">
        {icon}
      </div>
      <span className="font-medium text-sm group-hover:text-slate-200 transition-colors">
        {text}
      </span>
    </div>
  );
}
