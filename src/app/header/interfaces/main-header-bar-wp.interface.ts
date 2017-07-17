/**
 * Main object returned by WordPress back-end.
 */
export interface IMainHeaderBarWP {
    /** more data for the news bar */
    news: { categories: { name: string, link: string }[] },
    /** array of usefull links */
    links: { [page: string]: string }
}