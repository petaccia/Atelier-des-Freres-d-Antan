export const getMapsUrl = async (destination) => {
  try {
    // Vérifier si la géolocalisation est disponible
    if (!("geolocation" in navigator)) {
      // Si pas de géolocalisation, retourner l'URL directe vers la destination
      return `https://www.google.com/maps/dir//${destination.coordinates}`;
    }

    // Obtenir la position actuelle (wrapped in Promise pour utiliser async/await)
    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject{
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000,
        });
      });
    };

    // Attendre la position
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    // Retourner l'URL avec l'origine (position actuelle) et la destination
    return `https://www.google.com/maps/dir/${latitude},${longitude}/${destination.coordinates}`;

  } catch (error) {
    console.error("Erreur de géolocalisation:", error);
    // En cas d'erreur, retourner l'URL directe vers la destination
    return `https://www.google.com/maps/dir//${destination.coordinates}`;
  }
};