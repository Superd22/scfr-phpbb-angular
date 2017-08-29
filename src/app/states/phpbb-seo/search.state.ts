import { SearchComponent } from './../../components/search/search.component';

export const psoSearch = {
    name: 'phpbb.seo.search', 
    url: '/recherche/:prettyMod?start&p&t&view&submit&keywords&add_keywords&author&author_id&sr&terms&sf&sc&st&sk&sd&ch&fid',
    component: SearchComponent,
    params: {
        prettyMod: null,
        search_id: null,
    }
};
