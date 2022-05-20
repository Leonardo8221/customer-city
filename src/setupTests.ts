// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from 'test/server';

window.matchMedia =
  window.matchMedia ||
  (() => {
    return { matches: false, addListener: jest.fn(), removeListener: jest.fn() };
  });

window.scrollTo = jest.fn();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.XMLHttpRequest = undefined;

jest.mock('jwt-decode', () => () => jest.fn());

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
