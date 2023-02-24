import { collection, DocumentData, addDoc, WithFieldValue } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useFirestore, useFirestoreCollectionData, useFirestoreDocOnce } from "reactfire"
import { Patient } from "../types/patient"

type GenericReturn<T, Q> = {
  collection: Q[]
  addDocument: (data: T) => Promise<void>
  status: 'loading' | 'error' | 'success'
}

/**
 * 
 * @param collectionName 
 * @returns An array of generic Q and a function to add generic T to collection
 */
export function useCollection<T, Q>(collectionName: string): GenericReturn<T, Q> {
  const collectionRef = collection(useFirestore(), collectionName)
  const { data, status } = useFirestoreCollectionData(collectionRef)
  const [colData, setColData] = useState<DocumentData[]>([])

  useEffect(() => {
    if (status === 'loading') {
      setColData([])
    } else if (status === 'success') {
      setColData(data)
    }
  }, [status])

  const addDocument = async (docData: T) => {    
    await addDoc(collectionRef, docData as any)        
  }

  return {
    collection: colData as Q[],
    addDocument,
    status
  }
}