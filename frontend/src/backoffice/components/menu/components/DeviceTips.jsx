'use client';

export default function DeviceTips({ deviceType }) {
  if (deviceType === 'mobile') {
    return (
      <div className="bg-primary-dark/20 p-4 rounded-lg">
        <h3 className="text-accent font-medium mb-2">Conseils pour le menu mobile</h3>
        <ul className="text-white/70 text-sm space-y-2 list-disc pl-5">
          <li>Les icônes sont particulièrement importantes pour les menus mobiles - elles aident les utilisateurs à identifier rapidement les éléments du menu.</li>
          <li>Gardez les éléments du menu mobile concis et limités en nombre.</li>
          <li>Assurez-vous d'inclure les éléments essentiels comme "Appeler" et de placer "Processus" dans le sous-menu "À propos".</li>
        </ul>
      </div>
    );
  }
  
  if (deviceType === 'tablet') {
    return (
      <div className="bg-primary-dark/20 p-4 rounded-lg">
        <h3 className="text-accent font-medium mb-2">Conseils pour le menu tablette</h3>
        <ul className="text-white/70 text-sm space-y-2 list-disc pl-5">
          <li>Les icônes aident à la navigation sur tablette, tout en permettant plus d'éléments que sur mobile.</li>
          <li>Assurez-vous d'inclure les éléments essentiels comme "Appeler" et de placer "Processus" dans le sous-menu "À propos".</li>
          <li>Vous pouvez afficher plus d'éléments que sur mobile, mais restez concis.</li>
        </ul>
      </div>
    );
  }
  
  return null;
}
