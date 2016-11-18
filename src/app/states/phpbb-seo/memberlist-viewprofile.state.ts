import { ViewprofileComponent } from './../../components/memberlist/viewprofile/viewprofile.component';

export const psoViewProfile = {
    name: 'phpbb.seo.viewprofile', 
    url: '/User/:user_slug',
    component: ViewprofileComponent,
    params: {
        userId: 0,
    }
};
