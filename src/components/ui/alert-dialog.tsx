// // components/AlertDialog.tsx
// import { useEffect, useRef } from "react";
// import { Modal } from "bootstrap";

// /**
//  * BootstrapModal — Enables all Bootstrap modals in the app
//  *
//  * Usage:
//  *   <div className="modal fade" tabIndex={-1} id="deleteQuoteModal">
//  *     <div className="modal-dialog">
//  *       <div className="modal-content">
//  *         <div className="modal-header">
//  *           <h5 className="modal-title text-danger">Confirm Delete</h5>
//  *           <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//  *         </div>
//  *         <div className="modal-body">
//  *           Are you sure you want to delete this quote?
//  *         </div>
//  *         <div className="modal-footer">
//  *           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//  *           <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
//  *         </div>
//  *       </div>
//  *     </div>
//  *   </div>
//  */

// export function BootstrapModal() {
//   const init = useRef(false);
//   useEffect(() => {
//     if (init.current) return;
//     init.current = true;
//     document.querySelectorAll(".modal").forEach((el) => new Modal(el));
//   }, []);
//   return null;
// }
