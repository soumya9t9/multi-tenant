import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

declare var bootstrap:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: string;
  password!: string;

  credentials = [
    {
      userName: "bbsr@esspl.com",
      password: "bbsr",
      tenantId: "T01OD"
    },
    {
      userName: "cuttack@esspl.com",
      password: "cuttack",
      tenantId: "T01ODI"
    },
    {
      userName: "puri@esspl.com",
      password: "puri",
      tenantId: "T01ODI"
    },
    {
      userName: "hyderabad@esspl.com",
      password: "hyderabad",
      tenantId: "T02TS"
    },
    {
      userName: "amarabati@esspl.com",
      password: "amarabati",
      tenantId: "T02OTS"
    },
    {
      userName: "vizag@esspl.com",
      password: "vizag",
      tenantId: "T03AP"
    },
    {
      userName: "srikakulam@esspl.com",
      password: "srikalulam",
      tenantId: "T03AP"
    },
    {
      userName: "kolkata@esspl.com",
      password: "kolkata",
      tenantId: "T04WB"
    }
  ]

  constructor(public app: AppService) { 
    var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const user = this.credentials.find(e => { return e.password === this.password && this.userName === this.userName})
    if (user) this.app.login({ id: user.userName, ...user });
  }

}
