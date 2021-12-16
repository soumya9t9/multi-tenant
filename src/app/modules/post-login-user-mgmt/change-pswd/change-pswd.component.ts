import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-change-pswd',
  templateUrl: './change-pswd.component.html',
  styleUrls: ['./change-pswd.component.scss']
})
export class ChangePswdComponent implements OnInit {

  
  userName!: string;
  password!: string;
  tenantId!: string | null;
  constructor(public app:AppService) { }

  ngOnInit(): void {
    this.tenantId = this.app.tenantId;
    this.userName = this.app.clientAuth?.userName;
  }

  changePassword(event:Event) {
    return event;
  }
}
