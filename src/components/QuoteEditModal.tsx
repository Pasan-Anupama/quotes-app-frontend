import { useState, useEffect } from "react";
import type { Quote } from "../App";

interface Props {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | number, data: Partial<Quote>) => void;
}

export default function QuoteEditModal({
  quote,
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Partial<Quote>>({});

  // Populate form when quote changes (on open/edit)
  useEffect(() => {
    if (quote) {
      setForm({
        quoteNumber: quote.quoteNumber || "",
        projectName: quote.projectName || "",
        manufacturingType: quote.manufacturingType || "",
        enquiryType: quote.enquiryType || "",
        state: quote.state || "",
        dueDate: quote.dueDate || "",
        salesMember: quote.salesMember || "",
        sentTo1: quote.sentTo1 || "",
        estimator1: quote.estimator1 || "",
        sentTo2: quote.sentTo2 || "",
        estimator2: quote.estimator2 || "",
        sentTo3: quote.sentTo3 || "",
        estimator3: quote.estimator3 || "",
        sentTo4: quote.sentTo4 || "",
        estimator4: quote.estimator4 || "",
        sentTo5: quote.sentTo5 || "",
        estimator5: quote.estimator5 || "",
        value: quote.value || 0,
        valueRaw: quote.valueRaw || 0,
      });
    }
  }, [quote]);

  if (!isOpen || !quote) return null;

  const handleChange = (field: keyof Quote, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: Partial<Quote> = {
      quoteNumber: form.quoteNumber,
      projectName: form.projectName,
      manufacturingType: form.manufacturingType,
      enquiryType: form.enquiryType,
      state: form.state,
      dueDate: form.dueDate,
      salesMember: form.salesMember,
      sentTo1: form.sentTo1,
      estimator1: form.estimator1,
      sentTo2: form.sentTo2,
      estimator2: form.estimator2,
      sentTo3: form.sentTo3,
      estimator3: form.estimator3,
      sentTo4: form.sentTo4,
      estimator4: form.estimator4,
      sentTo5: form.sentTo5,
      estimator5: form.estimator5,
      value: form.value ? Number(form.value) : null,
      valueRaw: form.valueRaw ? Number(form.valueRaw) : null,
    };

    onSave(quote.id!, updatedData);
  };

  return (
    <div className="modal d-block bg-black bg-opacity-50" tabIndex={-1}>
      <div className="modal-dialog modal-xl">
        {" "}
        {/* Larger modal for more fields */}
        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Quote</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row g-3">
                {/* Row 1 */}
                <div className="col-md-6">
                  <label className="form-label">Quote Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.quoteNumber || ""}
                    onChange={(e) =>
                      handleChange("quoteNumber", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Project Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.projectName || ""}
                    onChange={(e) =>
                      handleChange("projectName", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Row 2 */}
                <div className="col-md-6">
                  <label className="form-label">Manufacturing Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.manufacturingType || ""}
                    onChange={(e) =>
                      handleChange("manufacturingType", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Enquiry Type *</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={form.enquiryType || ""}
                    onChange={(e) =>
                      handleChange("enquiryType", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Row 3 */}
                <div className="col-md-4">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.state || ""}
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Due Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.dueDate || ""}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Sales Member</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.salesMember || ""}
                    onChange={(e) =>
                      handleChange("salesMember", e.target.value)
                    }
                  />
                </div>

                {/* Values */}
                <div className="col-md-6">
                  <label className="form-label">Value *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.value || ""}
                    onChange={(e) => handleChange("value", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Value Raw</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.valueRaw || ""}
                    onChange={(e) => handleChange("valueRaw", e.target.value)}
                  />
                </div>

                {/* Estimators Section */}
                <div className="col-12 mt-4">
                  <h6 className="fw-bold text-primary">Estimators</h6>
                  <hr />
                </div>

                {([1, 2, 3, 4, 5] as const).map((num) => (
                  <div key={num} className="col-md-6">
                    <div className="row g-2">
                      <div className="col-6">
                        <label className="form-label">Sent To {num}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={form[`sentTo${num}` as keyof Quote] || ""}
                          onChange={(e) =>
                            handleChange(
                              `sentTo${num}` as keyof Quote,
                              e.target.value
                            )
                          }
                          placeholder={`Enter value for Sent To ${num}`}
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Estimator {num}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={form[`estimator${num}` as keyof Quote] || ""}
                          onChange={(e) =>
                            handleChange(
                              `estimator${num}` as keyof Quote,
                              e.target.value
                            )
                          }
                          placeholder={`Enter name for Estimator ${num}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
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
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
