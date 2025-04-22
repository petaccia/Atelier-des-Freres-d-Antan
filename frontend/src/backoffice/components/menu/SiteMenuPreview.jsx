'use client';
import { useState, useEffect } from 'react';
import {
  MdKeyboardArrowDown,
  MdCheck,
  MdClose,
  MdPhoneIphone,
  MdTablet,
  MdLaptop,
  MdDesktopWindows,
  MdFullscreen
} from 'react-icons/md';
import Link from 'next/link';

export default function SiteMenuPreview({ menuItems, onConfirm, onCancel, initialDeviceType = 'desktop' }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [rotatedArrows, setRotatedArrows] = useState({});
  const [deviceType, setDeviceType] = useState(initialDeviceType);
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [previewHeight, setPreviewHeight] = useState('auto');
  const [isMobileView, setIsMobileView] = useState(false);

  // Définir les dimensions en fonction du type d'appareil
  useEffect(() => {
    switch (deviceType) {
      case 'mobile':
        setPreviewWidth('375px');
        setPreviewHeight('667px');
        setIsMobileView(true);
        break;
      case 'tablet':
        setPreviewWidth('768px');
        setPreviewHeight('1024px');
        setIsMobileView(true);
        break;
      case 'laptop':
        setPreviewWidth('1024px');
        setPreviewHeight('auto');
        setIsMobileView(false);
        break;
      case 'desktop':
        setPreviewWidth('1280px');
        setPreviewHeight('auto');
        setIsMobileView(false);
        break;
      default:
        setPreviewWidth('100%');
        setPreviewHeight('auto');
        setIsMobileView(false);
    }
  }, [deviceType]);

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
        {/* Contrôles de taille d'écran */}
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setDeviceType('mobile')}
            className={`p-2 rounded-md transition-colors ${deviceType === 'mobile' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
            title="Mobile (375px)"
          >
            <MdPhoneIphone size={20} />
          </button>
          <button
            onClick={() => setDeviceType('tablet')}
            className={`p-2 rounded-md transition-colors ${deviceType === 'tablet' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
            title="Tablette (768px)"
          >
            <MdTablet size={20} />
          </button>
          <button
            onClick={() => setDeviceType('laptop')}
            className={`p-2 rounded-md transition-colors ${deviceType === 'laptop' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
            title="Portable (1024px)"
          >
            <MdLaptop size={20} />
          </button>
          <button
            onClick={() => setDeviceType('desktop')}
            className={`p-2 rounded-md transition-colors ${deviceType === 'desktop' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
            title="Bureau (1280px)"
          >
            <MdDesktopWindows size={20} />
          </button>
        </div>

        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Prévisualisation <span className="text-accent text-base">{deviceType === 'mobile' ? '(Mobile)' : deviceType === 'tablet' ? '(Tablette)' : deviceType === 'laptop' ? '(Portable)' : '(Bureau)'}</span></h2>
        </div>

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
      <div className="p-6 flex justify-center bg-gray-50">

        {/* Conteneur avec bordure pour simuler un écran */}
        <div
          className={`bg-white overflow-hidden border-2 border-gray-300 rounded-lg shadow-lg ${isMobileView ? 'mx-auto' : 'w-full'}`}
          style={{
            width: previewWidth,
            height: previewHeight,
            maxWidth: '100%',
            transition: 'width 0.3s, height 0.3s'
          }}
        >
          {/* Simulation de l'en-tête du site */}
          <div className="bg-primary p-6">
            <div className={`${isMobileView ? 'flex flex-col items-center space-y-4' : 'flex justify-between items-center'}`}>
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                LOGO
              </div>

              {/* Menu principal - version desktop */}
              {!isMobileView && (
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
              )}

              {/* Menu principal - version mobile */}
              {isMobileView && (
                <div className="w-full">
                  <button className="w-full flex items-center justify-between p-3 bg-primary-dark/30 text-white rounded-lg">
                    <span>Menu</span>
                    <MdKeyboardArrowDown size={24} />
                  </button>

                  {/* Exemple de menu mobile déployé */}
                  <div className="mt-2 bg-primary-dark/50 rounded-lg p-2 space-y-1">
                    {menuItems.map((item) => {
                      const hasChildren = item.children && item.children.length > 0;

                      return (
                        <div key={item.id} className="text-white">
                          <div className="p-2 hover:bg-primary-dark/70 rounded cursor-pointer">
                            {item.title}
                          </div>

                          {/* Sous-menu mobile */}
                          {hasChildren && (
                            <div className="pl-4 mt-1 space-y-1 border-l border-accent/30">
                              {item.children.map((child) => (
                                <div
                                  key={child.id}
                                  className="p-2 hover:bg-primary-dark/70 rounded cursor-pointer"
                                >
                                  {child.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contenu de la page (simulation) */}
          <div className="p-6 bg-white">
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              Contenu de la page
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className="bg-gray-100 p-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Note :</strong> Cette prévisualisation montre l'apparence du menu sur différents appareils.
          Utilisez les boutons en haut pour basculer entre les différentes tailles d'écran.
        </p>
      </div>
    </div>
  );
}
