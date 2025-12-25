import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { Toaster } from "sonner";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AllQuotes from "./pages/AllQuotes";
import AddQuote from "./pages/AddQuote";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

// Theme Context
const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Quote interface & context (unchanged)
export interface Quote {
  id?: string;
  quoteNumber: string | null;
  projectName: string | null;
  manufacturingType: string | null;
  enquiryType: string | null;
  state: string | null;
  dueDate: string;
  salesMember: string | null;
  sentTo1: string | null;
  estimator1: string | null;
  sentTo2: string | null;
  estimator2: string | null;
  sentTo3: string | null;
  estimator3: string | null;
  sentTo4: string | null;
  estimator4: string | null;
  sentTo5: string | null;
  estimator5: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  value: number | null;
  valueRaw: string | null;

  // status: "Pending" | "Approved" | "Rejected" | "Draft";
  //   customerName: string;
  //   description: string;
  //   date: string;
  //   price:
}

const QuotesContext = createContext<{
  quotes: Quote[];
  addQuote: (quote: Omit<Quote, "id" | "createdAt" | "updatedAt">) => void;
  updateQuote: (id: string, quote: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
}>({
  quotes: [],
  addQuote: () => {},
  updateQuote: () => {},
  deleteQuote: () => {},
});

export const useQuotes = () => useContext(QuotesContext);

// Mock data generator (unchanged)
const generateMockQuotes = (): Quote[] => {
  const customers = [
    "Acme Corp",
    "TechStart Inc",
    "BuildRight LLC",
    "Global Solutions",
    "Premium Services",
    "NextGen Systems",
    "Smart Industries",
    "Elite Enterprises",
  ];
  // const statuses: Quote["status"][] = [
  //   "Pending",
  //   "Approved",
  //   "Rejected",
  //   "Draft",
  // ];
  const categories = [
    "Software",
    "Hardware",
    "Consulting",
    "Support",
    "Training",
  ];
  const employees = ["John Smith", "Sarah Johnson", "Mike Chen", "Emily Davis"];
  const regions = ["North", "South", "East", "West"];

  const quotes: Quote[] = [];
  const now = new Date();

  for (let i = 1; i <= 50; i++) {
    const daysAgo = Math.floor(Math.random() * 180);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    // quotes.push({
    //   id: `Q${String(i).padStart(4, "0")}`,
    //   customerName: customers[Math.floor(Math.random() * customers.length)],
    //   description: `${
    //     categories[Math.floor(Math.random() * categories.length)]
    //   } services for Q${
    //     Math.floor(Math.random() * 4) + 1
    //   } ${date.getFullYear()}`,
    //   date: date.toISOString().split("T")[0],
    //   price: Math.floor(Math.random() * 50000) + 1000,
    //   status: statuses[Math.floor(Math.random() * statuses.length)],
    //   category: categories[Math.floor(Math.random() * categories.length)],
    //   assignedTo: employees[Math.floor(Math.random() * employees.length)],
    //   region: regions[Math.floor(Math.random() * regions.length)],
    //   createdAt: date.toISOString(),
    //   updatedAt: date.toISOString(),
    // });
  }

  return quotes
    .sort
    // (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ();
};

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [quotes, setQuotes] = useState<Quote[]>(generateMockQuotes());

  // Sync Bootstrap dark mode attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const addQuote = (
    quoteData: Omit<Quote, "id" | "createdAt" | "updatedAt">
  ) => {
    const newQuote: Quote = {
      ...quoteData,
      id: `Q${String(quotes.length + 1).padStart(4, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setQuotes((prev) => [newQuote, ...prev]);
  };

  const updateQuote = (id: string, quoteData: Partial<Quote>) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, ...quoteData, updatedAt: new Date().toISOString() }
          : q
      )
    );
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <QuotesContext.Provider
        value={{ quotes, addQuote, updateQuote, deleteQuote }}
      >
        <div className="d-flex min-vh-100 bg-body text-body">
          <BrowserRouter>
            {/* Sidebar – fixed on desktop, hidden on mobile */}
            <Sidebar />

            {/* Main content – pushed to the right on desktop */}
            <div
              className="flex-fill d-flex flex-column"
              style={{ marginLeft: "256px" }}
            >
              {/* This empty div creates the gap on mobile when offcanvas is open */}
              <div className="d-md-none" style={{ height: "0" }}></div>

              <main className="flex-fill p-4 p-md-5 overflow-auto bg-light-subtle">
                <Routes>
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/quotes" element={<AllQuotes />} />
                  <Route path="/add-quote" element={<AddQuote />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>

          <Toaster position="top-right" richColors />
        </div>
      </QuotesContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
