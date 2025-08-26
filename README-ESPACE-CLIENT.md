# Espace Client - VI Conseil

## Vue d'ensemble

L'espace client de VI Conseil permet à vos clients d'accéder de manière sécurisée à leurs factures et d'effectuer des paiements en ligne.

## Fonctionnalités

### 🔐 Authentification sécurisée
- Système de connexion avec email/mot de passe
- Protection contre les tentatives de force brute (3 tentatives max)
- Verrouillage temporaire du compte (15 minutes)
- Session timeout automatique (30 minutes d'inactivité)
- Option "Se souvenir de moi"

### 📋 Gestion des factures
- Consultation de toutes les factures
- Téléchargement des factures au format PDF
- Filtres par statut et date
- Statuts : Payée, En attente, En retard

### 💳 Système de paiement
- **Carte bancaire** : Paiement sécurisé en ligne
- **Virement SEPA** : Coordonnées bancaires fournies automatiquement
- Historique des paiements
- Confirmations de paiement

### 👤 Profil client
- Informations de l'entreprise
- Coordonnées de contact
- Historique des transactions

### ❓ Support client
- Contacts directs
- Prise de rendez-vous Calendly
- FAQ et aide

## Installation

1. Copiez tous les fichiers dans votre dossier web :
   - `client-login.html` - Page de connexion
   - `client-dashboard.html` - Tableau de bord principal
   - `client-styles.css` - Styles spécifiques
   - `client-dashboard.js` - Logique de l'espace client
   - `client-security.js` - Système de sécurité

2. Ajoutez le lien "Espace Client" dans votre navigation principale

3. Personnalisez les données selon vos besoins

## Comptes de démonstration

Pour tester l'espace client, utilisez ces identifiants :

- **Email** : `demo@client.fr`
- **Mot de passe** : `demo123`

Autres comptes de test :
- `client@example.com` / `password123`
- `test@viconseil.fr` / `test456`

## Configuration pour la production

### ⚠️ Important - Sécurité

**Cette version est une démonstration**. Pour un usage en production, vous devez :

1. **Authentification côté serveur**
   - Implémenter une API d'authentification sécurisée
   - Utiliser HTTPS obligatoirement
   - Hacher les mots de passe avec bcrypt ou similaire
   - Implémenter des tokens JWT pour les sessions

2. **Base de données**
   - Stocker les utilisateurs et factures en base de données
   - Chiffrer les données sensibles
   - Sauvegardes régulières

3. **Paiements en ligne**
   - Intégrer Stripe, PayPal ou un processeur de paiement français
   - Respecter les normes PCI DSS
   - Implémenter les webhooks pour les confirmations

4. **Sécurité supplémentaire**
   - Authentification à double facteur (2FA)
   - Rate limiting
   - Protection CSRF
   - Chiffrement des communications

## Structure des fichiers

```
SITE WEB VI conseil/
├── client-login.html          # Page de connexion
├── client-dashboard.html      # Tableau de bord
├── client-styles.css          # Styles de l'espace client
├── client-dashboard.js        # Logique du dashboard
├── client-security.js         # Système de sécurité
├── styles.css                 # Styles principaux (modifié)
├── index.html                 # Page d'accueil (modifiée)
└── README-ESPACE-CLIENT.md    # Cette documentation
```

## Personnalisation

### Modifier les données de démonstration

Dans `client-dashboard.js`, modifiez les tableaux `demoInvoices` et `demoPayments` :

```javascript
const demoInvoices = [
    {
        id: 'FAC-2024-001',
        date: '2024-01-15',
        amount: 2500.00,
        status: 'paid',
        dueDate: '2024-02-15'
    }
    // Ajoutez vos factures ici
];
```

### Modifier les coordonnées bancaires

Dans `client-dashboard.html`, section virement :

```html
<div class="bank-details">
    <p><strong>IBAN:</strong> FR76 3000 3000 1100 0000 0000 145</p>
    <p><strong>BIC:</strong> SOGEFRPP</p>
    <p><strong>Titulaire:</strong> VICONSEIL</p>
</div>
```

### Personnaliser les couleurs

Dans `client-styles.css`, modifiez les variables de couleur en haut du fichier.

## Support technique

Pour toute question concernant l'espace client :

- 📧 **Email** : contact@viconseil.fr
- 📞 **Téléphone** : +33 1 23 45 67 89
- 📅 **Rendez-vous** : https://calendly.com/viconseil

## Licence

© 2024 Viconseil. Tous droits réservés.