import { PhpbbComponent } from './../components/phpbb/phpbb-component.component';
import { ServiceLocator } from './ServiceLocator';
import { Transition, UIRouter, TargetState } from '@uirouter/angular';
import { LoginService } from './login.service';
import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { PhpbbApiService } from './phpbb-api.service';
import { PhpbbTemplateResponse } from '../models/phpbb-template-response';
import { SeoUrlPipe } from '../pipes/seo-url.pipe';
import { Injectable, Inject } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { IPhpbbTemplate } from "app/interfaces/phpbb/phpbb-tpl";


@Injectable()
export class StateTranslate {
    private cache = null;
    private shouldParseAgain = true;
    private onceResolved = false;
    private router: UIRouter = null;
    private _latestTemplateData: ReplaySubject<IPhpbbTemplate> = new ReplaySubject(1);
    public get latestTemplateData(): ReplaySubject<IPhpbbTemplate> { return this._latestTemplateData; }
    private _busy: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public get loading(): BehaviorSubject<boolean> {
        return this._busy;
    }
    private phpbbApi: PhpbbApiService

    constructor(private http: Http, private login: LoginService) {
        this.phpbbApi = ServiceLocator.injector.get(PhpbbApiService);
    }

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
                case "search":
                    return this.transform_search(trans);
            }
        }
    }

    /**
     * Checks a list of properties in the resolved against what we have in the params
     * @param resolved the resolved phpbb thing
     * @param param the param phpbbResolved
     * @param toCheck an array of property to check [resolvedName, paramName][]
     * @return [boolean] true if all the check matched
     */
    private checkParamsAgainstResolved(resolved, params, toCheck: string[][]): boolean {
        let okay = true;
        for (let i = 0; i < toCheck.length && okay; i++) {
            let pResolved = toCheck[i][0];
            let pParams = toCheck[i][1];

            if (params[pParams] != null && resolved[pResolved] != params[pParams]) okay = false;
        }

        return okay;
    }

    private transform_search(trans: Transition) {
        
    }

    /**
     * Handles the transformation and proper fetching of a viewtopic event
     * @param trans the transition we're coming from
     * @param topicId the topic we want to fetch
     */
    private transform_viewtopic(trans: Transition, topicId?: number) {
        let params = trans.params();
        var trans_param = Object.assign({}, params);
        let trans_page = "phpbb.seo.index";

        console.log("trviewtopic", trans);

        if (typeof topicId === "undefined") topicId = trans.params()["t"];
        /** @todo allow n-sized pages */
        let start = params["pageNumber"] ? (params["pageNumber"] - 1) * 15 : null;

        // We already fetched what we needed
        if (params['phpbbResolved']) {
            // Check it's still what we want 
            if (this.checkParamsAgainstResolved(params['phpbbResolved']['@template'], params, [
                ["FORUM_ID", "forumId"],
                ["TOPIC_ID", "topicId"],
                ["CURRENT_PAGE", "pageNumber"]
            ])) {
                // That's all we ever wanted
                return Observable.of(true);
            }
        }

        // We need to fetch a topic
        if (topicId > 0) {
            return this.phpbbApi.getTopicById(topicId, start, params['p']).map(
                data => {
                    let template = data["@template"];

                    // We got a topic
                    if (template["TOPIC_ID"] > 0) {

                        // We got our new params
                        trans_param = Object.assign(trans_param, {
                            phpbbResolved: data,
                            forumId: template["FORUM_ID"],
                            forumSlug: new SeoUrlPipe().transform(template["FORUM_NAME"]),
                            topicSlug: new SeoUrlPipe().transform(template['TOPIC_TITLE']),
                            topicId: template["TOPIC_ID"],
                            pageNumber: Number(template['CURRENT_PAGE']) > 1 ? template['CURRENT_PAGE'] : null,
                        });


                        // Go there
                        return trans.router.stateService.target("phpbb.seo.viewtopic", trans_param);
                    }

                    // We didn't
                    /** @todo redirect to information page for no-authorized */
                    return false;
                }
            )
        }
        // We can't get a topic if we don't have a topic id dude.
        return Observable.of(false);
    }

    private transform_viewforum(trans, forumId?: number, force?: boolean) {
        var params = trans.params();
        var trans_param = Object.assign({}, params);
        var trans_page = "phpbb.seo.index";

        if (typeof forumId === "undefined") forumId = trans.params()["f"];
        /** @todo allow n-sized pages */
        let start = params["pageNumber"] ? (params["pageNumber"] - 1) * 20 : null;

        if (forumId > 0 && this.shouldParseAgain) {
            return this.phpbbApi.getForumById(forumId, start)
                .map(
                (data) => {
                    let template = data["@template"];

                    // We're authorized and forum exists.
                    if (template["FORUM_ID"] && template["FORUM_NAME"]) {
                        trans_param = {
                            phpbbResolved: data,
                            forumId: template["FORUM_ID"],
                            forumSlug: new SeoUrlPipe().transform(template["FORUM_NAME"])
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

    private checkAuthLogin(trans, tpl: IPhpbbTemplate) {
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
    private getPosting(trans: Transition, param) {

        let params = Object.assign({}, param);

        console.log("getposting", trans);

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

                    let ifM = this.checkInformationMessage(trans, data);
                    if (ifM) return ifM;


                    // Retain old state resolved data
                    params.phpbbResolved = this.mergeRetainResolved(params.phpbbResolved, data);
                    this.setOnceResolved(true);

                    return trans.router.stateService.target(trans.$to().name, params, { notify: false, reload: false });
                }
            );
        }
        else return Observable.of(new Object()).map(() => false);
    }

    /**
     * Sometimes PHPBB will display an "Information Page" when you're not authorized to do something
     * This function will detect this page and provide a redirection to our own information page
     * @param trans the transition we're coming from
     * @param data the data containing the tpl to check against
     * @return false if we don't find information message, a targetState instead
     */
    private checkInformationMessage(trans: Transition, data: PhpbbTemplateResponse.DefaultResponse): false | TargetState {
        if (data['@template'].MESSAGE_TEXT && data['@template'].MESSAGE_TITLE) {
            return trans.router.stateService.target("phpbb.seo.information", { phpbbResolved: data });
        }
        return false;
    }

    private mergeRetainResolved(retain, resolved) {
        if (retain == false) return resolved;

        for (var pp in retain)
            retain[pp] = Object.assign(retain[pp], resolved[pp]);

        return retain;
    }

    public getCurrentStateData(component: PhpbbComponent) {
        let tpl = this.router.stateService.params["phpbbResolved"]["@template"];
        if (tpl) {
            this._latestTemplateData.next(tpl)
            this.unwrapTplData(component, tpl);
        }
    }

    public updateStateData(component: PhpbbComponent, resolvedData: PhpbbTemplateResponse.DefaultResponse) {
        let tpl = resolvedData['@template'];
        if (tpl) {
            this._latestTemplateData.next(tpl)
            this.unwrapTplData(component, tpl);
        }
    }

    private transform_ucp(transition: Transition): Observable<any> {
        let params = transition.params();
        let newParam: any = Object.assign({}, params);
        let stateTarget = transition.$to().name == "phpbb.seo.register" ? "phpbb.seo.register" : "phpbb.seo.ucp";


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
            indesirables: "foes",
            register: "register",
        };

        function get_pretty_state(i) {
            for (let p in pretty_states) {
                if (pretty_states[p].indexOf(i) > -1) {
                    return p;
                }
            }

            return null;
        }

        function get_pretty_sub_state(mode) {
            for (let pp in pretty_sub_states) {
                if (pretty_sub_states[pp] == mode) {
                    return pp;
                }
            }

            return null;
        }



        if (transition.$to().name.indexOf("legacy") > -1) {
            // We're in LEGACY

            // We pretty-ize both our params.
            newParam.page = get_pretty_state(params.i);
            newParam.subPage = get_pretty_sub_state(params.mode);

            if (!newParam.page) newParam.page = "general";
            if (!newParam.subPage) newParam.subPage = "";

            // We want a different page for register
            let target = newParam.page == "register" ? "phpbb.seo.register" : stateTarget;

            let r = Observable.of(transition.router.stateService.target(target, newParam))

            return r;
        }
        else if (!params.phpbbResolved || !params.phpbbResolved['@template']['S_IN_UCP']) {
            // We're in SEO mod
            // Validate i & m first
            if (params.i) newParam.page = get_pretty_state(params.i);
            if (params.mode) newParam.subPage = get_pretty_sub_state(params.mode);

            // We un-pretty-ize our params if need be
            if (params.page && !params.i) newParam.i = pretty_states[params.page][0];
            if (params.subPage && !params.mode) newParam.mode = pretty_sub_states[params.subPage];

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
        this._busy.next(true);

        let next: Observable<any> = Observable.of(new Object()).map(() => true);
        console.log("getcurrent", transition);
        try {
            switch (stateName) {
                case "phpbb.seo.viewforum.posting":
                case "phpbb.seo.viewtopic.posting":
                case "phpbb.seo.viewtopic.edit":
                    next = this.getPosting(transition, transition.params());
                    break;
                case "phpbb.seo.viewforum":
                    next = this.transform_viewforum(transition, transition.params().forumId);
                    break;
                case "phpbb.seo.viewtopic":
                    next = this.transform_viewtopic(transition, transition.params().topicId);
                    break;
                case "phpbb.seo.viewprofile":
                    next = this.transform_viewonline_viewprofile(transition, transition.params().userId);
                    break;
                case "phpbb.seo.ucp":
                case "phpbb.seo.ucp.pmConvo":
                    next = this.transform_ucp(transition);
                    break;
                case "phpbb.seo.register":
                    next = this.transform_ucp(transition);
                    break;
                //case "phpbb.seo.ucp.pm":
                //   return this.transform_ucp_pm(transition);
                //break;
            }
        }
        catch (e) {
            console.log("cached", e);
        }

        return next;
    }

    public unwrapTplData(component, tpl) {
        this._latestTemplateData.next(tpl)
        let keyArr = Object.keys(tpl);




        keyArr.forEach((key) => {
            component["tpl"][key] = UnicodeToUtf8Pipe.forEach(tpl[key]);
        });
    }

    public goToOld(url) {
        this.router.urlService.url(url, true);
    }

}
