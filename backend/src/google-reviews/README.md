# Module d'intégration des avis Google

Ce module permet de récupérer et d'afficher les avis Google de votre entreprise directement sur votre site web.

## Configuration

1. Obtenez une clé API Google Maps Platform :
   - Rendez-vous sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créez un projet ou sélectionnez un projet existant
   - Activez l'API Places
   - Créez une clé API avec les restrictions appropriées

2. Trouvez votre Place ID Google :
   - Utilisez l'outil [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Recherchez votre entreprise et copiez le Place ID

3. Configurez les variables d'environnement :
   - Ajoutez les variables suivantes à votre fichier `.env` :
     ```
     GOOGLE_API_KEY=votre_clé_api_google
     GOOGLE_PLACE_ID=votre_place_id_google
     ```

## Utilisation

### Backend

Le module expose deux endpoints :

1. `GET /google-reviews` : Récupère les avis Google
   - Paramètre optionnel : `limit` (nombre d'avis à retourner)
   - Exemple : `GET /google-reviews?limit=5`

2. `GET /google-reviews/refresh` (protégé par authentification) : Rafraîchit le cache des avis

### Frontend

Le composant `CustomGoogleReviews` est déjà configuré pour appeler l'API et afficher les avis avec le même style que vos témoignages existants.

## Fonctionnalités

- Mise en cache des avis pour réduire les appels à l'API Google
- Avis de secours en cas d'échec de l'API
- Affichage des avis dans un carrousel avec le même style que vos témoignages existants
- Possibilité de basculer entre les témoignages manuels et les avis Google

## Dépannage

Si les avis ne s'affichent pas :

1. Vérifiez que les variables d'environnement sont correctement configurées
2. Assurez-vous que l'API Places est activée dans votre projet Google Cloud
3. Vérifiez les restrictions de votre clé API (domaines autorisés, etc.)
4. Consultez les logs du serveur pour plus d'informations sur les erreurs éventuelles
