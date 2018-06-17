# Needle

[![npm](https://img.shields.io/npm/v/needle-inject.svg)](https://www.npmjs.com/package/needle-inject) [![repo](https://img.shields.io/badge/repo-gitlab-green.svg)](https://gitlab.com/09jwater/Needle)

Seamless dependency injection for Typescript

## Installation

From npm:

```commandline
npm i needle-inject
```

## Usage

**Important:** When using the decorator, make sure you have the flags `emitDecoratorMetadata` and `experimentalDecorators` both set to true in tsconfig.json

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

**Any** class can be used as a singleton using needle, no extra decorations allowing for backwards compatiblity.

## Examples

Usage should be pretty straightforward, we have a service class we want to inject into another class/function. To achieve this we do not have to touch the original class simply make sure it has a constructor that takes no arguments.

```typescript
class FooService {
    
    procedure(obj : number) : boolean {
        // do complex logic
        return obj % 2 != 0 
    }

    requestThing() : Promise<any> {
        // Send async call
    }
    
}
```

To use FooService:

- Using function injection:

    ```typescript
    import { provide } from "needle-inject"
    import FooService from "./FooService"

    const service = provide(FooService)
    console.log(service.procedure(2))
    ```
    
- With class injection:

    ```typescript
    import { inject } from "needle-inject"
    import FooService from "./FooService"

    class Goopus {
        
        @inject
        private fooService : FooService;
        
        constructor(obj : number) {
            console.log(fooService.procedure(obj))
        }
        
    }

    let goopus = new Goopus(3)
    goopus.fooService.procedure(6)
    ```

These run in succesion will produce:

```
false
true
false
```

### With React

Here is an example component that uses `FooService`:

```typescript
import * as React from "react";
import { inject } from "needle-inject"
import FooService from "./FooService"

export default class MyComponent extends React.Component {

    @inject
    private fooService : FooService;

    render() {
        return <div>
            <Button onClick={this.fooService.requestThing()}>Send Request</Button>
            <p>
                Procedure of 3 is {this.fooService.procedure(3)}
            </p>
        </div>
    }

}
```

### Use case with React & MobX

You can run an example app located in `examples/react-mobx`. Run `npm start` and navigate to localhost:1234 to view it.

---

When managing state in React.js a lot of the time you want a reference to a global store. When using the very useful library [MobX](https://github.com/mobxjs/mobx) they provide a very unopinionated way to handle the passing of stateful objects. Here is where needle becomes useful!

1. Create a store class that will store state:

    ```typescript
    import { observable, computed } from "mobx"

    // I store the state for auth sessions
    class AuthStore {
        @observable userToken : String | null;
        @observable userSession : any;

        @computed get isLoggedIn() {
            return this.userToken != null;
        }
    }
    ```

2. Create a service that will hold this store:

    ```typescript
    import { action } from "mobx";

    export default class AuthService {

        store: AuthStore;

        constructor() {
            store = new AuthStore();
        }

        @action
        logIn() {
            // Do complex logic here...
            this.store.userToken = "TOKEN_FROM_AUTH";
        }

    }
    ```

3. Now we can inject AuthService, observe that store and any changes to that state will update our components:

    ```typescript
    import * as React from "react";
    import { observer } from "mobx-react";
    import { inject } from "needle-inject";
    import AuthService from "./AuthService";

    @observe
    export default class MyComponent extends React.Component {

        @inject
        private authService : AuthService;

        render() {
            return this.authService.isLoggedIn ? <div>I am logged in!</div> : <a href="/login">Login?</a>;
        }

    }
    ```

## How it works

There isn't actually much going on under the hood. We keep a singleton `InjectionManager` which stores all the current mappings. When a class instance is requested we check if we already have one and serve it, otherwise creating a new instance and storing it for next time.

## Limitations

- I've yet to explore what happens when multiple libraries use needle at the same time. The problem I see arisng is two libraries using two impls of the same base class. Let's say they share a common lib with `AuthService` as an abstract base class yet they both use seperate services that inherit from this. One will clash with the other.

- More complicated functionality has not yet being needed as part of my requirements but when they arise I fear they will complicate the current minimalist impl. Overthinking it? Probably.