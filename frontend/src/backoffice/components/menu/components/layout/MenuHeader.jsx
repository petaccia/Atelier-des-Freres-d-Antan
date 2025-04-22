'use client';
import { menuActions } from '../../config/menuActions';

export default function MenuHeader({ 
  title = "Gestion du Menu",
  actions = {},
  state = {},
  className = "bg-primary-dark/50 p-4 rounded-lg"
}) {
  // Fonction pour déterminer si une action doit être affichée
  const shouldShowAction = (action) => {
    if (!action.showCondition) return true;
    return state[action.showCondition];
  };

  // Fonction pour exécuter l'action appropriée
  const handleAction = (actionType) => {
    if (actions[actionType]) {
      actions[actionType]();
    } else {
      console.warn(`Action handler for ${actionType} not provided`);
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl font-semibold text-accent">{title}</h2>
        
        <div className="flex flex-wrap gap-2">
          {menuActions
            .filter(shouldShowAction)
            .map(action => (
              <button
                key={action.id}
                onClick={() => handleAction(action.actionType)}
                className={`px-4 py-2 ${action.className} rounded-lg transition-colors flex items-center gap-2`}
                disabled={action.disabled}
                title={action.tooltip}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  );
}
