export interface PhpbbAjaxMessageResponse {
    MESSAGE_TEXT: string,
    MESSAGE_TITLE: string,
    REFRESH_DATA: any
    S_USER_NOTICE: boolean,
    S_USER_WARNING: boolean,
    S_ERROR?:boolean,
}
