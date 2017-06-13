import { Transition } from '@uirouter/angular';
import { LoginComponent } from './../../components/login/login.component';

export const psoLogin = {
    name: 'phpbb.seo.login',
    url: '/Login/',
    params: {
        error: "",
    },
    resolve: [
        {
            token: 'redirect',
            deps: [Transition],
            resolveFn: psoLoginFunc,
        }
    ],
    component: LoginComponent,
};

export function psoLoginFunc(transition: Transition) {
    return transition;
}