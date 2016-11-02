import { PhpbbRoot } from './../component/phpbb/root/phpbb-root.component';

export const PhpbbSeo = {
    name:   'phpbb.seo', 
    component: PhpbbRoot,
    abstract: true,
    params: {
        phpbbResolved: false,
    }
};