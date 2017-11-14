import { Component, OnInit } from "@angular/core";
import { WelcomeService } from "./welcome.service";
import { DialogCreateProjectComponent } from "./dialog-create-project/dialog-create-project.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { GlobalState } from '../../global.state';
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [WelcomeService]
})

export class WelcomeComponent implements OnInit {

  projects = { data: [], total: 0 };
  taskList = {data: [], total: 0};

  constructor(private _service: WelcomeService, public dialog: MatDialog, private router: Router,  private _state: GlobalState,
              private eventManager: JhiEventManager) {
  }

  ngOnInit() {
    this.getProjectList();
    this.getTaskList();
  }

  getProjectList() {
    this._service.getProjectList()
      .then(res => {
        this.projects.data = res.data;
        this.projects.total = res.total;
        // if (this.projects.length > 6) {
        //   this.projects = this.projects.slice(0, 7);
        // }
      });
  }

  createPro() {
    let dialogRef = this.dialog.open(DialogCreateProjectComponent, {
      width: '400px',
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

  getProject(projectId) {
    this.router.navigate(["/pages/project/dashboard"]);
    sessionStorage.setItem("projectId", projectId);
    this._state.isSelectProject = true;
    this.eventManager.broadcast({name: 'projectListModification', content: 'OK'});
  }
}

