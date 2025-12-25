import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  Settings,
  Moon,
  LogOut,
} from "lucide-react";
import { useTheme } from "../App";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/quotes", icon: FileText, label: "View All Quotes" },
    { path: "/add-quote", icon: PlusCircle, label: "Quote Register" },
    { path: "/analytics", icon: BarChart3, label: "Analytics / Reports" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside
      className="d-flex flex-column vh-100 position-fixed start-0 top-0 bg-white border-end border-light-subtle"
      style={{ width: "256px" }}
    >
      {/* Logo */}
      <div className="p-4 border-bottom border-light-subtle">
        <h1 className="h4 fw-bold text-primary mb-0">Quote Manager</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-fill overflow-auto py-3">
        <div className="nav nav-pills flex-column px-3 gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-4 py-3 rounded-pill text-nowrap ${
                  isActive
                    ? "bg-primary-subtle text-primary fw-medium"
                    : "text-secondary hover-bg-light"
                }`
              }
            >
              <item.icon size={20} />
              <span className="fs-6">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="border-top border-light-subtle p-3">
        <div className="d-grid gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary d-flex align-items-center gap-3 rounded-pill py-3 justify-content-start text-secondary"
          >
            <Moon size={20} />
            <span className="fs-6">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>

          {/* Logout */}
          <button className="btn btn-outline-secondary d-flex align-items-center gap-3 rounded-pill py-3 justify-content-start text-secondary">
            <LogOut size={20} />
            <span className="fs-6">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
