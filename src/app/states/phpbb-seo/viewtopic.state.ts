import { ViewtopicComponent } from './../../components/viewtopic/viewtopic.component';
export const psoViewTopic = {
    name: 'phpbb.seo.viewtopic', 
    url: '/{forumId:int}-{forumSlug:[^/]*}/{topicId:int}-{topicSlug:string}/?start&p',
    params: {
        forumSlug: "",
        topicSlug: "",
    },
    component: ViewtopicComponent,
};
