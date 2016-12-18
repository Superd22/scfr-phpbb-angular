import { Transition } from 'ui-router-ng2';
import { ViewconvoComponent } from './../../components/ucp/pm/viewconvo/viewconvo.component';
import { PmComponent } from './../../components/ucp/pm/pm.component';
import { UcpComponent } from './../../components/ucp/ucp.component';

export const psoUcp = {
    name: 'phpbb.seo.ucp',
    url: '/profil/',
    component: UcpComponent,
};

export const psoPM = {
    name: 'phpbb.seo.ucp.pm',
    url: 'mp/',
    views: {
        '@': {
            component: PmComponent,
        }
    }
};

export const psoPMConvo = {
    name: 'phpbb.seo.ucp.pm.viewpm',
    url: ':pm_id',
    resolve: [
        {
            token: 'convo_id',
            deps: [Transition],
            resolveFn: (trans) => trans.params().pm_id
        }
    ],
    component: ViewconvoComponent,
};