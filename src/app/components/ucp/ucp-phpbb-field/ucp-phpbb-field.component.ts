import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'scfr-forum-ucp-phpbb-field',
  templateUrl: './ucp-phpbb-field.component.html',
  styleUrls: ['./ucp-phpbb-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
/**
 * Helper component to represent a field sent by PHPBB and that we wanna display/handle via angular.
 */
export class UcpPhpbbFieldComponent implements OnInit {
  _backup: any;
  /** full HTML element to try and compute from */
  @Input("fullPHPBB")
  private _fullPhpbb;

  /** if this field is required */
  @Input("required")
  public required: boolean = false;

  /** model to bind to*/
  @Input("model")
  private _model;
  @Output()
  private modelChange: EventEmitter<any> = new EventEmitter<any>();

  /** event emitter on change */
  @Output("change")
  private change: EventEmitter<any> = new EventEmitter<any>();

  /** display name (title) of this field */
  @Input("displayName")
  public display_name;
  /** html form name of this field */
  @Input("name")
  private _form_name;
  @Output("name")
  private _form_name_change: EventEmitter<string> = new EventEmitter<string>();

  @Input("value")
  public value;

  /** description of this field, either static or tooltip on some types */
  @Input("explain")
  private explain;

  /** error to display under this field */
  @Input("error")
  private error;

  /** type of field*/
  @Input()
  public type: "text" | "url" | "textarea" | "select" | "radio" | "editor" | "checkbox" | "toggle" | string = null;

  /** options for types that require them */
  @Input()
  public options: IPhpbbFieldOption[];

  /** html options to be compute directly */
  @Input("htmlOptions")
  private _htmlOptions: string;

  /** if we can select multiple options */
  @Input()
  public multiple: boolean = false;

  /** if we want the toggle to generate number instead of boolean */
  @Input()
  public toggleAsInt = true;

  private _reset: Subscription;

  constructor(private formHelper: PhpbbFormHelperService) { }

  ngOnInit() {
    this.handleFullPhpbb();
    this.genBackUp();
    this._reset = this.formHelper.resetToBackUp.subscribe(
      (reset) => {
        if (reset === true) this.resetBackUp();
        if (reset === false) this.genBackUp();
      }
    );
  }

  ngOnDestroy() {
    this._reset.unsubscribe();
  }

  /**
   * Generate a back-up of the default value
   */
  private genBackUp() {
    if (this.isNotAReference(this._model)) this._backup = this._model;
    else this._backup = Object.assign({}, this._model);
  }

  /**
   * Resets the current value to the previous backup
   */
  public resetBackUp() {
    if (this.isNotAReference(this._model)) this.model = this._backup;
    else this.model = Object.assign({}, this._backup);
  }

  /**
   * Check if val is sent by reference or value (ie if it's an object or a primitive)
   * @param val thing to check
   * @return boolean true for value, false for reference
   */
  private isNotAReference(val: any): boolean {
    return (Object(val) !== val);
  }

  /**
   * Model (= value) for this field
   */
  public get model(): any {
    if (this.toggleAsInt && this.type == "toggle") return Number(this._model);
    return this._model;
  }

  public set model(model: any) {
    this._model = model;
    this.modelChange.emit(model);
    this.change.emit(model);
  }

  /**
   * Display name (=title) of the field
   */
  public get form_name(): string {
    return this._form_name;
  }

  public set form_name(st: string) {
    this._form_name = st;
    this._form_name_change.emit(st);
  }

  /**
   * Try and compute a full HTML element from scratch
   */
  private handleFullPhpbb() {
    if (this._fullPhpbb) {
      this.extrapolateNameOfInput(this._fullPhpbb);
      this.type = this.extrapolateTypeOfInput(this._fullPhpbb);
      this.extrapolateValuesOfInput(this._fullPhpbb);
    }

    if (this._htmlOptions) {
      const h = this.formHelper.getOptionsAsObject(this._htmlOptions);

      this.options = h.options;
      this.model = h.selected;
    }
  }

  private extrapolateNameOfInput(input_html: string) {
    let regex = /name=["'](.*?)['"]/;

    let match = regex.exec(input_html);
    if (match == null) throw "NO NAME FOR EXTRAPOLATION";

    this.form_name = match[1];
  }

  private extrapolateTypeOfInput(input_html: string) {
    if (input_html.indexOf("<textarea") > -1) return "textarea";
    if (input_html.indexOf("type=\"radio\"") > -1) return "radio";
    if (input_html.indexOf("<select") > -1) return "select";
    if (input_html.indexOf("<select") > -1) return "select";

    let regex = /type=["'](text|url|hidden|file|number|checkbox)["']/;
    let match = regex.exec(input_html);
    if (match) return match[1];
    else throw "COULDN'T EXTRAPOLATE TYPE OF INPUT";
  }

  private extrapolateValuesOfInput(input_html: string) {
    switch (this.type) {
      case "url":
      case "text": this.extrapolateValueOfTextInput(input_html); break;
      case "textarea": this.extrapolateValueOfTextArea(input_html); break;
      case "select": this.extrapolateValueOfSelect(input_html); break;
      case "radio": this.extrapolateValueOfRadio(input_html); break;
    }
  }

  private extrapolateValueOfTextInput(input_html: string) {
    let regex = /value=['"](.*?)['"]/;

    let match = regex.exec(input_html);
    if (match == null) this.model = "";
    else this.model = match[1];
  }

  private extrapolateValueOfSelect(input_html: string) {
    let h = this.formHelper.getOptionsAsObject(input_html);

    this.options = h.options;
    this.model = h.selected;
  }

  private extrapolateValueOfTextArea(input_html: string) {
    let regex = /<textarea(.*)>(.*?)<\/textarea>/;

    let match = regex.exec(input_html);
    if (match == null) this.model = "";
    else this.model = match[2];
  }

  private extrapolateValueOfRadio(input_html: string) {
    let h = this.formHelper.getRadiosAsObject(input_html);

    this.options = h.options;
    this.model = h.selected;
  }

  public setFile(file) {
    this.model = file[0];
  }


}

/**
 * Option for a UCPPhpbbField
 */
export interface IPhpbbFieldOption {
  /** the HTML value for this option  */
  id: any,
  /** the display name for this option */
  name: any
}