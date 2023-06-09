import { rest } from 'msw';
const baseURL = 'https://captured-drf-api.herokuapp.com/';

/**
 * A mock user to intercept API request used for testing.
 */
export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: 'admin',
        email: '',
        first_name: '',
        last_name: '',
        profile_id: 1,
        profile_image:
          'https://res.cloudinary.com/dk6v9nvmq/image/upload/v1/media/../default_profile_gaddut',
        is_admin_user: true,
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
