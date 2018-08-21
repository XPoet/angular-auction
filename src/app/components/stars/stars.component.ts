import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  private rating: number;

  private stars: Array<boolean>;

  @Input()
  private readonlyStar: boolean = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // this.stars = [];
    // for (let i = 1, len = 6; i < len; i++) {
    //   this.stars.push(i > this.rating);
    // }
  }

  ngOnChanges() {
    this.stars = [];
    for (let i = 1, len = 6; i < len; i++) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(index: number) {
    if (!this.readonlyStar) {
      this.rating = index + 1;
      // this.ngOnInit(); // 此时已不需要调用ngOnInit()，输入属性会自动触发ngOnChanges()
      this.ratingChange.emit(this.rating);
    }
  }

}
