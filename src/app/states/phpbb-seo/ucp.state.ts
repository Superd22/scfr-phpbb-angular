import { PmComponent } from './../../components/ucp/pm/pm.component';
import { UcpComponent } from './../../components/ucp/ucp.component';

export const psoUcp = {
    name: 'phpbb.seo.ucp', 
    url: 'profil/',
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