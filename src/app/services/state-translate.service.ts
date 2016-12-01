import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';
import { Observable } from 'rxjs/Rx';
import { PhpbbApiService } from './phpbb-api.service';
import { PhpbbTemplateResponse } from '../models/phpbb-template-response';
import { SeoUrlPipe } from '../pipes/seo-url.pipe';
import { Injectable, Inject } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";


@Injectable()
export class StateTranslate {
    cache = null;
    shouldParseAgain = true;
    onceResolved = false;

    constructor(private http: Http, private phpbbApi: PhpbbApiService) { }

    public legacyToSeo(trans) {
        if (!trans.params()["phpbbResolved"]) {
            let page = trans.params().page.toLowerCase().replace('.php', '');
            switch (page) {
                case "index":
                    return trans.router.stateService.target("phpbb.seo.index");
                case "viewtopic":
                    return this.transform_viewtopic(trans);
                case "viewforum":
                    return this.transform_viewforum(trans);
                case "memberlist":
                    switch (trans.params().mode) {
                        case "viewprofile":
                            return this.transform_viewonline_viewprofile(trans);
                    }
            }
        }
    }

    private transform_viewtopic(trans, topicId?: number, force?: boolean) {
        var params = trans.params();
        var trans_param = {};
        var trans_page = "phpbb.seo.index";

        if (typeof topicId === "undefined") topicId = trans.params()["t"];

        if (topicId > 0 && this.shouldParseAgain) {
            return this.phpbbApi.getTopicById(topicId).map(
                data => {
                    let template = data["@template"];
                    // We're authorized and topic exists.
                    if (template["TOPIC_ID"] > 0) {


                        trans_param = {
                            phpbbResolved: data,
                            forumId: template["FORUM_ID"],
                            forumSlug: new SeoUrlPipe().transform(template["FORUM_NAME"]),
                            topicSlug: new SeoUrlPipe().transform(template['TOPIC_TITLE']),
                            topicId: template["TOPIC_ID"],
                            '#': trans.params()["#"],
                        };

                        var trans_page = "phpbb.seo.viewtopic";
                        let newTransition = trans.router.stateService.target(trans_page, trans_param);
                        if (!trans.params().phpbbResolved || trans.params().phpbbResolved.topic_id != trans.params().topicId
                            || template["FORUM_ID"] != trans.params().forumId
                            || template["TOPIC_ID"] != trans.params().topicId
                            || (new SeoUrlPipe().transform(template["FORUM_NAME"]) != trans.params().forumSlug)
                            || (new SeoUrlPipe().transform(template["TOPIC_TITLE"]) != trans.params().topicSlug)
                        ) {
                            this.shouldParseAgain = false;
                            return newTransition;
                        }
                        else {
                            this.shouldParseAgain = true;
                            return true
                        }
                    }
                    return false;
                }
            );
        }
        else {
            this.shouldParseAgain = true;
            return Observable.of(new Object()).map(() => true);
        }
    }

