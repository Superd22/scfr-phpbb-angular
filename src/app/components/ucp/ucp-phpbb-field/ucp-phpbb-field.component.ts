import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'scfr-forum-ucp-phpbb-field',
  templateUrl: './ucp-phpbb-field.component.html',
  styleUrls: ['./ucp-phpbb-field.component.scss']
})
/**
 * Helper component to represent a field sent by PHPBB and that we wanna display/handle via angular.
 */
export class UcpPhpbbFieldComponent implements OnInit {
  _backup: any;
  @Input("fullPHPBB")
  private _fullPhpbb;

  @Input("required")
  public required: boolean = false;

  @Input("model")
  private _model;
  @Output()
  private modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output("change")
  private change: EventEmitter<any> = new EventEmitter<any>();
  @Input("displayName")
  public display_name;

  @Input("name")
  private _form_name;
  @Output("name")
  private _form_name_change: EventEmitter<string> = new EventEmitter<string>();

  @Input("explain")
  private explain;

  @Input("error")
  private error;

  @Input()
  public type: "text" | "url" | "textarea" | "select" | "radio" | "editor" | "checkbox" | "toggle" | string = null;

  @Input()
  public options;

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

  private genBackUp() {
    if (this.isNotAReference(this._model)) this._backup = this._model;
    else this._backup = Object.assign({}, this._model);
  }

  public resetBackUp() {
    if (this.isNotAReference(this._model)) this.model = this._backup;
    else this.model = Object.assign({}, this._backup);
  }

  private isNotAReference(val) {
    return (Object(val) !== val);
  }

  public get model(): any {
    if(this.toggleAsInt && this.type == "toggle") return Number(this._model);
    return this._model;
  }

  public set model(model: any) {
    this._model = model;
    this.modelChange.emit(model);
    this.change.emit(model);
  }

  public get form_name(): string {
    return this._form_name;
  }

  public set form_name(st: string) {
    this._form_name = st;
    this._form_name_change.emit(st);
  }

  private handleFullPhpbb() {
    if (this._fullPhpbb) {
      this.extrapolateNameOfInput(this._fullPhpbb);
      this.type = this.extrapolateTypeOfInput(this._fullPhpbb);
      this.extrapolateValuesOfInput(this._fullPhpbb);
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
