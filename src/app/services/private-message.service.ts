import { LoginService } from './login.service';
import { PhpbbApiService } from './phpbb-api.service';
import { Injectable } from '@angular/core';

export interface IAPIConvoReponse {
    /** the convos for the current page */
    convos: IPHPBBPMConvo[];
    /** number of convos for this user */
    count: number;
    /** current page number */
    page: number;
    /** last (max) page */
    pages: number;
}

export interface IPHPBBPMConvo {
    author: any;
    id: number;
    last: number;
    messages: IPHPBBExtendedPM[];
    start: number;
    title: string;
}

export interface IPHPBBExtendedPM {
    author: { user_id: number, color: string, username: string, avatar: string }
    author_id: number;
    author_ip: string;
    bbcode_bitfield: string;
    bbcode_uid: string;
    bcc_address: string;
    enable_bbcode: boolean;
    enable_magic_url: boolean;
    enable_sig: boolean;
    enable_smilies: boolean;
    folder_id: number;
    icon_id: number;
    message_attachment: number;
    message_edit_count: number;
    message_edit_reason: string;
    message_edit_time: number;
    message_edit_user: number;
    message_reported: boolean;
    message_subject: string;
    message_text: string;
    message_time: number;
    msg_id: number;
    pm_deleted: boolean;
    pm_forwarded: boolean;
    pm_marked: boolean;
    pm_new: boolean;
    pm_replied: boolean;
    pm_unread: boolean;
    root_level: number;
    to_address: string;
    user_id: number;
}

@Injectable()
export class PrivateMessageService {

    private _convos: IPHPBBPMConvo[];
    private _currentConvo: IPHPBBPMConvo;

    private _convoPerPage: number = 20;
    private _page: number = 1;

    private _maxPage:number = 1;
    private _count: number = 0;

    constructor(private phpbbApi: PhpbbApiService, private login: LoginService) {
        this.login.userStatus.subscribe(
            data => data.status ? this.fetchConvos() : this.removeConvos()
        );
    }

    public get convos(): IPHPBBPMConvo[] {
        let i = 0;

        return this._convos ? this._convos.filter(() => { i = i++; return i <= this._convoPerPage }) : null;
    }

    public get currentConvo(): IPHPBBPMConvo { return this._currentConvo; }

    public get count(): number { return this._count; }

    public get convoPerPage(): number { return this._convoPerPage; }
    public set convoPerPage(n: number) {
        let oldValue = this._convoPerPage;
        this._convoPerPage = n;
        if (oldValue < n) this.fetchConvos();
    }

    public get maxPage():number { return this._maxPage; }

    public get page(): number { return this._page; }
    public set page(n: number) {
        let oldValue = this._page;
        this._page = n;

        if (oldValue != n) this.fetchConvos();
    }

    private fetchConvos() {
        this.phpbbApi.getApi("PM/Convos", { page: this._page, convoPerPage: this._convoPerPage }).subscribe(
            (data: any) => {
                let r: IAPIConvoReponse = data;

                this._convos = r.convos;
                this._count = r.count;
                this._maxPage = r.pages;
            }
        );
    }

    public removeConvos() {
        this._convos = [];
    }

    public setCurrentConvo(convo: number) {
        this._currentConvo = null;
        if (this.convos)
            this._currentConvo = this.convos.find((cv) => cv.id == convo);
    }

}