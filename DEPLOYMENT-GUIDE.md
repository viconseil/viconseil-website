# 🚀 GUIDE DE DÉPLOIEMENT - VI CONSEIL V2

## 📋 **ÉTAPES DE DÉPLOIEMENT**

### 1. **Créer le Repository GitHub**

```bash
# Le repo Git local est déjà initialisé et commité
# Il faut maintenant créer le repo sur GitHub

# Sur GitHub.com:
# 1. New Repository
# 2. Nom: "vi-conseil-v2" ou "vi-conseil-aneto"
# 3. Description: "VI Conseil V2 - Site moderne style ANETO"
# 4. Public/Private selon préférence
# 5. Ne PAS initialiser avec README (on a déjà tout)
```

### 2. **Lier au Repository GitHub**

```bash
# Ajouter l'origin remote (remplacer [USERNAME] par votre nom GitHub)
git remote add origin https://github.com/[USERNAME]/vi-conseil-v2.git

# Push initial
git branch -M main
git push -u origin main
```

### 3. **Déploiement Vercel (Recommandé)**

#### **Option A : Via GitHub (automatique)**
1. Aller sur [vercel.com](https://vercel.com)
2. "New Project" → "Import Git Repository"
3. Sélectionner le repo `vi-conseil-v2`
4. Configuration :
   - **Framework Preset**: Other
   - **Root Directory**: `./` (racine)
   - **Build Command**: (laisser vide)
   - **Output Directory**: `./` (racine)
5. Deploy !

#### **Option B : Via CLI Vercel**
```bash
# Installer Vercel CLI
npm i -g vercel

# Dans le dossier VI Conseil V2
cd "VI Conseil V2"
vercel

# Suivre les prompts:
# - Set up and deploy? Y
# - Which scope? (votre compte)
# - Link to existing project? N
# - Project name: vi-conseil-v2
# - In which directory? ./
# - Want to override settings? N
```

### 4. **Configuration Domaine (Optionnel)**

Sur Vercel Dashboard :
1. Project Settings → Domains
2. Ajouter : `vi-conseil-v2.vercel.app` (automatique)
3. Domaine custom : `v2.viconseil.com` (si souhaité)

## 🌐 **URLs Prévues**

- **V1 (existant)** : `https://vi-conseil.vercel.app`
- **V2 (nouveau)** : `https://vi-conseil-v2.vercel.app`
- **Custom domain V2** : `https://v2.viconseil.com` (optionnel)

## ⚙️ **Variables d'Environnement**

Si besoin de variables spéciales sur Vercel :
- `ENVIRONMENT` = `production`
- `CONTACT_EMAIL` = `vincent@viconseil.com`

## 🔄 **Déploiement Continu**

Une fois connecté à GitHub :
- ✅ **Push sur main** = déploiement automatique
- ✅ **Pull requests** = preview deployments  
- ✅ **Rollback** facile via Vercel dashboard

## 📊 **Monitoring & Analytics**

Vercel fournit automatiquement :
- Analytics des visiteurs
- Core Web Vitals
- Logs de déploiement
- Monitoring uptime

## 🧪 **Testing Post-Déploiement**

À tester après déploiement :
- [ ] Navigation entre toutes les pages
- [ ] Responsive mobile/desktop
- [ ] Formulaire de contact (EmailJS)
- [ ] Espace client (login démo)
- [ ] Animations au scroll
- [ ] Vitesse de chargement

## 🔧 **Commandes Git Utiles**

```bash
# Voir le statut
git status

# Ajouter des changements
git add .
git commit -m "✨ Description du changement"
git push

# Voir l'historique
git log --oneline

# Créer une branche pour tests
git checkout -b feature/nouvelle-section
```

## 📞 **Support**

En cas de problème :
1. Vérifier les logs Vercel
2. Tester en local d'abord
3. Vérifier la config DNS pour domaines custom
4. Support Vercel très réactif

---

**Site V2 prêt à être déployé ! 🚀**