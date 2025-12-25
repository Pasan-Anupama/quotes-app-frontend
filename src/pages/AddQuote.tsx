import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuotes, type Quote } from "../App";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AddQuote() {
  const navigate = useNavigate();
  const { addQuote } = useQuotes();

  const initialQuoteValues: Quote = {
    quoteNumber: null,
    projectName: null,
    manufacturingType: null,
    enquiryType: null,
    state: null,
    dueDate: "",
    salesMember: null,
    sentTo1: null,
    estimator1: null,
    sentTo2: null,
    estimator2: null,
    sentTo3: null,
    estimator3: null,
    sentTo4: null,
    estimator4: null,
    sentTo5: null,
    estimator5: null,
    value: null,
    valueRaw: null,
  };

  const [formData, setFormData] = useState<Quote>(initialQuoteValues);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   addQuote({
  //     ...formData,
  //     price: parseFloat(formData.price) || 0,
  //   });

  //   toast.success("Quote added successfully!");

  //   // Reset form
  //   setFormData({
  //     customerName: "",
  //     description: "",
  //     date: new Date().toISOString().split("T")[0],
  //     price: "",
  //     status: "Draft",
  //     category: "",
  //     assignedTo: "",
  //     region: "",
  //   });

  //   // Redirect after toast
  //   setTimeout(() => navigate("/quotes"), 800);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/quotes", {
        ...formData,
        value: formData.value ? Number(formData.value) : null,
      });
      setSaving(false);
      toast.success("Quote added successfully!");
      setFormData(initialQuoteValues);
    } catch (err) {
      console.error(err);
      setSaving(false);
      toast.error("Data saving failed !");
    }
  };

  const handleCancel = () => navigate("/quotes");

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <button
          onClick={handleCancel}
          className="btn btn-link text-decoration-none text-muted d-flex align-items-center gap-2 mb-3 p-0"
        >
          <ArrowLeft size={18} />
          Back to Quotes
        </button>
        <h1 className="h3 mb-2">Add New Quote</h1>
        <p className="text-muted">Create a new quote record</p>
      </div>

      {/* Form Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-5">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Quote Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="quoteNumber"
                  value={formData.quoteNumber || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Quote Number"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Project Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Manufacturing Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="manufacturingType"
                  value={formData.manufacturingType || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Enquiry Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="enquiryType"
                  value={formData.enquiryType || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Due Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate || ""}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Sales Member</label>
                <input
                  type="text"
                  name="salesMember"
                  value={formData.salesMember || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Sent To 1</label>
                <input
                  type="text"
                  name="sentTo1"
                  value={formData.sentTo1 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Estimator 1</label>
                <input
                  type="text"
                  name="estimator1"
                  value={formData.estimator1 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Sent To 2</label>
                <input
                  type="text"
                  name="sentTo2"
                  value={formData.sentTo2 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Estimator 2</label>
                <input
                  type="text"
                  name="estimator2"
                  value={formData.estimator2 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Sent To 3</label>
                <input
                  type="text"
                  name="sentTo3"
                  value={formData.sentTo3 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Estimator 3 */}
              <div className="col-md-6">
                <label className="form-label fw-medium">Estimator 3</label>
                <input
                  type="text"
                  name="estimator3"
                  value={formData.estimator3 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-medium">Sent To 4</label>
                <input
                  type="text"
                  name="sentTo4"
                  value={formData.sentTo4 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Estimator 4 */}
              <div className="col-md-6">
                <label className="form-label fw-medium">Estimator 4</label>
                <input
                  type="text"
                  name="estimator4"
                  value={formData.estimator4 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Sent To 5 */}
              <div className="col-md-6">
                <label className="form-label fw-medium">Sent To 5</label>
                <input
                  type="text"
                  name="sentTo5"
                  value={formData.sentTo5 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Estimator 5 */}
              <div className="col-md-6">
                <label className="form-label fw-medium">Estimator 5</label>
                <input
                  type="text"
                  name="estimator5"
                  value={formData.estimator5 || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Value */}
              <div className="col-md-6">
                <label className="form-label fw-medium">
                  Value <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  name="value"
                  value={formData.value || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Value Raw */}
              <div className="col-md-6">
                <label className="form-label fw-medium">Value Raw</label>
                <input
                  type="number"
                  name="valueRaw"
                  value={formData.valueRaw || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Status */}
              {/* <div className="col-md-6">
                <label className="form-label fw-medium">
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div> */}

              {/* Category */}
              {/* <div className="col-md-6">
                <label className="form-label fw-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  <option>Software</option>
                  <option>Hardware</option>
                  <option>Consulting</option>
                  <option>Support</option>
                  <option>Training</option>
                </select>
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline-secondary px-5"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-5">
                Add Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
