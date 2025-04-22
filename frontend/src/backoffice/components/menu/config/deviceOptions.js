import { MdPhoneIphone, MdTablet, MdLaptop, MdDesktopWindows } from 'react-icons/md';

export const deviceOptions = [
  {
    value: 'mobile',
    label: 'Mobile',
    icon: <MdPhoneIphone size={20} />,
    showIcons: true
  },
  {
    value: 'tablet',
    label: 'Tablette',
    icon: <MdTablet size={20} />,
    showIcons: true
  },
  {
    value: 'laptop',
    label: 'Portable',
    icon: <MdLaptop size={20} />,
    showIcons: false
  },
  {
    value: 'desktop',
    label: 'Bureau',
    icon: <MdDesktopWindows size={20} />,
    showIcons: false
  }
];
