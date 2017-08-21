import { IWPArticle } from './wp-article.interface';

/**
 * describes an article whose content has been kable_filtered();
 */
export interface IWPArticleFiltered extends IWPArticle {
    post_content_filtered: string;
}