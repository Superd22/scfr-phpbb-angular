import { PostingComponent } from './../../components/posting/posting.component';

export const psoPostReply = {
    name: 'phpbb.seo.viewtopic.posting', 
    url: 'repondre/',
    views: {
        '@': {
            component: PostingComponent,
        }
    }
};

export const psoPostEdit = {
    name: 'phpbb.seo.viewtopic.edit', 
    url: 'edit/:postId',
    views: {
        'editMessage': {
            component: PostingComponent,
        }
    }
};

export const psoPostTopic = {
    name: 'phpbb.seo.viewforum.posting', 
    url: 'nouveau/',
    views: {
        '@': {
            component: PostingComponent,
        }
    }
};

