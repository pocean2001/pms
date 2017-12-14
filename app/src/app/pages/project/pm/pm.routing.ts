import {RouterModule, Routes} from "@angular/router";
import {PmComponent} from "./pm.component";
import {ModuleWithProviders} from "@angular/core";
import {PmDashboardComponent} from "./pm-dashboard.component/pm-dashboard.component";
import {PmActivityComponent} from "./pm-activity.component/pm-activity.component";
import {DemandManageComponent} from "./demand-manage/demand-manage.component";
import {DevSetManageComponent} from "./dev-set-manage/dev-set-manage.component";
import {TestManageComponent} from "./test-manage/test-manage.component";
import {TestSetManageComponent} from "./test-set-manage/test-set-manage.component";
import {BugManageComponent} from "./bug-manage/bug-manage.component";

export const routes: Routes = [
  {
    path: '',
    component: PmComponent,
    children: [
      {
        path: 'dashboard',
        component: PmDashboardComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: 'activity',
        component: PmActivityComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: 'demand',
        component: DemandManageComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: 'devset',
        component:DevSetManageComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: 'test',
        component:TestManageComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: 'testset',
        component:TestSetManageComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: 'bug',
        component:BugManageComponent,
        data:{isShowNav:true, isShowSidebar:true}
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
