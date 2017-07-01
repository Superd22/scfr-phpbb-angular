import { Pipe, PipeTransform } from '@angular/core';
import { UnreadResponse } from "../../../models/Search/UnreadReponse";

@Pipe({
  name: 'filteredForums'
})
export class FilteredForumsPipe implements PipeTransform {

  private filtered: FilteredForumsPipeResult;
  private map: Map<number, number>;

  /**
   * Will extend a list of forum that matched a search and compute all of their respective parents
   * so that we can show a full hiearchy.
   * @param forums our list of forums
   * @param filtered our filter object (will get modified during execution)
   * @param map the child/parent map
   * 
   * @return forums (untouched) 
   */
  transform(forums: UnreadResponse.JumpboxForum[], filtered: FilteredForumsPipeResult, map: Map<number, number>): any {
    
    if(!forums) return [];
    this.map = map;
    // this.fltered is reference to filtered.
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

    return forums;
  }

  /**
   * For a given child forum, add its parent to the list
   * @param child the id of the child forum
   */
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
