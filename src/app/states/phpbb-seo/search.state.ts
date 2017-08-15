import { ViewforumComponent } from './../../components/viewforum/viewforum.component';

export const psoViewForum = {
    name: 'phpbb.seo.search', 
    url: '/recherche/:keyword',
    component: ViewforumComponent,
    params: {
        keyword: null,
    }
};
