import { PhpbbTemplateResponse } from './phpbb-template-response';
export module IndexResponse {

    export interface Subforum {
        U_SUBFORUM: string;
        SUBFORUM_NAME: string;
        S_UNREAD: boolean;
        S_ROW_NUM: number;
        S_ROW_COUNT: number;
        S_FIRST_ROW: boolean;
        S_BLOCK_NAME: string;
        S_LAST_ROW?: boolean;
    }

    export interface Forumrow {
        S_IS_CAT: boolean;
        FORUM_ID: string;
        FORUM_NAME: string;
        FORUM_DESC: string;
        FORUM_FOLDER_IMG: string;
        FORUM_FOLDER_IMG_SRC: string;
        FORUM_IMAGE: string;
        FORUM_IMAGE_SRC: string;
        U_VIEWFORUM: string;
        S_ROW_NUM: number;
        S_ROW_COUNT: number;
        S_FIRST_ROW: boolean;
        S_BLOCK_NAME: string;
        S_NO_CAT?: boolean;
        S_IS_LINK?: boolean;
        S_UNREAD_FORUM?: boolean;
        S_AUTH_READ?: number;
        S_LOCKED_FORUM?: boolean;
        S_LIST_SUBFORUMS?: boolean;
        S_SUBFORUMS?: boolean;
        S_DISPLAY_SUBJECT?: boolean;
        S_FEED_ENABLED?: boolean;
        TOPICS?: number;
        POSTS?: number;
        FORUM_IMG_STYLE: string;
        FORUM_FOLDER_IMG_ALT: string;
        LAST_POST_SUBJECT: string;
        LAST_POST_SUBJECT_TRUNCATED: string;
        LAST_POST_TIME: string;
        LAST_POSTER: string;
        LAST_POSTER_COLOUR: string;
        LAST_POSTER_FULL: string;
        MODERATORS: string;
        SUBFORUMS: string;
        L_SUBFORUM_STR: string;
        L_MODERATOR_STR: string;
        U_UNAPPROVED_TOPICS: string;
        U_UNAPPROVED_POSTS: string;
        U_LAST_POSTER: string;
        U_LAST_POST: string;
        subforum: Subforum[];
        S_LAST_ROW?: boolean;
    }

