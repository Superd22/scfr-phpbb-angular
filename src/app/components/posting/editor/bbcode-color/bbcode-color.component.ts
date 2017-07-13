import { IBBcode } from './../interfaces/bbcode.interface';
import { BbcodeButtonComponent } from './../bbcode-button/bbcode-button.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-bbcode-color',
  templateUrl: './bbcode-color.component.html',
  styleUrls: ['./bbcode-color.component.scss']
})
export class BbcodeColorComponent extends BbcodeButtonComponent implements OnInit {

  public color: any;

  public bbcode: IBBcode = {
    name: "color",
    code: ["[color=#fff]", "[/color]"]
  }

  ngOnInit() {
  }

  public applyBBcode() {
    this.bbcode.code[0] = "[color="+this.color+"]";
    super.applyBBcode(new Event(""));
  }
}
