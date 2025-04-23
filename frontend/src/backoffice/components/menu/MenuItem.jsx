
import  MenuItemChildren  from './components/children/MenuItemChildren';
import MenuItemContent from './components/content/MenuItemContent';
import MenuIcon from './components/icons/MenuIcon';


export default function MenuItem({ item, isSubmenu = false, selectedDevice }) {
  const showIcon = selectedDevice !== 'desktop' && item.showIcon !== false && !isSubmenu;

  return (
    <div className={`${isSubmenu ? 'ml-8 border-l border-accent/30 pl-4' : ''} mb-4`}>
      <div className={`flex items-center p-3 ${isSubmenu ? 'bg-primary-dark/50' : 'bg-primary-dark/30'} rounded-lg`}>
        <MenuIcon title={item.title} showIcon={showIcon} />
        <MenuItemContent title={item.title} path={item.path} />
      </div>

      <MenuItemChildren 
        children={item.children} 
        selectedDevice={selectedDevice} 
      />
    </div>
  );
}
