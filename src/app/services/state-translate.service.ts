import { Transition, UIRouter } from '@uirouter/angular';
import { LoginService } from './login.service';
import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { PhpbbApiService } from './phpbb-api.service';
import { PhpbbTemplateResponse } from '../models/phpbb-template-response';
import { SeoUrlPipe } from '../pipes/seo-url.pipe';
import { Injectable, Inject } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";


@Injectable()
export class StateTranslate {
    private cache = null;
    private shouldParseAgain = true;
    private onceResolved = false;
    private router: UIRouter = null;
    private _latestTemplateData: BehaviorSubject<any> = new BehaviorSubject(null);
    public get latestTemplateData(): BehaviorSubject<any> { return this._latestTemplateData; }

    constructor(private http: Http, private phpbbApi: PhpbbApiService, private login: LoginService) { }

    public set uiRouter(router: UIRouter) {
        this.router = router;
        this.phpbbApi.translate = this;
    }

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
                case "ucp":
                    return this.transform_ucp(trans);
            }
        }
    }

    private transform_viewtopic(trans, topicId?: number, force?: boolean) {
        let params = trans.params();
        let trans_param = {};
        let trans_page = "phpbb.seo.index";

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

    private transform_viewonline_viewprofile(trans: Transition, user?: number) {
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

    private transform_ucp_pm(trans) {
        //getPage
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

    /**
     * Fetches template for a posting.php page
     * As **.posting are always children state, we discard previous phpbbResolved
     * And fetch only once.
     */
    private getPosting(trans, param) {

        let params = Object.assign({}, param);

        if (this.isOnceResolved()) {
            this.setOnceResolved(false);
            return Observable.of(new Object()).map(() => true);
        }

        let topic = params.topicId;
        let forum = params.forumId;
        let post = params.postId;
        let quote = params.quote;

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

            if (quote) {
                legacy.mode = "quote";
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
        if (retain == false) return resolved;

        for (var pp in retain)
            retain[pp] = Object.assign(retain[pp], resolved[pp]);

        return retain;
    }

    public getCurrentStateData(component: any) {
        let tpl = component.transition.params()["phpbbResolved"]["@template"];
        if (tpl) {
            this._latestTemplateData.next(tpl)
            this.unwrapTplData(component, tpl);
        }
    }

    private transform_ucp(transition: Transition): Observable<any> {
        let params = transition.params();
        let newParam: any = Object.assign({}, params);
        let stateTarget = "phpbb.seo.ucp";


        /**
         * Array of pretty states (?i=)
         * pretty_name => phpbbNames[]
         */
        let pretty_states = {
            "general": ["ucp_main", 172],
            "profil": ["ucp_profile", 173],
            "preferences": ["ucp_prefs", 174],
            "mp": ["ucp_pm", 175],
            "groups": ["ucp_groups", 176],
            "contacts": ["ucp_zebra", 177],
            "notifications": ["ucp_notifications"],
        };

        /**
         * Array of pretty sub-states (?mode=)
         * pretty_name => phpbbName
         */
        let pretty_sub_states = {
            accueil: "front",
            abonnements: "subscribed",
            bookmarks: "bookmarks",
            brouillons: "drafts",
            attachments: "attachments",
            info: "profile_info",
            signature: "signature",
            compte: "reg_details",
            avatar: "avatar",
            keys: "autologin_keys",
            personelles: "personal",
            posts: "post",
            affichage: "view",
            options: "notification_options",
            nouveau: "compose",
            rules: "options",
            membre: "membership",
            manage: "manage",
            amis: "friends",
            indesirables: "foes"
        };

        console.log("transform mwa", transition.$to().name);

        if (transition.$to().name.indexOf("legacy") > -1) {
            // We're in LEGACY

            // We pretty-ize both our params.
            for(let p in pretty_states) {
                console.log(params.i, pretty_states[p]), pretty_states[p].indexOf(params.i);
                if(pretty_states[p].indexOf(params.i) > -1) {
                    newParam.page = p;
                    break;
                }
            }

            for(let pp in pretty_sub_states) {
                if(pretty_sub_states[pp] == params.mode) {
                    newParam.subPage = pp;
                    break;
                }
            }

            if(!newParam.page) newParam.page = "general";
            if(!newParam.subPage) newParam.subPage = "";

            let r = Observable.of(transition.router.stateService.target(stateTarget, newParam))

            return r;
        }
        else if (!params.phpbbResolved) {
            // We're in SEO mod

            // We un-pretty-ize our params if need be
            if(params.page && !params.i) newParam.i = pretty_states[params.page][0];
            if(params.subPage && !params.mode) newParam.mode = pretty_sub_states[params.subPage];

            // Fetch the actual data
            return this.phpbbApi.getPage("ucp.php", { i: newParam.i, mode: newParam.mode }).map(
                (data) => {
                    newParam.phpbbResolved = data;
                    return transition.router.stateService.target(stateTarget, newParam);
                }
            )
        }
        // We had everything we wanted.
        return Observable.of(true);
    }

    /**
     * Main method called before every SEO state access, responsible for fetching its template data
     * @param Transition transition the current transition
     * @param force force the update of this state
     */
    public getCurrentStateDataView(transition: Transition, force?: boolean): Observable<any> {

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
            case "phpbb.seo.ucp":
                return this.transform_ucp(transition);
            //case "phpbb.seo.ucp.pm":
            //   return this.transform_ucp_pm(transition);
        }

        return Observable.of(new Object()).map(() => true);
    }

    private unwrapTplData(component, tpl) {
        let keyArr = Object.keys(tpl);

        keyArr.forEach((key) => {
            component[key] = UnicodeToUtf8Pipe.forEach(tpl[key]);
        });
    }

    public goToOld(url) {
        this.router.urlService.url(url, true);
    }

}
