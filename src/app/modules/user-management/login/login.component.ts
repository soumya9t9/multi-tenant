import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import {DynFormComponent} from 'src/app/modules/dyn-form/dyn-form/dyn-form.component';
import { FormControlModel } from '../../dyn-form/FormControlModel.model';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild(DynFormComponent) dynForm: DynFormComponent;
  userName!: string;
  password!: string;

  credentials = [
    {
      userName: "bbsr@esspl.com",
      password: "bbsr",
      "tenantId": "odisha-esspl-2",
    },
    {
      userName: "cuttack@esspl.com",
      password: "cuttack",
      "tenantId": "odisha-esspl-2"
    },
    {
      userName: "puri@esspl.com",
      password: "puri",
      "tenantId": "odisha-esspl-2"
    },
    {
      userName: "hyderabad@esspl.com",
      password: "hyderabad",
      "tenantId": "ts-esspl"
    },
    {
      userName: "amarabati@esspl.com",
      password: "amarabati",
      "tenantId": "ts-esspl"
    },
    {
      userName: "vizag@esspl.com",
      password: "vizag",
      "tenantId": "ap-esspl"
    },
    {
      userName: "srikakulam@esspl.com",
      password: "srikalulam",
      "tenantId": "ap-esspl"
    },
    {
      userName: "kolkata@esspl.com",
      password: "kolkata",
      "tenantId": "bengal-esspl"
    },
    {
      userName: "jamshedpur@esspl.com",
      password: "jamshedpur",
      "tenantId": "bihar-esspl"
    },
  ]

  tenantData : {"tenantId":string, "loginForm":FormControlModel[]}[];
  formConfig;
  extraForm;

  loginForm:FormGroup;
  constructor(public app: AppService, private fb:FormBuilder, private http:HttpClient) {
    var toastTrigger = document.getElementById('liveToastBtn')
    var toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
      toastTrigger.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
      })
    }

    this.http.get('assets/data/tenant.json').subscribe(res => {
      this.tenantData = res as any;
      this.extraForm = this.tenantData.find(e => e.tenantId === ("ts-esspl" ||this.app.tenantId));
      if(!this.extraForm) this.extraForm = this.tenantData[this.tenantData.length - 1]; 
      this.formConfig = this.extraForm?.loginForm;
      console.log(this.extraForm);
    })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "userName": ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]      
    })
  }

  login(event: Event) {

    event.preventDefault();
    event.stopPropagation();
    const fValue = this.loginForm.value;
    const user =  this.credentials.find(e => { return e.password === fValue.password && e.userName === fValue.userName });
    if (user && this.loginForm.valid && this.dynForm?.baseFG?.valid) {
      console.log("hurr re", fValue)
      this.app.login({ id: user.userName, ...user });
    }
  }

}
