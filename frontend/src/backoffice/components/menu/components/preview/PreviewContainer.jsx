'use client';

export default function PreviewContainer({ 
  children,
  className = 'bg-primary p-4 rounded-lg'
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
