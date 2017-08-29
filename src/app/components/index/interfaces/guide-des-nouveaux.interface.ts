import { IWPArticle } from './../../../interfaces/wp/wp-article.interface';
export interface IGuideDesNouveauxResponse {
    current_page: number;
    root: IWPArticle;
    pageList: IWPArticle[];
    pageTree: { [parent: number]: number[] };
}