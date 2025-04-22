'use client';
import { 
  MdKeyboardArrowRight, 
  MdKeyboardArrowDown,
  MdEdit,
  MdVisibility,
  MdDelete,
  MdDragIndicator
} from 'react-icons/md';
import { BiHistory, BiEnvelope, BiStore, BiPhone, BiCog } from "react-icons/bi";
import { GiRunningShoe, GiKeyLock } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";

export default function MenuItemComponent({ 
  item, 
  isSubmenu = false, 
  deviceType, 
  isExpanded, 
  onToggleExpand, 
  onUpdate, 
  onDelete, 
  onToggleVisibility,
  children // Pour les sous-menus
}) {
  // Fonction pour rendre l'icône en fonction du titre
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

  return (
    <div className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''}`}>
      <div className={`flex items-center p-3 ${isSubmenu ? 'bg-primary-dark/50' : 'bg-primary-dark/30'} rounded-lg mb-2 group`}>
        {/* Poignée de glisser-déposer */}
        <div className="cursor-move text-white/40 hover:text-white/60 mr-3">
          <MdDragIndicator size={20} />
        </div>
        
        {/* Icône (visible uniquement pour les menus mobile et tablette) */}
        {(deviceType === 'mobile' || deviceType === 'tablet') && !isSubmenu && (
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
            onClick={() => onToggleExpand(item.id)}
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
            onClick={() => onToggleVisibility(item.id, deviceType)}
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
      {children}
    </div>
  );
}
