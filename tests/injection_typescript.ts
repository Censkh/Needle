import 'jest';
import {inject, provide} from ".."

describe('this basic service', () => {

    class GreeterService {

        greet() : string {
            return "hello";
        }

    }

    it(`should be properly injected using function injection`, () => {

        let greeter = provide(GreeterService);

        expect(greeter.greet()).toBe('hello');
    });

    it(`should be properly injected in members of classes`, () => {

        class OtherClass {

            @inject
            greeter: GreeterService;

        }

        expect(new OtherClass().greeter.greet()).toBe('hello');

    });
});