export interface IPhpbbPollOption {
    /** name of the poll option */
    POLL_OPTION_CAPTION: string;
    /** unique id for this  option */
    POLL_OPTION_ID: string;
    POLL_OPTION_MOST_VOTES: boolean;
    /** percentage of vode for this opt */
    POLL_OPTION_PCT: number;
    POLL_OPTION_PERCENT:string;
    POLL_OPTION_PERCENT_REL:string;
    POLL_OPTION_RESULT:string;
    POLL_OPTION_VOTED:boolean;
    POLL_OPTION_WIDTH:number
    S_BLOCK_NAME:string;
    S_FIRST_ROW:boolean;
    S_ROW_COUNT:number;
    S_ROW_NUM:number;
}