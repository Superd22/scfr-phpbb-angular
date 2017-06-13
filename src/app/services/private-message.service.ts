import { LoginService } from './login.service';
import { PhpbbApiService } from './phpbb-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PrivateMessageService {

    public convos;
    public currentConvo;

    constructor(private phpbbApi: PhpbbApiService, private login: LoginService) {
        this.login.userStatus.subscribe(
            data => data.status ? this.fetchConvos() : this.removeConvos()
        );
    }

    private fetchConvos() {
        this.phpbbApi.getApi("PM/Convos").subscribe(
            data => this.convos = data
        );
    }

    public removeConvos() {
        this.convos = [];
    }

    public setCurrentConvo(convo: Number) {
        this.currentConvo = null;
        if (this.convos) {
            for (var i = 0; i < this.convos.length; i++) {
                if (this.convos[i].id == convo) {
                    this.currentConvo = this.convos[i];
                    break;
                }
            }
        }
    }

}