import { toast } from "react-toastify";
import React from "react";

export default function ConfirmationToast({
  message,
  onConfirm,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  confirmClass = "bg-accent hover:bg-accent-light",
  cancelClass = "bg-gray-600 hover:bg-gray-700",
}) {
  // Render message differently based on its type
  const renderMessage = () => {
    // If message is a React element, render it directly
    if (React.isValidElement(message)) {
      return message;
    }
    // Otherwise, wrap it in a div
    return <div>{message}</div>;
  };

  return (
    <div>
      {renderMessage()}
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          className={`px-3 py-1 text-white rounded-md transition-colors ${confirmClass}`}
        >
          {confirmText}
        </button>
        <button
          onClick={() => toast.dismiss()}
          className={`px-3 py-1 text-white rounded-md transition-colors ${cancelClass}`}
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
