// // components/Sidebar.tsx
// import { useState, useEffect } from "react";
// import {
//   PanelLeft,
//   PanelRight,
//   LayoutDashboard,
//   FileText,
//   PlusCircle,
//   BarChart3,
//   Settings,
//   Moon,
//   LogOut,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const SIDEBAR_WIDTH = "280px";
// const SIDEBAR_COLLAPSED_WIDTH = "70px";

// export default function Sidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Keyboard shortcut: Ctrl/Cmd + B
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setIsCollapsed((prev) => !prev);
//       }
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   const navItems = [
//     { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//     { path: "/quotes", icon: FileText, label: "View All Quotes" },
//     { path: "/add-quote", icon: PlusCircle, label: "Quote Register" },
//     { path: "/analytics", icon: BarChart3, label: "Analytics / Reports" },
//     { path: "/settings", icon: Settings, label: "Settings" },
//   ];

//   const toggleSidebar = () => setIsCollapsed((prev) => !prev);
//   const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

//   return (
//     <>
//       {/* Mobile Offcanvas */}
//       <div
//         className="offcanvas offcanvas-start bg-white shadow-lg"
//         tabIndex={-1}
//         id="sidebarMobile"
//         aria-labelledby="sidebarMobileLabel"
//         style={{ width: "280px" }}
//         data-bs-backdrop="true"
//         data-bs-scroll="true"
//         show={isMobileMenuOpen.toString()}
//       >
//         <div className="offcanvas-header border-bottom">
//           <h5
//             className="offcanvas-title fw-bold text-primary"
//             id="sidebarMobileLabel"
//           >
//             Quote Manager
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="offcanvas"
//             onClick={toggleMobileMenu}
//             aria-label="Close"
//           />
//         </div>
//         <div className="offcanvas-body p-0">
//           <SidebarContent items={navItems} collapsed={false} />
//         </div>
//       </div>

//       {/* Desktop Sidebar */}
//       <aside
//         className="d-none d-md-block bg-white border-end position-fixed top-0 start-0 h-100 transition-all duration-300 z-1030"
//         style={{
//           width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
//           transition: "width 0.3s ease",
//         }}
//       >
//         {/* Header */}
//         <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
//           <h1
//             className="h5 mb-0 fw-bold text-primary"
//             style={{ opacity: isCollapsed ? 0 : 1, transition: "opacity 0.2s" }}
//           >
//             Quote Manager
//           </h1>
//           <button
//             onClick={toggleSidebar}
//             className="btn btn-sm btn-outline-secondary p-1"
//             data-bs-toggle="tooltip"
//             data-bs-placement="right"
//             title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
//           >
//             {isCollapsed ? <PanelRight size={18} /> : <PanelLeft size={18} />}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="p-3 flex-fill overflow-y-auto">
//           <SidebarContent items={navItems} collapsed={isCollapsed} />
//         </nav>

//         {/* Bottom Actions */}
//         <div className="border-top p-3">
//           <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 mb-2">
//             <Moon size={18} />
//             <span className={isCollapsed ? "d-none" : ""}>Dark Mode</span>
//           </button>
//           <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
//             <LogOut size={18} />
//             <span className={isCollapsed ? "d-none" : ""}>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Mobile Trigger Button (Floating) */}
//       <button
//         className="d-md-none btn btn-primary rounded-circle position-fixed bottom-0 start-0 m-4 shadow-lg z-1050"
//         style={{ width: "56px", height: "56px" }}
//         onClick={toggleMobileMenu}
//         data-bs-toggle="offcanvas"
//         data-bs-target="#sidebarMobile"
//       >
//         <PanelLeft size={24} />
//       </button>

//       {/* Main content offset */}
//       <style jsx>{`
//         @media (min-width: 768px) {
//           main,
//           .offcanvas {
//             margin-left: ${isCollapsed
//               ? SIDEBAR_COLLAPSED_WIDTH
//               : SIDEBAR_WIDTH} !important;
//             transition: margin-left 0.3s ease;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// // Reusable menu content
// function SidebarContent({
//   items,
//   collapsed,
// }: {
//   items: any[];
//   collapsed: boolean;
// }) {
//   return (
//     <ul className="nav nav-pills flex-column gap-1">
//       {items.map((item) => (
//         <li className="nav-item" key={item.path}>
//           <NavLink
//             to={item.path}
//             className={({ isActive }) =>
//               `nav-link d-flex align-items-center gap-3 rounded-pill px-3 py-2 ${
//                 isActive ? "bg-primary text-white" : "text-dark"
//               } ${collapsed ? "justify-content-center" : ""}`
//             }
//             end
//           >
//             <item.icon size={20} />
//             {!collapsed && <span>{item.label}</span>}
//             {collapsed && (
//               <div
//                 className="position-absolute start-100 top-50 translate-middle-y bg-dark text-white px-2 py-1 rounded small shadow"
//                 style={{
//                   marginLeft: "10px",
//                   zIndex: 10,
//                   opacity: 0,
//                   pointerEvents: "none",
//                   transition: "opacity 0.2s",
//                 }}
//               >
//                 {item.label}
//               </div>
//             )}
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   );
// }
