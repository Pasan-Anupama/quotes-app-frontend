// components/Accordion.tsx
import { useEffect, useRef } from "react";

/**
 * BootstrapAccordion — A lightweight wrapper that enables Bootstrap collapse
 * 
 * Usage:
 *   <div className="accordion">
 *     <div className="accordion-item">
 *       <h2 className="accordion-header">
 *         <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse1">
 *           Section 1
 *         </button>
 *       </h2>
 *       <div id="collapse1" className="accordion-collapse collapse show">
 *         <div className="accordion-body">Content here</div>
 *       </div>
 *     </div>
 *   </div>
 * 
 * Just use Bootstrap's native markup — no wrapper components needed!
 */

export function BootstrapAccordion() {
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Initialize all Bootstrap collapse elements
    const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"]');
    collapseElements.forEach((el) => {
      new bootstrap.Collapse(el, {
        toggle: false,
      });
    });
  }, []);

  // This component renders nothing — just enables collapse
  return null;
}