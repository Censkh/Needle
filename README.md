

## Installation

From npm:

```commandline
npm i needle-inject
```

## Usage

**Important:** Make sure you have the flags `emitDecoratorMetadata` and `experimentalDecorators` and both set to true in tsconfig.json

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

### Examples

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




## How it works