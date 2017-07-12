import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-bbcode-button',
  templateUrl: './bbcode-button.component.html',
  styleUrls: ['./bbcode-button.component.scss']
})
export class BbcodeButtonComponent implements OnInit {

  @Input()
  /** display name for this bbcode */
  public name: string;
  @Input()
  /** display explain for this bbcode */
  public explain: string;
  constructor() { }

  ngOnInit() {
  }

}
