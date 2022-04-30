import { Store } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';

import http from './index';
import { RootState } from 'store/types';

export default {
  setup: (store: Store<RootState>): void => {
    const addAuthorizationToken = async (config: AxiosRequestConfig) => {
      const {
        auth: { accessToken },
      } = store.getState();

      if (accessToken) {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return config;
    };

    http.interceptors.request.use(addAuthorizationToken);
  },
};
