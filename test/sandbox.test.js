const Sandbox = require("../lib/sandbox");

describe("spyOn", () => {
  let spy;
  
  afterEach(() => {
    spy.mockRestore();
  });
  
  test("should spy a existant property", () => {
    const sandbox = new Sandbox();
    const object = {
      sayHello: () => "Hello"
    };

    spy = sandbox.spyOn(object, "sayHello")
      .mockReturnValue("Hola");

    expect(object.sayHello()).toBe("Hola");
    expect(spy).toHaveBeenCalled();
  });

  test("should fails on spies a non-existant property", () => {
    const sandbox = new Sandbox();
    const object = {};

    expect(() => {
      sandbox.spyOn(object, "sayHello")
        .mockReturnValue("Hola");
    }).toThrow();

    expect(object.sayHello).toBe(undefined);
  });

  test("should creates and spies on a non-existant property", () => {
    const sandbox = new Sandbox();
    const object = {};
    
    spy = sandbox.spyOn(object, "sayHello", true)
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
    const sandbox = new Sandbox();
    const object = {};
    const mocks = [
      sandbox.spyOn(object, "sayHello", true),
      sandbox.spyOn(object, "sayHola", true),
      sandbox.spyOn(object, "sayBonjour", true)
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
  describe("Readme's examples", () => {
    const sandbox = new Sandbox();

    afterEach(() => {
      sandbox.restoreAllMocks();
    });

    test("should calls API", () => {
      const service = {
        callApi: () => Promise.reject()
      };

      const spyLog = sandbox.spyOn(service, "log", true)
        .mockImplementation((log) => log);

      const spyCallApi = sandbox.spyOn(service, "callApi")
        .mockImplementation((path) => {
          service.log(`GET ${path}`);
          return Promise.resolve('Hello');
        });

      return service.callApi('/')
        .then((response) => {
          expect(spyCallApi).toHaveBeenCalled();
          expect(spyLog).toHaveBeenCalledWith('GET /');
          expect(response).toBe("Hello");
        });
    });
  });
});