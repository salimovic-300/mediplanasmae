// ROLES & PERMISSIONS
export const USER_ROLES = {
  admin: { id: 'admin', label: 'Administrateur', color: 'role-admin', permissions: ['all'] },
  practitioner: { id: 'practitioner', label: 'Praticien', color: 'role-practitioner', permissions: ['patients', 'appointments', 'invoices', 'medical_records', 'statistics'] },
  secretary: { id: 'secretary', label: 'Secrétaire', color: 'role-secretary', permissions: ['patients', 'appointments', 'invoices', 'reminders'] },
};

// USERS DU CABINET HILALI
export const DEMO_USERS = [
  { id: 'u1', email: 'hilaliasmae15@gmail.com', password: 'Hilali@2026!', name: 'Dr. Asmae Hilali', role: 'admin', phone: '0661226090', specialty: 'Orthophonie', isActive: true },
  
  { id: 'u3', email: 'secretaire@cabinet-hilali.ma', password: 'SecHilali@2026!', name: 'Secrétaire', role: 'secretary', phone: '0661226090', specialty: null, isActive: true },
];

// APPOINTMENT TYPES
export const APPOINTMENT_TYPES = [
  { id: 'consultation', label: 'Consultation', duration: 30, color: '#14b8a6', fee: 400 },
  { id: 'suivi', label: 'Suivi', duration: 20, color: '#10b981', fee: 300 },
  { id: 'urgence', label: 'Urgence', duration: 15, color: '#ef4444', fee: 500 },
  { id: 'bilan', label: 'Bilan initial', duration: 60, color: '#8b5cf6', fee: 600 },
  { id: 'teleconsultation', label: 'Téléconsultation', duration: 20, color: '#f59e0b', fee: 350 },
  { id: 'reeducation', label: 'Rééducation', duration: 45, color: '#3b82f6', fee: 450 },
];

