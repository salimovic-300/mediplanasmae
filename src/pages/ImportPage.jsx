import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Users, Calendar, ArrowRight, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

// ── Filet de sécurité anti-écran blanc ──────────────────────────────────────
class PreviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="card border-rose-200 bg-rose-50 text-rose-700 p-6 text-center">
          <AlertCircle size={40} className="mx-auto mb-3 text-rose-500" />
          <h3 className="font-bold text-lg mb-2">Erreur d'affichage de l'aperçu</h3>
          <p className="text-sm mb-4">Une donnée inattendue dans le fichier empêche l'affichage, mais l'application ne plantera plus !</p>
          <pre className="text-xs bg-rose-100 p-4 rounded-xl overflow-auto text-left max-w-full">
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} className="mt-4 btn-primary bg-rose-600 border-none hover:bg-rose-700">
            Recharger la page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Convertisseur de données externes → MediPlan ──────────────────────────
function convertMongoDBData(raw) {
  const errors = [];
  const patients = [];
  const appointments = [];

  // Lecture des rendez-vous et extraction des patients
  if (raw.appointments && Array.isArray(raw.appointments)) {
    const apptDoc = raw.appointments.find(d => d.data);
    if (apptDoc && apptDoc.data) {
      const patientsMap = {};
      const statusMap = {
        'présent': 'termine', 'absent': 'annule',
        'confirmé': 'confirme', 'planifié': 'planifie',
        'en attente': 'planifie', 'en_attente': 'planifie', 'annulé': 'annule',
      };

      for (const [slot, appt] of Object.entries(apptDoc.data)) {
        if (!appt) continue;

        const fn = String(appt.firstName || '').trim();
        const ln = String(appt.lastName || '').trim();

        if (!fn && !ln) continue;
        if (['sdfv', 'test', 'xxx', ''].includes(fn.toLowerCase())) continue;

        const key = `${fn.toLowerCase()}_${ln.toLowerCase()}`;
        if (!patientsMap[key]) {
          patientsMap[key] = {
            id: `imp_${Math.abs(hashCode(key)) % 999999}`.padEnd(10, '0').substring(0, 10),
            firstName: fn || 'Inconnu',
            lastName: ln,
            phone: appt.phone ? String(appt.phone) : '',
            email: appt.email ? String(appt.email) : '',
            dateOfBirth: appt.dateOfBirth || '',
            gender: appt.gender || '',
            address: '',
            city: '',
            notes: 'Importé depuis MongoDB',
            createdAt: new Date().toISOString(),
          };
        }

        const parts = String(slot).split('_');
        const dateStr = parts[0];
        const timeStr = parts[1] || '09:00';
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) continue;

        const status = statusMap[String(appt.status || '').toLowerCase()] || 'termine';
        appointments.push({
          id: `imp_a_${Math.abs(hashCode(String(slot) + fn)) % 9999999}`,
          patientId: patientsMap[key].id,
          practitionerId: 'u1',
          date: dateStr,
          time: timeStr,
          duration: 30,
          type: 'seance',
          status,
          notes: appt.notes ? String(appt.notes) : '',
          fee: 400,
          paid: status === 'termine',
          reminderSent: false,
          reminderType: 'whatsapp',
        });
      }
      patients.push(...Object.values(patientsMap));
    }
  }

  // Lecture de la collection patients si elle existe
  if (raw.patients && Array.isArray(raw.patients) && raw.patients.length > 0) {
    for (const p of raw.patients) {
      if (!p || (!p.firstName && !p.prenom)) continue;
      patients.push({
        id: p._id || p.id || `imp_${Date.now()}_${Math.random()}`,
        firstName: String(p.firstName || p.prenom || 'Inconnu'),
        lastName: String(p.lastName || p.nom || ''),
        phone: String(p.phone || p.telephone || ''),
        email: String(p.email || ''),
        dateOfBirth: p.dateOfBirth || p.dateNaissance || '',
        gender: p.gender || p.sexe || '',
        address: p.address || p.adresse || '',
        city: p.city || p.ville || '',
        notes: p.notes ? String(p.notes) : '',
        createdAt: p.createdAt || new Date().toISOString(),
      });
    }
  }

  return { patients, appointments, errors };
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export default function ImportPage() {
  const { patients: existingPatients, appointments: existingAppointments, addPatient, addAppointment } = useApp();
  const [step, setStep] = useState('upload');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({ skipDuplicates: true, importAppointments: true });
  const fileRef = useRef();

  const handleFile = (f) => {
    setFile(f);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target.result);
        const converted = convertMongoDBData(raw);
        if (converted.patients.length === 0 && converted.appointments.length === 0) {
          setError('Aucune donnée de patient ou de RDV reconnue dans ce fichier.');
          return;
        }
        setPreview(converted);
        setStep('preview');
      } catch (err) {
        setError('Fichier JSON invalide : ' + err.message);
      }
    };
    reader.onerror = () => setError("Erreur lors de la lecture du fichier.");
    reader.readAsText(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleImport = async () => {
    setStep('importing');
    setProgress(0);

    const existingNames = new Set(
      existingPatients.map(p => `${String(p.firstName || '').toLowerCase()}_${String(p.lastName || '').toLowerCase()}`)
    );

    let imported = { patients: 0, appointments: 0, skipped: 0 };
    const patientIdMap = {};

    for (let i = 0; i < preview.patients.length; i++) {
      const p = preview.patients[i];
      const key = `${String(p.firstName || '').toLowerCase()}_${String(p.lastName || '').toLowerCase()}`;

      if (options.skipDuplicates && existingNames.has(key)) {
        const existing = existingPatients.find(ep =>
          String(ep.firstName || '').toLowerCase() === String(p.firstName || '').toLowerCase() &&
          String(ep.lastName || '').toLowerCase() === String(p.lastName || '').toLowerCase()
        );
        if (existing) patientIdMap[p.id] = existing.id;
        imported.skipped++;
      } else {
        const newPatient = addPatient({ ...p });
        patientIdMap[p.id] = newPatient.id; // ← CRUCIAL: mapper l'ancien ID vers le nouvel ID
        imported.patients++;
      }
      setProgress(Math.round((i / preview.patients.length) * 50));
      await new Promise(r => setTimeout(r, 2));
    }

    if (options.importAppointments) {
      for (let i = 0; i < preview.appointments.length; i++) {
        const a = preview.appointments[i];
        const mappedPatientId = patientIdMap[a.patientId] || a.patientId;
        addAppointment({ ...a, patientId: mappedPatientId });
        imported.appointments++;
        setProgress(50 + Math.round((i / preview.appointments.length) * 50));
        if (i % 20 === 0) await new Promise(r => setTimeout(r, 2));
      }
    }

    setResult(imported);
    setStep('done');
  };

  // 🛡️ Fonction ultra-sécurisée pour obtenir l'initiale
  const getInitial = (firstName) => {
    const name = String(firstName || '?').trim();
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-2">
          <Upload className="text-primary-500" size={28} />
          Données d'importation
        </h1>
        <p className="text-slate-500 mt-1">Importez vos patients et rendez-vous depuis votre ancienne base de données MongoDB</p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {['Fichier', 'Aperçu', 'Import', 'Terminé'].map((s, i) => {
          const stepMap = { 0: 'upload', 1: 'preview', 2: 'importing', 3: 'done' };
          const active = step === stepMap[i];
          const done = ['upload','preview','importing','done'].indexOf(step) > i;
          return (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                ${active ? 'bg-primary-500 text-white' : done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                {done ? <CheckCircle size={12} /> : <span>{i+1}</span>}
                {s}
              </div>
              {i < 3 && <ArrowRight size={14} className="text-slate-300" />}
            </React.Fragment>
          );
        })}
      </div>

      {step === 'upload' && (
        <div className="card">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <Upload size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="font-semibold text-slate-700 mb-1">Glissez votre fichier ici</h3>
            <p className="text-sm text-slate-400 mb-4">ou cliquez pour sélectionner</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium">
              <Upload size={16} /> Choisir le fichier JSON
            </div>
            <p className="text-xs text-slate-400 mt-4">Fichier attendu : <strong>mediplan-import.json</strong></p>
            <input ref={fileRef} type="file" accept=".json" className="hidden"
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </div>
      )}

      {step === 'preview' && preview && (
        <PreviewErrorBoundary>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Users size={22} className="text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{preview.patients.length}</div>
                  <div className="text-sm text-slate-500">Patients à importer</div>
                </div>
              </div>
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Calendar size={22} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{preview.appointments.length}</div>
                  <div className="text-sm text-slate-500">Rendez-vous à importer</div>
                </div>
              </div>
            </div>

            <div className="card space-y-3">
              <h3 className="font-semibold text-slate-700">Options d'import</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={options.skipDuplicates}
                  onChange={e => setOptions(o => ({ ...o, skipDuplicates: e.target.checked }))}
                  className="w-4 h-4 rounded accent-primary-500" />
                <span className="text-sm text-slate-600">Ignorer les doublons (patients déjà existants)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={options.importAppointments}
                  onChange={e => setOptions(o => ({ ...o, importAppointments: e.target.checked }))}
                  className="w-4 h-4 rounded accent-primary-500" />
                <span className="text-sm text-slate-600">Importer aussi les rendez-vous</span>
              </label>
            </div>

            <div className="card">
              <h3 className="font-semibold text-slate-700 mb-3">Aperçu des patients ({preview.patients.length})</h3>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {preview.patients.slice(0, 50).map((p, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50">
                    <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {getInitial(p.firstName)}
                    </div>
                    <span className="text-sm text-slate-700">{p.firstName} {p.lastName}</span>
                  </div>
                ))}
                {preview.patients.length > 50 && (
                  <div className="text-xs text-slate-400 text-center py-2">
                    + {preview.patients.length - 50} autres patients...
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('upload')} className="btn-secondary flex-1">← Retour</button>
              <button onClick={handleImport} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Upload size={18} /> Lancer l'import
              </button>
            </div>
          </div>
        </PreviewErrorBoundary>
      )}

      {step === 'importing' && (
        <div className="card text-center py-12">
          <RefreshCw size={40} className="mx-auto text-primary-500 animate-spin mb-4" />
          <h3 className="font-semibold text-slate-700 mb-2">Import en cours...</h3>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
            <div className="h-3 bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-slate-500">{progress}% — veuillez patienter</p>
        </div>
      )}

      {step === 'done' && result && (
        <div className="card text-center py-10">
          <CheckCircle size={56} className="mx-auto text-emerald-500 mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Import terminé !</h2>
          <div className="flex justify-center gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-primary-600">{result.patients}</div>
              <div className="text-sm text-slate-500">Patients importés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">{result.appointments}</div>
              <div className="text-sm text-slate-500">Rendez-vous importés</div>
            </div>
            {result.skipped > 0 && (
              <div>
                <div className="text-3xl font-bold text-amber-600">{result.skipped}</div>
                <div className="text-sm text-slate-500">Doublons ignorés</div>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-center">
            <a href="/patients" className="btn-primary flex items-center gap-2">
              <Users size={18} /> Voir les patients
            </a>
            <a href="/agenda" className="btn-secondary flex items-center gap-2">
              <Calendar size={18} /> Voir l'agenda
            </a>
          </div>
        </div>
      )}
    </div>
  );
}