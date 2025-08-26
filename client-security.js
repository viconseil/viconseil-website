// Gestion de la sécurité et authentification côté client
// IMPORTANT: Ceci est une implémentation de démonstration
// En production, l'authentification doit être gérée côté serveur

class ClientSecurity {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.maxLoginAttempts = 3;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
        this.init();
    }

    init() {
        this.setupSessionTimeout();
        this.checkExistingSession();
    }

    // Validation des identifiants (version démo)
    validateCredentials(email, password) {
        // En production, ceci serait une requête sécurisée vers le serveur
        const validCredentials = {
            'demo@client.fr': 'demo123',
            'client@example.com': 'password123',
            'test@viconseil.fr': 'test456'
        };

        return validCredentials[email] === password;
    }

    // Gestion des tentatives de connexion
    checkLoginAttempts(email) {
        const attempts = parseInt(localStorage.getItem(`login_attempts_${email}`) || '0');
        const lockoutTime = parseInt(localStorage.getItem(`lockout_${email}`) || '0');
        
        // Vérifier si le compte est verrouillé
        if (lockoutTime && Date.now() < lockoutTime) {
            const remainingTime = Math.ceil((lockoutTime - Date.now()) / 60000);
            throw new Error(`Compte temporairement verrouillé. Réessayez dans ${remainingTime} minute(s).`);
        }

        // Réinitialiser le verrouillage si le temps est écoulé
        if (lockoutTime && Date.now() >= lockoutTime) {
            localStorage.removeItem(`lockout_${email}`);
            localStorage.removeItem(`login_attempts_${email}`);
        }

        return attempts;
    }

    // Enregistrer une tentative de connexion échouée
    recordFailedAttempt(email) {
        let attempts = parseInt(localStorage.getItem(`login_attempts_${email}`) || '0');
        attempts++;
        
        localStorage.setItem(`login_attempts_${email}`, attempts.toString());
        
        if (attempts >= this.maxLoginAttempts) {
            const lockoutTime = Date.now() + this.lockoutDuration;
            localStorage.setItem(`lockout_${email}`, lockoutTime.toString());
            throw new Error(`Trop de tentatives échouées. Compte verrouillé pour 15 minutes.`);
        }
        
        const remainingAttempts = this.maxLoginAttempts - attempts;
        throw new Error(`Identifiants incorrects. ${remainingAttempts} tentative(s) restante(s).`);
    }

    // Connexion réussie
    login(email, password, rememberMe = false) {
        try {
            // Vérifier les tentatives précédentes
            this.checkLoginAttempts(email);

            // Valider les identifiants
            if (!this.validateCredentials(email, password)) {
                this.recordFailedAttempt(email);
                return false;
            }

            // Connexion réussie - nettoyer les tentatives échouées
            localStorage.removeItem(`login_attempts_${email}`);
            localStorage.removeItem(`lockout_${email}`);

            // Créer la session
            this.createSession(email, rememberMe);
            
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Créer une session sécurisée
    createSession(email, rememberMe) {
        const sessionData = {
            email: email,
            name: this.getClientName(email),
            loginTime: Date.now(),
            lastActivity: Date.now(),
            rememberMe: rememberMe
        };

        // Générer un token de session simple (en production, utilisez JWT)
        const sessionToken = this.generateSessionToken();
        sessionData.token = sessionToken;

        // Stocker les données de session
        if (rememberMe) {
            localStorage.setItem('clientSession', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('clientSession', JSON.stringify(sessionData));
        }

        // Marquer comme connecté
        sessionStorage.setItem('clientLoggedIn', 'true');
        sessionStorage.setItem('clientEmail', email);
        sessionStorage.setItem('clientName', this.getClientName(email));
    }

    // Générer un token de session
    generateSessionToken() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    // Obtenir le nom du client (simulation)
    getClientName(email) {
        const clientNames = {
            'demo@client.fr': 'Société Démo',
            'client@example.com': 'Entreprise Example',
            'test@viconseil.fr': 'Test Company'
        };
        return clientNames[email] || 'Client';
    }

    // Vérifier la session existante
    checkExistingSession() {
        const sessionData = this.getSessionData();
        
        if (sessionData) {
            // Vérifier si la session n'a pas expiré
            const now = Date.now();
            const sessionAge = now - sessionData.loginTime;
            const inactivityTime = now - sessionData.lastActivity;

            if (sessionAge > (24 * 60 * 60 * 1000) || inactivityTime > this.sessionTimeout) {
                this.logout();
                return false;
            }

            // Mettre à jour l'activité
            this.updateLastActivity();
            return true;
        }
        
        return false;
    }

    // Obtenir les données de session
    getSessionData() {
        let sessionData = sessionStorage.getItem('clientSession');
        if (!sessionData) {
            sessionData = localStorage.getItem('clientSession');
        }
        
        return sessionData ? JSON.parse(sessionData) : null;
    }

    // Mettre à jour la dernière activité
    updateLastActivity() {
        const sessionData = this.getSessionData();
        if (sessionData) {
            sessionData.lastActivity = Date.now();
            
            if (sessionData.rememberMe) {
                localStorage.setItem('clientSession', JSON.stringify(sessionData));
            } else {
                sessionStorage.setItem('clientSession', JSON.stringify(sessionData));
            }
        }
    }

    // Configuration du timeout de session
    setupSessionTimeout() {
        // Vérifier l'activité toutes les minutes
        setInterval(() => {
            if (sessionStorage.getItem('clientLoggedIn')) {
                const sessionData = this.getSessionData();
                if (sessionData) {
                    const inactivityTime = Date.now() - sessionData.lastActivity;
                    
                    if (inactivityTime > this.sessionTimeout) {
                        alert('Votre session a expiré. Vous allez être redirigé vers la page de connexion.');
                        this.logout();
                    } else if (inactivityTime > (this.sessionTimeout - 5 * 60 * 1000)) {
                        // Avertir 5 minutes avant l'expiration
                        const remainingTime = Math.ceil((this.sessionTimeout - inactivityTime) / 60000);
                        console.warn(`Session expire dans ${remainingTime} minute(s)`);
                    }
                }
            }
        }, 60000);

        // Mettre à jour l'activité lors d'actions utilisateur
        ['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
            document.addEventListener(event, () => {
                if (sessionStorage.getItem('clientLoggedIn')) {
                    this.updateLastActivity();
                }
            });
        });
    }

    // Déconnexion
    logout() {
        // Nettoyer toutes les données de session
        sessionStorage.clear();
        localStorage.removeItem('clientSession');
        
        // Rediriger vers la page de connexion
        if (window.location.pathname !== '/client-login.html') {
            window.location.href = 'client-login.html';
        }
    }

    // Vérifier si l'utilisateur est connecté
    isLoggedIn() {
        return sessionStorage.getItem('clientLoggedIn') === 'true' && this.checkExistingSession();
    }

    // Protection des pages nécessitant une authentification
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'client-login.html';
            return false;
        }
        return true;
    }

    // Chiffrement simple pour les données sensibles (pour la démo)
    encrypt(text) {
        // En production, utilisez une vraie bibliothèque de chiffrement
        return btoa(text);
    }

    decrypt(encryptedText) {
        // En production, utilisez une vraie bibliothèque de chiffrement
        return atob(encryptedText);
    }
}

// Initialiser la sécurité
const clientSecurity = new ClientSecurity();

// Rendre disponible globalement
window.ClientSecurity = ClientSecurity;
window.clientSecurity = clientSecurity;