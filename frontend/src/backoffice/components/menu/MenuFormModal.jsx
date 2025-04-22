'use client';
import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

export default function MenuFormModal({ isOpen, onClose, onSubmit, menuItems, editItem = null }) {
  const [formData, setFormData] = useState({
    title: '',
    path: '/',
    order: 0,
    parentId: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Si nous éditons un élément existant, remplir le formulaire avec ses données
  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title || '',
        path: editItem.path || '/',
        order: editItem.order || 0,
        parentId: editItem.parentId || null
      });
    } else {
      // Réinitialiser le formulaire si nous créons un nouvel élément
      setFormData({
        title: '',
        path: '/',
        order: 0,
        parentId: null
      });
    }
  }, [editItem, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.path.trim()) {
      newErrors.path = 'Le chemin est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleParentChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      parentId: value === '' ? null : parseInt(value, 10)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({ ...prev, submit: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-primary-dark rounded-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <MdClose size={24} />
        </button>
        
        <h2 className="text-xl font-semibold text-accent mb-6">
          {editItem ? 'Modifier un élément du menu' : 'Ajouter un élément au menu'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <div>
            <label htmlFor="title" className="block text-white/80 mb-1">
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                errors.title ? 'border-red-500' : 'border-accent/30'
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          
          {/* Chemin */}
          <div>
            <label htmlFor="path" className="block text-white/80 mb-1">
              Chemin
            </label>
            <input
              type="text"
              id="path"
              name="path"
              value={formData.path}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white ${
                errors.path ? 'border-red-500' : 'border-accent/30'
              }`}
            />
            {errors.path && (
              <p className="text-red-500 text-sm mt-1">{errors.path}</p>
            )}
          </div>
          
          {/* Ordre */}
          <div>
            <label htmlFor="order" className="block text-white/80 mb-1">
              Ordre
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white"
            />
          </div>
          
          {/* Parent (pour les sous-menus) */}
          <div>
            <label htmlFor="parentId" className="block text-white/80 mb-1">
              Parent (optionnel)
            </label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId || ''}
              onChange={handleParentChange}
              className="w-full px-3 py-2 bg-primary border border-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-white"
            >
              <option value="">Aucun (élément principal)</option>
              {menuItems
                .filter(item => !item.parentId) // Ne montrer que les éléments principaux comme parents possibles
                .map(item => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
          
          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-accent/30 text-white/80 rounded-lg hover:bg-accent/10 transition-colors"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent hover:bg-accent-light text-primary rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : editItem ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