export const SPECIALTY_APPOINTMENT_TYPES = {
  'Orthophonie': [
    { id: 'bilan', label: 'Bilan initial', duration: 60, color: '#8b5cf6', fee: 600 },
    { id: 'seance', label: 'Séance de rééducation', duration: 45, color: '#3b82f6', fee: 400 },
    { id: 'suivi', label: 'Suivi', duration: 30, color: '#10b981', fee: 300 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 30, color: '#f59e0b', fee: 350 },
  ],
  'Ophtalmologie': [
    { id: 'consultation', label: 'Consultation', duration: 20, color: '#14b8a6', fee: 400 },
    { id: 'refraction', label: 'Réfraction / Verres', duration: 30, color: '#3b82f6', fee: 350 },
    { id: 'fond_oeil', label: 'Fond d\'œil', duration: 20, color: '#8b5cf6', fee: 300 },
    { id: 'urgence', label: 'Urgence ophtalmique', duration: 15, color: '#ef4444', fee: 500 },
    { id: 'suivi', label: 'Suivi glaucome / DMLA', duration: 20, color: '#10b981', fee: 300 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 20, color: '#f59e0b', fee: 300 },
  ],
  'Cardiologie': [
    { id: 'consultation', label: 'Consultation cardio', duration: 30, color: '#ef4444', fee: 500 },
    { id: 'ecg', label: 'ECG', duration: 20, color: '#f59e0b', fee: 300 },
    { id: 'echo', label: 'Échocardiographie', duration: 45, color: '#8b5cf6', fee: 800 },
    { id: 'holter', label: 'Pose Holter ECG', duration: 20, color: '#3b82f6', fee: 400 },
    { id: 'suivi', label: 'Suivi', duration: 20, color: '#10b981', fee: 350 },
    { id: 'urgence', label: 'Urgence cardiaque', duration: 15, color: '#dc2626', fee: 700 },
  ],
  'Kinésithérapie': [
    { id: 'bilan', label: 'Bilan fonctionnel initial', duration: 60, color: '#8b5cf6', fee: 500 },
    { id: 'seance', label: 'Séance de kiné', duration: 45, color: '#3b82f6', fee: 350 },
    { id: 'seance_courte', label: 'Séance courte', duration: 30, color: '#10b981', fee: 250 },
    { id: 'domicile', label: 'Visite à domicile', duration: 60, color: '#f59e0b', fee: 500 },
    { id: 'bilan_fin', label: 'Bilan de fin', duration: 30, color: '#14b8a6', fee: 400 },
  ],
  'Psychologie': [
    { id: 'bilan', label: 'Bilan psychologique initial', duration: 60, color: '#8b5cf6', fee: 600 },
    { id: 'seance', label: 'Séance thérapeutique', duration: 50, color: '#3b82f6', fee: 450 },
    { id: 'seance_courte', label: 'Séance courte (30 min)', duration: 30, color: '#10b981', fee: 300 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 50, color: '#f59e0b', fee: 400 },
    { id: 'couple', label: 'Thérapie de couple', duration: 75, color: '#ec4899', fee: 600 },
  ],
  'Psychiatrie': [
    { id: 'consultation', label: 'Consultation psychiatrique', duration: 45, color: '#8b5cf6', fee: 600 },
    { id: 'suivi', label: 'Suivi mensuel', duration: 20, color: '#10b981', fee: 400 },
    { id: 'urgence', label: 'Urgence psychiatrique', duration: 30, color: '#ef4444', fee: 700 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 30, color: '#f59e0b', fee: 450 },
  ],
  'Dermatologie': [
    { id: 'consultation', label: 'Consultation', duration: 20, color: '#f97316', fee: 400 },
    { id: 'acte', label: 'Acte dermatologique', duration: 30, color: '#8b5cf6', fee: 600 },
    { id: 'biopsie', label: 'Biopsie cutanée', duration: 30, color: '#ef4444', fee: 500 },
    { id: 'suivi', label: 'Suivi chronique', duration: 15, color: '#10b981', fee: 300 },
    { id: 'urgence', label: 'Urgence', duration: 15, color: '#dc2626', fee: 500 },
  ],
  'Gynécologie': [
    { id: 'consultation', label: 'Consultation gynéco', duration: 30, color: '#ec4899', fee: 450 },
    { id: 'suivi_grossesse', label: 'Suivi grossesse', duration: 30, color: '#f97316', fee: 400 },
    { id: 'frottis', label: 'Frottis cervical', duration: 20, color: '#8b5cf6', fee: 350 },
    { id: 'echo', label: 'Échographie obstétricale', duration: 30, color: '#3b82f6', fee: 600 },
    { id: 'urgence', label: 'Urgence gynéco', duration: 20, color: '#ef4444', fee: 600 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 20, color: '#f59e0b', fee: 350 },
  ],
  'ORL': [
    { id: 'consultation', label: 'Consultation ORL', duration: 20, color: '#14b8a6', fee: 400 },
    { id: 'audiogramme', label: 'Audiogramme', duration: 30, color: '#3b82f6', fee: 500 },
    { id: 'fibroscopie', label: 'Nasofibroscopie', duration: 20, color: '#8b5cf6', fee: 600 },
    { id: 'urgence', label: 'Urgence ORL', duration: 15, color: '#ef4444', fee: 500 },
    { id: 'suivi', label: 'Suivi', duration: 15, color: '#10b981', fee: 300 },
  ],
  'Pédiatrie': [
    { id: 'consultation', label: 'Consultation pédiatrique', duration: 30, color: '#14b8a6', fee: 400 },
    { id: 'vaccin', label: 'Vaccination', duration: 15, color: '#10b981', fee: 200 },
    { id: 'bilan', label: 'Bilan de santé', duration: 45, color: '#8b5cf6', fee: 500 },
    { id: 'urgence', label: 'Urgence pédiatrique', duration: 20, color: '#ef4444', fee: 500 },
    { id: 'suivi', label: 'Suivi nourrisson', duration: 20, color: '#3b82f6', fee: 350 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 20, color: '#f59e0b', fee: 350 },
  ],
  'Neurologie': [
    { id: 'consultation', label: 'Consultation neurologique', duration: 45, color: '#f59e0b', fee: 600 },
    { id: 'eeg', label: 'EEG', duration: 60, color: '#8b5cf6', fee: 700 },
    { id: 'suivi', label: 'Suivi épilepsie / SEP', duration: 30, color: '#10b981', fee: 400 },
    { id: 'urgence', label: 'Urgence neurologique', duration: 20, color: '#ef4444', fee: 700 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 30, color: '#3b82f6', fee: 450 },
  ],
  'Médecine générale': [
    { id: 'consultation', label: 'Consultation', duration: 20, color: '#14b8a6', fee: 200 },
    { id: 'suivi', label: 'Suivi maladie chronique', duration: 20, color: '#10b981', fee: 200 },
    { id: 'urgence', label: 'Urgence', duration: 15, color: '#ef4444', fee: 300 },
    { id: 'bilan', label: 'Bilan de santé', duration: 45, color: '#8b5cf6', fee: 400 },
    { id: 'certificat', label: 'Certificat médical', duration: 10, color: '#f59e0b', fee: 100 },
    { id: 'teleconsultation', label: 'Téléconsultation', duration: 15, color: '#3b82f6', fee: 150 },
    { id: 'vaccin', label: 'Vaccination', duration: 10, color: '#ec4899', fee: 100 },
  ],
};

