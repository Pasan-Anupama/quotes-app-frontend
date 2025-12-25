// pages/Dashboard.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardStats from "../components/DashboardStats";
import DashboardCharts from "../components/DashboardCharts";
import RecentActivity from "../components/RecentActivity";
import type { Quote } from "../App";

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/quotes");
        setQuotes(res.data || []);
      } catch (err) {
        console.error("Failed to fetch quotes for dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-100 d-flex flex-column w-100">
      {/* Header */}
      <div className="mb-5">
        <h1 className="h3 mb-2">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's your quote overview</p>
      </div>

      {/* Stats - Now using real data */}
      <div className="mb-5">
        <DashboardStats quotes={quotes} />
      </div>

      {/* Charts */}
      <div className="flex-shrink-0 mb-5">
        <DashboardCharts quotes={quotes} />
      </div>

      {/* Recent Activity */}
      <div className="flex-fill d-flex flex-column min-h-0">
        <RecentActivity quotes={quotes} />
      </div>
    </div>
  );
}
