

## Installation

From npm:

```commandline
npm i needle
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
    
    procedure() : boolean {
        // do complex logic
        
        return true
    }
    
}
```

To use FooService:

```typescript

```




## How it works