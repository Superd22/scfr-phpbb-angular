import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
export module PhpbbTemplateResponse {
    export interface DefaultResponse {
        '@template': IPhpbbTemplate;
        '@tplName': string;
    }
}
