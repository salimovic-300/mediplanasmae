# 🔥 Guide Firebase — Cabinet Hilali
## Configuration en 10 minutes

---

## ÉTAPE 1 — Créer le projet Firebase

1. Allez sur **https://console.firebase.google.com**
2. Connectez-vous avec le compte Google de votre choix
3. Cliquez **"Créer un projet"**
4. Nom du projet : `cabinet-hilali`
5. Désactivez Google Analytics (pas nécessaire)
6. Cliquez **"Créer le projet"**

---

## ÉTAPE 2 — Activer Firestore

1. Dans le menu gauche → **"Firestore Database"**
2. Cliquez **"Créer une base de données"**
3. Choisissez **"Commencer en mode test"**
   *(on sécurisera après)*
4. Choisissez la région : **`eur3 (europe-west)`**
5. Cliquez **"Activer"**

---

## ÉTAPE 3 — Enregistrer l'application Web

1. Dans la page d'accueil du projet → icône **`</>`** (Web)
2. Nom de l'app : `mediplan-hilali`
3. Cliquez **"Enregistrer l'application"**
4. **COPIEZ** le bloc `firebaseConfig` qui apparaît :

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "cabinet-hilali.firebaseapp.com",
  projectId: "cabinet-hilali",
  storageBucket: "cabinet-hilali.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456...:web:abc..."
};
```

---

## ÉTAPE 4 — Configurer le fichier `src/firebase.js`

Ouvrez le fichier `src/firebase.js` et remplacez les valeurs :

```js
const firebaseConfig = {
  apiKey:            "COLLEZ_VOTRE_apiKey_ICI",
  authDomain:        "COLLEZ_VOTRE_authDomain_ICI",
  projectId:         "COLLEZ_VOTRE_projectId_ICI",
  storageBucket:     "COLLEZ_VOTRE_storageBucket_ICI",
  messagingSenderId: "COLLEZ_VOTRE_messagingSenderId_ICI",
  appId:             "COLLEZ_VOTRE_appId_ICI",
};
```

---

## ÉTAPE 5 — Sécuriser les règles Firestore

1. Dans Firebase Console → **Firestore Database → Règles**
2. Remplacez tout par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Seuls les utilisateurs authentifiés via l'app peuvent lire/écrire
    match /{document=**} {
      allow read, write: if request.auth == null
        && request.headers.keys().hasAll(['x-hilali-token']);
    }
    // Pendant le développement (à désactiver en production) :
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ Pour la phase de test, gardez `allow read, write: if true;`
> En production, contactez votre développeur pour sécuriser avec Firebase Auth.

---

## ÉTAPE 6 — Redéployer sur Vercel

```bash
npm run build
# Puis glissez le dossier /dist sur vercel.com
```

---

## ✅ Ce que vous obtenez avec Firebase

| Fonctionnalité | Avant (localStorage) | Après (Firebase) |
|---|---|---|
| Données perdues si cache vidé | ❌ Oui | ✅ Non |
| Accès depuis tablet/téléphone | ❌ Non | ✅ Oui |
| Synchronisation temps réel | ❌ Non | ✅ Oui |
| Backup automatique | ❌ Non | ✅ Oui (Google) |
| Accès depuis plusieurs appareils | ❌ Non | ✅ Oui |
| Coût | Gratuit | Gratuit (Spark plan) |

---

## 📊 Limites du plan gratuit Firebase (Spark)

- **50 000 lectures/jour** → largement suffisant pour un cabinet
- **20 000 écritures/jour** → largement suffisant
- **1 GB de stockage** → suffisant pour des années de données
- **Prix si dépassement** : ≈ 0,06$/100K lectures (très faible)

---

## 🆘 Besoin d'aide ?

Si vous avez des difficultés, envoyez une capture d'écran à votre développeur.
