export module PhpbbWebSocket {
    export interface WSMessage {
        event: "PHPBB_POSTING",
        data: any
    }

    export interface WSPostingEvent extends WSMessage {
        event: "PHPBB_POSTING",
        data: {
            mode: "post" | "reply" | "edit",
            post: any,
            data: any,
        }
    }
}