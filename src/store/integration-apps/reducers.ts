import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '../../slices/generic';
import { setError, setSuccess } from './actions';
import { Integration } from './types';

export const initialState: GenericState<Integration[]> = {
  error: false,
  loading: false,
  success: false,
  data: [],
};

const slice = createGenericSlice({
  name: 'integration-apps',
  initialState: initialState as GenericState<Integration[]>,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<Integration[]>>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
