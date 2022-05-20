import { rest } from 'msw';

export const TEST_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3005';

export const getApiPath = (path: string): string => {
  return `${TEST_BASE_URL}/${path}`;
};

export const handlers = [
  rest.post(getApiPath('/auth/login'), async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        message: 'Successfully logged in!',
        data: { accessToken: 'eyJraWQiOiJiUDdTREdIM3dYeDhuenBiTHluOE9nTlwvYnNQd2lcL2...' },
      }),
    );
  }),
];
