import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue } from 'firebase-admin/firestore'
import { docSize } from './measure'

export const docSizeConverter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
  toFirestore(item: WithFieldValue<T>) {
    const { _size, ...data } = item
    return data
  },

  fromFirestore(snapshot: QueryDocumentSnapshot<T>): T {
    const data = snapshot.data()
    const _size = docSize(snapshot.ref.path, data)

    return {
      ...data,
      _size,
    } as T & { _size: number }
  }
})
