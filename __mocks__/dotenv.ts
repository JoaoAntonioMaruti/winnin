const dotenv = {
  config: jest.fn().mockReturnValue({ parsed: {} }),
};

export default dotenv;
