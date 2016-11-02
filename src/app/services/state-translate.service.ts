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

    constructor( @Inject(Http) private http: Http, private phpbbApi: PhpbbApiService) { }

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
                            "#": null
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

    public getCurrentStateData(component: any) {
        if (!component.transition.params()["phpbbResolved"]) {
            //this.getCurrentStateDataView(component.transition, true).subscribe();
        }
        else this.unwrapTplData(component, component.transition.params()["phpbbResolved"]["@template"]);
    }

    public getCurrentStateDataView(transition, force?: boolean) {
        let stateName = transition.$to().name;
        
        switch (stateName) {
            case "phpbb.seo.viewforum":
                return this.transform_viewforum(transition, transition.params().forumId, force);
            case "phpbb.seo.viewtopic":
                return this.transform_viewtopic(transition, transition.params().topicId, force);
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
