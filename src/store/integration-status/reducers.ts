import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { createGenericSlice, GenericState } from '../../firebase-redux/generic';
import { setError, setSuccess } from './actions';
import { IntegrationStatus } from './types';

export const initialState: GenericState<IntegrationStatus> = {
  error: false,
  loading: false,
  success: false,
  data: <IntegrationStatus>{},
};

const slice = createGenericSlice({
  name: 'integration-apps',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<GenericState<IntegrationStatus>>): void => {
    builder.addCase(setError, (state, { payload }) => {
      state.error = true;
      state.success = false;
    });
    builder.addCase(setSuccess, (state, { payload }) => {
      state.data = payload.applicationStatus;
      state.success = true;
      state.error = false;
    });
  },
});
export const actions = slice.actions;
export default slice.reducer;
