# Needle

[![npm](https://img.shields.io/npm/v/needle-inject.svg)](https://www.npmjs.com/package/needle-inject) [![repo](https://img.shields.io/badge/repo-gitlab-green.svg)](https://gitlab.com/09jwater/Needle)

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

## Examples

Usage should be pretty straightforward, we have a service class we want to inject into another class/function. To achieve this we do not have to touch the original class simply make sure it has an empty constructor.

```typescript
class FooService {
    
    procedure(obj : number) : boolean {
        // do complex logic
        return obj % 2 != 0 
    }
    
}
```

To use FooService:

```typescript
import {inject, provide} from "needle-inject"

const service = provide(FooService)
console.log(service.procedure(2))

class Goopus {
    
    @inject
    private fooService : FooService;
    
    constructor(obj : number) {
        console.log(fooService.procedure(obj))
    }
    
}

let goopus = new Goopus(3)
goopus.fooService.procedure(6)

// : false
// : true
// : false

```

### Use case with React & MobX

When managing state in React.js a lot of the time you want a reference to a global store. When using the very useful library [MobX](https://github.com/mobxjs/mobx) they provide a very unopinionated way to handle the passing of stateful objects. Here is where needle becomes useful!

- 1. Create a store class that will store state:

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

- 2. Create a service that will hold this store:

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

 - 3. Now we can inject AuthService, observe that store and any changes to that state will update our components:

```ts

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