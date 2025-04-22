'use client';
import { MdPhoneIphone, MdTablet, MdLaptop, MdDesktopWindows } from 'react-icons/md';
import DeviceButton from './DeviceButton';

export default function DeviceSelector({ selectedDevice, onDeviceChange }) {
  return (
    <div className="bg-primary-dark/30 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white mb-3">Sélectionner un appareil</h3>
      
      <div className="flex flex-wrap gap-2">
        <DeviceButton
          icon={<MdPhoneIphone size={20} />}
          label="Mobile"
          isSelected={selectedDevice === 'mobile'}
          onClick={() => onDeviceChange('mobile')}
        />
        
        <DeviceButton
          icon={<MdTablet size={20} />}
          label="Tablette"
          isSelected={selectedDevice === 'tablet'}
          onClick={() => onDeviceChange('tablet')}
        />
        
        <DeviceButton
          icon={<MdLaptop size={20} />}
          label="Portable"
          isSelected={selectedDevice === 'laptop'}
          onClick={() => onDeviceChange('laptop')}
        />
        
        <DeviceButton
          icon={<MdDesktopWindows size={20} />}
          label="Bureau"
          isSelected={selectedDevice === 'desktop'}
          onClick={() => onDeviceChange('desktop')}
        />
      </div>
    </div>
  );
}
