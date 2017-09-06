import { RegisterComponent } from './../../components/ucp/register/register.component';
import { Transition } from '@uirouter/angular';
import { ViewconvoComponent } from './../../components/ucp/pm/viewconvo/viewconvo.component';
import { PmComponent } from './../../components/ucp/pm/pm.component';
import { UcpComponent } from './../../components/ucp/ucp.component';

export const psoUcp = {
    name: 'phpbb.seo.ucp',
    url: '/ucp/{page:[^/]*}/{subPage:[a-z]*}',
    params: {
        mode: null,
        i: null,
        pm_id: null,
        pmSlug: null,
        start: null,
    },
    component: UcpComponent,
};

export const psoUcpRegister = {
    name: 'phpbb.seo.register',
    url: '/register/',
    component: RegisterComponent,
    params: {
        mode: null,
        i: null,
        subPage: "register",
        page: null,
    }
};

export const psoPMConvo = {
    name: 'phpbb.seo.ucp.pmConvo',
    url: 'convo/{pm_id:[0-9]*}-:pmSlug',
    resolve: [
        {
            token: 'convo_id',
            deps: [Transition],
            resolveFn: psoPMConvoResolve
        }
    ],
    params: {
        pmSlug: null,
        action: null,
        mode: null,
        p: null,
        u: null,
        reply_to_all: null,
        pm_id: null,
    },
    component: ViewconvoComponent
};

export function psoPMConvoResolve(trans: Transition) {
    return trans.params().pm_id
}