    private transform_viewforum(trans, forumId?: number, force?: boolean) {
        var params = trans.params();
        var trans_param = {};
        var trans_page = "phpbb.seo.index";

        if (typeof forumId === "undefined") forumId = trans.params()["f"];

        if (forumId > 0 && this.shouldParseAgain) {
            return this.phpbbApi.getForumById(forumId)
                .map(
                (data) => {
                    let template = data["@template"];
                    // We're authorized and forum exists.
                    if (template["FORUM_ID"] && template["FORUM_NAME"]) {
                        trans_param = {
                            phpbbResolved: data,
                            forumId: template["FORUM_ID"],
                            forumSlug: new SeoUrlPipe().transform(template["FORUM_NAME"]),
                        };

                        trans_page = "phpbb.seo.viewforum";
                        let newTransition = trans.router.stateService.target(trans_page, trans_param);

                        if (
                            !trans.params().phpbbResolved
                            || trans.params().phpbbResolved.FORUM_ID != trans.params().forumId
                            || template["FORUM_ID"] != trans.params().forumId
                            || (new SeoUrlPipe().transform(template["FORUM_NAME"]) != trans.params().forumSlug)
                        ) {
                            this.shouldParseAgain = false;
                            return newTransition;
                        }
                        else {
                            this.shouldParseAgain = true;
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                }
                );
        }
        this.shouldParseAgain = true;
        return Observable.of(new Object()).map(() => true);
    }

    private isOnceResolved(): boolean {
        return this.onceResolved;
    }

    private setOnceResolved(val: boolean) {
        this.onceResolved = val;
    }

    private transform_viewonline_viewprofile(trans, user?: number) {
        var params = trans.params();
        var trans_param = {};
        var trans_page = "phpbb.seo.index";


        if (typeof user === "undefined") user = trans.params().u;

        if (user > 0 && this.shouldParseAgain) {
            return this.phpbbApi.getPage("memberlist.php", { mode: "viewprofile", u: user }).map(
                data => {
                    let template = data["@template"];

                    if (template["USERNAME"]) {
                        trans_page = "phpbb.seo.viewprofile";
                        trans_param = {
                            phpbbResolved: data,
                            userId: user,
                            userSlug: new SeoUrlPipe().transform(template["USERNAME"]),
                        };

                        if (!trans.params().phpbbResolved
                            || trans.params().phpbbResolved.username != template["USERNAME"]
                            || trans.params().userId != user
                            || trans.params().userSlug != new SeoUrlPipe().transform(template["USERNAME"])) {

                            this.shouldParseAgain = false;
                            return trans.router.stateService.target(trans_page, trans_param);
                        }
                        this.shouldParseAgain = true;
                        return true;
                    }
                    return this.checkAuthLogin(trans, template);
                },
            );
        }

        this.shouldParseAgain = true;
        return Observable.of(new Object()).map(() => true);


    }

    private checkAuthLogin(trans, tpl: any) {
        // To do callback once logged-in.
        // To do logged in but not authed enough.

        // Login Error will be an empty string if true and non present if false.
        if (typeof tpl["LOGIN_ERROR"] !== 'undefined') {
            return trans.router.stateService.target("phpbb.seo.login", { error: tpl["LOGIN_EXPLAIN"] });
        }

        return false;
    }

    // Fetches template for a posting.php page
    // As **.posting are always children state, we discard previous phpbbResolved
    // And fetch only once.
    private getPosting(trans, params) {

        if (this.isOnceResolved()) {
            this.setOnceResolved(false);
            return Observable.of(new Object()).map(() => true);
        }

        let topic = params.topicId;
        let forum = params.forumId;
        let post = params.postId;

        if (forum) {

            var legacy = {
                f: forum,
                mode: 'post',
                t: null,
                p: null,
            }

            if (topic) {
                legacy.mode = 'reply';
                legacy.t = topic;
            }

            if (post) {
                legacy.mode = "edit";
                legacy.p = post;
            }

            return this.phpbbApi.getPage("posting.php", legacy).map(
                data => {
                    let template = data["@template"];
                    if (this.checkAuthLogin(trans, template)) return this.checkAuthLogin(trans, template);

                    // Retain old state resolved data
                    params.phpbbResolved = this.mergeRetainResolved(params.phpbbResolved, data);
                    this.setOnceResolved(true);

                    return trans.router.stateService.target(trans.$to().name, params, { notify: false, reload: false });
                }
            );
        }
        else return Observable.of(new Object()).map(() => false);
    }

    private mergeRetainResolved(retain, resolved) {
        for(var pp in retain) 
            retain[pp] = Object.assign(retain[pp], resolved[pp]);

        return retain;
    }

    public getCurrentStateData(component: any) {
        if (!component.transition.params()["phpbbResolved"]) {
            //this.getCurrentStateDataView(component.transition, true).subscribe();
        }
        else this.unwrapTplData(component, component.transition.params()["phpbbResolved"]["@template"]);
    }

    public getCurrentStateDataView(transition, force?: boolean) {
        let stateName = transition.$to().name;
        switch (stateName) {
            case "phpbb.seo.viewforum.posting":
            case "phpbb.seo.viewtopic.posting":
            case "phpbb.seo.viewtopic.edit":
                return this.getPosting(transition, transition.params());
            case "phpbb.seo.viewforum":
                return this.transform_viewforum(transition, transition.params().forumId);
            case "phpbb.seo.viewtopic":
                return this.transform_viewtopic(transition, transition.params().topicId);
            case "phpbb.seo.viewprofile":
                return this.transform_viewonline_viewprofile(transition, transition.params().userId);
        }

        return Observable.of(new Object()).map(() => true);
    }

    private unwrapTplData(component, tpl) {
        let keyArr = Object.keys(tpl);

        keyArr.forEach((key) => {
            component[key] = UnicodeToUtf8Pipe.forEach(tpl[key]);
        });
    }

}
