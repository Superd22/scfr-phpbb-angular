export interface PhpbbPostMessage {
    POST_ID:number;
    BUMPED_MESSAGE:string;
    DELETED_MESSAGE:string;
    DELETE_REASON:string;
    EDITED_MESSAGE:string;
    MESSAGE:string;
    EDIT_REASON;
    L_IGNORE_POST;
    L_POST_DELETED_MESSAGE;
    L_POST_DISPLAY;
    MINI_POST;
    MINI_POST_IMG;
    ONLINE_IMG;
    POSTER_AGE;
    /**
     * The avatar of the user in a <img> tag
     * @property {string} POSTER_AVATAR
     */
    POSTER_AVATAR:string;
    /**
     * The forum ID of the posting user
     * @property {string} POSTER_ID
    */
    POSTER_ID:number;
    /**
     * string date of when the user joined.
     * @property {string} POSTER_JOINED
    */
    POSTER_JOINED:string;

    /**
     * numbers of post by the user.
     * @property {number} POSTER_JOINED
    */
    POSTER_POSTS:number;
    /**
     * numbers of post by the user.
     * @property {number} POSTER_JOINED
    */
    POSTER_WARNINGS:string;
    /**
     * Full username of the user.
     * @property {number} POST_AUTHOR
    */
    POST_AUTHOR:string;

    /**
     * The hexadecimal (with #) color of the user.
     * @property {number} POSTER_JOINED
    */
    POST_AUTHOR_COLOUR:string;
    POST_AUTHOR_FULL;
    POST_DATE;
    POST_ICON_IMG;
    POST_ICON_IMG_ALT;
    POST_ICON_IMG_HEIGHT;
    POST_ICON_IMG_WIDTH;
    POST_number;
    POST_SUBJECT;
    RANK_IMG;
    RANK_IMG_SRC;
    RANK_TITLE;
    SIGNATURE;
    S_BLOCK_NAME;
    S_CUSTOM_FIELDS;
    S_DELETE_PERMANENT;
    S_DISPLAY_NOTICE;
    S_FIRST_ROW;
    S_FIRST_UNREAD;
    S_FRIEND;
    S_HAS_ATTACHMENTS;
    S_IGNORE_POST;
    S_MULTIPLE_ATTACHMENTS;
    S_ONLINE;
    S_POST_DELETED;
    S_POST_HIDDEN;
    S_POST_REPORTED;
    S_POST_UNAPPROVED;
    S_ROW_COUNT;
    S_ROW_NUM;
    S_TOPIC_POSTER;
    S_UNREAD_POST;
    U_APPROVE_ACTION;
    U_DELETE;
    U_EDIT;
    U_EMAIL;
    U_INFO;
    U_JABBER;
    U_MCP_APPROVE;
    U_MCP_REPORT;
    U_MCP_RESTORE;
    U_MINI_POST;
    U_NEXT_POST_ID;
    U_NOTES;
    U_PM;
    U_POST_AUTHOR;
    U_PREV_POST_ID;
    U_QUOTE;
    U_REPORT;
    U_SEARCH;
    U_WARN;
}
