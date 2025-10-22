
# Plan de correction - Persistence des données du profil

## 📋 Problèmes identifiés

### 1. Routes API non enregistrées
- **Fichier concerné** : `server/index.ts`
- **Problème** : Les routes `/api/profile` et `/api/users` ne sont pas montées dans le serveur Express
- **Impact** : Les requêtes PUT/GET vers `/api/profile/:userId` échouent avec 404

### 2. Incohérence d'initialisation de `availability`
- **Fichier concerné** : `client/src/pages/profile.tsx` (lignes 87-142)
- **Problème** : L'initialisation de `availability` utilise une logique complexe qui peut donner `false` par défaut pour les PRO
- **Impact** : Les nouveaux PRO ne sont pas visibles dans la recherche

### 3. Absence de validation côté serveur
- **Fichier concerné** : `server/routes/profile-routes.ts`
- **Problème** : Pas de validation des données avant insertion en BDD
- **Impact** : Données incohérentes possibles

### 4. Gestion d'erreur insuffisante
- **Fichier concerné** : `client/src/pages/profile.tsx` (fonction `handleSave`)
- **Problème** : Certaines erreurs réseau ne sont pas catchées
- **Impact** : L'utilisateur ne sait pas si la sauvegarde a échoué

---

## 🔧 Plan de correction étape par étape

### Étape 1 : Enregistrer les routes API profile
**Fichier** : `server/index.ts`

**Action** :
```typescript
// Ajouter l'import
import profileRoutes from './routes/profile-routes';

// Monter les routes (après les autres routes)
app.use('/api', profileRoutes);
```

**Vérification** :
```bash
curl -X GET http://localhost:5000/api/profile/1
```

---

### Étape 2 : Simplifier l'initialisation de `availability`
**Fichier** : `client/src/pages/profile.tsx`

**Avant** (lignes 107-110) :
```typescript
availability: profileData.availability === true || profileData.availability === 'true' ? true : false,
```

**Après** :
```typescript
availability: profileData.availability !== undefined 
  ? Boolean(profileData.availability)
  : (profileData.role === 'PRO' ? true : false),
```

**Pourquoi** : Toujours mettre `true` par défaut pour les PRO si non défini

---

### Étape 3 : Ajouter validation côté serveur
**Fichier** : `server/routes/profile-routes.ts`

**Action** : Ajouter avant la sauvegarde dans PUT :
```typescript
// Validation des champs obligatoires
if (!displayName && !name) {
  return res.status(400).json({ error: 'Le nom est obligatoire' });
}

if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return res.status(400).json({ error: 'Email invalide' });
}

// Valider le rôle
if (role && !['CLIENT', 'PRO'].includes(role)) {
  return res.status(400).json({ error: 'Rôle invalide' });
}
```

---

### Étape 4 : Améliorer la gestion d'erreur frontend
**Fichier** : `client/src/pages/profile.tsx`

**Dans `handleSave`**, ajouter :
```typescript
try {
  // ... code existant ...
  
  const response = await fetch(`/api/profile/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...})
  });

  // ✅ Vérifier le statut HTTP
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
  }

  const result = await response.json();
  
  // ✅ Vérifier le résultat
  if (!result.success) {
    throw new Error(result.error || 'Sauvegarde échouée');
  }

  toast({
    title: '✅ Profil sauvegardé',
    description: 'Vos informations ont été mises à jour avec succès.',
  });

} catch (error: any) {
  console.error('❌ Erreur sauvegarde:', error);
  
  toast({
    title: '❌ Erreur de sauvegarde',
    description: error.message || 'Impossible de sauvegarder le profil.',
    variant: 'destructive'
  });
}
```

---

### Étape 5 : Ajouter un indicateur de chargement
**Fichier** : `client/src/pages/profile.tsx`

**Ajouter un état** :
```typescript
const [isSaving, setIsSaving] = useState(false);
```

**Dans `handleSave`** :
```typescript
setIsSaving(true);
try {
  // ... code de sauvegarde ...
} finally {
  setIsSaving(false);
}
```

**Dans le bouton de sauvegarde** :
```tsx
<Button 
  onClick={handleSave} 
  disabled={isSaving}
  className="bg-green-600 hover:bg-green-700"
