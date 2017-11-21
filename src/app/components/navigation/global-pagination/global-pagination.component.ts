import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'scfr-forum-global-pagination',
  templateUrl: './global-pagination.component.html',
  styleUrls: ['./global-pagination.component.scss']
})
export class GlobalPaginationComponent implements OnInit {

  @Input()
  /** number of total pages */
  public totalPage: number;

  @Input("page")
  /** current page being displayed */
  private _page: number;
  @Output()
  private pageChange: EventEmitter<number> = new EventEmitter<number>();

  public pageArray: number[];

  constructor() { }

  /**
   * the max page you can go to
   */
  public get maxPage(): number {
    return this.totalPage > 0 ? this.totalPage : 1;
  }

  public get page(): number {
    return this._page;
  }

  public set page(n: number) {
    this._page = n;
    this.pageChange.emit(n);
  }

  ngOnInit() {
    this.totalPage = Number(this.totalPage) || 1;
    this._page = Number(this._page) || 1;

    this.pageArray = Array(this.maxPage).fill(0).map((x, i) => i+1);
  }

  public move(n: number) {
    if (this.page + n > 0 && this.page + n <= this.totalPage) this.page = this.page + n;
  }


}
