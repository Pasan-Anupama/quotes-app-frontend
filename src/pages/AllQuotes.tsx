import { useState, useMemo, useEffect } from "react";
import { useQuotes, type Quote } from "../App";
import axios from "axios";
import { toast } from "sonner";
import { Download } from "lucide-react";
import QuoteTable from "../components/QuoteTable";
import FilterBar from "../components/FilterBar";
import QuoteViewModal from "../components/QuoteViewModal";
import QuoteEditModal from "../components/QuoteEditModal";
import DeleteConfirmationModal from "../components/DeleteConfirmation";

export default function AllQuotes() {
  const { quotes, updateQuote, deleteQuote } = useQuotes();
  const [fetchedQuotes, setFetchedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Filtered quotes
  // const filteredQuotes = useMemo(() => {
  //   return quotes.filter((quote) => {
  //     if (searchTerm) {
  //       const term = searchTerm.toLowerCase();
  //       if (
  //         !quote.customerName.toLowerCase().includes(term) &&
  //         !quote.description.toLowerCase().includes(term) &&
  //         !quote.id.toLowerCase().includes(term)
  //       ) {
  //         return false;
  //       }
  //     }
  //     if (selectedStatus && quote.status !== selectedStatus) return false;
  //     if (selectedCategory && quote.category !== selectedCategory) return false;
  //     if (dateFrom && new Date(quote.date) < new Date(dateFrom)) return false;
  //     if (dateTo && new Date(quote.date) > new Date(dateTo)) return false;
  //     if (minPrice && quote.price < parseFloat(minPrice)) return false;
  //     if (maxPrice && quote.price > parseFloat(maxPrice)) return false;
  //     return true;
  //   });
  // }, [
  //   quotes,
  //   searchTerm,
  //   selectedStatus,
  //   selectedCategory,
  //   dateFrom,
  //   dateTo,
  //   minPrice,
  //   maxPrice,
  // ]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/quotes");
      setFetchedQuotes(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (quote: Quote) => {
    setSelectedQuote(quote);
    setViewModalOpen(true);
  };

  const handleEdit = (quote: Quote) => {
    setSelectedQuote(quote);
    setEditModalOpen(true);
  };

  const handleDelete = (quote: Quote) => {
    setSelectedQuote(quote);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async (id: string | number, data: Partial<Quote>) => {
    if (!id) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/quotes/${id}`,
        data
      );

      setFetchedQuotes((prev) =>
        prev.map((quote) =>
          quote.id === id ? { ...quote, ...response.data } : quote
        )
      );

      updateQuote(id.toString(), data);

      toast.success("Quote updated successfully!");
      setEditModalOpen(false);
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(
        err.response?.data?.error || "Failed to update quote. Please try again."
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedQuote?.id) return;

    setDeleting(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/quotes/${selectedQuote.id}`
      );

      setFetchedQuotes((prev) => prev.filter((q) => q.id !== selectedQuote.id));
      deleteQuote(selectedQuote.id);
      toast.success("Quote deleted successfully!");

      setDeleteModalOpen(false);
      setSelectedQuote(null);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete quote");
    } finally {
      setDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedCategory("");
    setDateFrom("");
    setDateTo("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleExport = () => {
    toast.success("Export started — CSV/Excel download would begin here");
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-5 flex-wrap gap-3">
        <div>
          <h1 className="h3 mb-1">All Quotes</h1>
          <p className="text-muted mb-0">
            Manage and view all your quotes
            {/* <strong>{filteredQuotes.length}</strong>{" "}
            {filteredQuotes.length === 1 ? "quote" : "quotes"}) */}
          </p>
        </div>

        <button
          onClick={handleExport}
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Filters + Table */}
      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <FilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                dateFrom={dateFrom}
                onDateFromChange={setDateFrom}
                dateTo={dateTo}
                onDateToChange={setDateTo}
                minPrice={minPrice}
                onMinPriceChange={setMinPrice}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
                onReset={handleResetFilters}
              />

              <div className="mt-4">
                <QuoteTable
                  quotes={fetchedQuotes}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuoteViewModal
        quote={selectedQuote}
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
      />

      <QuoteEditModal
        quote={selectedQuote}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationModal
        quote={selectedQuote}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        deleting={deleting}
      />
    </div>
  );
}
