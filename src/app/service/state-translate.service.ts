import { PhpbbTemplateResponse } from '../model/phpbb-template-response';
import {Injectable, Inject} from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";



@Injectable()
export class StateTranslate {
  cache = null;

  constructor(@Inject(Http) private http: Http) {
    console.log('StateTranslate constructor');
  }

  public legacyToSeo(trans: Transition) {
    var params = trans.params();
    var page = params.page.toLowerCase().replace('.' '');
    
    // replace php and not .php for dev purposes.
    page.replace('php', '');

    switch(page) {
      case "index":
        console.log("index");
      break;
    }

    console.log(params.page);

    return {};
  }

}
