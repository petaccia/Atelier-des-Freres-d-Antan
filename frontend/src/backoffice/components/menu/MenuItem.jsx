import { useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import MenuIcon from "./components/icons/MenuIcon";
import ModalContainer from "./components/forms/ModalContainer";
import MenuItemForm from "./components/forms/MenuItemForm";

export default function MenuItem({
  item,
  isSubmenu = false,
  selectedDevice,
  onMenuUpdated,
  menuItems,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showIcon = selectedDevice !== "desktop" && item.showIcon !== false && !isSubmenu;

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={`${isSubmenu ? "ml-8 border-l border-accent/30 pl-4" : ""} mb-4`}>
        <div className="flex flex-col bg-primary-dark/30 rounded-lg overflow-hidden hover:bg-primary-dark/40 transition-colors">
          <div className={`p-4 ${isSubmenu ? "bg-primary-dark/50" : ""}`}>
            {/* Titre principal et actions */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <MenuIcon title={item.title} showIcon={showIcon} />
                <span className="text-white font-medium">{item.title}</span>
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center">
                {/* Bouton d'édition */}
                <button
                  onClick={handleOpenEditModal}
                  className="p-2 text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors mr-1"
                  title="Modifier cet élément"
                >
                  <FiEdit size={18} />
                </button>

                {/* Bouton de suppression */}
                <button
                  onClick={handleOpenDeleteModal}
                  className="p-2 text-white/60 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  title="Supprimer cet élément"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            {/* Informations secondaires */}
            <div className="flex items-center gap-4 ml-8 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white/50">Path:</span>
                <span className="text-accent-light font-light">{item.path}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modale de suppression */}
      <ModalContainer
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={`Supprimer "${item.title}"`}
      >
        <MenuItemForm
          mode="delete"
          itemToEdit={{ ...item, selectedDevice }}
          onCancel={handleCloseDeleteModal}
          onSuccess={onMenuUpdated}
          menuItems={menuItems}
        />
      </ModalContainer>

      {/* Modale d'édition */}
      <ModalContainer
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title={`Modifier "${item.title}"`}
      >
        <MenuItemForm
          mode="edit"
          itemToEdit={{ ...item, selectedDevice }}
          onCancel={handleCloseEditModal}
          onSuccess={onMenuUpdated}
          menuItems={menuItems}
        />
      </ModalContainer>
    </>
  );
}
