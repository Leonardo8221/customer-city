import {
  ActionCreatorWithPayload,
  ActionReducerMapBuilder,
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';

export interface GenericState<T> {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  [key: string]: T | T[] | any;
}

export const createGenericSlice = <T, Reducers extends SliceCaseReducers<GenericState<T>>>({
  name = '',
  initialState,
  reducers,
  extraReducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
  extraReducers: (builder: ActionReducerMapBuilder<NoInfer<GenericState<T>>>) => void;
}) => {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers,
  });
};

export type GenericActions<T> = {
  setSuccess: ActionCreatorWithPayload<T | boolean, string>;
  setError: ActionCreatorWithPayload<string | boolean, string>;
};
