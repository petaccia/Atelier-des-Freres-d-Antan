'use client';
import { MdPhoneIphone, MdTablet, MdLaptop, MdDesktopWindows } from 'react-icons/md';

export default function DeviceTypeSelector({ 
  deviceType, 
  onDeviceChange,
  className = 'flex space-x-2 bg-gray-200 p-1 rounded-lg'
}) {
  return (
    <div className={className}>
      <button
        onClick={() => onDeviceChange('mobile')}
        className={`p-2 rounded-md transition-colors ${deviceType === 'mobile' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
        title="Mobile (375px)"
      >
        <MdPhoneIphone size={20} />
      </button>
      <button
        onClick={() => onDeviceChange('tablet')}
        className={`p-2 rounded-md transition-colors ${deviceType === 'tablet' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
        title="Tablette (768px)"
      >
        <MdTablet size={20} />
      </button>
      <button
        onClick={() => onDeviceChange('laptop')}
        className={`p-2 rounded-md transition-colors ${deviceType === 'laptop' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
        title="Portable (1024px)"
      >
        <MdLaptop size={20} />
      </button>
      <button
        onClick={() => onDeviceChange('desktop')}
        className={`p-2 rounded-md transition-colors ${deviceType === 'desktop' ? 'bg-white shadow-sm text-accent' : 'text-gray-600 hover:bg-gray-300'}`}
        title="Bureau (1280px)"
      >
        <MdDesktopWindows size={20} />
      </button>
    </div>
  );
}
