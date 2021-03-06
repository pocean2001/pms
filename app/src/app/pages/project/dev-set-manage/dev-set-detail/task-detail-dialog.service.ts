/**
 * Created by gaole on 2017/11/30.
 */
import { Injectable } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class PmTaskDetailService {
  membersInProjectUrl = this._global.baseURL + '/api/project';
  pmUrl: string = this._global.baseURL + '/api/dashboard';
  newActivityUrl = this._global.baseURL + '/api/activity';
  demandListUrl = this._global.baseURL + '/api/project/demand';

  constructor(private _global: GlobalState, private http: Http) {
  }

  findMemberInProject(id) {
    return this.http.get(`${this.membersInProjectUrl}/${id}/user`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  getProjectDemand(pId: number): Promise<any> {
    return this.http.get(`${this.pmUrl}/${pId}/demand`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  newTask(taskInfo) {
    return this.http.post(this.newActivityUrl, JSON.stringify(taskInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  updateTask(taskInfo) {
    return this.http.put(this.newActivityUrl, JSON.stringify(taskInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  reviewDetail(taskId) {
    return this.http.get(`${this.newActivityUrl}/${taskId}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }

  searchDemandList(title, id) {
    return this.http.get(`${this.demandListUrl}?title=${title}&projectId=${id}`)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError);
  }
}
