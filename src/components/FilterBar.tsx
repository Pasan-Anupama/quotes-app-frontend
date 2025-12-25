// components/FilterBar.tsx
import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (v: string) => void;
  selectedStatus: string;
  onStatusChange: (v: string) => void;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  dateFrom: string;
  onDateFromChange: (v: string) => void;
  dateTo: string;
  onDateToChange: (v: string) => void;
  minPrice: string;
  onMinPriceChange: (v: string) => void;
  maxPrice: string;
  onMaxPriceChange: (v: string) => void;
  onReset: () => void;
}

export default function FilterBar(props: FilterBarProps) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex align-items-center gap-2 mb-4">
          <Filter size={20} />
          <h5 className="mb-0">Filters</h5>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <label className="form-label">Search</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Customer, description, or ID..."
                value={props.searchTerm}
                onChange={(e) => props.onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={props.selectedStatus}
              onChange={(e) => props.onStatusChange(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={props.selectedCategory}
              onChange={(e) => props.onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Consulting">Consulting</option>
              <option value="Support">Support</option>
              <option value="Training">Training</option>
            </select>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <label className="form-label">Date From</label>
            <input
              type="date"
              className="form-control"
              value={props.dateFrom}
              onChange={(e) => props.onDateFromChange(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <label className="form-label">Date To</label>
            <input
              type="date"
              className="form-control"
              value={props.dateTo}
              onChange={(e) => props.onDateToChange(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <label className="form-label">Min Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="0"
              value={props.minPrice}
              onChange={(e) => props.onMinPriceChange(e.target.value)}
            />
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <label className="form-label">Max Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="999999"
              value={props.maxPrice}
              onChange={(e) => props.onMaxPriceChange(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button onClick={props.onReset} className="btn btn-outline-secondary">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
