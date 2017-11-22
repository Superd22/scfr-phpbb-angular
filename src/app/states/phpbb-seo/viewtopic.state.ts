import { ViewtopicComponent } from './../../components/viewtopic/viewtopic.component';
export const psoViewTopic = {
    name: 'phpbb.seo.viewtopic',
    url: '/{forumId:int}-{forumSlug:[^/]*}/{topicId:int}-{topicSlug:[^/]*}/{pageNumber:int}?p&unread',
    params: {
        forumSlug: "",
        topicSlug: "",
        pageNumber: 1,
        unread: "",
    },
    component: ViewtopicComponent,
};
