import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { PhpbbApiService } from './phpbb-api.service';
import { UcpPhpbbFieldComponent } from './../components/ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { Injectable, QueryList } from '@angular/core';
import { Subject } from "rxjs/Rx";

@Injectable()
/**
 * Helper server to handle everything related to PHPBB forms
 * Getting them/displaying them AND sending them.
 */
export class PhpbbFormHelperService {

  private _reset: Subject<boolean> = new Subject<boolean>();
  constructor(private api: PhpbbApiService) { }

  public get resetToBackUp() {
    return this._reset;
  }


  public resetAll() {
    this._reset.next(true);
  }

  public regenAllBackUp() {
    this._reset.next(false);
  }

  /**
   * For security reason, PHPBB will sometime return hidden fields to be added to a POST/GET
   * REQUEST for authenticity.
   * This function will parse a template, look for such hidden fields, and return an object containg them
   * @param tpl the template data to look in
   * @return object whose property are the hidden fields
   */
  public getHiddensFromTemplateAsObject(tpl: IPhpbbTemplate): any {
    if (!tpl.S_FORM_TOKEN && !tpl.S_HIDDEN_FIELDS) return {};

    /** this expects *ALL* the forms to have value directly following name. */
    let regex = /name=["']([^'"]*)["'] value=["']([^'"]*)["']/gmi;
    let matchs = regex.exec(tpl.S_FORM_TOKEN)

    let hiddens: any = {};

    while (matchs != null) {
      hiddens[matchs[1]] = matchs[2];
      matchs = regex.exec(tpl.S_FORM_TOKEN);
    }

    let matchs2 = regex.exec(tpl.S_HIDDEN_FIELDS);
    while (matchs2 != null) {
      hiddens[matchs2[1]] = matchs2[2];
      matchs2 = regex.exec(tpl.S_HIDDEN_FIELDS);
    }

    return hiddens;
  }

  /**
   * Get a list of option generated by PHPBB and returns them as an object to be used with ngFor
   * @param tpl_row the string to look for <option value=(.*)>(.*)</option>
   * @return an array of options
   */
  public getOptionsAsObject(tpl_row): { selected: any, options: { id: any, name: any }[] } {

    let opts = [];
    let selected = null;
    let regex = /<option value=['"]([^"']*)['"]([^>]*)>([^\/]*)<\/option>/g;

    let match = regex.exec(tpl_row);
    while (match != null) {
      // If this is selected, get its id
      if (selected == null || match[0].indexOf('selected=') > -1) selected = match[1];

      // Add to the options array
      opts.push({ id: match[1], name: match[3] });
      match = regex.exec(tpl_row);
    }

    return { selected: selected, options: opts };
  }

  public getRadiosAsObject(tpl_row): { selected: any, options: { id: any, name: any }[] } {
    let opts = [];
    let selected = null;
    let regex = /<input([^<]*)type=[ ]*['"]radio['"]([^<>]*)value=[ ]*['"]([^"']*)['"]([^>]*)>([^>]*)<\/label>/g;

    let match = regex.exec(tpl_row);
    while (match != null) {
      // If this is selected, get its id
      if (selected == null || match[0].indexOf('checked=') > -1) selected = match[3];

      // Add to the options array
      opts.push({ id: match[3], name: match[5] });
      match = regex.exec(tpl_row);
    }

    return { selected: selected, options: opts };
  }

  /**
   * Convenience method to parse all the options in the component templates
   * will call @see getOptionsAsObject() on all the options.
   * @param component the component to parse in
   * @param options the list of options we want
   */
  public handleAllOptions(component, options: string[]) {
    if (options.length < 1) return false;

    for (let i = 0; i < options.length; i++) {
      let opt = options[i];

      if (component[opt]) {
        component[opt] = this.getOptionsAsObject(component[opt]);
      }
    }
  }

  /**
   * Posts a form to phpbb back-end using the available UCPPHPBBFieldsComponents
   * @param page the page to post to
   * @param fields a list of fields that the user edited
   * @param tpl the current template to check for hidden phpbb form
   * @param extraGet additional parameters to send via get
   * @param extraPost additional paramters to send via post
   */
  public postToPhpbbWFields(page: string, fields: QueryList<UcpPhpbbFieldComponent>, tpl?: IPhpbbTemplate, extraGet?, extraPost?) {
    let post: any = {};

    fields.forEach((field) => {
      post[field.form_name] = field.model;
    });

    return this.postToPhpbbWFieldObject(page, post, tpl, extraGet, extraPost);
  }

  /**
   * Posts a form to phpbb back-end
   * @param page the page to post to
   * @param post the object to post 
   * @param tpl the current tpl to check for any hidden phpbb form fields
   * @param extraGet additional get paramters 
   * @param extraPost additional post parameters 
   */
  public postToPhpbbWFieldObject(page: string, post: FormData | any, tpl?: IPhpbbTemplate, extraGet?, extraPost?, raw?: boolean) {
    post = this.handleHiddenAndExtra(post, tpl, extraPost);

    return this.api.postPage(page, post, extraGet, raw);
  }

  private handleHiddenAndExtra(post: FormData | any, tpl?: IPhpbbTemplate, extraPost?) {
    let hidden = null;
    if (tpl) hidden = this.getHiddensFromTemplateAsObject(tpl);

    console.log(hidden);
    if (post instanceof FormData) {
      if (hidden) Object.keys(hidden).forEach((name) => post.append(name, hidden[name]));
      if (extraPost) Object.keys(extraPost).forEach((name) => post.append(name, extraPost[name]));
    }
    else {
      if (hidden) post = Object.assign(post, hidden);
      if (extraPost) post = Object.assign(post, extraPost);
    }

    return post;
  }

}
