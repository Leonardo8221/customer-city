import { DocumentData } from '@firebase/firestore-types';
import { MutableRefObject } from 'react';
import { GenericActions } from 'slices/generic';
import getFirestoreRef from '../../firebase/getFirestoreRef';
import { DocumentOptions } from '../../firebase/queryOptions';
import { ListenerState } from './index';

type AnyFunc = (...args: any[]) => any;
const docApi = <T>(
  path: string,
  id: string,
  actions: GenericActions<T>,
  dispatch: AnyFunc,
  docListenersRef: MutableRefObject<ListenerState[]>,
  options?: DocumentOptions,
) => {
  const docRef = getFirestoreRef(path).doc(id);

  // (dispatch as Function)(actions?.loading());
  if (options?.listen) {
    const listener = docRef.onSnapshot((doc) => {
      if (!doc.exists) {
        dispatch(actions.setError('Document does not exists.'));
        return;
      }
      console.log('firestore payload', { id: doc.id, ...doc.data() });
      dispatch(actions.setSuccess({ id: doc.id, ...doc.data() } as unknown as T));
    });
    docListenersRef.current.push({ name: options.listenerName, unsubscribe: listener });
  } else {
    console.log(docRef.path);
    docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          dispatch(actions.setError('Document does not exists.'));
          return;
        }

        const data: DocumentData = { id: doc.id, ...doc.data() };
        dispatch(actions.setSuccess(data as T));

        for (const subcoll of options?.subcollections || []) {
          doc.ref
            .collection(subcoll.path)
            .get()
            .then((snap) => {
              if (!snap.empty || snap.docs.length) {
                data[subcoll.storeAs] = snap.docs.map((doc) => {
                  return { id: doc.id, ...doc.data() };
                });
                dispatch(actions.setSuccess(data as T));
              }
            });
        }
      })
      .catch((err) => {
        console.error('get document error', err);
        dispatch(actions.setError(err.message));
      });
  }
};

export default docApi;
