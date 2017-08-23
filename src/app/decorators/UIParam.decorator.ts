import { BehaviorSubject } from 'rxjs/Rx';
import { StateService } from '@uirouter/angular';
import { ExtraModuleInjector } from './ExtraModuleInjector';
/**
 * Decorator factory for a property we wanna store in the LocalStorage
 * @SCFRLocalStorage(key)
 * property
 * 
 * Will store in scfr:key and automatically return stored value on access
 */
export function SCFRUIParam(key?: string) {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;
        let state: StateService;

        let param: BehaviorSubject<any> = new BehaviorSubject(undefined);


        let getter = function () {
            if (state) return state.params[key];
            else return param;
        }

        let setter = function (value: any) {
            if (state) state.go(state.current, Object.assign({}, state.params, { key: value }));
        }

        ExtraModuleInjector.ready.subscribe((ready) => {
            if (ready) {
                state = ExtraModuleInjector.get(StateService);
                if (state)
                    param.next(state.params[key]);
            }
        });


        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
        });
    }
}