import './index.css'
import { firebaseConfig } from './firebase'
import App from './App'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {FirebaseAppProvider} from 'reactfire'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
