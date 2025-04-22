'use client';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdCheck } from 'react-icons/md';
import Link from 'next/link';

export default function MenuPreview({ menuItems, onConfirm, onCancel }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});

  const handleMouseEnter = (menuId) => {
    setActiveMenu(menuId);
    setRotatedArrows((prev) => ({ ...prev, [menuId]: true }));
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setRotatedArrows({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Prévisualisation du menu</h2>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
          >
            <MdCheck className="mr-1" size={18} />
            Confirmer et publier
          </button>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-4">
        <p className="text-sm text-gray-500 mb-4">
          Voici un aperçu de votre menu. Vérifiez que tout est correct avant de confirmer les changements.
        </p>

        {/* Prévisualisation du menu */}
        <div className="bg-primary p-4 rounded-lg">
          <nav className="flex justify-center space-x-6 text-white">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center cursor-pointer hover:text-accent-light transition-colors">
                  <span>{item.title}</span>
                  {item.children && item.children.length > 0 && (
                    <MdKeyboardArrowDown
                      className={`ml-1 transition-transform duration-300 ${
                        rotatedArrows[item.id] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Sous-menu */}
                {activeMenu === item.id && item.children && item.children.length > 0 && (
                  <div className="absolute left-0 mt-2 w-48 bg-primary-dark rounded-lg shadow-lg z-10 py-2">
                    {item.children.map((child) => (
                      <div
                        key={child.id}
                        className="px-4 py-2 hover:bg-accent/20 cursor-pointer transition-colors"
                      >
                        {child.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Note :</strong> Cette prévisualisation montre uniquement la structure du menu. 
          L'apparence exacte peut varier légèrement sur le site public.
        </p>
      </div>
    </div>
  );
}