>
  {isSaving ? (
    <>
      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
      Sauvegarde...
    </>
  ) : (
    <>
      <Save className="w-4 h-4 mr-2" />
      Sauvegarder
    </>
  )}
</Button>
```

---

### Étape 6 : Ajouter des logs de debug
**Fichier** : `server/routes/profile-routes.ts`

**Dans PUT `/api/profile/:userId`** :
```typescript
console.log('📝 Sauvegarde profil:', {
  userId,
  hasDisplayName: !!displayName,
  hasEmail: !!email,
  role,
  availability,
  profileDataSize: JSON.stringify(profileData).length
});
```

---

## 🧪 Tests à effectuer après correction

### Test 1 : Création d'un nouveau profil PRO
1. Créer un compte PRO
2. Vérifier que `availability = true` par défaut
3. Vérifier dans la BDD :
```sql
SELECT id, email, role, profile_data->'availability' as availability 
FROM users WHERE role = 'PRO';
```

### Test 2 : Sauvegarde complète
1. Modifier tous les champs du profil
2. Cliquer sur "Sauvegarder"
3. Vérifier le toast de succès
4. Rafraîchir la page
5. Vérifier que les données sont toujours là

### Test 3 : Gestion d'erreur
1. Désactiver temporairement la BDD
2. Essayer de sauvegarder
3. Vérifier qu'un message d'erreur s'affiche

### Test 4 : Visibilité dans la recherche
1. Créer un profil PRO avec `availability = true`
2. Aller sur `/available-providers`
3. Vérifier que le PRO apparaît

---

## 🚀 Ordre d'application

1. **Étape 1** (critique) - Sans ça, rien ne fonctionne
2. **Étape 2** (importante) - Correction de la logique d'initialisation
3. **Étape 4** (importante) - Gestion d'erreur
4. **Étape 5** (UX) - Indicateur de chargement
5. **Étape 3** (sécurité) - Validation
6. **Étape 6** (debug) - Logs

---

## 📊 Vérifications finales

### Checklist :
- [ ] Routes `/api/profile/:userId` accessibles (GET et PUT)
- [ ] Nouveaux PRO ont `availability = true` par défaut
- [ ] Sauvegarde fonctionne sans erreur
- [ ] Messages d'erreur clairs si échec
- [ ] PRO visibles dans `/available-providers`
- [ ] Données persistées après refresh
- [ ] Logs de debug dans la console serveur

---

## 🔍 Fichiers impactés

### Serveur :
- `server/index.ts` - Enregistrement routes
- `server/routes/profile-routes.ts` - Validation + logs

### Client :
- `client/src/pages/profile.tsx` - Logique sauvegarde + UX

### Base de données :
- Aucune migration nécessaire (structure OK)

---

## ⚠️ Points d'attention

1. **Ne pas casser la rétrocompatibilité** : Les profils existants doivent continuer à fonctionner
2. **Tester en production** : Vérifier sur https://swideal.com après déploiement
3. **Monitoring** : Surveiller les logs serveur après déploiement
4. **Rollback plan** : Garder une sauvegarde de la BDD avant mise en prod

---

## 📝 Notes techniques

### Structure actuelle de `profile_data` :
```json
{
  "phone": "string",
  "location": "string",
  "bio": "string",
  "availability": boolean,  // ⚠️ DOIT être boolean, pas string
  "skills": [...],
  "portfolio": [...],
  "hourlyRate": "string",
  "keywords": [...],
  "calendarAvailability": [...]
}
```

### Problème connu résolu :
- Les anciennes versions stockaient `availability` comme `"true"` (string)
- La nouvelle version utilise `true` (boolean)
- Le code gère les deux cas pour compatibilité

---

**Date de création** : 2025-01-20  
**Auteur** : Assistant Replit  
**Version** : 1.0