// APPOINTMENT STATUSES
export const APPOINTMENT_STATUSES = {
  planifie: { label: 'Planifié', color: 'badge-info' },
  confirme: { label: 'Confirmé', color: 'badge-primary' },
  rappel_envoye: { label: 'Rappel envoyé', color: 'badge-warning' },
  present: { label: 'Présent', color: 'badge-success' },
  en_cours: { label: 'En cours', color: 'badge-accent' },
  termine: { label: 'Terminé', color: 'badge-success' },
  absent: { label: 'Absent', color: 'badge-danger' },
  annule: { label: 'Annulé', color: 'bg-slate-100 text-slate-600' },
};

// PAYMENT
export const PAYMENT_STATUSES = {
  pending: { label: 'En attente', color: 'badge-warning' },
  partial: { label: 'Partiel', color: 'badge-info' },
  paid: { label: 'Payé', color: 'badge-success' },
  refunded: { label: 'Remboursé', color: 'badge-danger' },
};

export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Espèces', icon: 'banknote' },
  { id: 'card', label: 'Carte bancaire', icon: 'credit-card' },
  { id: 'transfer', label: 'Virement', icon: 'building-2' },
  { id: 'check', label: 'Chèque', icon: 'file-text' },
  { id: 'online', label: 'Paiement en ligne', icon: 'globe' },
];

// SPECIALTIES
export const SPECIALTIES = ['Médecine générale', 'Orthophonie', 'Kinésithérapie', 'Psychologie', 'Psychiatrie', 'Dermatologie', 'Cardiologie', 'Pédiatrie', 'Ophtalmologie', 'ORL', 'Gynécologie', 'Neurologie'];

// REMINDERS
export const REMINDER_TYPES = [
  { id: 'sms', label: 'SMS', icon: 'message-square' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'phone' },
  { id: 'email', label: 'Email', icon: 'mail' },
];

export const REMINDER_TIMINGS = [
  { id: '1h', label: '1 heure avant', hours: 1 },
  { id: '24h', label: '24 heures avant', hours: 24 },
  { id: '48h', label: '48 heures avant', hours: 48 },
];

