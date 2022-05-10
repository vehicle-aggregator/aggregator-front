import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.less']
})
export class UserBlockComponent implements OnInit {

  @Input() email: string;
  isUserBlocked = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

}
