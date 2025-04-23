import { IoIosPhonePortrait, IoIosDesktop} from "react-icons/io";

export const devices = [
  { 
    id: 'desktop', 
    label: 'Desktop / Laptop', 
    icon: <IoIosDesktop size={20} />
  },
  { 
    id: 'mobile', 
    label: 'Mobile / Tablette',
    icon: <IoIosPhonePortrait size={20} /> 
  }
];