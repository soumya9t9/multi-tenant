import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public app: AppService) { }

  isLoggedIn = false; 
  ngOnInit(): void { 
    this.isLoggedIn = this.app.isLoggedIn();
  }

  logout() {
    this.app.logout();
  }
}
