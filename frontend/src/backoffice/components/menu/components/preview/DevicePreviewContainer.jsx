'use client';

export default function DevicePreviewContainer({ 
  children,
  previewWidth,
  previewHeight,
  isMobileView,
  className = 'p-6 flex justify-center bg-gray-50'
}) {
  return (
    <div className={className}>
      {/* Conteneur avec bordure pour simuler un écran */}
      <div
        className={`bg-white overflow-hidden border-2 border-gray-300 rounded-lg shadow-lg ${isMobileView ? 'mx-auto' : 'w-full'}`}
        style={{
          width: previewWidth,
          height: previewHeight,
          maxWidth: '100%',
          transition: 'width 0.3s, height 0.3s'
        }}
      >
        {children}
      </div>
    </div>
  );
}
