import { MutableRefObject } from 'react';
import { AppDispatch } from '../../store';
import { QueryDocumentSnapshot, DocumentData, Query } from '@firebase/firestore-types';
import { GenericActions } from '../../slices/generic';
import { CollectionOptions } from '../../firebase/queryOptions';
import { ListenerState } from './index';

type AnyFunc = (...args: any[]) => any;
const collectionApi = <T>(
  query: Query,
  actions: GenericActions,
  dispatch: AnyFunc,
  collectionListenersRef: MutableRefObject<ListenerState[]>,
  lastDocRef: MutableRefObject<QueryDocumentSnapshot<DocumentData> | undefined>,
  options?: CollectionOptions,
) => {
  // (dispatch as Function)(actions.loading());
  if (options && options?.listen) {
    const listener = query.onSnapshot(
      (querySnapshot) => {
        const data: DocumentData[] = [];
        if (querySnapshot.empty) {
          dispatch(actions?.setSuccess(true));
          return;
        }
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
        console.log('test', data);
        dispatch(actions?.setSuccess(true));
        if (options.lazyLoad) {
          lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
        }
      },
      (error) => {
        dispatch(actions?.setError(true));
        console.log('collection streaming error', error.message);
      },
    );
    collectionListenersRef.current.push({ name: options.listenerName, unsubscribe: listener });
  } else {
    query
      .get()
      .then((querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as unknown as T));
        dispatch(actions?.setSuccess(true));
        if (options && options.lazyLoad) {
          lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
        }
      })
      .catch((error) => {
        console.log('collection get error', error.message);
        dispatch(actions?.setError(error.message));
      });
  }
};

export default collectionApi;
