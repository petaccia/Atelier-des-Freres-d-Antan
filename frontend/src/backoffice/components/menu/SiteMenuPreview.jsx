'use client';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdCheck, MdClose } from 'react-icons/md';
import Link from 'next/link';

export default function SiteMenuPreview({ menuItems, onConfirm, onCancel }) {
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Barre d'actions */}
      <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Prévisualisation du site</h2>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <MdClose className="mr-1" size={18} />
            Retour à l'édition
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

      {/* Prévisualisation du site */}
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-6">
          <p>Voici un aperçu de votre menu tel qu'il apparaîtra sur le site. Vérifiez que tout est correct avant de publier.</p>
        </div>

        {/* Simulation de l'en-tête du site */}
        <div className="bg-primary p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="w-32 h-32 bg-accent/20 rounded-full flex items-center justify-center text-accent">
              LOGO
            </div>
            
            {/* Menu principal */}
            <nav className="flex space-x-6 text-white">
              {menuItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hasChildren ? (
                      <button className="flex items-center hover:text-accent-light transition-colors">
                        {item.title}
                        <MdKeyboardArrowDown
                          className={`ml-1 transition-transform duration-200 ${
                            rotatedArrows[item.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <span className="hover:text-accent-light transition-colors cursor-pointer">
                        {item.title}
                      </span>
                    )}

                    {/* Sous-menu */}
                    {activeMenu === item.id && hasChildren && (
                      <div className="absolute left-0 mt-2 w-60 bg-white text-gray-800 shadow-md p-4 space-y-2 rounded-lg z-10">
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            className="px-2 py-1 hover:bg-accent/20 hover:text-accent rounded-md transition-colors cursor-pointer"
                          >
                            {child.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className="bg-gray-100 p-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Note :</strong> Cette prévisualisation montre l'apparence du menu sur le site public. 
          Les liens ne sont pas cliquables dans cette vue.
        </p>
      </div>
    </div>
  );
}
