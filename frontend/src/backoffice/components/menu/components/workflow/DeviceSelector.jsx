'use client';
import { MdPhoneIphone, MdTablet, MdLaptop, MdDesktopWindows } from 'react-icons/md';

export default function DeviceSelector({ 
  onSelectDevice,
  className = 'flex bg-primary-dark/50 p-1 rounded-lg mr-3'
}) {
  return (
    <div className={className}>
      <button
        onClick={() => onSelectDevice('mobile')}
        className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
        title="Prévisualiser sur Mobile"
      >
        <MdPhoneIphone size={20} />
      </button>
      <button
        onClick={() => onSelectDevice('tablet')}
        className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
        title="Prévisualiser sur Tablette"
      >
        <MdTablet size={20} />
      </button>
      <button
        onClick={() => onSelectDevice('laptop')}
        className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
        title="Prévisualiser sur Portable"
      >
        <MdLaptop size={20} />
      </button>
      <button
        onClick={() => onSelectDevice('desktop')}
        className="p-2 rounded-md text-white/70 hover:bg-primary-dark transition-colors"
        title="Prévisualiser sur Bureau"
      >
        <MdDesktopWindows size={20} />
      </button>
    </div>
  );
}
