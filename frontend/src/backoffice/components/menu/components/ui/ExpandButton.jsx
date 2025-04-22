'use client';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';

export default function ExpandButton({ 
  isExpanded, 
  onClick,
  className = "p-2 rounded-md text-white/70 hover:bg-primary-dark/50 transition-colors mr-2"
}) {
  return (
    <button
      onClick={onClick}
      className={className}
      title={isExpanded ? "Réduire" : "Développer"}
    >
      {isExpanded ? <MdKeyboardArrowDown size={20} /> : <MdKeyboardArrowRight size={20} />}
    </button>
  );
}
