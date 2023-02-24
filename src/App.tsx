import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import Navigation from './routes/Navigation'

function App() {
  const firestore = getFirestore(useFirebaseApp())  

  return (    
    <FirestoreProvider sdk={firestore}>
      <Navigation />
    </FirestoreProvider>
  )
}

export default App
