import { Transition } from 'ui-router-ng2';
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
            resolveFn: (transition) => {
               console.log(transition.from());
               return transition;
            }
            ,
        }
    ],
    component: LoginComponent,
};
