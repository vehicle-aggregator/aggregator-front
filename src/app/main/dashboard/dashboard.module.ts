import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {SharedModule} from "../../shared/shared.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { StatisticComponent } from './statistic/statistic.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticComponent
  ],
    imports: [
        SharedModule,
        DashboardRoutingModule,
        NgxChartsModule,
    ],
})
export class DashboardModule { }
