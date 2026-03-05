import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyBmCn2ODH28LasLosqWXVmaW9oBJTmu3kI",
  authDomain:        "cabinet-hilali.firebaseapp.com",
  projectId:         "cabinet-hilali",
  storageBucket:     "cabinet-hilali.firebasestorage.app",
  messagingSenderId: "370275625988",
  appId:             "1:370275625988:web:cef6acfa29dfc755431951",
  measurementId:     "G-W5NK7SGLEV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Persistance hors-ligne — fonctionne même sans internet
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Firebase offline: plusieurs onglets ouverts');
  } else if (err.code === 'unimplemented') {
    console.warn('Firebase offline: navigateur non supporté');
  }
});

export default app;
