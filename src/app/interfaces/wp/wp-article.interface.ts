/**
 * Base Article from Wordpress DB
 */
export interface IWPArticle {
    ID: number;
    comment_count: string;
    comment_status: string;
    filter: string;
    guid: string;
    menu_order: number;
    ping_status: string;
    pinged: string;
    post_author: string;
    post_content: string;
    post_content_filtered: string;
    post_date: string;
    post_date_gmt: string;
    post_excerpt: string;
    post_mime_type: string;
    post_modified: string;
    post_modified_gmt: string;
    post_name: string;
    post_parent: number;
    post_password: string;
    post_status: string;
    post_title: string;
    post_type: string;
    to_ping: string;
}