import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '../../slices/generic';
import { setError, setSuccess } from './actions';
import { Integration } from './types';

export const initialState: GenericState<Integration> = {
  error: false,
  loading: false,
  success: false,
  data: <Integration[]>[],
};

const slice = createGenericSlice({
  name: 'integration-apps',
  initialState: initialState as GenericState<Integration>,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<Integration>>): void => {
    builder.addCase(setError, (state, { payload }) => {
      console.log('FIRESTORE ERROR STATE', payload);
      state.error = true;
    });
    builder.addCase(setSuccess, (state, { payload }) => {
      console.log('FIRESTORE SUCCESS STATE', payload);
      state.success = true;
      state.data = payload;
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
