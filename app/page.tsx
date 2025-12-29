import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  LineChart,
  Upload,
  CheckCircle,
  Trophy,
} from "lucide-react";
import Image from "next/image"; // Ensure Image is imported

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* ✅ REPLACED TEXT WITH IMAGE LOGO ✅ */}
          <Link
            href="/"
            className="relative h-30 w-40 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png" // Make sure this image exists in your /public folder
              alt="ATS Lite Logo"
              fill
              className="object-contain object-left"
              priority // Loads immediately
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-950 hover:bg-slate-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center lg:pt-48">
        <div className="absolute top-0 -z-10 h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute top-20 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]"></div>

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Sparkles className="h-4 w-4" />
          <span>New: AI Resume Analyzer</span>
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          Stop guessing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
            Start getting hired.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400 animate-in fade-in slide-in-from-bottom-8 duration-700">
          The all-in-one workspace to track your job applications and optimize
          your resume with AI. Beat the ATS bots and land your dream job.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
          >
            Start Tracking Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          {/* "How it works" button pointing to specific section */}
          <Link
            href="#how-it-works"
            className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-all"
          >
            How it works
          </Link>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section
        id="how-it-works"
        className="container mx-auto py-24 px-6 border-t border-white/5"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">
            Your path to the offer letter
          </h2>
          <p className="mt-4 text-slate-400">
            Simple, effective, and automated.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -z-10"></div>

          <StepCard
            number="01"
            icon={<Upload className="h-6 w-6 text-blue-400" />}
            title="Import Resume"
            description="Paste your resume and the job description. Our AI analyzes the match instantly."
          />
          <StepCard
            number="02"
            icon={<CheckCircle className="h-6 w-6 text-violet-400" />}
            title="Optimize & Apply"
            description="Fix missing keywords, tailor your application, and move your card to 'Applied'."
          />
          <StepCard
            number="03"
            icon={<Trophy className="h-6 w-6 text-emerald-400" />}
            title="Track & Crack"
            description="Manage interviews on your Kanban board and analyze your progress until you get the offer."
          />
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="bg-slate-900/30 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">
              Everything you need
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<LayoutDashboard className="h-8 w-8 text-blue-400" />}
              title="Kanban Board"
              description="Visualize your job search. Drag and drop applications from Applied to Offer."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-violet-400" />}
              title="AI Analyzer"
              description="Paste your resume and job description. Get an instant match score and improvement tips."
            />
            <FeatureCard
              icon={<LineChart className="h-8 w-8 text-emerald-400" />}
              title="Analytics"
              description="Track your velocity. See how many applications you send per week and your success rate."
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="mt-auto border-t border-white/5 bg-slate-950 py-12 text-center text-slate-500">
        <p>© 2025 ATS-Lite. Built for ambitious developers.</p>
      </footer>
    </main>
  );
}

// --- COMPONENTS ---

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/5 bg-slate-900/50 p-8 hover:border-blue-500/30 hover:bg-slate-900 transition-all duration-300">
      <div className="mb-4 rounded-lg bg-slate-950 p-3 w-fit ring-1 ring-white/10 group-hover:ring-blue-500/20">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 ring-1 ring-white/10 shadow-xl">
        <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700">
          {number}
        </span>
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs">{description}</p>
    </div>
  );
}
