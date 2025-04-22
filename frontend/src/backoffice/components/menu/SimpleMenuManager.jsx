'use client';
import { useState, useEffect } from 'react';
import { 
  MdKeyboardArrowRight, 
  MdKeyboardArrowDown,
  MdEdit,
  MdVisibility,
  MdDelete,
  MdDragIndicator,
  MdRefresh,
  MdInfo,
  MdPhoneIphone, 
  MdTablet, 
  MdLaptop, 
  MdDesktopWindows,
  MdPublish
} from 'react-icons/md';
import { BiHistory, BiEnvelope, BiStore, BiPhone, BiCog } from "react-icons/bi";
import { GiRunningShoe, GiKeyLock } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";

// URL de l'API
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const menuEndpoint = '/menu/main';

export default function SimpleMenuManager({
  onUpdate,
  onDelete,
  onToggleVisibility,
  onPublish,
  onSaveDraft,
  isLoading: externalLoading
}) {
  // États
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [expandedItems, setExpandedItems] = useState({});
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données du menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}${menuEndpoint}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Menu data from API:', data);
        setMenuData(data);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Fonction pour basculer l'expansion d'un élément
  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Fonction pour rendre l'icône en fonction du nom
  const renderIcon = (title) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('accueil')) {
      return <BiStore size={20} />;
    } else if (titleLower.includes('cordonnerie')) {
      return <GiRunningShoe size={20} />;
    } else if (titleLower.includes('serrurerie')) {
      return <GiKeyLock size={20} />;
    } else if (titleLower.includes('propos') || titleLower.includes('histoire')) {
      return <BiHistory size={20} />;
    } else if (titleLower.includes('contact')) {
      return <BiEnvelope size={20} />;
    } else if (titleLower.includes('processus') || titleLower.includes('process')) {
      return <BiCog size={20} />;
    } else if (titleLower.includes('appeler') || titleLower.includes('téléphone')) {
      return <FaPhoneAlt size={20} />;
    }
    
    return null;
  };

  // Fonction pour rendre un élément de menu
  const renderMenuItem = (item, isSubmenu = false) => {
    const isExpanded = expandedItems[item.id];
    
    return (
      <div key={item.id} className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''}`}>
        <div className={`flex items-center p-3 ${isSubmenu ? 'bg-primary-dark/50' : 'bg-primary-dark/30'} rounded-lg mb-2 group`}>
          {/* Poignée de glisser-déposer */}
          <div className="cursor-move text-white/40 hover:text-white/60 mr-3">
            <MdDragIndicator size={20} />
          </div>
          
          {/* Icône (visible uniquement pour les menus mobile et tablette) */}
          {(selectedDevice === 'mobile' || selectedDevice === 'tablet') && !isSubmenu && (
            <div className="mr-3 text-accent">
              {renderIcon(item.title)}
            </div>
          )}
          
          {/* Titre et chemin */}
          <div className="flex-grow">
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="text-sm text-white/60">{item.path || '#'}</p>
          </div>
          
          {/* Bouton d'expansion pour les éléments avec sous-menu */}
          {item.children && item.children.length > 0 && (
            <button
              onClick={() => toggleExpand(item.id)}
              className="p-2 rounded-md text-white/70 hover:bg-primary-dark/50 transition-colors mr-2"
              title={isExpanded ? "Réduire" : "Développer"}
            >
              {isExpanded ? <MdKeyboardArrowDown size={20} /> : <MdKeyboardArrowRight size={20} />}
            </button>
          )}
          
          {/* Actions */}
          <div className="flex space-x-2">
            {/* Bouton de visibilité */}
            <button
              onClick={() => onToggleVisibility(item.id, selectedDevice)}
              className="p-2 rounded-md text-white/70 hover:bg-primary-dark/50 transition-colors"
              title="Basculer la visibilité"
            >
              <MdVisibility size={18} />
            </button>
            
            {/* Bouton d'édition */}
            <button
              onClick={() => onUpdate(item.id)}
              className="p-2 rounded-md text-white/70 hover:bg-accent/20 hover:text-accent transition-colors"
              title="Éditer"
            >
              <MdEdit size={18} />
            </button>
            
            {/* Bouton de suppression */}
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 rounded-md text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              title="Supprimer"
            >
              <MdDelete size={18} />
            </button>
          </div>
        </div>
        
        {/* Sous-menu */}
        {item.children && item.children.length > 0 && isExpanded && (
          <div className="mb-4">
            {item.children.map(child => renderMenuItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  // État de chargement
  if (isLoading || externalLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-primary-dark/30 rounded-lg">
        <div className="animate-spin text-accent mb-4">
          <MdRefresh size={40} />
        </div>
        <p className="text-white">Chargement du menu...</p>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg">
        <div className="text-red-500 mb-4">
          <MdInfo size={40} />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Erreur de chargement</h3>
        <p className="text-white/80 text-center mb-4">{error}</p>
      </div>
    );
  }

  // Filtrer les éléments de menu en fonction de l'appareil sélectionné
  // Pour l'instant, nous affichons tous les éléments pour tous les appareils
  const menuItems = menuData?.menuItems || [];

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="bg-primary-dark/50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-xl font-semibold text-accent">Gestion du Menu</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSaveDraft}
              className="px-4 py-2 bg-primary-dark hover:bg-primary-dark/80 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <MdEdit size={18} />
              <span>Enregistrer brouillon</span>
            </button>
            
            <button
              onClick={onPublish}
              className="px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <MdPublish size={18} />
              <span>Publier</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Sélection d'appareil */}
      <div className="bg-primary-dark/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-white mb-3">Sélectionner un appareil</h3>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDevice('mobile')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedDevice === 'mobile' 
                ? 'bg-accent text-white' 
                : 'bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70'
            }`}
          >
            <MdPhoneIphone size={20} />
            <span>Mobile</span>
          </button>
          
          <button
            onClick={() => setSelectedDevice('tablet')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedDevice === 'tablet' 
                ? 'bg-accent text-white' 
                : 'bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70'
            }`}
          >
            <MdTablet size={20} />
            <span>Tablette</span>
          </button>
          
          <button
            onClick={() => setSelectedDevice('laptop')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedDevice === 'laptop' 
                ? 'bg-accent text-white' 
                : 'bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70'
            }`}
          >
            <MdLaptop size={20} />
            <span>Portable</span>
          </button>
          
          <button
            onClick={() => setSelectedDevice('desktop')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedDevice === 'desktop' 
                ? 'bg-accent text-white' 
                : 'bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70'
            }`}
          >
            <MdDesktopWindows size={20} />
            <span>Bureau</span>
          </button>
        </div>
      </div>
      
      {/* Contenu du menu */}
      <div className="bg-primary-dark/20 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-accent">
            Menu {
              selectedDevice === 'mobile' 
                ? 'Mobile' 
                : selectedDevice === 'tablet' 
                  ? 'Tablette' 
                  : selectedDevice === 'laptop' 
                    ? 'Portable' 
                    : 'Bureau'
            }
          </h3>
          
          <div className="text-white/60 text-sm">
            {selectedDevice === 'mobile' || selectedDevice === 'tablet' 
              ? 'Avec icônes' 
              : 'Sans icônes'
            }
          </div>
        </div>
        
        {/* Liste des éléments de menu */}
        <div className="space-y-2">
          {menuItems.length > 0 ? (
            menuItems.map(item => renderMenuItem(item))
          ) : (
            <p className="text-white/60 text-center py-8">
              Aucun élément de menu n'est configuré pour cet appareil.
            </p>
          )}
        </div>
      </div>
      
      {/* Notes spécifiques pour les menus mobile et tablette */}
      {selectedDevice === 'mobile' && (
        <div className="bg-primary-dark/20 p-4 rounded-lg">
          <h3 className="text-accent font-medium mb-2">Conseils pour le menu mobile</h3>
          <ul className="text-white/70 text-sm space-y-2 list-disc pl-5">
            <li>Les icônes sont particulièrement importantes pour les menus mobiles - elles aident les utilisateurs à identifier rapidement les éléments du menu.</li>
            <li>Gardez les éléments du menu mobile concis et limités en nombre.</li>
            <li>Assurez-vous d'inclure les éléments essentiels comme "Appeler" et de placer "Processus" dans le sous-menu "À propos".</li>
          </ul>
        </div>
      )}
      
      {selectedDevice === 'tablet' && (
        <div className="bg-primary-dark/20 p-4 rounded-lg">
          <h3 className="text-accent font-medium mb-2">Conseils pour le menu tablette</h3>
          <ul className="text-white/70 text-sm space-y-2 list-disc pl-5">
            <li>Les icônes aident à la navigation sur tablette, tout en permettant plus d'éléments que sur mobile.</li>
            <li>Assurez-vous d'inclure les éléments essentiels comme "Appeler" et de placer "Processus" dans le sous-menu "À propos".</li>
            <li>Vous pouvez afficher plus d'éléments que sur mobile, mais restez concis.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
