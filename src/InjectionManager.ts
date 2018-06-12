import {Class} from "./util/Class";

export interface InjectionMapping<T> {
    clazz: Class<T>;
    value: T;
}

export default class InjectionManager {
    private static currentInstance: InjectionManager;

    static instance(): InjectionManager {
        return this.currentInstance ? this.currentInstance : this.currentInstance = new InjectionManager();
    }

    private mappings: Array<InjectionMapping<any>> = [];

    use(clazz: Class<any> | Array<Class<any>>) {
        if (Array.isArray(clazz)) {
            clazz.map(this.use.bind(this));
        } else {
            this.setMapping({clazz, value: new (clazz as any)()});
        }
    }

    provide<T>(clazz: Class<T>): T {
        return this.getMapping(clazz).value;
    }

    private setMapping<T>(mapping: InjectionMapping<T>) {
        this.mappings.push(mapping);
    }

    getMapping<T>(clazz: Class<T>): InjectionMapping<T> {
        if ((clazz as any).$$mapping) {
            return (clazz as any).$$mapping;
        }
        let mapping : InjectionMapping<any> | null = null;
        for (let injectable of  this.mappings) {
            if (injectable.clazz.prototype instanceof clazz) {
                mapping = injectable;
                break;
            }
        }
        if (mapping) {
            return mapping;
        }
        mapping = {clazz, value: new (clazz as any)()};
        (clazz as any).$$mapping = mapping;
        this.setMapping(mapping);
        return mapping;
    }

}
