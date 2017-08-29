import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-phpbb-group',
  templateUrl: './phpbb-group.component.html',
  styleUrls: ['./phpbb-group.component.scss']
})
export class PhpbbGroupComponent implements OnInit {
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
    if(this.html) {
      this.parseHtml();
    }


    if(this.color && this.color.indexOf("#") == -1) this.color = "#"+this.color; 
  }

  public parseHtml() {
    let regex = /<a.*color:#(.*)["'].*href=".*memberlist\.php.*g=([0-9]*).*>(.*)?<\/a>/;

    let m = regex.exec(this.html);
  
    if(m) {
      if(!this.color) this.color = m[1];
      if(!this.id) this.id = Number(m[2]);
      if(!this.name) this.name = m[3];
    }
    
  }
  
}
