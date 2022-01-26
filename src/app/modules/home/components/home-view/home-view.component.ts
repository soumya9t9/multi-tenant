import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { HomeService } from '../../home.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'multi-tenant-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  initialCounts = 4;
  addMoreCount = 4;
  viewMoreIteration = 0;

  dashboardList =[]
  m= [
    { 'image': './assets/images/dashboard/dashboard-1.png' }, 
    { 'image': './assets/images/dashboard/dashboard-2.png' }, 
    { 'image': './assets/images/dashboard/dashboard-3.png' }, 
    { 'image': './assets/images/dashboard/dashboard-4.png' },
    { 'image': './assets/images/dashboard/dashboard-1.png' }, 
    { 'image': './assets/images/dashboard/dashboard-2.png' }, 
    { 'image': './assets/images/dashboard/dashboard-3.png' },
    { 'image': './assets/images/dashboard/dashboard-1.png' }, 
    { 'image': './assets/images/dashboard/dashboard-2.png' }, 
    { 'image': './assets/images/dashboard/dashboard-3.png' }, 
    { 'image': './assets/images/dashboard/dashboard-4.png' },
    { 'image': './assets/images/dashboard/dashboard-1.png' }, 
    { 'image': './assets/images/dashboard/dashboard-2.png' }, 
    { 'image': './assets/images/dashboard/dashboard-3.png' },
    { 'image': './assets/images/dashboard/dashboard-2.png' },
  ];

  indicator = { "id": "5f1fef8b3f2d2202a0b07847", "indicatorName": "Test card", "indicatorId": 6262, "indicatorValue": "77", "indicatorGroupName": "Gr5", "timeperiod": null, "periodicity": null, "timeperiodId": null, "chartsAvailable": ["card"], "align": "col-md-3", "cardType": null, "unit": "number", "chartAlign": null, "chartData": null, "chartGroup": "Gr5", "extraInfo": null, "groupName": null }
  constructor(
    private homeService: HomeService,
    private appService: AppService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dashboardDetails()
  }

  dashboardDetails() {
    
  }

  viewMoreDashboards() {
    ++this.viewMoreIteration;
  }

  viewLessDashboards() {
    this.viewMoreIteration = 0;
  }

  showViewMore(initialCounts: number, iteration: number, addMoreCount: number) {
    const length = Array.isArray(this. dashboardList) ? this. dashboardList.length : 0;
    return length && length > ((initialCounts || 0) + ((iteration * addMoreCount) || 0))
  }

  reidrectTo(details: any) { }

}
