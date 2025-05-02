export interface MenuItem {
  id: number;
  title: string;
  path: string;
  showIcon?: boolean;
  children?: MenuItem[];
}

export interface MenuProps {
  item: MenuItem;
  isSubmenu?: boolean;
  selectedDevice: "mobile" | "tablet" | "desktop";
}
