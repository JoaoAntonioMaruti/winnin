// __mocks__/node-fetch.ts
const fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

export default fetch;
