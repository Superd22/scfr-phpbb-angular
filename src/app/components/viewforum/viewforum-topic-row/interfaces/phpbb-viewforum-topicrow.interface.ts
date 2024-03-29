export interface IPhpbbViewforumTopicrow {
    TTACH_ICON_IMG: string;
    BASE_URL: string;
    CURRENT_PAGE: number;
    FIRST_POST_TIME: string;
    FORUM_ID: string;
    FORUM_NAME: string;
    LAST_POST_AUTHOR: string;
    LAST_POST_AUTHOR_COLOUR: string;
    LAST_POST_AUTHOR_FULL: string;
    LAST_POST_SUBJECT: string;
    LAST_POST_TIME: string;
    LAST_VIEW_TIME: string;
    PAGE_NUMBER: string;
    PER_PAGE: string;
    REPLIES: number;
    START_NAME: string;
    S_BLOCK_NAME: string;
    S_HAS_POLL: boolean;
    S_POSTS_UNAPPROVED: boolean;
    S_POST_ANNOUNCE: boolean;
    S_POST_GLOBAL: boolean;
    S_POST_STICKY: boolean;
    S_ROW_COUNT: number;
    S_ROW_NUM: number;
    S_TOPIC_DELETED: boolean;
    S_TOPIC_LOCKED: boolean;
    S_TOPIC_MOVED: boolean;
    S_TOPIC_REPORTED: boolean;
    S_TOPIC_TYPE: string;
    S_TOPIC_TYPE_SWITCH: number;
    S_TOPIC_UNAPPROVED: boolean;
    S_UNREAD_TOPIC: boolean;
    S_USER_POSTED: boolean;
    TOPIC_AUTHOR: string;
    TOPIC_AUTHOR_COLOUR: string;
    TOPIC_AUTHOR_FULL: string;
    TOPIC_FOLDER_IMG: string;
    TOPIC_FOLDER_IMG_ALT: string;
    TOPIC_ICON_IMG: string;
    TOPIC_ICON_IMG_HEIGHT: string;
    TOPIC_ICON_IMG_WIDTH: string;
    TOPIC_ID: number;
    TOPIC_IMG_STYLE: string;
    TOPIC_TITLE: string;
    TOPIC_TYPE: string;
    TOTAL_PAGES: number;
    UNAPPROVED_IMG: string;
    U_LAST_POST: string;
    U_LAST_POST_AUTHOR: string;
    U_MCP_QUEUE: string;
    U_MCP_REPORT: string;
    U_NEWEST_POST: string;
    U_NEXT_PAGE: string;
    U_PREVIOUS_PAGE: string;
    U_TOPIC_AUTHOR: string;
    U_VIEW_FORUM: string;
    U_VIEW_TOPIC: string;
    VIEWS: string;
    FORUM_TITLE?: string;
    TOPIC_VIEWS?: string;
    TOPIC_REPLIES?: string;

    /**
     * Guilds stuff
     */
    /** if the current topic is a guild */
    SCFR_GUILD_IS: boolean;
    /** logo for this guild topic  */
    SCFR_GUILD_LOGO: string;
    /** the guild is recruiting */
    SCFR_GUILD_RECRUITING: boolean;
    /** number of members in the guild */
    SCFR_GUILD_MEMBERS: number;
    SCFR_GUILD_COMMITMENT: number;
}
