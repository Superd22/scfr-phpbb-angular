import { Pipe, PipeTransform } from '@angular/core';
import { UnreadResponse } from "../../../models/Search/UnreadReponse";

@Pipe({
  name: 'filteredForums'
})
export class FilteredForumsPipe implements PipeTransform {

  private filtered: FilteredForumsPipeResult;
  private map: Map<number, number>;

  transform(forums: UnreadResponse.JumpboxForum[], filtered: FilteredForumsPipeResult, map: Map<number, number>): any {
    
    if(!forums) return [];

    console.log("in filtered", forums.length);

    this.map = map;
    this.filtered = filtered;

    this.filtered.original = [];


    // Add everything the latest filter got for us
    forums.forEach((forum) => {
      if (forum && forum.FORUM_ID && forum.FORUM_ID != null) this.filtered.original.push(Number(forum.FORUM_ID))
    });
    this.filtered.extended = Object.assign([], this.filtered.original);

    // Extend those to their parents
    this.filtered.original.forEach((forumId) => {
      this.addDaddy(forumId);
    });

    console.log("DONE filtered", forums.length);
    return forums;
  }

  public addDaddy(child: number) {
    if (child == 0) return;

    let parent = this.map.get(Number(child));
    if (this.filtered.extended.indexOf(parent) == -1) {
      this.filtered.extended.push(parent);
      this.addDaddy(parent);
    }
  }
  
}

export class FilteredForumsPipeResult {
  original: number[];
  extended: number[];
}
