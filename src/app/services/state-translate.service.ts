import { PhpbbApiService } from './phpbb-api.service';
import { PhpbbTemplateResponse } from '../model/phpbb-template-response';
import { SeoUrlPipe } from '../pipe/seo-url.pipe';
import { Injectable, Inject } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";


@Injectable()
export class StateTranslate {
  cache = null;

  constructor(@Inject(Http) private http: Http, private phpbbApi: PhpbbApiService) { }

  public legacyToSeo(trans) {
    if(!trans.params()["phpbbResolved"]) {
      let page = trans.params().page.toLowerCase().replace('.php', '');
      switch(page) {
        case "index":
          return trans.router.stateService.target("phpbb.seo.index");
        case "viewtopic":
          return this.transform_viewtopic(trans);
        case "viewforum":
          return this.transform_viewforum(trans);
      }
    }
  }

  private transform_viewtopic(trans) {
    var params = trans.params();
    var trans_param = {};
    var trans_page = "phpbb.seo.index";

    if(params.t > 0) {
      this.phpbbApi.getTopicById(params.t).subscribe(
        data => {
          let template = data["@template"];

          // We're authorized and topic exists.
          if(template["TOPIC_ID"]) {
            trans_param = {
              phpbbResolved: data,
              forumId: template["FORUM_ID"],
              forumSlug: new SeoUrlPipe().transform(template["FORUM_NAME"]),
              topicSlug: new SeoUrlPipe().transform(template['TOPIC_TITLE']),
              topicId: template["TOPIC_ID"],
            };
            
            var trans_page = "phpbb.seo.viewtopic";
          }

          
          trans.router.stateService.go(trans_page, trans_param);
        },
        err => console.log(err)
      );
    }
  }

  private transform_viewforum(trans) {
    var params = trans.params();
    var trans_param = {};
    var trans_page = "phpbb.seo.index";

    if(params.f > 0) {
      this.phpbbApi.getForumById(params.f).subscribe(
          data => {
            let template = data["@template"];

            // We're authorized and forum exists.
            if(template["FORUM_ID"] && template["FORUM_NAME"]) {
              trans_param = {
                phpbbResolved: data,
                forumId: template["FORUM_ID"],
                forumSlug: new SeoUrlPipe().transform(template["FORUM_NAME"]),
              };

              trans_page = "phpbb.seo.viewforum";
              trans.router.stateService.go(trans_page, trans_param);
            }
            else {
              // To do decide redirect to auth or index.
            }

            
          },
          err => console.log(err)
      );
    
    }

  }

  public getCurrentStateData(component:any) {    
    if(!component.transition.params()["phpbbResolved"]) {
      console.log(component);
    }
  }

}
