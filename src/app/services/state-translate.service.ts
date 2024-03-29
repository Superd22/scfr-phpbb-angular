import { IPhpbbTemplate } from './../interfaces/phpbb/phpbb-tpl';
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

    public async legacyToSeo(trans) {
        const checkHashes = await this.ensureHashes(trans);
        if (checkHashes !== true) return Observable.of(checkHashes).toPromise();
        if (!trans.params()["phpbbResolved"]) {
            let page = trans.params().page.toLowerCase().replace('.php', '');
            switch (page) {
                case "index":
                    return trans.router.stateService.target("phpbb.seo.index");
                case "viewtopic":
                    return this.transform_viewtopic(trans).toPromise();
                case "viewforum":
                    return this.transform_viewforum(trans).toPromise();
                case "memberlist":
                    switch (trans.params().mode) {
                        case "viewprofile":
                            return this.transform_viewonline_viewprofile(trans).toPromise();
                    }
                case "ucp":
                    return this.transform_ucp(trans).toPromise();
                case "search":
                    return this.transform_search(trans).toPromise();
                case "mcp":
                    return this.transform_mcp(trans).toPromise();
            }
        }
    }

    /**
     * Reload the current state 
     * @param opts optional parameters 
     */
    public reload(opts?) {
        this.router.stateService.go(this.router.stateService.current, Object.assign({}, this.router.stateService.params, { phpbbResolved: false }, opts))
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

        if (!resolved || !params) return false;

        for (let i = 0; i < toCheck.length && okay; i++) {
            let pResolved = toCheck[i][0];
            let pParams = toCheck[i][1];

            if (typeof params[pParams] != "undefined" && params[pParams] != null && resolved[pResolved] != params[pParams]) okay = false;
        }
        return okay;
    }

    private transform_search(trans: Transition): Observable<any> {
        let params = trans.params();
        let newParams = Object.assign({}, params);

        const prettyMod = {
            'egosearch': "auteur",
            'unreadposts': 'messages-non-lu',
            'newposts': 'nouveaux-messages',
            'unanswered': 'sans-reponse',
            'active_topics': 'topics-actifs',
        };


        // If we have a search_id but no pretty, translate to pretty
        if (params['search_id'] && !params['prettyMod']) newParams['prettyMod'] = prettyMod[params['search_id']];
        // If we have a pretty, make sure search id matches.
        if (params['prettyMod']) {
            Object.keys(prettyMod).forEach((baseMod) => {
                if (prettyMod[baseMod] == params['prettyMod']) newParams['search_id'] = baseMod;
            });
        }

        // If we have changed any params, change state
        if (!(params['search_id'] === newParams['search_id'] && params['prettyMod'] === newParams['prettyMod']))
            return Observable.of(trans.router.stateService.target("phpbb.seo.search", newParams));

        // If we haven't fetched data do it
        if (
            !params['phpbbResolved']
            || params['phpbbResolved']['@tplName'] !== "search_results"
            || params.start && (params.start != params['phpbbResolved']['@template']['PER_PAGE'] * (params['phpbbResolved']['@template']['CURRENT_PAGE'] - 1))) {
            return this.phpbbApi.getSearch(newParams['search_id'], Object.assign(newParams, { phpbbResolved: undefined })).map((data) => {
                newParams['phpbbResolved'] = data;

                this.setOnceResolved(true);
                return trans.router.stateService.target("phpbb.seo.search", newParams);
            });
        }

        // We have all we need
        this.setOnceResolved(false);
        return Observable.of(true);
    }

    /**
     * Handles the transformation and proper fetching of a viewtopic event
     * @param trans the transition we're coming from
     * @param topicId the topic we want to fetch
     */
    private transform_viewtopic(trans: Transition, topicId?: number): Observable<any> {
        let params = trans.params();
        let trans_param = Object.assign({}, params);
        let trans_page = "phpbb.seo.index";


        // If we want unread, we do **not** specify anything else.
        if (trans_param['unread']) {
            trans_param['p'] = null;
            trans_param['pageNumber'] = null;
        }

        if (typeof topicId === "undefined") topicId = trans.params()["t"] || trans_param.topicId;
        /** @todo allow n-sized pages */
        let start = params["pageNumber"] ? (params["pageNumber"] - 1) * 15 : null;


        // We already fetched something
        if (params['phpbbResolved']) {
            // Check it's still what we want 
            if (this.checkParamsAgainstResolved(params['phpbbResolved']['@template'], trans_param, [
                ["FORUM_ID", "forumId"],
                ["TOPIC_ID", "topicId"],
                ["CURRENT_PAGE", "pageNumber"]
            ])) {
                // That's all we ever wanted
                return Observable.of(true);
            }
        }

        // We need to fetch a topic
        return this.phpbbApi.getTopicById(topicId, start, trans_param['p'], trans_param["unread"]).map(
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

    private transform_viewforum(trans, forumId?: number, force?: boolean) {
        var params = trans.params();
        var trans_param = Object.assign({}, params);
        var trans_page = "phpbb.seo.index";

        if (typeof forumId === "undefined") forumId = trans.params()["f"] || trans_param.forumId;
        /** @todo allow n-sized pages */
        let start = params["pageNumber"] ? (params["pageNumber"] - 1) * 20 : null;

        // If we're not authorized, go to unauthorize page.
        const nonAuthorized = this.checkInformationMessage(trans, params.phpbbResolved);
        if (nonAuthorized) return Observable.of(nonAuthorized);

        // If we're missing anything, fetch.
        if (!this.checkParamsAgainstResolved(params['phpbbResolved']['@template'], params, [
            ["CURRENT_PAGE", "pageNumber"],
            ["FORUM_ID", "forumId"]
        ]) || !(params['phpbbResolved']['@tplName'] == "viewforum_body") || !(new SeoUrlPipe().transform(params['phpbbResolved']['@template']["FORUM_NAME"]) == params['forumSlug']))
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

                        // Let go to the final state
                        return trans.router.stateService.target("phpbb.seo.viewforum", trans_param);
                    }
                    else {
                        const authorized = this.checkInformationMessage(trans, params.phpbbResolved);
                        if (!authorized) return Observable.of(authorized);
                        else return false;
                    }
                });
        // We have all we ever wanted.
        else return Observable.of(true);
    }

    /**
     * If we've already resolved the state like we wanted
     * @return boolean
     */
    private isOnceResolved(): boolean {
        return this.onceResolved;
    }

    /**
     * Toggle the state of our resolved flag
     * @param val the new state of onceResolved
     */
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

    /**
     * This is called programatically if we need to translate from an old single pm to a full
     * convo
     * 
     * @param trans the current transition
     */
    private transform_ucp_pm(trans: Transition) {
        // No matter what we're gonna redirect to the pm page.
        let newParams = Object.assign({}, trans.params(), { i: "ucp_pm", mode: "", page: "mp", subPage: null, });

        // We need to fetch what convo we want
        if (!newParams['pm_id']) {
            if (!newParams['p']) throw "NO PM SPECIFIED";

            return this.phpbbApi.getApi("PM/Convos", { mode: "convo_of_mp", pmId: newParams['p'] }).map(
                (data: any) => {
                    let convo: { convo_id: number, convo_title: string } = data;

                    newParams['pm_id'] = convo.convo_id;
                    newParams['pmSlug'] = new SeoUrlPipe().transform(convo.convo_title);

                    return trans.router.stateService.target("phpbb.seo.ucp", newParams);
                }
            )
        }

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
                    const newParam = Object.assign({}, params, { phpbbResolved: this.mergeRetainResolved(params.phpbbResolved, data) });

                    this.setOnceResolved(true);

                    return trans.router.stateService.target(trans.$to().name, newParam, { notify: false, reload: false });
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
        if (data && data['@template'] && data['@template'].MESSAGE_TEXT && data['@template'].MESSAGE_TITLE) {
            return trans.router.stateService.target("phpbb.seo.information", { phpbbResolved: data });
        }
        return false;
    }

    /**
     * Merge two object together
     * @param retain the object to merge into
     * @param resolved the new data to overwrite ontop of retain
     */
    private mergeRetainResolved(retain, resolved) {
        if (retain == false) return resolved;

        // make sure we can write on retain
        let newRetain = Object.assign({}, retain);

        for (var pp in newRetain) {
            // If we're an object, merge
            if (typeof newRetain[pp] === typeof {})
                newRetain[pp] = Object.assign(newRetain[pp], resolved[pp]);
            // Otherwise, overwrite.
            else newRetain[pp] = resolved[pp];
        }

        return newRetain;
    }

    /**
     * Gives the current template to a component
     * 
     * @param component the comopnent to populate with current tpl
     * @param doNotNotify if we want to not notify a tpl change (useful for sub-components)
     * @param tpl optional tpl to overwrite current one
     */
    public getCurrentStateData(component: PhpbbComponent, doNotNotify?: boolean, tpl?: IPhpbbTemplate, autoUpdate?: boolean) {
        tpl = tpl || this.router.stateService.params["phpbbResolved"]["@template"];
        if (tpl) {
            // only notify if we want to
            if (doNotNotify !== true) this._latestTemplateData.next(tpl);

            // Update the components
            this.updateTplOfComponent(component, tpl);

            // Subscribe the component if needed
            /*if (autoUpdate) this._latestTemplateData.subscribe((tpl) => {
                this.updateTplOfComponent(component, tpl);
            });*/
        }
    }

    /**
     * Gives all the necesserary thing from a tpl to a component
     * @param component 
     * @param tpl 
     */
    private updateTplOfComponent(component: PhpbbComponent, tpl: IPhpbbTemplate) {
        this.unwrapTplData(component, tpl);
        component.phpbbTemplateName = this.router.stateService.params["phpbbResolved"]["@tplName"];
    }

    /**
     * 
     */
    public updateStateData(component: PhpbbComponent, resolvedData: PhpbbTemplateResponse.DefaultResponse) {
        let tpl = resolvedData['@template'];
        if (tpl) {
            this._latestTemplateData.next(tpl)
            this.unwrapTplData(component, tpl);
        }
    }

    public tranform_index(transition: Transition): Observable<any> {
        let params = Object.assign({}, transition.params());

        if (params.phpbbResolved && params.phpbbResolved['@template']['SCRIPT_NAME'] == 'index') return Observable.of(true);
        return this.phpbbApi.getPage("index.php").map((data) => {
            return transition.router.stateService.target("phpbb.seo.index", Object.assign(params, { phpbbResolved: data }));
        });

    }
    private mergeParamsWithPhpbbData(params: any, data: any): any {
        return Object.assign({}, params, { phpbbResolved: data });
    }


    private sanitizeParamsForPhpbb(params) {
        let p = Object.assign({}, params);
        p["phpbbResolved"] = undefined;

        return p;
    }

    /**
     * Handles the transformation for mcp pages
     * @param transition the transition object
     */
    private transform_mcp(transition: Transition): Observable<any> {
        const params = transition.params();
        const oldState = transition.redirectedFrom() || transition.$from();
        const oldParams = transition.redirectedFrom() ? transition.redirectedFrom().params() : transition.$from().params;


        let call = this.phpbbApi.postPage("mcp.php", {}, this.sanitizeParamsForPhpbb(params)).map((data) => {
            const newParams = this.mergeParamsWithPhpbbData(params, data);
            return transition.router.stateService.target("phpbb.seo.mcp", newParams);
        });

        if (!params.phpbbResolved) return call;
        if (params.i !== oldParams.i || params.mode !== oldParams.mode || params.start !== oldParams.start) return call;

        return Observable.of(true);
    }



    /**
     * Handle the transformation of ucp pages
     * @param transition the transition object to get into an ucp state
     */
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
            liste: "notification_list",
            compose: "compose",
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

            if (params.i == "pm" && params.mode == "view" && params.p) return this.transform_ucp_pm(transition);

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

            if (newParam.page == "mp" && params.convo) stateTarget = "phpbb.seo.ucp.pmConvo";

            // Fetch the actual data
            return this.phpbbApi.getPage("ucp.php", { i: newParam.i, mode: newParam.mode, start: newParam.start }).map(
                (data) => {
                    newParam.phpbbResolved = data;
                    if (this.checkAuthLogin(transition, data['@template'])) return this.checkAuthLogin(transition, data['@template']);
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
    public async getCurrentStateDataView(transition: Transition, force?: boolean): Promise<any> {
        const checkHashes = await this.ensureHashes(transition);
        if (checkHashes !== true) return checkHashes;

        let stateName = transition.$to().name;
        this._busy.next(true);

        let next: Observable<any> = Observable.of(new Object()).map(() => true);

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
                case "phpbb.seo.index":
                    next = this.tranform_index(transition);
                    break;
                case "phpbb.seo.search":
                    next = this.transform_search(transition);
                    break;
                case "phpbb.seo.mcp":
                    next = this.transform_mcp(transition);
                    break;
                //case "phpbb.seo.ucp.pm":
                //   return this.transform_ucp_pm(transition);
                //break;
            }
        }
        catch (e) {
            console.log("cached", e);
        }

        return next.toPromise();
    }

    /**
     * Main method to inject into any component the current template data
     * @param component the component instance
     * @param tpl the tpl to inject
     */
    public unwrapTplData(component: PhpbbComponent, tpl: IPhpbbTemplate) {
        this.newTeplateData = tpl;
        let keyArr = Object.keys(tpl);

        keyArr.forEach((key) => {
            component["tpl"][key] = UnicodeToUtf8Pipe.forEach(tpl[key]);
        });
    }

    /**
     * Helper method to go to a given url
     * @param url the url to go to
     */
    public goToOld(url) {
        this.router.urlService.url(url, true);
    }

    /**
     * Set the new current template data for the whole app
     * @param tpl the new template
     */
    public set newTeplateData(tpl: IPhpbbTemplate) {
        this._latestTemplateData.next(tpl);
    }

    /**
     * Assign new blocks to the current tpl for the whole app
     * @param params the parameters to append/replace in the tpl.
     */
    public assignNewTemplateData(params: { [newParam: string]: any }) {
        let current: IPhpbbTemplate = null;
        this._latestTemplateData.asObservable().first().subscribe((data) => current = data).unsubscribe();

        this.newTeplateData = Object.assign(current, params);
    }

    public async ensureHashes(trans: Transition) {
        const hash: string = trans.params()["#"];
        if (!hash) return true;
        const sepIndex = hash.indexOf("?");
        if (sepIndex == -1) return true;
        if (hash) {
            let urlParams = { "#": hash.slice(0, sepIndex) };
            let e,
                a = /\+/g,  // Regex for replacing addition symbol with a space
                r = /([^&=]+)=?([^&]*)/g,
                d = function (s) {
                    return decodeURIComponent(s.replace(a, " "));
                }

            while (e = r.exec(hash.slice(sepIndex + 1)))
                urlParams[d(e[1])] = d(e[2]);

            return trans.router.stateService.target(<string>trans.targetState().name(), Object.assign({}, trans.params(), urlParams));
        }

        return true;
    }

}