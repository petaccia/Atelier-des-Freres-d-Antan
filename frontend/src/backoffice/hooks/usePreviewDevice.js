import { useState, useEffect } from 'react';

export default function usePreviewDevice(initialDeviceType = 'desktop') {
  const [deviceType, setDeviceType] = useState(initialDeviceType);
  const [previewWidth, setPreviewWidth] = useState('100%');
  const [previewHeight, setPreviewHeight] = useState('auto');
  const [isMobileView, setIsMobileView] = useState(false);

  // Définir les dimensions en fonction du type d'appareil
  useEffect(() => {
    switch (deviceType) {
      case 'mobile':
        setPreviewWidth('375px');
        setPreviewHeight('667px');
        setIsMobileView(true);
        break;
      case 'tablet':
        setPreviewWidth('768px');
        setPreviewHeight('1024px');
        setIsMobileView(true);
        break;
      case 'laptop':
        setPreviewWidth('1024px');
        setPreviewHeight('auto');
        setIsMobileView(false);
        break;
      case 'desktop':
        setPreviewWidth('1280px');
        setPreviewHeight('auto');
        setIsMobileView(false);
        break;
      default:
        setPreviewWidth('100%');
        setPreviewHeight('auto');
        setIsMobileView(false);
    }
  }, [deviceType]);

  return {
    deviceType,
    setDeviceType,
    previewWidth,
    previewHeight,
    isMobileView,
    deviceLabels: {
      mobile: 'Mobile',
      tablet: 'Tablette',
      laptop: 'Portable',
      desktop: 'Bureau'
    }
  };
}
