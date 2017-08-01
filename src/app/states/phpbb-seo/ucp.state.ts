import { RegisterComponent } from './../../components/ucp/register/register.component';
import { Transition } from '@uirouter/angular';
import { ViewconvoComponent } from './../../components/ucp/pm/viewconvo/viewconvo.component';
import { PmComponent } from './../../components/ucp/pm/pm.component';
import { UcpComponent } from './../../components/ucp/ucp.component';

export const psoUcp = {
    name: 'phpbb.seo.ucp',
    url: '/ucp/{page:[^/]*}/{subPage:[^/]*}',
    params: {
        mode:null,
        i:null,
    },
    component: UcpComponent,
};

export const psoUcpRegister = {
    name: 'phpbb.seo.register',
    url: '/register/',
    component: RegisterComponent,
    params: {
        mode:null,
        i:null,
        subPage: "register",
        page:null,
    }
};

export const psoUcpPage = {
    name: 'phpbb.seo.ucp.sub',
    url: '/{subPage:[^/]*}',
    component: UcpComponent,
};

export const psoPMConvo = {
    name: 'phpbb.seo.ucp.pmConvo',
    url: ':pm_id',
    resolve: [
        {
            token: 'convo_id',
            deps: [Transition],
            resolveFn: psoPMConvoResolve
        }
    ],
    component: ViewconvoComponent
};

export function psoPMConvoResolve(trans: Transition) {
    return trans.params().pm_id
}