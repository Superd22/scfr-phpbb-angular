import { Pipe, PipeTransform } from '@angular/core';
import { UnreadResponse } from "../../../models/Search/UnreadReponse";

@Pipe({
  name: 'lookForForum'
})
export class LookForForumPipe implements PipeTransform {

  transform(forums: UnreadResponse.JumpboxForum[], search: string): UnreadResponse.JumpboxForum[] {
    if (search && forums) {
      return forums.filter((testForum) =>
        testForum.FORUM_NAME.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1);
    }
    else return forums;
  }

}
