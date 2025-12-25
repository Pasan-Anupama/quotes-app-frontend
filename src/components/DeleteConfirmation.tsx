// components/DeleteConfirmation.tsx
import { AlertTriangle } from "lucide-react";
import type { Quote } from "../App";

interface Props {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
}

export default function DeleteConfirmationModal({
  quote,
  isOpen,
  onClose,
  onConfirm,
  deleting,
}: Props) {
  if (!isOpen || !quote) return null;

  return (
    <div className="modal d-block bg-black bg-opacity-50" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header text-danger">
            <h5 className="modal-title d-flex align-items-center gap-2">
              <AlertTriangle size={20} /> Confirm Delete
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to delete this quote? This action cannot be
              undone.
            </p>
            <div className="bg-light p-3 rounded">
              <p className="mb-1">
                <strong>ID:</strong> {quote.id}
              </p>
              <p className="mb-1">
                <strong>Quote Number:</strong> {quote.quoteNumber}
              </p>
              <p className="mb-1">
                <strong>Project Name:</strong> {quote.projectName}
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center gap-2"
              onClick={onConfirm}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deleting...
                </>
              ) : (
                "Delete Quote"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
