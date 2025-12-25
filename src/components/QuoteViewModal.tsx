// components/QuoteViewModal.tsx
import { Download } from "lucide-react";
import type { Quote } from "../App";

interface Props {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteViewModal({ quote, isOpen, onClose }: Props) {
  if (!isOpen || !quote) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString || "-";
    }
  };

  const formatCurrency = (value: number | null) => {
    return value != null ? `$${value.toLocaleString()}` : "-";
  };

  return (
    <div className="modal d-block bg-black bg-opacity-50" tabIndex={-1}>
      <div className="modal-dialog modal-xl">
        {" "}
        {/* Larger modal for full details */}
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title h4 fw-bold">Quote Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body pt-2">
            {/* Basic Information */}
            <div className="row g-4 mb-5">
              <div className="col-lg-4">
                <strong className="text-muted small">Quote Number</strong>
                <p className="mb-0 fw-semibold">{quote.quoteNumber || "-"}</p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Project Name</strong>
                <p className="mb-0 fw-semibold">{quote.projectName || "-"}</p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Manufacturing Type</strong>
                <p className="mb-0">{quote.manufacturingType || "-"}</p>
              </div>

              <div className="col-lg-4">
                <strong className="text-muted small">Enquiry Type</strong>
                <p className="mb-0">{quote.enquiryType || "-"}</p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">State</strong>
                <p className="mb-0 fw-semibold">{quote.state || "-"}</p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Due Date</strong>
                <p className="mb-0">{formatDate(quote.dueDate)}</p>
              </div>

              <div className="col-lg-4">
                <strong className="text-muted small">Sales Member</strong>
                <p className="mb-0">{quote.salesMember || "-"}</p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Value</strong>
                <p className="mb-0 fw-bold text-primary">
                  {formatCurrency(quote.value)}
                </p>
              </div>
              <div className="col-lg-4">
                <strong className="text-muted small">Value Raw</strong>
                <p className="mb-0">{formatCurrency(quote.valueRaw)}</p>
              </div>
            </div>

            {/* Estimators Section */}
            <h6 className="fw-bold text-primary mb-3">Estimators</h6>
            <div className="row g-4">
              {[1, 2, 3, 4, 5].map((num) => {
                const sentTo = quote[`sentTo${num}` as keyof Quote] as
                  | string
                  | null;
                const estimator = quote[`estimator${num}` as keyof Quote] as
                  | string
                  | null;

                return (
                  <div key={num} className="col-lg-6">
                    <div className="border rounded p-3 bg-light">
                      <div className="row">
                        <div className="col-sm-6">
                          <strong className="text-muted small">
                            Sent To {num}
                          </strong>
                          <p className="mb-0">
                            {sentTo || <em className="text-muted">Not sent</em>}
                          </p>
                        </div>
                        <div className="col-sm-6">
                          <strong className="text-muted small">
                            Estimator {num}
                          </strong>
                          <p className="mb-0">
                            {estimator || (
                              <em className="text-muted">Not assigned</em>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-footer border-0">
            <button
              className="btn btn-outline-primary d-flex align-items-center gap-2"
              onClick={() => alert("PDF export coming soon!")}
            >
              <Download size={18} />
              Export PDF
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
