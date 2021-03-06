import { Component, OnInit } from "@angular/core";
import { WelcomeService } from "./welcome.service";
import { DialogCreateProjectComponent } from "./dialog-create-project/dialog-create-project.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import {GlobalState} from "../../global.state";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [WelcomeService]
})

export class WelcomeComponent implements OnInit {
  personalNum: number;
  participatingNum: number;
  projects = { data: [], total: 0 };
  taskList = {data: [], total: 0};
  userRoleInProject: string = '';

  constructor(private _service: WelcomeService, public dialog: MatDialog, private router: Router, private _state:GlobalState) {
  }

  ngOnInit() {
    this.getProjectList();
    // this.getTaskList();
  }

  getFish(){
    console.log("#top", "fish");
  }

  getAccdent(){
    console.log("#top", "getAccdent");
  }


  getProjectList() {
    this._service.getProjectList()
      .then(res => {
        this.projects.data = res.data;
        this.projects.total = res.total;
        this.personalNum = res.data.filter(item => item.role == 'pm').length;
        this.participatingNum = res.data.length - this.personalNum;
        // if (this.projects.length > 6) {
        //   this.projects = this.projects.slice(0, 7);
        // }
      });
  }

  createPro() {
    let dialogRef = this.dialog.open(DialogCreateProjectComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      this.getProjectList();
    });
  }

  getTaskList() {
    this._service.getTaskList()
      .then(res => {
        this.taskList.data = res.data.map(task => {
          task["createAt"] = new Date(task["createAt"]).toLocaleDateString();
          return task;
        });
        this.taskList.total = res.total;
      });
  }

  getProject(project) {
    //todo 获取用户在项目中的权限
    let projectId = project.id;

    // this._service.getUserRoleInProject(projectId)
    //   .then(res => {
    //     // this.userRoleInProject = res.data
    //     this.userRoleInProject = 'pm';
    //     this.router.navigate([`/pages/${this.userRoleInProject}/dashboard`]);
    //     sessionStorage.setItem("userRoleInProject", this.userRoleInProject);
    //   });
    this.userRoleInProject = project.role;
    this.router.navigate([`/pages/release`], {queryParams:{userRole:this.userRoleInProject}});
    sessionStorage.setItem("userRoleInProject", project.role);
    sessionStorage.setItem("projectId", projectId);
    sessionStorage.setItem("projectName", project.name);
  }
}

