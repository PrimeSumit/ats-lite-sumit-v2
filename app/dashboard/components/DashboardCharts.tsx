"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

interface DashboardChartsProps {
  jobs: any[];
}

export default function DashboardCharts({ jobs }: DashboardChartsProps) {
  const stats = {
    saved: jobs.filter((j) => j.status === "saved").length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interviewing: jobs.filter((j) => j.status === "interviewing").length,
    offers: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  };
  const total = jobs.length;

  const chartData = [
    { name: "Wishlist", value: stats.saved, color: "#64748b" },
    { name: "Applied", value: stats.applied, color: "#3b82f6" },
    { name: "Interview", value: stats.interviewing, color: "#a855f7" },
    { name: "Offer", value: stats.offers, color: "#22c55e" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
  ];
  const pieData = chartData.filter((d) => d.value > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl">
          <p className="mb-1 text-sm font-bold text-white">
            {label || payload[0].name}
          </p>
          <p className="text-sm font-medium" style={{ color: payload[0].fill }}>
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* --- BAR CHART --- */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 lg:col-span-2">
        <h3 className="mb-6 font-semibold text-white">Application Pipeline</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#334155", opacity: 0.2 }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                barSize={55}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- PIE CHART (FIXED) --- */}
      <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="mb-2 font-semibold text-white">Status Breakdown</h3>

        {/* 1. Increased Height to h-80 (320px) to prevent cutting off */}
        <div className="relative h-80 w-full flex-1 min-h-[300px]">
          {total > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  // 2. Use Percentages! This guarantees it scales down on mobile without disappearing.
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={5}
                  cornerRadius={6}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              No data yet
            </div>
          )}

          {/* Center Text */}
          {total > 0 && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-4xl font-bold text-white tracking-tighter">
                {total}
              </p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total
              </p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-3 pb-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <div
                className="h-2 w-2 rounded-full ring-2 ring-slate-800"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-400">{item.name}</span>
              <span className="text-slate-200 font-bold ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
