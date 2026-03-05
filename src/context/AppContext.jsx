import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  collection, doc, getDoc, setDoc, updateDoc, deleteDoc,
  onSnapshot, writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase';
import { DEMO_MEDICAL_RECORDS, DEMO_INVOICES, DEMO_USERS, DEFAULT_CABINET_CONFIG } from '../data/constants';
import { IMPORTED_PATIENTS, IMPORTED_APPOINTMENTS } from '../data/importedData';
import { generateId, generateInvoiceNumber } from '../utils/helpers';

const AppContext = createContext(null);
const AUTH_KEY = 'hilali_auth';

const COL = {
  patients: 'patients', appointments: 'appointments',
  medicalRecords: 'medicalRecords', invoices: 'invoices',
  users: 'users', meta: 'meta',
};

async function seedCollection(colName, items) {
  const chunks = [];
  for (let i = 0; i < items.length; i += 499) chunks.push(items.slice(i, i + 499));
  for (const chunk of chunks) {
    const batch = writeBatch(db);
    for (const item of chunk) {
      batch.set(doc(db, colName, String(item.id)), item);
    }
    await batch.commit();
  }
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser]         = useState(null);
  const [loading, setLoading]                 = useState(true);
  const [dbReady, setDbReady]                 = useState(false);

  const [patients,       setPatients]       = useState([]);
  const [appointments,   setAppointments]   = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [invoices,       setInvoices]       = useState([]);
  const [users,          setUsers]          = useState([]);
  const [cabinetConfig,  setCabinetConfig]  = useState(DEFAULT_CABINET_CONFIG);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [notifications,  setNotifications]  = useState([]);
  const unsubscribers = useRef([]);

  useEffect(() => {
    const init = async () => {
      try {
        const auth = localStorage.getItem(AUTH_KEY);
        if (auth) { const u = JSON.parse(auth); setCurrentUser(u); setIsAuthenticated(true); }

        const metaRef = doc(db, COL.meta, 'initialized');
        const metaSnap = await getDoc(metaRef);

        if (!metaSnap.exists()) {
          await seedCollection(COL.patients,       IMPORTED_PATIENTS);
          await seedCollection(COL.appointments,   IMPORTED_APPOINTMENTS);
          await seedCollection(COL.medicalRecords, DEMO_MEDICAL_RECORDS);
          await seedCollection(COL.invoices,       DEMO_INVOICES);
          await seedCollection(COL.users,          DEMO_USERS);
          await setDoc(doc(db, COL.meta, 'cabinet'), DEFAULT_CABINET_CONFIG);
          await setDoc(metaRef, { at: new Date().toISOString(), cabinet: 'Hilali' });
        }

        const cabinetSnap = await getDoc(doc(db, COL.meta, 'cabinet'));
        if (cabinetSnap.exists()) setCabinetConfig(cabinetSnap.data());
        setDbReady(true);
      } catch (err) {
        console.error('Firebase init error:', err);
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!dbReady) return;
    unsubscribers.current.forEach(u => u());
    unsubscribers.current = [];
    const listen = (colName, setter) => {
      const unsub = onSnapshot(collection(db, colName), (snap) => {
        setter(snap.docs.map(d => ({ ...d.data(), id: d.id })));
      });
      unsubscribers.current.push(unsub);
    };
    listen(COL.patients,       setPatients);
    listen(COL.appointments,   setAppointments);
    listen(COL.medicalRecords, setMedicalRecords);
    listen(COL.invoices,       setInvoices);
    listen(COL.users,          setUsers);
    setLoading(false);
    return () => unsubscribers.current.forEach(u => u());
  }, [dbReady]);

  const login = useCallback((email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const authUser = { ...user, password: undefined };
      setCurrentUser(authUser); setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
      return { success: true, user: authUser };
    }
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null); setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const addNotification = useCallback((message, type = 'info') => {
    const n = { id: generateId(), message, type };
    setNotifications(prev => [...prev, n]);
    setTimeout(() => setNotifications(prev => prev.filter(x => x.id !== n.id)), 4000);
  }, []);
  const removeNotification = useCallback((id) => setNotifications(prev => prev.filter(n => n.id !== id)), []);

  const addPatient = useCallback(async (data) => {
    const id = data.id || generateId();
    const p = { ...data, id, createdAt: data.createdAt || new Date().toISOString().split('T')[0], totalVisits: data.totalVisits ?? 0, balance: data.balance ?? 0 };
    await setDoc(doc(db, COL.patients, id), p);
    addNotification('Patient ajouté', 'success');
    return p;
  }, [addNotification]);
  const updatePatient = useCallback(async (id, data) => { await updateDoc(doc(db, COL.patients, id), data); addNotification('Patient mis à jour', 'success'); }, [addNotification]);
  const deletePatient = useCallback(async (id) => {
    const batch = writeBatch(db);
    batch.delete(doc(db, COL.patients, id));
    appointments.filter(a => a.patientId === id).forEach(a => batch.delete(doc(db, COL.appointments, a.id)));
    medicalRecords.filter(r => r.patientId === id).forEach(r => batch.delete(doc(db, COL.medicalRecords, r.id)));
    await batch.commit();
    addNotification('Patient supprimé', 'success');
  }, [addNotification, appointments, medicalRecords]);
  const getPatientById = useCallback((id) => patients.find(p => p.id === id), [patients]);

  const addAppointment = useCallback(async (data) => {
    const id = data.id || generateId();
    const a = { ...data, id, createdAt: new Date().toISOString(), createdBy: currentUser?.id || 'u1' };
    await setDoc(doc(db, COL.appointments, id), a);
    addNotification('RDV créé', 'success');
    return a;
  }, [addNotification, currentUser]);
  const updateAppointment = useCallback(async (id, data) => { await updateDoc(doc(db, COL.appointments, id), data); }, []);
  const deleteAppointment = useCallback(async (id) => { await deleteDoc(doc(db, COL.appointments, id)); addNotification('RDV supprimé', 'success'); }, [addNotification]);
  const getAppointmentsByPatient = useCallback((patientId) => appointments.filter(a => a.patientId === patientId), [appointments]);
  const getAppointmentsByDate    = useCallback((date) => appointments.filter(a => a.date === date), [appointments]);

  const addMedicalRecord = useCallback(async (data) => {
    const id = generateId();
    const r = { ...data, id, date: new Date().toISOString().split('T')[0], createdBy: currentUser?.id };
    await setDoc(doc(db, COL.medicalRecords, id), r);
    addNotification('Dossier ajouté', 'success');
    return r;
  }, [addNotification, currentUser]);
  const updateMedicalRecord = useCallback(async (id, data) => { await updateDoc(doc(db, COL.medicalRecords, id), data); addNotification('Dossier mis à jour', 'success'); }, [addNotification]);
  const deleteMedicalRecord = useCallback(async (id) => { await deleteDoc(doc(db, COL.medicalRecords, id)); addNotification('Dossier supprimé', 'success'); }, [addNotification]);
  const getMedicalRecordsByPatient = useCallback((patientId) =>
    medicalRecords.filter(r => r.patientId === patientId).sort((a, b) => b.date.localeCompare(a.date)), [medicalRecords]);

  const addInvoice = useCallback(async (data) => {
    const id = generateId();
    const inv = { ...data, id, number: generateInvoiceNumber(cabinetConfig.invoiceSettings?.prefix || 'FAC', invoices), createdAt: new Date().toISOString(), createdBy: currentUser?.id };
    await setDoc(doc(db, COL.invoices, id), inv);
    addNotification('Facture créée', 'success');
    return inv;
  }, [addNotification, currentUser, invoices, cabinetConfig]);
  const updateInvoice   = useCallback(async (id, data) => { await updateDoc(doc(db, COL.invoices, id), data); }, []);
  const markInvoicePaid = useCallback(async (id, paymentMethod) => {
    await updateDoc(doc(db, COL.invoices, id), { status: 'paid', paymentMethod, paidAt: new Date().toISOString() });
    addNotification('Facture payée', 'success');
  }, [addNotification]);

  const addUser    = useCallback(async (data) => { const id = generateId(); const u = { ...data, id, isActive: true, createdAt: new Date().toISOString().split('T')[0] }; await setDoc(doc(db, COL.users, id), u); addNotification('Utilisateur ajouté', 'success'); return u; }, [addNotification]);
  const updateUser = useCallback(async (id, data) => { await updateDoc(doc(db, COL.users, id), data); addNotification('Utilisateur mis à jour', 'success'); }, [addNotification]);
  const deleteUser = useCallback(async (id) => { await deleteDoc(doc(db, COL.users, id)); addNotification('Utilisateur supprimé', 'success'); }, [addNotification]);
  const getUserById      = useCallback((id) => users.find(u => u.id === id), [users]);
  const getPractitioners = useCallback(() => users.filter(u => u.role === 'practitioner' || u.role === 'admin'), [users]);

  const updateCabinetConfig = useCallback(async (data) => {
    const updated = { ...cabinetConfig, ...data };
    setCabinetConfig(updated);
    await setDoc(doc(db, COL.meta, 'cabinet'), updated);
    addNotification('Configuration mise à jour', 'success');
  }, [addNotification, cabinetConfig]);

  const sendReminder = useCallback(async (appointmentId, type) => {
    await updateDoc(doc(db, COL.appointments, appointmentId), { reminderSent: true, reminderType: type });
    addNotification(`Rappel ${type.toUpperCase()} envoyé`, 'success');
    return { success: true };
  }, [addNotification]);

  const getStats = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const paidInvoices   = invoices.filter(i => i.status === 'paid');
    const completedAppts = appointments.filter(a => a.status === 'termine' || a.status === 'present');
    const absentAppts    = appointments.filter(a => a.status === 'absent');
    return {
      totalPatients:        patients.length,
      todayAppointments:    appointments.filter(a => a.date === today).length,
      upcomingAppointments: appointments.filter(a => a.date >= today && !['annule', 'termine', 'absent'].includes(a.status)).length,
      totalRevenue:         paidInvoices.reduce((s, i) => s + (i.total || 0), 0),
      monthlyRevenue:       paidInvoices.filter(i => i.date?.startsWith(today.slice(0, 7))).reduce((s, i) => s + (i.total || 0), 0),
      pendingPayments:      appointments.filter(a => !a.paid && a.status === 'termine').reduce((s, a) => s + (a.fee || 0), 0),
      totalInvoices:        invoices.length,
      paidInvoices:         paidInvoices.length,
      absenceRate:          completedAppts.length + absentAppts.length > 0 ? ((absentAppts.length / (completedAppts.length + absentAppts.length)) * 100).toFixed(1) : 0,
      remindersSent:        appointments.filter(a => a.reminderSent).length,
    };
  }, [patients, appointments, invoices]);

  const resetToDemo = useCallback(() => addNotification('Réinitialisation désactivée', 'info'), [addNotification]);

  const value = {
    isAuthenticated, currentUser, login, logout, loading,
    patients, appointments, medicalRecords, invoices, users, cabinetConfig,
    addPatient, updatePatient, deletePatient, getPatientById,
    addAppointment, updateAppointment, deleteAppointment, getAppointmentsByPatient, getAppointmentsByDate,
    addMedicalRecord, updateMedicalRecord, deleteMedicalRecord, getMedicalRecordsByPatient,
    addInvoice, updateInvoice, markInvoicePaid,
    addUser, updateUser, deleteUser, getUserById, getPractitioners,
    updateCabinetConfig, sendReminder,
    sidebarOpen, setSidebarOpen,
    notifications, addNotification, removeNotification,
    getStats, resetToDemo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
