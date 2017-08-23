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
    if(this.color && this.color.indexOf("#") == -1) this.color = "#"+this.color; 
  }

}
