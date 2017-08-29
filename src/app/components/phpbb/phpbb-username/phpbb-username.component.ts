import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-phpbb-username',
  templateUrl: './phpbb-username.component.html',
  styleUrls: ['./phpbb-username.component.scss']
})
export class PhpbbUsernameComponent implements OnInit {
  @Input()
  public name: string;

  @Input()
  public color: string;

  @Input()
  public id: number;

  @Input()
  public html: string;

  constructor() { }

  ngOnInit() {
    if (this.html) {
      this.parseHtml();
    }

    if (this.color && this.color.indexOf("#") == -1) this.color = "#" + this.color;
  }

  public parseHtml() {
    let regex = /<a href=".*memberlist\.php.*u=([0-9]*).*>(.*)?<\/a>/;

    let m = regex.exec(this.html);

    if (m) {
      if (!this.id) this.id = Number(m[1]);
      if (!this.name) this.name = m[2];
      this.parseColor();
    }

  }

  public parseColor() {
    let regex = /<a.*style=["']color:[ ]*#(.*)["']/;

    let m = regex.exec(this.html);

    if (m) {
      if (!this.color) this.color = m[1];
    }

  }

}
