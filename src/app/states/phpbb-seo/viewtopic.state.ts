import { ViewtopicComponent } from './../../components/viewtopic/viewtopic.component';
export const psoViewTopic = {
    name: 'phpbb.seo.viewtopic',
    url: '/{forumId:int}-{forumSlug:[^/]*}/{topicId:int}-{topicSlug:string}/{pageNumber:int}?p',
    params: {
        forumSlug: "",
        topicSlug: "",
        pageNumber: null,
        unread: "",
    },
    component: ViewtopicComponent,
};
