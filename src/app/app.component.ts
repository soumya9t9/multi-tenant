import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { URLService } from './tenant/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multi-tenant';

  constructor(private route: ActivatedRoute, urlS:URLService, public app:AppService) {
    console.log("R", route);
    // console.log("S", snapShot);
    console.log("U", this,urlS.getDomainName());
  }
}
