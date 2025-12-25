// components/RecentActivity.tsx
import type { Quote } from "../App";
import { Clock, FileText } from "lucide-react";

interface RecentActivityProps {
  quotes: Quote[];
}

const formatRelativeTime = (dateString: string | null | undefined): string => {
  if (!dateString) return "Unknown date";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
};

const formatCurrency = (value: number | null): string => {
  return value != null ? `$${value.toLocaleString()}` : "—";
};

export default function RecentActivity({ quotes }: RecentActivityProps) {
  // Sort by createdAt (newest first) and take top 5
  const recentQuotes = [...quotes]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  if (recentQuotes.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Recent Activity</h5>
          <p className="text-muted text-center py-4">No quotes yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm h-100 d-flex flex-column">
      <div className="card-body flex-fill">
        <h5 className="card-title mb-4 fw-semibold">Recent Activity</h5>
        <div className="list-group list-group-flush">
          {recentQuotes.map((quote) => (
            <div
              key={quote.id}
              className="list-group-item px-0 py-3 border-bottom"
            >
              <div className="d-flex gap-3 align-items-start">
                <div className="bg-primary-subtle text-primary rounded-3 p-2 d-flex align-items-center flex-shrink-0">
                  <FileText size={20} />
                </div>

                <div className="flex-fill min-width-0">
                  <p className="mb-1 fw-medium">
                    <span className="text-primary">
                      {quote.quoteNumber || `Quote #${quote.id}`}
                    </span>
                    {" — "}
                    {quote.projectName || "<Untitled Project>"}
                  </p>

                  <div className="d-flex flex-wrap align-items-center gap-3 text-muted small">
                    {quote.salesMember && (
                      <span>
                        by <strong>{quote.salesMember}</strong>
                      </span>
                    )}
                    <span>•</span>
                    <span className="fw-semibold text-dark">
                      {formatCurrency(quote.value)}
                    </span>
                    <span>•</span>
                    <span className="text-nowrap">
                      <Clock size={14} className="me-1 align-text-bottom" />
                      {formatRelativeTime(quote.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
