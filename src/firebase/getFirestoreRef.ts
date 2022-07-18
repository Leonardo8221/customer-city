import { CollectionReference, DocumentData } from '@firebase/firestore-types';
import { db } from './firebase';

const getFirestoreRef = (path: string): CollectionReference<DocumentData> => {
  return db.collection(path);
};

export default getFirestoreRef;
