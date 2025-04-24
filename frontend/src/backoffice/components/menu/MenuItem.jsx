
import MenuItemChildren from './components/children/MenuItemChildren';
import MenuIcon from './components/icons/MenuIcon';

export default function MenuItem({ item, isSubmenu = false, selectedDevice }) {
  const showIcon = selectedDevice !== 'desktop' && item.showIcon !== false && !isSubmenu;

  return (
    <div className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''} mb-4`}>
      <div className="flex flex-col bg-primary-dark/30 rounded-lg overflow-hidden hover:bg-primary-dark/40 transition-colors">
        <div className={`p-4 ${isSubmenu ? 'bg-primary-dark/50' : ''}`}>
          {/* Titre principal */}
          <div className="flex items-center gap-3 mb-3">
            <MenuIcon title={item.title} showIcon={showIcon} />
            <span className="text-white font-medium">{item.title}</span>
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

      <MenuItemChildren 
        children={item.children} 
        selectedDevice={selectedDevice} 
      />
    </div>
  );
}



