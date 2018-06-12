import InjectionManager from "./InjectionManager";
import "reflect-metadata"

/**
 *
 * @param target
 * @param key
 */
export default function inject<T>(target: any, key: string): void {


    let obj: any = null;

    Object.defineProperty(target, key, {
        get: () => {
            if (obj) {
                return obj;
            }
            const type = Reflect.getMetadata("design:type", target, key);
            return obj = InjectionManager.instance().provide(type);
        },
        set: () => {
            throw new Error("Cannot set inject property");
        },
        enumerable: true,
        configurable: true,
    });

}
