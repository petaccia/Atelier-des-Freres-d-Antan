'use client';

export default function SubMenuPreviewItem({ 
  item,
  className = 'px-4 py-2 hover:bg-accent/20 cursor-pointer transition-colors'
}) {
  return (
    <div key={item.id} className={className}>
      {item.title}
    </div>
  );
}
