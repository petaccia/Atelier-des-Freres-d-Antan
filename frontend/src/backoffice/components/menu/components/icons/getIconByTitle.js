import { menuIconsConfig } from "./menuIconsConfig";


export function getIconByTitle(title) {
  if (!title) return null;
  
  const titleLower = title.toLowerCase();
  
  const iconConfig = menuIconsConfig.find(config => 
    config.keywords.some(keyword => titleLower.includes(keyword))
  );
  
  if (iconConfig) {
    const IconComponent = iconConfig.icon;
    return <IconComponent size={iconConfig.size} />;
  }
  
  return null;
}