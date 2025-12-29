"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  XCircle,
  Play,
  Loader2,
  Sparkles,
} from "lucide-react";
import { parseResumeFile, analyzeWithAI } from "./actions";

export default function AIMatcherPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState<
    "idle" | "extracting" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to ensure scores are 0-100 integers
  const formatScore = (val: number) =>
    val <= 1 ? Math.round(val * 100) : Math.round(val);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setExtractionStatus("extracting");

    const formData = new FormData();
    formData.append("file", file);

    const res = await parseResumeFile(formData);

    if (res.success) {
      setResumeText(res.text ?? "");
      setExtractionStatus("success");
    } else {
      setExtractionStatus("error");
      alert(res.error);
    }
  }

  async function handleAnalyze() {
    if (!resumeText || !jobDescription)
      return alert("Please provide both resume and JD.");
    setIsAnalyzing(true);

    const res = await analyzeWithAI(resumeText, jobDescription);
    if (res.success) setResult(res.data);
    else alert(res.error);

    setIsAnalyzing(false);
  }

  return (
    <div className="flex flex-col h-screen gap-6 p-6 max-w-[1600px] mx-auto text-white bg-slate-950">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkles className="text-blue-500" size={32} />
          AI Matcher{" "}
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
            Groq Speed
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Left: Input Section */}
        {/* Added no-scrollbar here to hide the column scrollbar */}
        <div className="lg:col-span-5 space-y-6 overflow-y-auto no-scrollbar pr-2">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
              1. Resume File
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer transition-all
                ${
                  extractionStatus === "success"
                    ? "border-green-500/40 bg-green-500/5"
                    : "border-slate-800 hover:bg-slate-900"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.docx,.txt"
              />
              <div
                className={`p-3 rounded-full mb-2 ${
                  fileName
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {fileName ? <FileText size={24} /> : <UploadCloud size={24} />}
              </div>
              <p className="text-sm font-medium text-slate-300">
                {fileName || "Click to upload resume"}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
              2. Job Details
            </label>
            <textarea
              // Added no-scrollbar here
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-5 outline-none focus:border-blue-500 min-h-[350px] text-sm leading-relaxed no-scrollbar resize-none"
              placeholder="Paste the Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || extractionStatus !== "success"}
            className="w-full bg-blue-600 h-16 rounded-2xl font-bold hover:bg-blue-500 disabled:bg-slate-800 transition-all flex items-center justify-center gap-3"
          >
            {isAnalyzing ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
            {isAnalyzing ? "Analyzing..." : "Compare Compatibility"}
          </button>
        </div>

        {/* Right: Results Section */}
        {/* Added no-scrollbar here */}
        <div className="lg:col-span-7 bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-8 overflow-y-auto no-scrollbar">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
              <Sparkles size={64} className="opacity-10" />
              <p className="text-sm font-medium">Ready for AI Analysis</p>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative h-48 w-48 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="82"
                      stroke="#1e293b"
                      strokeWidth="14"
                      fill="transparent"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="82"
                      stroke="#3b82f6"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray="515"
                      strokeDashoffset={
                        515 - (515 * formatScore(result.overallScore)) / 100
                      }
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-6xl font-black">
                      {formatScore(result.overallScore)}
                    </span>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-1">
                      Match
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-5">
                  <div className="bg-slate-800/30 p-5 rounded-2xl border border-slate-700/30">
                    <p className="text-sm text-slate-400 leading-relaxed italic">
                      "{result.summary}"
                    </p>
                  </div>
                  <div className="space-y-4">
                    <ScoreBar
                      label="Skills Match"
                      score={formatScore(result.skillsScore)}
                      color="bg-blue-500"
                    />
                    <ScoreBar
                      label="Experience"
                      score={formatScore(result.experienceScore)}
                      color="bg-purple-500"
                    />
                    <ScoreBar
                      label="Formatting"
                      score={formatScore(result.formattingScore)}
                      color="bg-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4 bg-slate-950/40 p-6 rounded-3xl border border-green-500/10">
                  <h3 className="text-green-500 text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 size={18} /> Found Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills?.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg border border-green-500/20 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 bg-slate-950/40 p-6 rounded-3xl border border-red-500/10">
                  <h3 className="text-red-500 text-sm font-bold flex items-center gap-2">
                    <XCircle size={18} /> Key Gaps
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills?.map((s: string) => (
                      <span
                        key={s}
                        className="text-[10px] bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 tracking-wider">
        <span>{label}</span>
        <span className="text-white">{score}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
