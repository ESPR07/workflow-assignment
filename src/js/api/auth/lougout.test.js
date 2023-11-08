import { logout } from "./logout";
import * as storage from "../../storage/index";

jest.mock("../../storage/index.js");

describe("logout function", () => {
  it("should clear the access token from storage", () => {
    logout();
    expect(storage.remove).toHaveBeenCalledWith("token");
    expect(storage.remove).toHaveBeenCalledWith("profile");
  });
});
