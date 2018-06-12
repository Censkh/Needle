require('jest');
let {provide} = require('..');

describe('this basic js service', () => {

    class GreeterService {

        greet() {
            return "hello";
        }

    }

    it(`should be properly injected using function injection`, () => {

        let greeter = provide(GreeterService);

        expect(greeter.greet()).toBe('hello');
    });

});