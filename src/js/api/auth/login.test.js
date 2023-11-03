import { login } from "./login";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: "mockedToken" }),
    text: () => Promise.resolve("OK"),
  }),
);

const mockStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

beforeEach(() => {
  global.localStorage = mockStorage;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("login function", () => {
  it("should fetch and store an access token to localStorage on successful login.", async () => {
    const email = "test@user.test";
    const password = "fakePassword";

    const profile = await login(email, password);

    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify("mockedToken"),
    );
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "profile",
      JSON.stringify(profile),
    );
  });

  it("should throw an error if the login event failed", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Access Denied",
      }),
    );

    const email = "test@user.test";
    const password = "fakePassword";

    await expect(login(email, password)).rejects.toThrow("Access Denied");
  });
});
