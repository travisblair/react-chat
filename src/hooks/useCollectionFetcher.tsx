import { useEffect, useState } from 'react'
import {
  onSnapshot,
  collection,
  query,
  Firestore,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'

type Data = DocumentData[]
type Error = any

const useCollectionFetcher = (
  firestore: Firestore,
  collectionPath: string
): [Data, Error] => {
  const [data, setData] = useState<Data>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const q = query(collection(firestore, collectionPath))
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const dataList = querySnapshot.docs.map((doc) => doc.data())
        setData(dataList)
        setError(null)
      },
      (error) => {
        setError(error)
      }
    )

    return unsubscribe
  }, [firestore, collectionPath])

  return [data, error]
}

export default useCollectionFetcher
