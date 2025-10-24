# Notes de Sécurité - FashionHub

## ⚠️ Problème de Sécurité Critique - Authentification

### Problème Actuel

L'application utilise actuellement un système d'authentification basé sur un header HTTP `X-User-ID` envoyé par le client. Ce système présente une vulnérabilité critique :

**N'importe quel utilisateur peut se faire passer pour un autre utilisateur** en modifiant simplement la valeur du header `X-User-ID`.

### Fonctionnement Actuel

1. Le client stocke l'utilisateur connecté dans `localStorage`
2. Pour chaque requête API, le client envoie `X-User-ID` dans les headers
3. Le middleware `optionalAuth` vérifie seulement que cet ID existe dans la base de données
4. Il n'y a **aucune vérification cryptographique** que l'utilisateur est bien celui qu'il prétend être

### Impact

- ✅ Permet une consultation facile de l'API en développement
- ❌ Un utilisateur malveillant peut:
  - Lire les données privées d'autres utilisateurs (dressing, looks, favoris)
  - Modifier ou supprimer les données d'autres utilisateurs
  - Se faire passer pour un administrateur

### Solution Recommandée

Pour sécuriser l'application en production, il faut implémenter :

#### Option 1: JWT (JSON Web Tokens) - Recommandée
```typescript
// Backend - Login
router.post('/login', async (req, res) => {
  // Vérifier email/password
  const user = await validateCredentials(email, password);
  
  // Créer un token signé
  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ token, user });
});

// Middleware
export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Frontend
// Stocker le token et l'envoyer dans toutes les requêtes
headers: {
  'Authorization': `Bearer ${token}`
}
```

#### Option 2: Sessions avec Cookies
```typescript
// Backend
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS uniquement
    httpOnly: true, // Pas accessible via JavaScript
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
  }
}));

router.post('/login', async (req, res) => {
  const user = await validateCredentials(email, password);
  req.session.userId = user.id;
  res.json({ user });
});

export const requireAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};
```

### Plan de Migration

1. **Phase 1 - Préparation**
   - Ajouter une variable d'environnement `JWT_SECRET` ou `SESSION_SECRET`
   - Installer les packages nécessaires (`jsonwebtoken` ou `express-session`)

2. **Phase 2 - Backend**
   - Implémenter la génération de tokens/sessions au login
   - Modifier le middleware `requireAuth` pour vérifier les tokens
   - Garder l'ancien système en parallèle (backwards compatibility)

3. **Phase 3 - Frontend**
   - Modifier l'auth context pour stocker et utiliser les tokens
   - Mettre à jour tous les appels API pour envoyer le token

4. **Phase 4 - Déploiement**
   - Tester en environnement de staging
   - Migrer progressivement en production
   - Invalider toutes les sessions existantes (force re-login)

### Utilisation en Développement

En développement, le système actuel fonctionne car:
- L'application n'est pas exposée publiquement
- C'est pratique pour tester rapidement différents utilisateurs
- Pas de données sensibles réelles

**⚠️ NE JAMAIS utiliser ce système en production**

### Checklist avant Production

- [ ] Implémenter JWT ou Sessions
- [ ] Ajouter des secrets sécurisés (JWT_SECRET/SESSION_SECRET)
- [ ] Activer HTTPS
- [ ] Configurer les CORS correctement
- [ ] Ajouter rate limiting sur les endpoints sensibles
- [ ] Audit de sécurité complet
- [ ] Tests de pénétration

---

*Document créé le 24 octobre 2025*
*Dernière mise à jour: 24 octobre 2025*
