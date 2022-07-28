import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { setError, setLoading, setSuccess } from './actions';
import { ActivityState } from './types';

export const initialState: ActivityState = {
  loading: false,
  error: false,
  success: false,
  activities: [],
  activity: null,
};

const activityReducer = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ActivityState>): void => {
    builder.addCase(setLoading, (state, { payload }) => {
      state.loading = payload;
    });

    builder.addCase(setError, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(setSuccess, (state, { payload }) => {
      state.success = payload;
    });
  },
});

export default activityReducer.reducer;
