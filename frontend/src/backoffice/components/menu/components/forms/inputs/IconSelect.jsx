import { useState } from 'react';
import { iconLibraries } from '../../../icons/iconLibraries';
import { MdSearch, MdClose } from 'react-icons/md';

export default function IconSelect({ value, onChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLibrary, setSelectedLibrary] = useState('Font Awesome');
  const [showIconPicker, setShowIconPicker] = useState(false);

  const currentLibrary = iconLibraries[selectedLibrary];
  const IconPreview = value ? currentLibrary.icons[value] : null;

  const filterIcons = () => {
    if (!currentLibrary?.icons) return [];
    
    return Object.keys(currentLibrary.icons)
      .filter(iconName => 
        iconName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 100);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-whiteGray">
        Icône
      </label>

      <button
        type="button"
        onClick={() => setShowIconPicker(!showIconPicker)}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary hover:bg-accent text-white rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3">
          {IconPreview ? (
            <>
              <IconPreview size={20} />
              <span>{value.replace(currentLibrary.prefix, '')}</span>
            </>
          ) : (
            <span>Sélectionner une icône</span>
          )}
        </div>
        {value && (
          <MdClose 
            className="w-5 h-5" 
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          />
        )}
      </button>

      {showIconPicker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-primary w-full max-w-3xl max-h-[80vh] rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-primary">
              <h3 className="text-lg font-medium text-white">Sélectionner une icône</h3>
              <button
                onClick={() => setShowIconPicker(false)}
                className="text-white hover:text-accent transition-colors"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une icône..."
                  className="w-full pl-10 pr-4 py-2 bg-primary-dark text-white rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {Object.entries(iconLibraries).map(([name]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedLibrary(name)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedLibrary === name
                        ? 'bg-accent text-white'
                        : 'bg-primary-dark hover:bg-accent text-white'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-8 gap-2 overflow-y-auto max-h-[400px] p-1">
                {filterIcons().map(iconName => {
                  const Icon = currentLibrary.icons[iconName];
                  return (
                    <button
                      key={iconName}
                      onClick={() => {
                        onChange(iconName);
                        setShowIconPicker(false);
                      }}
                      className={`p-3 rounded-lg transition-colors ${
                        value === iconName
                          ? 'bg-accent text-white'
                          : 'bg-primary-dark hover:bg-accent text-white'
                      }`}
                      title={iconName.replace(currentLibrary.prefix, '')}
                    >
                      <Icon size={24} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


