'use client';
import { menuItemActions } from '../config/menuItemActions';

export default function MenuItemActions({ 
  itemId, 
  deviceType, 
  actions = {},
  className = "flex space-x-2"
}) {
  // Fonction pour exécuter l'action appropriée
  const handleAction = (actionType, id) => {
    if (actions[actionType]) {
      if (actionType === 'toggleVisibility') {
        actions[actionType](id, deviceType);
      } else {
        actions[actionType](id);
      }
    } else {
      console.warn(`Action handler for ${actionType} not provided`);
    }
  };

  return (
    <div className={className}>
      {menuItemActions.map(action => {
        const IconComponent = action.icon;
        
        return (
          <button
            key={action.id}
            onClick={() => handleAction(action.actionType, itemId)}
            className={action.className}
            title={action.title}
          >
            <IconComponent size={action.size} />
          </button>
        );
      })}
    </div>
  );
}
