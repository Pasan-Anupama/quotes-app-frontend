// components/QuoteTable.tsx
import { useState } from "react";
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Quote } from "../App";

interface QuoteTableProps {
  quotes: Quote[];
  onView: (quote: Quote) => void;
  onEdit: (quote: Quote) => void;
  onDelete: (quote: Quote) => void;
}

export default function QuoteTable({
  quotes,
  onView,
  onEdit,
  onDelete,
}: QuoteTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(quotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const safeQuotes = Array.isArray(quotes) ? quotes : [];
  const currentQuotes = safeQuotes.slice(startIndex, startIndex + itemsPerPage);

  // const getStatusBadge = (status: Quote["status"]) => {
  //   const map = {
  //     Pending: "bg-warning-subtle text-warning",
  //     Approved: "bg-success-subtle text-success",
  //     Rejected: "bg-danger-subtle text-danger",
  //     Draft: "bg-secondary-subtle text-secondary",
  //   };
  //   return map[status];
  // };

  const getDisplayedRowNumber = (indexOnPage: number) => {
    return startIndex + indexOnPage + 1;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="text-center" style={{ width: "80px" }}>
                Row Number
              </th>
              <th>Quote Number</th>
              <th>Project Name</th>
              <th>Enquiry Type</th>
              <th>State</th>
              <th>Due Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQuotes.map((quote, index) => (
              <tr key={quote.id}>
                <td className="text-center fw-medium">
                  {getDisplayedRowNumber(index)}
                </td>
                <td className="fw-semibold">{quote.quoteNumber}</td>
                <td>{quote.projectName}</td>
                <td>{quote.enquiryType}</td>
                <td className="fw-semibold">${quote.state}</td>
                {/* <td>
                  <span
                    className={`badge rounded-pill ${getStatusBadge(
                      quote.status
                    )}`}
                  >
                    {quote.status}
                  </span>
                </td> */}
                <td className="fw-semibold">
                  ${new Date(quote.dueDate).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => onView(quote)}
                      className="btn btn-sm btn-outline-primary"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(quote)}
                      className="btn btn-sm btn-outline-success"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(quote)}
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="card-footer bg-transparent d-flex align-items-center justify-content-between flex-wrap gap-3 py-3">
        <div className="text-muted small">
          Showing {quotes.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, quotes.length)} of{" "}
          {quotes.length} quotes
        </div>
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => goToPage(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>
            </li>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = Math.min(currentPage - 2 + i, totalPages - 4 + i);
              }
              if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              return (
                <li
                  key={pageNum}
                  className={`page-item ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => goToPage(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
