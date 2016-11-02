import { ViewforumComponent } from './../../component/viewforum/viewforum.component';

export const psoViewForum = {
    name: 'phpbb.seo.viewforum', 
    url: '/{forumId:int}-{forumSlug:string}/',
    component: ViewforumComponent,
    params: {
        forumSlug: "",
    }
};
