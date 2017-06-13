import { ViewprofileComponent } from './../../components/memberlist/viewprofile/viewprofile.component';

export const psoViewProfile = {
    name: 'phpbb.seo.viewprofile', 
    url: '/User/{userId:int}-{userSlug:[^/]*}/',
    component: ViewprofileComponent,
};
