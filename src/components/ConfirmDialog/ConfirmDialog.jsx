import { useEffect, useRef } from "react";
import { useModalKeyboard } from "../../hooks/useModalKeyboard.js";
import "./ConfirmDialog.css";

/**
 * Generic destructive-action confirmation dialog. Reuses the same
 * modal chrome and keyboard behavior as AddHabitSheet. Focus defaults
 * to Cancel, not the destructive action.
 *
 * Props:
 *   habitName: string
 *   onConfirm: () => void
 *   onCancel: () => void
 */
function ConfirmDialog({ habitName, onConfirm, onCancel }) {
  const cancelRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => cancelRef.current?.focus());
  }, []);

  useModalKeyboard(dialogRef, onCancel);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-sheet"
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-sheet__handle" aria-hidden="true" />

        <h2 className="confirm-dialog__title" id="confirm-dialog-title">
          Delete "{habitName}"?
        </h2>
        <p className="confirm-dialog__message" id="confirm-dialog-message">
          This action cannot be undone. Its history, streak, and completion
          data will be permanently deleted.
        </p>

        <div className="modal-actions">
          <button ref={cancelRef} type="button" className="modal-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="modal-btn modal-btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
