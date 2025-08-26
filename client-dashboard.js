// Vérification de l'authentification
document.addEventListener('DOMContentLoaded', function() {
    // Utiliser le système de sécurité pour vérifier l'authentification
    if (!clientSecurity.requireAuth()) {
        return;
    }
    
    // Charger les informations du client
    loadClientInfo();
    
    // Charger les données
    loadInvoices();
    loadPayments();
    
    // Configuration des événements
    setupEventListeners();
});

// Données de démonstration
const demoInvoices = [
    {
        id: 'FAC-2024-001',
        date: '2024-01-15',
        amount: 2500.00,
        status: 'paid',
        dueDate: '2024-02-15'
    },
    {
        id: 'FAC-2024-002',
        date: '2024-02-15',
        amount: 1800.50,
        status: 'paid',
        dueDate: '2024-03-15'
    },
    {
        id: 'FAC-2024-003',
        date: '2024-03-15',
        amount: 3200.00,
        status: 'pending',
        dueDate: '2024-04-15'
    },
    {
        id: 'FAC-2024-004',
        date: '2024-04-15',
        amount: 1950.75,
        status: 'overdue',
        dueDate: '2024-05-15'
    }
];

const demoPayments = [
    {
        date: '2024-02-10',
        invoice: 'FAC-2024-001',
        amount: 2500.00,
        method: 'Carte bancaire',
        status: 'Confirmé'
    },
    {
        date: '2024-03-12',
        invoice: 'FAC-2024-002',
        amount: 1800.50,
        method: 'Virement SEPA',
        status: 'Confirmé'
    }
];

function loadClientInfo() {
    const clientName = sessionStorage.getItem('clientName') || 'Client';
    const clientEmail = sessionStorage.getItem('clientEmail') || '';
    
    document.getElementById('clientName').textContent = `Bienvenue, ${clientName}`;
    document.getElementById('clientEmail').textContent = clientEmail;
}

function loadInvoices() {
    const tbody = document.getElementById('invoicesTableBody');
    tbody.innerHTML = '';
    
    demoInvoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.id}</td>
            <td>${formatDate(invoice.date)}</td>
            <td>${formatCurrency(invoice.amount)}</td>
            <td><span class="status-badge status-${invoice.status}">${getStatusText(invoice.status)}</span></td>
            <td>
                <button class="action-btn download-btn" onclick="downloadInvoice('${invoice.id}')">
                    📥 Télécharger
                </button>
                ${invoice.status !== 'paid' ? 
                    `<button class="action-btn pay-btn" onclick="payInvoice('${invoice.id}')">
                        💳 Payer
                    </button>` : ''
                }
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadPayments() {
    const tbody = document.getElementById('paymentsTableBody');
    tbody.innerHTML = '';
    
    demoPayments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(payment.date)}</td>
            <td>${payment.invoice}</td>
            <td>${formatCurrency(payment.amount)}</td>
            <td>${payment.method}</td>
            <td><span class="status-badge status-paid">${payment.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function setupEventListeners() {
    // Navigation dans la sidebar
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mettre à jour l'état actif
            document.querySelectorAll('.sidebar-menu a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher la section correspondante
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Modal de paiement
    const modal = document.getElementById('paymentModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Méthodes de paiement
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            
            const methodType = this.getAttribute('data-method');
            showPaymentForm(methodType);
        });
    });
    
    // Formatage des champs de carte
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formattedValue;
    });
    
    document.getElementById('cardExpiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D+/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

function showSection(sectionName) {
    // Masquer toutes les sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
}

function toggleFilters() {
    const filters = document.getElementById('filters');
    filters.style.display = filters.style.display === 'none' ? 'block' : 'none';
}

function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    // Ici vous pourriez implémenter la logique de filtrage
    console.log('Filtres appliqués:', { status: statusFilter, date: dateFilter });
    alert('Filtres appliqués (fonctionnalité de démonstration)');
}

function downloadInvoice(invoiceId) {
    // Simulation de téléchargement
    alert(`Téléchargement de la facture ${invoiceId} (fonctionnalité de démonstration)`);
}

function payInvoice(invoiceId) {
    const invoice = demoInvoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;
    
    showPaymentModal(invoice);
}

function showPaymentModal(invoice = null) {
    const modal = document.getElementById('paymentModal');
    const invoiceDetails = document.getElementById('invoiceDetails');
    
    if (invoice) {
        invoiceDetails.innerHTML = `
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <h4>Facture ${invoice.id}</h4>
                <p><strong>Montant:</strong> ${formatCurrency(invoice.amount)}</p>
                <p><strong>Date d'échéance:</strong> ${formatDate(invoice.dueDate)}</p>
            </div>
        `;
        document.getElementById('transferReference').textContent = invoice.id;
    }
    
    modal.style.display = 'block';
}

function showPaymentForm(method) {
    // Masquer tous les formulaires
    document.getElementById('cardForm').style.display = 'none';
    document.getElementById('transferForm').style.display = 'none';
    
    // Afficher le bon formulaire
    if (method === 'card') {
        document.getElementById('cardForm').classList.add('active');
        document.getElementById('cardForm').style.display = 'block';
    } else if (method === 'transfer') {
        document.getElementById('transferForm').style.display = 'block';
    }
}

function processCardPayment() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCvv = document.getElementById('cardCvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert('Veuillez remplir tous les champs de la carte');
        return;
    }
    
    // Simulation de traitement de paiement
    alert('Paiement en cours de traitement...');
    
    setTimeout(() => {
        alert('Paiement effectué avec succès !');
        document.getElementById('paymentModal').style.display = 'none';
        
        // Recharger les données pour refléter le paiement
        loadInvoices();
        loadPayments();
    }, 2000);
}

function confirmTransfer() {
    alert('Votre déclaration de virement a été enregistrée. Nous confirmerons le paiement dès réception.');
    document.getElementById('paymentModal').style.display = 'none';
}

function logout() {
    clientSecurity.logout();
}

// Fonctions utilitaires
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function getStatusText(status) {
    const statusMap = {
        'paid': 'Payée',
        'pending': 'En attente',
        'overdue': 'En retard'
    };
    return statusMap[status] || status;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Afficher par défaut la section des factures
    showSection('invoices');
});