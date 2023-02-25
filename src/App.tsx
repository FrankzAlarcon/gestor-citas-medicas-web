import { FirestoreProvider, useFirebaseApp, AuthProvider } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import Navigation from './routes/Navigation'
import { getAuth } from 'firebase/auth'

function App() {
  const firebase = useFirebaseApp()  
  const firestore = getFirestore(firebase)  
  const auth = getAuth(firebase)
  return (    
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <Navigation />
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default App
