"use client";

import { useMenuCreate } from "@/backoffice/hooks/menu/useMenuCreate";
import { useDeleteMenu } from "@/backoffice/hooks/menu/useDeleteMenu";
import { useMenuUpdate } from "@/backoffice/hooks/menu/useMenuUpdate";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SelectInput from "./inputs/SelectInput";
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";
import ToggleInput from "./inputs/ToggleInput";
import IconSelect from "./inputs/IconSelect";
import { showConfirmationToast } from "@/backoffice/components/ui/confirmation/ShowConfirmationToast";

const MenuItemForm = ({ onCancel, menuItems, onSuccess, mode = "add", itemToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    menuType: "BOTH",
    isActive: true,
    showIcon: true,
    parentId: "",
    icon: "",
    order: 0,
  });

  // Initialiser le formulaire avec les données de l'élément à modifier ou supprimer
  useEffect(() => {
    if ((mode === "edit" || mode === "delete") && itemToEdit) {
      // Déterminer le type de menu en fonction du device sélectionné
      let menuType = "BOTH";
      if (itemToEdit.selectedDevice) {
        menuType = itemToEdit.selectedDevice === "desktop" ? "DESKTOP" : "MOBILE";
      }

      setFormData({
        title: itemToEdit.title || "",
        path: itemToEdit.path || "",
        menuType: menuType,
        isActive: itemToEdit.isActive !== undefined ? itemToEdit.isActive : true,
        showIcon: itemToEdit.showIcon !== undefined ? itemToEdit.showIcon : true,
        parentId: itemToEdit.parentId || "",
        icon: itemToEdit.icon || "",
        order: itemToEdit.order !== undefined ? itemToEdit.order : 0,
      });

      console.log("Initialisation du formulaire avec menuType:", menuType);
    }
  }, [mode, itemToEdit]);

  const { createMenuItem, isLoading: isLoadingCreate, error: errorCreate } = useMenuCreate();
  const { updateMenuItem, isLoading: isLoadingUpdate, error: errorUpdate } = useMenuUpdate();
  const {
    deleteMenuItem,
    isLoading: isLoadingDelete,
    error: errorDelete,
  } = useDeleteMenu({
    onSuccess: () => {
      console.log("Callback onSuccess appelé dans MenuItemForm");
      if (onSuccess) {
        console.log("Appel de onSuccess depuis MenuItemForm");
        onSuccess();
      } else {
        console.warn("onSuccess n'est pas défini dans MenuItemForm");
      }
      console.log("Fermeture de la modale");
      onCancel(); // Fermer la modale après suppression
    },
  });

  // Déterminer l'état de chargement et l'erreur en fonction du mode
  let isLoading, error;
  switch (mode) {
    case "add":
      isLoading = isLoadingCreate;
      error = errorCreate;
      break;
    case "edit":
      isLoading = isLoadingUpdate;
      error = errorUpdate;
      break;
    case "delete":
      isLoading = isLoadingDelete;
      error = errorDelete;
      break;
    default:
      isLoading = false;
      error = null;
  }

  const isPathExists = (path, excludeId = null) => {
    return menuItems.some((item) => item.path === path && item.id !== excludeId);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "parentId"
            ? value === ""
              ? null
              : Number(value)
            : name === "order"
              ? Number(value)
              : value,
    }));
  };

  const handleIconChange = (icon) => {
    setFormData((prev) => ({ ...prev, icon: icon }));
  };

  const submitAddForm = async () => {
    try {
      const result = await createMenuItem(formData);
      if (!result.error) {
        // Le toast de succès est déjà affiché dans le hook useMenuCreate
        console.log("Menu ajouté avec succès");
        if (onSuccess) {
          onSuccess();
        }
        onCancel(); // Fermer le modal après succès
      }
    } catch (err) {
      console.error("Erreur lors de la création du menu:", err);
    }
  };

  const submitEditForm = async () => {
    try {
      if (!itemToEdit || !itemToEdit.id) {
        console.error("Impossible de modifier le menu: ID manquant");
        return;
      }

      const result = await updateMenuItem(itemToEdit.id, formData);
      if (!result.error) {
        console.log("Menu mis à jour avec succès");
        if (onSuccess) {
          onSuccess();
        }
        onCancel(); // Fermer le modal après succès
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour du menu:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (mode) {
      case "add":
        // Vérification pour l'ajout
        if (isPathExists(formData.path)) {
          toast.error(`Le chemin "${formData.path}" existe déjà. Veuillez en choisir un autre.`);
          return;
        }

        showConfirmationToast({
          message: <div>Êtes-vous sûr de vouloir ajouter cette page ?</div>,
          onConfirm: submitAddForm,
          confirmText: "Confirmer",
          cancelText: "Annuler",
        });
        break;

      case "edit":
        // Pas besoin de vérifier le chemin car il n'est pas modifiable

        showConfirmationToast({
          message: <div>Êtes-vous sûr de vouloir modifier cette page ?</div>,
          onConfirm: submitEditForm,
          confirmText: "Confirmer",
          cancelText: "Annuler",
        });
        break;

      case "delete":
        // En mode suppression, appeler directement deleteMenuItem
        console.log("Mode suppression, appel direct de deleteMenuItem");
        if (itemToEdit) {
          console.log("Appel de deleteMenuItem avec:", itemToEdit);
          deleteMenuItem(itemToEdit);
        } else {
          console.warn("itemToEdit est null ou undefined");
        }
        break;

      default:
        console.warn(`Mode non reconnu: ${mode}`);
    }
  };

  const menuTypeOptions = [
    { value: "BOTH", label: "Desktop et Mobile" },
    { value: "DESKTOP", label: "Desktop" },
    { value: "MOBILE", label: "Mobile" },
  ];

  const parentOptions = [
    { value: "", label: "Aucun parent (niveau racine)" },
    ...menuItems.map((item) => ({
      value: item.id,
      label: item.title,
    })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "delete" && (
        <div className="bg-red-900/20 p-4 rounded-lg mb-6">
          <div className="text-center text-red-400 font-medium mb-2">
            Vous êtes sur le point de supprimer cet élément de menu
          </div>
          <div className="text-center text-white/70 text-sm">
            Veuillez vérifier les informations ci-dessous avant de confirmer la suppression.
          </div>
        </div>
      )}

      {mode === "edit" && (
        <div className="bg-blue-900/20 p-4 rounded-lg mb-6">
          <div className="text-center text-blue-400 font-medium mb-2">
            Modification d'un élément de menu
          </div>
          <div className="text-center text-white/70 text-sm">
            Modifiez les informations ci-dessous puis cliquez sur "Modifier" pour enregistrer les
            changements.
          </div>
        </div>
      )}

      <SelectInput
        label="Type de menu"
        id="menuType"
        name="menuType"
        value={formData.menuType}
        onChange={handleChange}
        options={menuTypeOptions}
        disabled={mode === "delete"}
      />

      <TextInput
        label="Titre de la page"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        disabled={mode === "delete"}
      />

      <TextInput
        label="Chemin URL"
        id="path"
        name="path"
        value={formData.path}
        onChange={handleChange}
        required
        disabled={mode === "delete"}
        readOnly={mode === "edit"}
        helpText={
          mode === "edit"
            ? "⚠️ Le chemin URL ne peut pas être modifié pour éviter les conflits"
            : "Exemple: /a-propos"
        }
      />

      <SelectInput
        label="Page parente"
        id="parentId"
        name="parentId"
        value={formData.parentId}
        onChange={handleChange}
        options={parentOptions}
        disabled={mode === "delete"}
      />

      <NumberInput
        label="Ordre d'affichage"
        id="order"
        name="order"
        value={formData.order}
        onChange={handleChange}
        min={0}
        step={1}
        disabled={mode === "delete"}
        helpText="Détermine la position de l'élément dans le menu (0 = premier)"
      />

      <div className="flex items-center gap-6">
        <ToggleInput
          label="Page active"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          disabled={mode === "delete"}
        />

        <ToggleInput
          label="Afficher l'icône"
          id="showIcon"
          name="showIcon"
          checked={formData.showIcon}
          onChange={handleChange}
          disabled={mode === "delete"}
        />
      </div>

      {formData.showIcon && (
        <IconSelect
          value={formData.icon}
          onChange={handleIconChange}
          disabled={mode === "delete"}
        />
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-whiteGray hover:text-accent-light transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 ${
            mode === "delete"
              ? "bg-red-600 hover:bg-red-700"
              : mode === "edit"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-accent hover:bg-accent-light"
          } text-white rounded-lg transition-colors`}
        >
          {isLoading
            ? "Chargement..."
            : mode === "delete"
              ? "Supprimer"
              : mode === "edit"
                ? "Modifier"
                : "Ajouter"}
        </button>
      </div>
      {error && <p className="font-bold text-red-500">{error}</p>}
    </form>
  );
};

export default MenuItemForm;
