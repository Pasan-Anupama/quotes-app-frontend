// components/DashboardStats.tsx
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import type { Quote } from "../App";

interface DashboardStatsProps {
  quotes: Quote[];
}

export default function DashboardStats({ quotes }: DashboardStatsProps) {
  const total = quotes.length;
  //To be implemented
  const pending = quotes.filter((q) => q.status === "Pending").length;
  const approved = quotes.filter((q) => q.status === "Approved").length;
  const rejected = quotes.filter((q) => q.status === "Rejected").length;

  const stats = [
    { label: "Total Quotes", value: total, icon: FileText, color: "primary" },
    { label: "Pending Quotes", value: pending, icon: Clock, color: "warning" },
    {
      label: "Approved Quotes",
      value: approved,
      icon: CheckCircle,
      color: "success",
    },
    {
      label: "Rejected Quotes",
      value: rejected,
      icon: XCircle,
      color: "danger",
    },
  ];

  return (
    <div className="row g-4 mb-5">
      {stats.map((stat) => (
        <div key={stat.label} className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-lg hover:shadow-lg transition-shadow">
            <div className="card-body d-flex align-items-center justify-content-between p-4">
              <div>
                <p className="text-muted medium mb-1">{stat.label}</p>
                <h3 className={`mb-0 text-${stat.color}`}>{stat.value}</h3>
              </div>
              <div
                className={`bg-${stat.color}-subtle text-${stat.color} p-3 rounded-3`}
              >
                <stat.icon size={45} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
