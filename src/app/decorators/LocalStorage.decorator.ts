/**
 * Decorator factory for a property we wanna store in the LocalStorage
 * @SCFRLocalStorage(key)
 * property
 * 
 * Will store in scfr:key and automatically return stored value on access
 */
export function SCFRLocalStorage(key?: string) {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;

        let index = "scfr:" + key;

        let getter = function () {
            return JSON.parse(localStorage.getItem(index));
        }

        let setter = function (value: any) {
            localStorage.setItem(index, JSON.stringify(value));
        }

        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
        });
    }
}