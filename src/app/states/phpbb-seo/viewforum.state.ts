import { ViewforumComponent } from './../../components/viewforum/viewforum.component';

export const psoViewForum = {
    name: 'phpbb.seo.viewforum', 
    url: '/{forumId:int}-{forumSlug:[^/]*}/',
    component: ViewforumComponent,
    params: {
        forumSlug: "",
    }
};
