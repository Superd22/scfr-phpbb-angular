import { Injectable } from '@angular/core';
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
        let paramService: SCFRUIParamService;

        let param: BehaviorSubject<any> = new BehaviorSubject(undefined);


        let getter = function () {
            if (state) return state.params[key];
            else return param;
        }

        let setter = function (value: any) {
            // Do not do anything if the value hasn't changed
            if (state.params[key] === value) return;

            if (paramService) paramService.changeState(key, value);
        }

        ExtraModuleInjector.ready.subscribe((ready) => {
            if (ready) {
                state = ExtraModuleInjector.get(StateService);
                paramService = ExtraModuleInjector.get(SCFRUIParamService);
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

@Injectable()
export class SCFRUIParamService {
    private _changeState: number;
    private _newState = {};
    private _state: StateService;
    private _canChange: boolean = true;

    /**
     * Reset our changing to nothing
     */
    private resetNewState() {
        this._changeState = undefined;
        this._newState = {};
    }

    /**
     * Prevent the trigger of a change until next notice
     */
    public blockStateChange() {
        this._canChange = false;
    }

    /**
     * Will triger a change state once everything is done
     * @param propertyName 
     * @param value 
     */
    public changeState(propertyName: string, value: any) {
        this._newState[propertyName] = value;

        if(this._canChange) {
            if (this._changeState) clearTimeout(this._changeState);
            this._changeState = setTimeout(() => this.doStateChange());
        }
    }

    /**
     * Do the change once we have everything
     */
    public doStateChange() {
        this._canChange = true;
        ExtraModuleInjector.ready.subscribe((ready) => {
            if (ready) {
                this._state = ExtraModuleInjector.get(StateService);
            }

            if (this._state) {
                this._state.go(this._state.current, Object.assign({}, this._state.params, this._newState));
                this.resetNewState();
            }
        });
    }
}