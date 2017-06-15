import { ViewforumComponent } from './../../components/viewforum/viewforum.component';

export const psoViewForum = {
    name: 'phpbb.seo.viewforum', 
    url: '/{forumId:int}-{forumSlug:[^/]*}/:pageNumber',
    component: ViewforumComponent,
    params: {
        forumSlug: "",
        pageNumber: null,
    }
};
