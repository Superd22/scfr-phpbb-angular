import { PhpbbRoot } from './../components/phpbb/root/phpbb-root.component';

export const PhpbbSeo = {
    name:   'phpbb.seo', 
    component: PhpbbRoot,
    abstract: true,
    params: {
        phpbbResolved: false,
    }
};