// MEDICAL RECORDS
export const MEDICAL_RECORD_TYPES = [
  { id: 'consultation_note', label: 'Note de consultation', icon: 'file-text' },
  { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
  { id: 'lab_result', label: 'Analyse', icon: 'flask-conical' },
  { id: 'imaging', label: 'Imagerie', icon: 'scan' },
  { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
  { id: 'certificate', label: 'Certificat', icon: 'award' },
];

export const SPECIALTY_RECORD_TYPES = {
  'Orthophonie': [
    { id: 'consultation_note', label: 'Note de séance', icon: 'file-text' },
    { id: 'bilan_ortho', label: 'Bilan orthophonique', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
    { id: 'prescription', label: 'Ordonnance', icon: 'file-plus' },
    { id: 'objectifs', label: 'Objectifs thérapeutiques', icon: 'target' },
    { id: 'certificate', label: 'Certificat', icon: 'award' },
  ],
  'Ophtalmologie': [
    { id: 'consultation_note', label: 'Consultation', icon: 'file-text' },
    { id: 'refraction', label: 'Fiche de réfraction', icon: 'eye' },
    { id: 'fond_oeil', label: 'Fond d\'œil', icon: 'scan' },
    { id: 'champ_visuel', label: 'Champ visuel', icon: 'activity' },
    { id: 'prescription', label: 'Ordonnance / Lunettes', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu opératoire', icon: 'file-check' },
  ],
  'Cardiologie': [
    { id: 'consultation_note', label: 'Consultation', icon: 'file-text' },
    { id: 'ecg', label: 'ECG / Électrocardiogramme', icon: 'activity' },
    { id: 'echographie', label: 'Échocardiographie', icon: 'scan' },
    { id: 'holter', label: 'Holter ECG', icon: 'heart' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu cardio', icon: 'file-check' },
    { id: 'certificate', label: 'Certificat médical', icon: 'award' },
  ],
  'Kinésithérapie': [
    { id: 'consultation_note', label: 'Note de séance', icon: 'file-text' },
    { id: 'bilan_kine', label: 'Bilan fonctionnel initial', icon: 'clipboard-list' },
    { id: 'programme', label: 'Programme de rééducation', icon: 'target' },
    { id: 'report', label: 'Compte-rendu de fin', icon: 'file-check' },
    { id: 'prescription', label: 'Ordonnance', icon: 'file-plus' },
    { id: 'certificate', label: 'Certificat', icon: 'award' },
  ],
  'Psychologie': [
    { id: 'consultation_note', label: 'Note de séance', icon: 'file-text' },
    { id: 'bilan_psy', label: 'Bilan psychologique', icon: 'brain' },
    { id: 'echelle', label: 'Échelle / Test psychométrique', icon: 'bar-chart-2' },
    { id: 'objectifs', label: 'Plan thérapeutique', icon: 'target' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
    { id: 'certificate', label: 'Certificat', icon: 'award' },
  ],
  'Psychiatrie': [
    { id: 'consultation_note', label: 'Consultation psychiatrique', icon: 'file-text' },
    { id: 'echelle', label: 'Échelle clinique', icon: 'bar-chart-2' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
    { id: 'hospitalisation', label: 'Fiche d\'hospitalisation', icon: 'building-2' },
    { id: 'certificate', label: 'Certificat médical', icon: 'award' },
  ],
  'Dermatologie': [
    { id: 'consultation_note', label: 'Consultation', icon: 'file-text' },
    { id: 'description_lesion', label: 'Description de lésion', icon: 'layers' },
    { id: 'biopsie', label: 'Résultat biopsie', icon: 'flask-conical' },
    { id: 'photo', label: 'Suivi photographique', icon: 'image' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
  ],
  'Gynécologie': [
    { id: 'consultation_note', label: 'Consultation', icon: 'file-text' },
    { id: 'suivi_grossesse', label: 'Suivi de grossesse', icon: 'baby' },
    { id: 'frottis', label: 'Frottis cervical', icon: 'flask-conical' },
    { id: 'echographie', label: 'Échographie obstétricale', icon: 'scan' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
    { id: 'certificate', label: 'Certificat de grossesse', icon: 'award' },
  ],
  'ORL': [
    { id: 'consultation_note', label: 'Consultation', icon: 'file-text' },
    { id: 'audiogramme', label: 'Audiogramme', icon: 'activity' },
    { id: 'tympanogramme', label: 'Tympanogramme', icon: 'radio' },
    { id: 'nasofibroscopie', label: 'Nasofibroscopie', icon: 'scan' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu opératoire', icon: 'file-check' },
  ],
  'Pédiatrie': [
    { id: 'consultation_note', label: 'Consultation pédiatrique', icon: 'file-text' },
    { id: 'courbe_croissance', label: 'Courbe de croissance', icon: 'trending-up' },
    { id: 'carnet_vaccins', label: 'Carnet vaccinal', icon: 'shield' },
    { id: 'bilan_devt', label: 'Bilan développement', icon: 'brain' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'certificate', label: 'Certificat scolaire', icon: 'award' },
  ],
  'Neurologie': [
    { id: 'consultation_note', label: 'Consultation', icon: 'file-text' },
    { id: 'examen_neuro', label: 'Examen neurologique', icon: 'zap' },
    { id: 'eeg', label: 'EEG', icon: 'activity' },
    { id: 'irm', label: 'IRM / Scanner', icon: 'scan' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
  ],
  'Médecine générale': [
    { id: 'consultation_note', label: 'Note de consultation', icon: 'file-text' },
    { id: 'prescription', label: 'Ordonnance', icon: 'clipboard-list' },
    { id: 'lab_result', label: 'Résultat d\'analyse', icon: 'flask-conical' },
    { id: 'imaging', label: 'Imagerie', icon: 'scan' },
    { id: 'report', label: 'Compte-rendu', icon: 'file-check' },
    { id: 'certificate', label: 'Certificat médical', icon: 'award' },
  ],
};

// DEMO PATIENTS
export const DEMO_PATIENTS = [
  {
    id: 'p1', firstName: 'Ahmed', lastName: 'El Mansouri', email: 'ahmed.elmansouri@email.com', phone: '0677889900',
    dateOfBirth: '1988-03-15', gender: 'Homme', address: '12 Rue Mohammed V', city: 'Rabat', postalCode: '10000',
    mutuelle: 'CNOPS', mutuelleNumber: 'CNOPS-123456', bloodType: 'A+', allergies: ['Pénicilline'],
    chronicConditions: ['Hypertension légère'], emergencyContact: { name: 'Fatima El Mansouri', phone: '0677889901', relation: 'Épouse' },
    notes: 'Patient régulier', photo: null, createdAt: '2024-01-10', lastVisit: '2025-01-10', totalVisits: 12, balance: 150, preferredReminder: 'whatsapp'
  },
  {
    id: 'p2', firstName: 'Khadija', lastName: 'Ouazzani', email: 'khadija.ouazzani@email.com', phone: '0655443322',
    dateOfBirth: '1976-08-22', gender: 'Femme', address: '45 Avenue Hassan II', city: 'Casablanca', postalCode: '20000',
    mutuelle: 'CNSS', mutuelleNumber: 'CNSS-789012', bloodType: 'O+', allergies: [], chronicConditions: [],
    emergencyContact: { name: 'Omar Ouazzani', phone: '0655443323', relation: 'Époux' },
    notes: '', photo: null, createdAt: '2024-03-20', lastVisit: '2025-01-08', totalVisits: 24, balance: 0, preferredReminder: 'sms'
  },
  {
    id: 'p3', firstName: 'Youssef', lastName: 'Tazi', email: 'parent.tazi@email.com', phone: '0699887766',
    dateOfBirth: '2018-11-30', gender: 'Homme', address: '8 Rue Ibn Sina', city: 'Marrakech', postalCode: '40000',
    mutuelle: 'Assurance privée', mutuelleNumber: 'PRV-345678', bloodType: 'B+', allergies: ['Arachides'], chronicConditions: [],
    emergencyContact: { name: 'Mohammed Tazi', phone: '0699887767', relation: 'Père' },
    notes: 'Enfant - Suivi orthophonique', photo: null, createdAt: '2024-06-15', lastVisit: '2025-01-10', totalVisits: 18, balance: 200, preferredReminder: 'whatsapp'
  },
  {
    id: 'p4', firstName: 'Salma', lastName: 'Chraibi', email: 'salma.chraibi@email.com', phone: '0611223344',
    dateOfBirth: '1995-05-12', gender: 'Femme', address: '23 Boulevard Zerktouni', city: 'Casablanca', postalCode: '20100',
    mutuelle: 'CNOPS', mutuelleNumber: 'CNOPS-567890', bloodType: 'AB+', allergies: [], chronicConditions: ['Asthme léger'],
    emergencyContact: { name: 'Rachid Chraibi', phone: '0611223345', relation: 'Frère' },
    notes: '', photo: null, createdAt: '2024-09-01', lastVisit: '2025-01-05', totalVisits: 6, balance: 0, preferredReminder: 'email'
  },
];

// DEMO APPOINTMENTS
export const DEMO_APPOINTMENTS = [
  { id: 'a1', patientId: 'p1', practitionerId: 'u2', date: '2025-01-13', time: '09:00', duration: 30, type: 'suivi', status: 'confirme', notes: 'Séance de rééducation vocale', fee: 300, paid: false, reminderSent: true, reminderType: 'whatsapp' },
  { id: 'a2', patientId: 'p2', practitionerId: 'u2', date: '2025-01-13', time: '10:00', duration: 30, type: 'consultation', status: 'planifie', notes: '', fee: 400, paid: false, reminderSent: false, reminderType: 'sms' },
  { id: 'a3', patientId: 'p3', practitionerId: 'u1', date: '2025-01-13', time: '11:00', duration: 45, type: 'reeducation', status: 'confirme', notes: 'Séance orthophonique', fee: 450, paid: false, reminderSent: true, reminderType: 'whatsapp' },
  { id: 'a4', patientId: 'p4', practitionerId: 'u2', date: '2025-01-14', time: '14:00', duration: 60, type: 'bilan', status: 'planifie', notes: 'Bilan initial', fee: 600, paid: false, reminderSent: false, reminderType: 'email' },
  { id: 'a5', patientId: 'p1', practitionerId: 'u2', date: '2025-01-10', time: '09:30', duration: 30, type: 'suivi', status: 'termine', notes: 'Bonne progression', fee: 300, paid: true, paymentMethod: 'card', paidAt: '2025-01-10T10:05:00', reminderSent: true },
  { id: 'a6', patientId: 'p2', practitionerId: 'u1', date: '2025-01-09', time: '14:00', duration: 30, type: 'consultation', status: 'termine', notes: '', fee: 400, paid: true, paymentMethod: 'cash', paidAt: '2025-01-09T14:35:00', reminderSent: true },
];

// DEMO MEDICAL RECORDS
export const DEMO_MEDICAL_RECORDS = [
  { id: 'mr1', patientId: 'p1', type: 'consultation_note', title: 'Consultation initiale', content: 'Patient présentant une dysphonie fonctionnelle. Voix rauque depuis 3 mois.', date: '2024-01-10', createdBy: 'u2', attachments: [] },
  { id: 'mr2', patientId: 'p1', type: 'report', title: 'Bilan orthophonique', content: 'Score VHI: 45/120. Diagnostic: dysphonie fonctionnelle modérée.', date: '2024-01-15', createdBy: 'u2', attachments: [] },
  { id: 'mr3', patientId: 'p3', type: 'consultation_note', title: 'Première consultation', content: 'Enfant de 6 ans présentant un retard de langage.', date: '2024-06-15', createdBy: 'u1', attachments: [] },
];

// DEMO INVOICES
export const DEMO_INVOICES = [
  { id: 'inv1', number: 'FAC-2025-001', patientId: 'p1', appointmentId: 'a5', date: '2025-01-10', items: [{ description: 'Séance de suivi', quantity: 1, unitPrice: 300, total: 300 }], subtotal: 300, tax: 0, total: 300, status: 'paid', paymentMethod: 'card', paidAt: '2025-01-10T10:05:00' },
  { id: 'inv2', number: 'FAC-2025-002', patientId: 'p2', appointmentId: 'a6', date: '2025-01-09', items: [{ description: 'Consultation', quantity: 1, unitPrice: 400, total: 400 }], subtotal: 400, tax: 0, total: 400, status: 'paid', paymentMethod: 'cash', paidAt: '2025-01-09T14:35:00' },
];

// CABINET CONFIG
export const DEFAULT_CABINET_CONFIG = {
  name: 'Cabinet Hilali', subtitle: "Cabinet d'Orthophonie", logo: null,
  address: '', city: 'Rabat', postalCode: '10000', country: 'Maroc',
  phone: '0661226090', email: 'hilaliasmae15@gmail.com', website: '',
  specialty: 'Orthophonie', currency: 'DH', taxRate: 0, appointmentDuration: 30,
  workingHours: {
    monday: { start: '08:00', end: '18:00', enabled: true },
    tuesday: { start: '08:00', end: '18:00', enabled: true },
    wednesday: { start: '08:00', end: '18:00', enabled: true },
    thursday: { start: '08:00', end: '18:00', enabled: true },
    friday: { start: '08:00', end: '18:00', enabled: true },
    saturday: { start: '09:00', end: '13:00', enabled: true },
    sunday: { start: '00:00', end: '00:00', enabled: false },
  },
  reminderSettings: {
    enabled: true, defaultType: 'whatsapp', defaultTiming: '24h',
    smsTemplate: 'Rappel: RDV le {date} à {time}. {cabinet}',
    whatsappTemplate: '👋 Bonjour {patient}!\n📅 RDV: {date} à {time}\n📍 {cabinet}',
  },
  invoiceSettings: { prefix: 'FAC', footer: 'Merci de votre confiance.', bankDetails: 'IBAN: MA00 0000 0000' },
  stripeEnabled: false, stripePublicKey: '',
  googleCalendarEnabled: false, googleCalendarId: '',
};
 
