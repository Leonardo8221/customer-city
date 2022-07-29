import { ActionReducerMapBuilder, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getActivities, setError, setLoading, setSuccessRead, setSuccessWrite } from './actions';
import { ActivityState } from './types';

export const initialState: ActivityState = {
  loading: false,
  error: false,
  successRead: false,
  successWrite: false,
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

    builder.addCase(setSuccessRead, (state, { payload }) => {
      state.successRead = payload;
    });

    builder.addCase(setSuccessWrite, (state, { payload }) => {
      state.successWrite = payload;
    });

    builder.addCase(getActivities.fulfilled, (state, { payload }) => {
      state.activities = payload;
      state.successRead = true;
      state.loading = false;
    });

    builder.addMatcher(isAnyOf(getActivities.pending), (state) => {
      state.loading = true;
      state.error = false;
      state.successRead = false;
      state.successWrite = false;
    });

    builder.addMatcher(isAnyOf(getActivities.rejected), (state, { payload }) => {
      state.statusMessage = (payload as Error).message;
      state.error = true;
      state.loading = false;
      state.successRead = false;
      state.successWrite = false;
    });
  },
});

export default activityReducer.reducer;
