/**
 * Describes a side-link  (sub-pages) for the UCP
 */
export interface UCPSideLink {
    CAT:boolean;
    DEPTH:number;
    DISPLAY:number;
    ID:number;
    IS_DUPLICATE:boolean
    /** display name in language of the user */
    LANG:string;
    /** display name for phpbb template */
    LANGNAME:string;
    LEFT:number;
    L_TITLE:string;
    MODE:string;
    NAME:string;
    PARENT:number;
    RIGHT:string;
    S_BLOCK_NAME:string;
    S_FIRST_ROW:boolean;
    S_ROW_COUNT:number;
    S_ROW_NUM:number;
    S_SELECTED:boolean;
    URL_EXTRA:string;
    U_TITLE:string;
}
