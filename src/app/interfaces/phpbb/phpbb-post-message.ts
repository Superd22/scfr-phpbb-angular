export interface PhpbbPostMessage {
    POST_ID:Number;
    BUMPED_MESSAGE:String;
    DELETED_MESSAGE:String;
    DELETE_REASON:String;
    EDITED_MESSAGE:String;
    MESSAGE:String;
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
     * @property {String} POSTER_AVATAR
     */
    POSTER_AVATAR:String;
    /**
     * The forum ID of the posting user
     * @property {String} POSTER_ID
    */
    POSTER_ID:Number;
    /**
     * String date of when the user joined.
     * @property {String} POSTER_JOINED
    */
    POSTER_JOINED:String;

    /**
     * Numbers of post by the user.
     * @property {Number} POSTER_JOINED
    */
    POSTER_POSTS:Number;
    /**
     * Numbers of post by the user.
     * @property {Number} POSTER_JOINED
    */
    POSTER_WARNINGS:String;
    /**
     * Full username of the user.
     * @property {Number} POST_AUTHOR
    */
    POST_AUTHOR:String;

    /**
     * The hexadecimal (with #) color of the user.
     * @property {Number} POSTER_JOINED
    */
    POST_AUTHOR_COLOUR:String;
    POST_AUTHOR_FULL;
    POST_DATE;
    POST_ICON_IMG;
    POST_ICON_IMG_ALT;
    POST_ICON_IMG_HEIGHT;
    POST_ICON_IMG_WIDTH;
    POST_NUMBER;
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
