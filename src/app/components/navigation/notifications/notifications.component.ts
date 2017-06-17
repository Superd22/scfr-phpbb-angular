import { PhpbbLanguageComponent } from './../../../language-module/components/phpbb-language/phpbb-language.component';
import { NotificationsService } from './../../../services/notifications.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'scfr-forum-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  /** required for styling of menu */
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent extends PhpbbLanguageComponent implements OnInit {

  constructor(public notifs: NotificationsService) {
    super();
  }

  ngOnInit() {
  }


  /**
   * Call to mark all the notification as read both client and server side
   */
  public markAllRead(event: Event) {
    this.notifs.markAllRead();
    event.stopPropagation();
  }

}
