import { FilteredForumsPipeResult } from './filtered-forums.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { UnreadResponse } from "../../../models/Search/UnreadReponse";

@Pipe({
  name: 'reinsertForums'
})
export class ReinsertForumsPipe implements PipeTransform {

  /**
   * 
   * @param forums forum we wanted to display based on previous pipes
   * @param args the filtered results contaning the xtended we actually wanna display
   * @param reverseMap a reverse map for child => parent
   * @param allForums the list of all the forums
   * @param currentLevel the level we want to display (0 for main)
   * @param research optional string paramater for non dirty checking.
   */
  transform(forums: UnreadResponse.JumpboxForum[], args: FilteredForumsPipeResult, reverseMap: Map<number, number>, allForums: UnreadResponse.JumpboxForum[], currentLevel: number, research?: string): UnreadResponse.JumpboxForum[] {

    if (!forums) return [];

    // Keep only the forums of the adequate level
    forums = forums.filter((forum) =>
      reverseMap.get(Number(forum.FORUM_ID)) == currentLevel
    );

    console.log("f", forums);

    args.extended.forEach((extendedId) => {
      // We don't have this forum in the original, and thus in the forums
      if (args.original.indexOf(extendedId) == -1) {
        // Our parent is where we wanted
        if (reverseMap.get(Number(extendedId)) == currentLevel) {
          let forum = allForums.find((tForum) => Number(tForum.FORUM_ID) == extendedId);
          // we had this parent to the list to display
          forums.push(forum);
        }
      }
    });



    return forums;
  }

}