    export interface Template {
        U_MARK_FORUMS: string;
        S_HAS_SUBFORUM: boolean;
        L_SUBFORUM: string;
        LAST_POST_IMG: string;
        UNAPPROVED_IMG: string;
        UNAPPROVED_POST_IMG: string;
        TOTAL_POSTS: string;
        TOTAL_TOPICS: string;
        TOTAL_USERS: string;
        NEWEST_USER: string;
        LEGEND: string;
        BIRTHDAY_LIST: string;
        FORUM_IMG: string;
        FORUM_UNREAD_IMG: string;
        FORUM_LOCKED_IMG: string;
        FORUM_UNREAD_LOCKED_IMG: string;
        S_LOGIN_ACTION: string;
        U_SEND_PASSWORD: string;
        S_DISPLAY_BIRTHDAY_LIST: boolean;
        S_INDEX: boolean;
        U_MCP: string;
        SITENAME: string;
        SITE_DESCRIPTION: string;
        PAGE_TITLE: string;
        SCRIPT_NAME: string;
        LAST_VISIT_DATE: string;
        LAST_VISIT_YOU: string;
        CURRENT_TIME: string;
        TOTAL_USERS_ONLINE: string;
        LOGGED_IN_USER_LIST: string;
        RECORD_USERS: string;
        PRIVATE_MESSAGE_COUNT: number;
        CURRENT_USER_AVATAR: string;
        CURRENT_USERNAME_SIMPLE: string;
        CURRENT_USERNAME_FULL: string;
        UNREAD_NOTIFICATIONS_COUNT: string;
        NOTIFICATIONS_COUNT: string;
        U_VIEW_ALL_NOTIFICATIONS: string;
        U_MARK_ALL_NOTIFICATIONS: string;
        U_NOTIFICATION_SETTINGS: string;
        S_NOTIFICATIONS_DISPLAY: boolean;
        S_USER_NEW_PRIVMSG: string;
        S_USER_UNREAD_PRIVMSG: string;
        S_USER_NEW: string;
        SID: string;
        _SID: string;
        SESSION_ID: string;
        ROOT_PATH: string;
        BOARD_URL: string;
        L_LOGIN_LOGOUT: string;
        L_INDEX: string;
        L_SITE_HOME: string;
        L_ONLINE_EXPLAIN: string;
        U_PRIVATEMSGS: string;
        U_RETURN_INBOX: string;
        U_MEMBERLIST: string;
        U_VIEWONLINE: string;
        U_LOGIN_LOGOUT: string;
        U_INDEX: string;
        U_SEARCH: string;
        U_SITE_HOME: string;
        U_REGISTER: string;
        U_PROFILE: string;
        U_USER_PROFILE: string;
        U_MODCP: string;
        U_FAQ: string;
        U_SEARCH_SELF: string;
        U_SEARCH_NEW: string;
        U_SEARCH_UNANSWERED: string;
        U_SEARCH_UNREAD: string;
        U_SEARCH_ACTIVE_TOPICS: string;
        U_DELETE_COOKIES: string;
        U_CONTACT_US: string;
        U_TEAM: string;
        U_TERMS_USE: string;
        U_PRIVACY: string;
        U_RESTORE_PERMISSIONS: string;
        U_FEED: string;
        S_USER_LOGGED_IN: boolean;
        S_AUTOLOGIN_ENABLED: boolean;
        S_BOARD_DISABLED: boolean;
        S_REGISTERED_USER: boolean;
        S_IS_BOT: boolean;
        S_USER_LANG: string;
        S_USER_BROWSER: string;
        S_USERNAME: string;
        S_CONTENT_DIRECTION: string;
        S_CONTENT_FLOW_BEGIN: string;
        S_CONTENT_FLOW_END: string;
        S_CONTENT_ENCODING: string;
        S_TIMEZONE: string;
        S_DISPLAY_ONLINE_LIST: number;
        S_DISPLAY_SEARCH: boolean;
        S_DISPLAY_PM: boolean;
        S_DISPLAY_MEMBERLIST: string;
        S_NEW_PM: number;
        S_REGISTER_ENABLED: boolean;
        S_FORUM_ID: number;
        S_TOPIC_ID: number;
        S_LOGIN_REDIRECT: string;
        S_ENABLE_FEEDS: boolean;
        S_ENABLE_FEEDS_OVERALL: boolean;
        S_ENABLE_FEEDS_FORUMS: boolean;
        S_ENABLE_FEEDS_TOPICS: boolean;
        S_ENABLE_FEEDS_TOPICS_ACTIVE: boolean;
        S_ENABLE_FEEDS_NEWS: boolean;
        S_LOAD_UNREADS: boolean;
        S_SEARCH_HIDDEN_FIELDS: string;
        T_ASSETS_VERSION: string;
        T_ASSETS_PATH: string;
        T_THEME_PATH: string;
        T_TEMPLATE_PATH: string;
        T_SUPER_TEMPLATE_PATH: string;
        T_IMAGES_PATH: string;
        T_SMILIES_PATH: string;
        T_AVATAR_PATH: string;
        T_AVATAR_GALLERY_PATH: string;
        T_ICONS_PATH: string;
        T_RANKS_PATH: string;
        T_UPLOAD_PATH: string;
        T_STYLESHEET_LINK: string;
        T_STYLESHEET_LANG_LINK: string;
        T_FONT_AWESOME_LINK: string;
        T_JQUERY_LINK: string;
        S_ALLOW_CDN: boolean;
        T_THEME_NAME: string;
        T_THEME_LANG_NAME: string;
        T_TEMPLATE_NAME: string;
        T_SUPER_TEMPLATE_NAME: string;
        T_IMAGES: string;
        T_SMILIES: string;
        T_AVATAR: string;
        T_AVATAR_GALLERY: string;
        T_ICONS: string;
        T_RANKS: string;
        T_UPLOAD: string;
        SITE_LOGO_IMG: string;
        DEBUG_OUTPUT: string;
        TRANSLATION_INFO: string;
        CREDIT_LINE: string;
        U_ACP: string;
        RUN_CRON_TASK: string;
        forumrow: Forumrow[];
    }

    export interface IndexRoot extends PhpbbTemplateResponse.DefaultResponse {
    }

}

