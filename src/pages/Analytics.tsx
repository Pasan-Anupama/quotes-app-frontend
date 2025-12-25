// pages/Analytics.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  UserCheck,
  Factory,
  AlertCircle,
} from "lucide-react";
import type { Quote } from "../App";

export default function Analytics() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/quotes");
        setQuotes(res.data || []);
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading analytics...</span>
        </div>
      </div>
    );
  }

  // === REAL CALCULATIONS ===
  const totalValue = quotes.reduce((sum, q) => sum + (q.value || 0), 0);
  const averageValue = quotes.length > 0 ? totalValue / quotes.length : 0;

  const uniqueSalesMembers = new Set(
    quotes.map((q) => q.salesMember).filter(Boolean)
  ).size;

  const quotesThisMonth = quotes.filter((q) => {
    if (!q.createdAt) return false;
    const created = new Date(q.createdAt);
    const now = new Date();
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  // Top Sales Member
  const salesPerformance = quotes.reduce((acc, q) => {
    const member = q.salesMember || "Unassigned";
    acc[member] = (acc[member] || 0) + (q.value || 0);
    return acc;
  }, {} as Record<string, number>);

  const topSalesMemberEntry = Object.entries(salesPerformance).sort(
    ([, a], [, b]) => b - a
  )[0] || ["None", 0];
  const [topSalesMember, topSalesValue] = topSalesMemberEntry;

  // Upcoming Due Dates
  const upcomingDue = quotes.filter((q) => {
    if (!q.dueDate) return false;
    const due = new Date(q.dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    return diff > 0 && diff <= 30 * 24 * 60 * 60 * 1000;
  }).length;

  // === NEW: Top Manufacturing Types by Total Value ===
  const manufacturingStats = Object.entries(
    quotes.reduce((acc, q) => {
      const type = q.manufacturingType || "Unspecified";
      acc[type] = (acc[type] || 0) + (q.value || 0);
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([type, value]) => ({
      type,
      value,
      count: quotes.filter(
        (q) => (q.manufacturingType || "Unspecified") === type
      ).length,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10

  const maxManufacturingValue = manufacturingStats[0]?.value || 1;

  const stats = [
    {
      label: "Total Quote Value",
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: "success",
    },
    {
      label: "Average Quote Value",
      value: `$${Math.round(averageValue).toLocaleString()}`,
      icon: TrendingUp,
      color: "primary",
    },
    {
      label: "Quotes This Month",
      value: quotesThisMonth,
      icon: Calendar,
      color: "info",
    },
    {
      label: "Active Sales Members",
      value: uniqueSalesMembers,
      icon: UserCheck,
      color: "warning",
    },
    {
      label: "Top Performer",
      value: topSalesMember,
      subValue: `$${topSalesValue.toLocaleString()}`,
      icon: Factory,
      color: "purple",
    },
    {
      label: "Due in Next 30 Days",
      value: upcomingDue,
      icon: AlertCircle,
      color: upcomingDue > 0 ? "danger" : "secondary",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="h3 mb-2">Analytics & Reports</h1>
        <p className="text-muted">
          Deep insights into your quoting performance and pipeline
        </p>
      </div>

      {/* Key Metrics */}
      <div className="row g-4 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted small mb-1">{stat.label}</p>
                  <h3 className={`mb-0 text-${stat.color} fw-bold`}>
                    {stat.value}
                  </h3>
                  {stat.subValue && (
                    <p className="mb-0 text-muted small mt-1">
                      {stat.subValue}
                    </p>
                  )}
                </div>
                <div
                  className={`bg-${stat.color}-subtle text-${stat.color} p-3 rounded-3`}
                >
                  <stat.icon size={32} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-5">
        <h4 className="mb-4 fw-semibold">Trends & Distribution</h4>
        <div className="alert alert-info">
          Charts (Monthly Creation, State Distribution, Value by Manufacturing
          Type) are shown on the Dashboard.
        </div>
      </div>

      {/* NEW: Top Manufacturing Types Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4 fw-semibold">
            Top Manufacturing Types by Total Quote Value
          </h5>
          {manufacturingStats.length === 0 ? (
            <p className="text-muted text-center py-4">No data available</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Rank</th>
                    <th>Manufacturing Type</th>
                    <th className="text-center">Quotes</th>
                    <th className="text-end">Total Value</th>
                    <th className="text-center">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingStats.map((item, index) => (
                    <tr key={item.type}>
                      <td className="fw-medium">#{index + 1}</td>
                      <td>{item.type}</td>
                      <td className="text-center">{item.count}</td>
                      <td className="text-end fw-semibold">
                        ${item.value.toLocaleString()}
                      </td>
                      <td className="text-center">
                        <div
                          className="progress"
                          style={{
                            height: "8px",
                            width: "120px",
                            margin: "auto",
                          }}
                        >
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{
                              width: `${
                                (item.value / maxManufacturingValue) * 100
                              }%`,
                            }}
                            aria-valuenow={item.value}
                            aria-valuemin={0}
                            aria-valuemax={maxManufacturingValue}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
