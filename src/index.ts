import inject from "./Inject";
import InjectionManager from "./InjectionManager";
import {Class} from "./util/Class";

const injectionManagerInstance = InjectionManager.instance();

const use: ((clazz: Class<any> | Array<Class<any>>) => void) = injectionManagerInstance.use.bind(injectionManagerInstance);
const provide: (<T>(clazz: Class<T>) => T) = injectionManagerInstance.provide.bind(injectionManagerInstance);

export {
    inject,
    InjectionManager,
    use,
    provide,
};