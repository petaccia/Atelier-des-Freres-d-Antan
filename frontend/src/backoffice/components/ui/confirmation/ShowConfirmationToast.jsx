import ConfirmationToast from "./ConfirmationToast";

// Fonction utilitaire pour afficher le toast de confirmation
export function showConfirmationToast(options) {
  return toast.info(
    <ConfirmationToast {...options} />,
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false
    }
  );
};
