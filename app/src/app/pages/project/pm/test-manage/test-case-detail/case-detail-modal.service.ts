import {Injectable} from "@angular/core";
import {GlobalState} from "../../../../../global.state";
import {Http} from "@angular/http";
@Injectable()
export class CaseDetailModalService {

  private demandListMatchStrUrl = this.Global.baseURL + '/api/project/demand';
  private caseUrl = this.Global.baseURL + '/api/project/case';
  private caseDetailUrl = this.Global.baseURL + '/api/project/case/detail';

  constructor(private Global: GlobalState, private http: Http){

  }

  newCase(caseInfo): Promise<any>{
    return this.http.post(this.caseUrl, JSON.stringify(caseInfo), this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  updateCase(caseInfo):Promise<any>{
    return this.http.put(this.caseUrl, JSON.stringify(caseInfo), this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  searchDemandList(title, projectId): Promise<any> {
    let demandListMatchStrUrl = `${this.demandListMatchStrUrl}?title=${title}&projectId=${projectId}`;

    return this.http.get(demandListMatchStrUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  reviewDetail(id): Promise<any>{
    let caseDetailUrl = `${this.caseDetailUrl}/${id}`;
    return this.http.get(caseDetailUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }
}
