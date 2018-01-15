# Jest Sandbox

[![Build Status](https://travis-ci.org/jeandesravines/jest-sandbox.svg)](https://travis-ci.org/jeandesravines/jest-sandbox)
[![Coverage Status](https://coveralls.io/repos/github/jeandesravines/jest-sandbox/badge.svg)](https://coveralls.io/github/jeandesravines/jest-sandbox)

A Sinon's sandbox like for Jest Edit

## Table of contents

* [Setup](#setup)
* [API](#api)
* [Examples](#examples)


## Setup

```shell
npm install --save-dev @jdes/jest-sandbox
```

## API

### spyOn(target: Object, property: string, create: ?boolean): Function 

This method works like `jest.spyOn` with the only difference that 
if the property to mocks does not exist and the parameters `create` is `true`, it will be created.

```javascript
  const object = {};
  const spy = sandbox.spyOn(object, "add", true)
    .mockImplmentation((a, b) => a + b);
    
  expect(object.add(20, 22)).toBe(42);
```

### restoreAllMocks(): void

Calls `.mockRestore()` on all spies in the sandbox.  

```javascript
  afterEach(() => {
    sandbox.restoreAllMocks();
  });
```

## Examples

```javascript
import Sandbox from "@jdes/jest-sandbox"

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
```
