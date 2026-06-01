import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default config so it handles the case gracefully before the setup is done
const firebaseConfig = {
  apiKey: "pending",
  authDomain: "pending",
  projectId: "pending",
  firestoreDatabaseId: "pending",
  storageBucket: "pending",
  messagingSenderId: "pending",
  appId: "pending"
};

let app;
let db: ReturnType<typeof getFirestore>;
let auth: ReturnType<typeof getAuth>;

try {
  // Vite way of importing JSON statically, which handles existence check at build/dev
  // If we just need the dynamic JSON, avoiding strict bundler requirements:
  const config = import.meta.glob('../../firebase-applet-config.json', { eager: true });
  const configData = Object.values(config)[0] as any || firebaseConfig;
  
  app = initializeApp(configData);
  db = getFirestore(app, configData.firestoreDatabaseId);
  auth = getAuth(app);
} catch (e) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);
}

export { app, db, auth };
