import inject from "./Inject";
import InjectionManager from "./InjectionManager";

const injectionManagerInstance = InjectionManager.instance();

const use : typeof injectionManagerInstance.use = injectionManagerInstance.use.bind(injectionManagerInstance);
const provide : typeof injectionManagerInstance.provide = injectionManagerInstance.provide.bind(injectionManagerInstance);

export {
    inject,
    InjectionManager,
    use,
    provide,
};