'use client';
import React from 'react';

export default function DeviceButton({ 
  icon, 
  label, 
  isSelected, 
  onClick 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
        isSelected 
          ? 'bg-accent text-white' 
          : 'bg-primary-dark/50 text-white/70 hover:bg-primary-dark/70'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
