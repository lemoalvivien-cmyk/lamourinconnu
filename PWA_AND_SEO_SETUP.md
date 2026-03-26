# PWA et Optimisations SEO - L'Amour Inconnu

Ce document résume la configuration PWA et SEO appliquée au projet.

## PWA (Progressive Web App)

### Manifest
- Fichier : `public/manifest.json`
- Configuration complète avec toutes les tailles d'icônes
- Thème : #e91e63 (accent rose)
- Background : #1a0a2e (violet sombre)
- Mode : standalone

### Meta tags PWA (index.html)
- `theme-color` : #e91e63
- `apple-mobile-web-app-capable` : yes
- `apple-touch-icon` : lien vers icône 192x192
- Manifest lié

### Installation Prompt
- Composant : `src/components/pwa/InstallPrompt.tsx`
- Détection automatique de l'événement `beforeinstallprompt`
- Affichage contextuel en bas de page
- Possibilité de reporter avec localStorage
- Design cohérent avec la charte graphique

### Icônes PWA
- Dossier : `public/icons/`
- Tailles requises : 72, 96, 128, 144, 152, 192, 384, 512px
- **ACTION REQUISE** : Générer les icônes avec le logo L'Amour Inconnu
- Voir `public/icons/README.md` pour les instructions

## SEO

### Limitations SPA React
⚠️ Les SPA React ont des limitations SEO car pas de Server-Side Rendering.
Pour un SEO optimal en V2, envisager une migration vers Next.js ou Remix.

### Solution V1 : react-helmet-async
- Bibliothèque installée : `react-helmet-async`
- Provider ajouté dans `main.tsx`
- Meta tags dynamiques par page

### Pages avec Helmet SEO
✅ Home - Page d'accueil
✅ Comment ça marche
✅ Tarifs

**À FAIRE** : Ajouter Helmet sur les pages restantes :
- Blog
- BlogArticle (dynamique avec slug)
- Villes
- Ville (dynamique avec slug)
- CGU
- Confidentialité
- Mentions légales

### Fichiers statiques SEO

#### robots.txt
- Fichier : `public/robots.txt`
- Allow : toutes les pages publiques
- Disallow : /admin/, /dashboard, /profil, /matches, /rendez-vous, /parametres
- Sitemap référencé

#### sitemap.xml
- Fichier : `public/sitemap.xml`
- 18 URLs référencées
- Priorités configurées (1.0 pour home, 0.8 pour pages principales, etc.)
- Fréquences de mise à jour définies

**ACTION REQUISE** :
- Mettre à jour le sitemap quand de nouvelles villes sont ajoutées
- En V2, générer le sitemap dynamiquement depuis la DB

## Optimisations Performance

### Code Splitting (vite.config.ts)
Le bundle est divisé en chunks optimisés :
- **vendor** (175 kB) : React, React DOM, React Router
- **supabase** (126 kB) : Client Supabase
- **helmet** (14 kB) : react-helmet-async
- **icons** (24 kB) : lucide-react
- **index** (381 kB) : Code applicatif principal

### Résultats du build
```
dist/assets/helmet-rubpUsgF.js     14.48 kB │ gzip:  5.56 kB
dist/assets/icons-DlkXNopj.js      24.00 kB │ gzip:  4.68 kB
dist/assets/supabase-DjWl2_Eb.js  125.86 kB │ gzip: 34.31 kB
dist/assets/vendor-v2HsCr2t.js    175.23 kB │ gzip: 57.61 kB
dist/assets/index-DSz8ryAf.js     381.11 kB │ gzip: 80.26 kB
```

Total gzippé : ~183 kB (excellent pour une SPA complète)

### Améliorations futures V2
1. **Lazy loading des routes** avec React.lazy()
2. **Image optimization** avec traitement automatique
3. **Service Worker** pour mode offline
4. **Cache API** pour les données fréquentes
5. **Preloading** des routes critiques

## Configuration Netlify

### Headers recommandés (_headers)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/manifest.json
  Content-Type: application/manifest+json
  Cache-Control: public, max-age=31536000

/icons/*
  Cache-Control: public, max-age=31536000

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### Redirects (_redirects)
```
/*    /index.html   200
```

## Tests PWA

### Lighthouse
Après déploiement, lancer Lighthouse (Chrome DevTools) :
- Performance : objectif > 90
- Accessibility : objectif > 95
- Best Practices : objectif > 90
- SEO : objectif > 85
- PWA : objectif > 90

### Test d'installation
1. Ouvrir sur Chrome/Edge mobile
2. Vérifier que le prompt d'installation apparaît
3. Installer l'app
4. Vérifier l'icône sur l'écran d'accueil
5. Ouvrir l'app → doit s'afficher en standalone (sans barre d'URL)

### Test SEO
1. Vérifier que les meta tags sont bien injectés (View Source)
2. Tester le partage sur réseaux sociaux (Facebook Debugger, Twitter Card Validator)
3. Vérifier que robots.txt est accessible
4. Vérifier que sitemap.xml est accessible
5. Soumettre le sitemap à Google Search Console

## Open Graph Images

**ACTION REQUISE** : Créer les images Open Graph
- `public/og-image.jpg` : Image générale (1200x630px)
- `public/og-comment-ca-marche.jpg` : Image spécifique (optionnel)
- Format : JPG optimisé, < 300 kB
- Contenu : Logo + slogan + visuels attractifs

## Checklist Finale PWA/SEO

- [x] Manifest.json créé
- [x] Meta tags PWA dans index.html
- [x] InstallPrompt component créé
- [x] react-helmet-async installé
- [x] HelmetProvider configuré
- [x] Helmet ajouté sur 3 pages principales
- [x] robots.txt créé
- [x] sitemap.xml créé
- [x] Code splitting configuré
- [x] Build optimisé validé
- [ ] Icônes PWA générées (toutes les tailles)
- [ ] Images Open Graph créées
- [ ] Helmet ajouté sur toutes les pages publiques
- [ ] Test Lighthouse effectué
- [ ] Test d'installation mobile effectué
- [ ] Sitemap soumis à Google Search Console

## Ressources

### Générateurs d'icônes PWA
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

### Outils de test SEO
- Google Lighthouse (Chrome DevTools)
- https://search.google.com/search-console
- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator

### Documentation
- PWA : https://web.dev/progressive-web-apps/
- SEO React : https://web.dev/rendering-on-the-web/
- react-helmet-async : https://github.com/staylor/react-helmet-async
