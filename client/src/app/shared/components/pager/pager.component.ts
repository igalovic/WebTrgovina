import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Input() pageNumber: number;
  /* output property is a way a child component can emit an output to parent component*/
  @Output() pageChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onPagerChange(event: any){
    this.pageChanged.emit(event.page);
  }

}
