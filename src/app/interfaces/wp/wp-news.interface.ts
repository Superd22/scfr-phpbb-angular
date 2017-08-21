import { IWPArticleFiltered } from './wp-article-filtered.interface';
/**
 * Describres a news as delivered by single.php on callback json
 */
export interface IWPNews {
    /** thumbnail url */
    thumbnail: string;
    /** youtube id */
    youtube: string;
    twitch: string;
    source: { url: string, name: string };
    tradteam: boolean;
    categories: any[];
    post: IWPArticleFiltered;
}