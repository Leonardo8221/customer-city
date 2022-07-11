import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Integration } from './types';

const SET_ERROR = 'integration/SET_ERROR';
const SET_SUCCESS = 'integration/SET_SUCCESS';
const GET_INTEGRATIONS = 'integration/GET_INTEGRATIONS';
const GET_INTEGRATION = 'integration/GET_INTEGRATION';

export const setError = createAction<string | boolean>(SET_ERROR);

export const setSuccess = createAction<string | boolean>(SET_SUCCESS);

const integrations: Integration[] = [
  {
    appId: 'gmail',
    appName: 'Gmail',
    appDescription: 'Bring CustomerCity to your inbox with the CustomerCity integration for Gmail.',
    // appIcon: 'assets/icons/applications/gmail.jpg',
    appIcon: 'https://cdn-icons-png.flaticon.com/32/281/281769.png',
    isInstalled: false,
  },
  {
    appId: 'gcalendar',
    appName: 'Google Calendar',
    appDescription: 'Book meetings quickly and easily with CustomerCity and Google Calendar.',
    appIcon: 'https://cdn-icons-png.flaticon.com/32/2702/2702609.png',
    isInstalled: true,
  },
];

export const getIntegrations = createAsyncThunk<Integration[]>(GET_INTEGRATIONS, async () => {
  return integrations;
});

export const getIntegration = createAsyncThunk<Integration, string>(GET_INTEGRATION, async (id) => {
  const integration = integrations.find((i) => i.appId === id);
  return integration as Integration;
});
