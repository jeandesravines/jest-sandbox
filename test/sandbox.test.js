const Sandbox = require("../lib/sandbox");

describe("create", () => {
  test("create a sandbox", () => {
    expect(Sandbox.create()).toBeInstanceOf(Sandbox);
  });
});

describe("spyOn", () => {
  let spy;

  afterEach(() => {
    spy.mockRestore();
  });

  test("should spy a existant property", () => {
    const sandbox = Sandbox.create();
    const object = {
      sayHello: () => "Hello"
    };

    spy = sandbox.spyOn(object, "sayHello")
      .mockReturnValue("Hola");

    expect(object.sayHello()).toBe("Hola");
    expect(spy).toHaveBeenCalled();
  });

  test("should spy a non-existant property", () => {
    const sandbox = Sandbox.create();
    const object = {};

    spy = sandbox.spyOn(object, "sayHello")
      .mockReturnValue("Hola");

    expect(object.sayHello()).toBe("Hola");
    expect(spy).toHaveBeenCalled();
  });
});

describe("retoreAllMocks", () => {
  let spies;

  afterEach(() => {
    spies.forEach((spy) => {
      spy.mockRestore();
    });
  });

  test("restores all mocks", () => {
    const sandbox = Sandbox.create();
    const object = {};
    const mocks = [
      sandbox.spyOn(object, "sayHello"),
      sandbox.spyOn(object, "sayHola"),
      sandbox.spyOn(object, "sayBonjour")
    ];

    spies = mocks.map((mock) => {
      return jest.spyOn(mock, "mockRestore");
    });

    sandbox.restoreAllMocks();
    spies.forEach((spy) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});

describe("examples", () => {
  const sandbox = Sandbox.create();

  afterEach(() => {
    sandbox.restoreAllMocks();
  });

  test("should calls API", () => {
    const service = {
      callApi: () => Promise.reject()
    };

    const spy = sandbox.spyOn(service, "callApi")
      .mockReturnValue(Promise.resolve("Hello"));

    return service.callApi()
      .then((response) => {
        expect(spy).toHaveBeenCalled();
        expect(response).toBe("Hello");
      });
  });
});