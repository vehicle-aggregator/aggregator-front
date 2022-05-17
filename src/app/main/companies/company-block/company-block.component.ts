import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-company-block',
  templateUrl: './company-block.component.html',
  styleUrls: ['./company-block.component.less']
})
export class CompanyBlockComponent implements OnInit {

  @Input() companyName: string;
  isCompanyBlocked = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }
}
