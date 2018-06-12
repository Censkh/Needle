import 'jest';
import {inject, provide, use} from ".."

describe('these services using inheritance', () => {

    enum Result {
        FOO, BAR
    }

    abstract class BaseService {

        abstract doAThing(): Result;

    }

    class FooService extends BaseService {
        doAThing(): Result {
            return Result.FOO;
        }

    }

    class BarService extends BaseService {
        doAThing(): Result {
            return Result.BAR;
        }
    }

    it(`should properly use the correct service`, () => {

        use(FooService);

        let service = provide(BaseService);

        expect(service.doAThing()).toBe(Result.FOO);
    });

    it(`should be properly injected in members of classes`, () => {

        class OtherClass {

            @inject
            baseService: BaseService;

        }

        expect(new OtherClass().baseService.doAThing()).toBe(Result.FOO);

    });
});