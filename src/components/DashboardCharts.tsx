// components/DashboardCharts.tsx
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Quote } from "../App";

interface DashboardChartsProps {
  quotes: Quote[];
}

export default function DashboardCharts({ quotes }: DashboardChartsProps) {
  // Helper to format currency in tooltips
  const formatCurrency = (value: number | null) =>
    value != null ? `$${value.toLocaleString()}` : "$0";

  // 1. Monthly Trend – Number of quotes created in last 6 months
  // const monthlyData = () => {
  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   const now = new Date();
  //   const data = [];

  //   for (let i = 5; i >= 0; i--) {
  //     const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
  //     const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  //     const monthEnd = new Date(
  //       date.getFullYear(),
  //       date.getMonth() + 1,
  //       0,
  //       23,
  //       59,
  //       59
  //     );

  //     const monthQuotes = quotes.filter((q) => {
  //       if (!q.createdAt) return false;
  //       const created = new Date(q.createdAt);
  //       return created >= monthStart && created <= monthEnd;
  //     });

  //     data.push({
  //       month: months[date.getMonth()],
  //       year: date.getFullYear(),
  //       shortLabel: `${months[date.getMonth()]} ${date
  //         .getFullYear()
  //         .toString()
  //         .slice(-2)}`,
  //       count: monthQuotes.length,
  //     });
  //   }
  //   return data;
  // };

  const monthlyData = () => {
    const safeQuotes = Array.isArray(quotes) ? quotes : [];
    const months = ["Jan","Feb","Mar","Apr","May","Jun"];
    const now = new Date();
    const data = [];
  
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  
      const monthQuotes = safeQuotes.filter((q) => {
        if (!q.createdAt) return false;
        const created = new Date(q.createdAt);
        return created >= monthStart && created <= monthEnd;
      });
  
      data.push({
        month: months[date.getMonth()],
        year: date.getFullYear(),
        shortLabel: `${months[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`,
        count: monthQuotes.length,
      });
    }
  
    return data;
  };
  

  // 2. Quotes by State – Top 5 states + "Others"
  const stateCounts = Array.isArray(quotes)
    ? quotes.reduce((acc, q) => {
        const state = q.state?.trim() || "Unknown";
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const stateEntries = Object.entries(stateCounts).sort(
    ([, a], [, b]) => b - a
  );

  const top7States = stateEntries.slice(0, 5).map(([state, count]) => ({
    name: state,
    value: count,
  }));

  const othersCount = stateEntries
    .slice(7)
    .reduce((sum, [, count]) => sum + count, 0);

  const stateData =
    othersCount > 0
      ? [...top7States, { name: "Others", value: othersCount }]
      : top7States;

  const stateColors = [
    "#4361ee",
    "#3f37c9",
    "#4895ef",
    "#4cc9f0",
    "#7209b7",
    "#b5179e",
    "#f72585",
    "#f8961e",
    "#94a3b8",
  ];

  // 3. Total Value by Manufacturing Type – Bar chart
  const safeQuotes = Array.isArray(quotes) ? quotes : [];

  const manufacturingValueData = Object.entries(
    safeQuotes.reduce((acc, q) => {
      const type = q.manufacturingType || "Unspecified";
      const value = q.value || 0;
      acc[type] = (acc[type] || 0) + value;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([type, totalValue]) => ({
      type,
      totalValue,
    }))
    .sort((a, b) => b.totalValue - a.totalValue);

  const monthlyTrendData = monthlyData();

  return (
    <div className="row g-4">
      {/* 1. Monthly Quotes Trend */}
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h5 className="card-title mb-4 fw-semibold">
              Quotes Created (Last 6 Months)
            </h5>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="shortLabel" tick={{ fontSize: 14 }} />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{ fontWeight: "bold" }}
                  formatter={(value: number) => [`${value} quotes`, "Count"]}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4361ee"
                  strokeWidth={3}
                  dot={{ fill: "#4361ee", r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 2. Quotes by State – Only Top 7 + Others */}
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h5 className="card-title mb-4 fw-semibold">
              Quotes by State (Top 5)
            </h5>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={stateData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={110}
                  dataKey="value"
                >
                  {stateData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={stateColors[i % stateColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => [`${value} quotes`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Total Value by Manufacturing Type */}
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h5 className="card-title mb-4 fw-semibold">
              Total Quote Value by Manufacturing Type
            </h5>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={manufacturingValueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="type"
                  angle={-20}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#4361ee"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
