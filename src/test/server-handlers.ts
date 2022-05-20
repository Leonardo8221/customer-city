import { rest } from 'msw';

export const TEST_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3005';

export const getApiPath = (path: string): string => {
  return `${TEST_BASE_URL}/${path}`;
};

export const handlers = [
  rest.post(getApiPath('auth/login'), async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        message: 'Successfully logged in.',
        data: {
          accessToken: 'eyJraWQiOiJiUDdTREdIM3dYeDhuenBiTHluOE9nTl...',
        },
      }),
    );
  }),
  rest.get(getApiPath('user/auth/current'), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Current user fetched successfully!',
        data: {
          userId: 1,
          userName: 'admin user 1',
          userEmail: 'admin-user1@gmail.com',
          userRole: 'admin',
          userActive: true,
          companyId: 1,
          userCreatedAt: '2022-05-19T19:36:04.608Z',
          userUpdatedAt: '2022-05-19T19:36:04.608Z',
          profile: {
            profileId: 1,
            workPhoneNumber: '12344555562',
            additionalPhoneNumber: null,
            profileJobRole: null,
          },
        },
      }),
    );
  }),
];
