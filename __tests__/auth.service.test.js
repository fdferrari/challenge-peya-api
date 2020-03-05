describe("auth.service", () => {
const appToken = "498-050115-89c3540d-9e7a-4b78-73c2-c0365fecec94";
const userToken = "498-050115-7705e52b-696d-4731-42a1-7ce8a4029333";
  test("test getAppToken", async () => {
    const get = (url, params, headers) => {
      expect(url).toBe("tokens");
      return Promise.resolve({
        access_token: appToken
      });
    };
    const authService = require("../services/auth.service")(get);
    const result = await authService.getAppToken("test", "test");
    expect(result.access_token).toBe(
      appToken
    );
  });


  test("test getUserToken", async () => {
    const get = (url, params, headers) => {
      expect(url).toBe("tokens");
      expect(headers).toStrictEqual({"Authorization":appToken});
      return Promise.resolve({
        access_token: userToken
      });
    };
    const authService = require("../services/auth.service")(get);
    const result = await authService.getUserToken(appToken, "test", "test");
    expect(result.access_token).toBe(
      userToken
    );
  });

  test("test getUser", async () => {
    const get = (url, params, headers) => {
      expect(url).toBe("myAccount");
      expect(headers).toStrictEqual({"Authorization":userToken});
      return Promise.resolve({"id":123,"lastName":"test","name":"test","country":{"id":1}});
    };
    const authService = require("../services/auth.service")(get);
    const result = await authService.getUser(userToken);
    expect(result.id).toBe(
      123
    );
  });
});
