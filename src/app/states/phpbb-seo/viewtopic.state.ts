import { ViewtopicComponent } from './../../components/viewtopic/viewtopic.component';
export const psoViewTopic = {
    name: 'phpbb.seo.viewtopic',
    url: '/{forumId:int}-{forumSlug:[^/]*}/{topicId:int}-{topicSlug:string}/:pageNumber?p',
    params: {
        forumSlug: "",
        topicSlug: "",
        pageNumber: null,
    },
    component: ViewtopicComponent,
};
