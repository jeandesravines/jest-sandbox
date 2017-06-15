# Jest Sandbox

## API 

### static create(): Sandbox

```javasacript
  const sandbox = Sandbox.create();
```

### spyOn(target: Object, property: string): Function 

This method works like `jest.spyOn` with the only difference that 
if the property to mocks does not exist, it will be created.

```javascript
  const object = {};
  const spy = sandbox.spyOn(object, "add")
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
```
