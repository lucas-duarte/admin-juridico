import { Injectable } from '@angular/core';
import { TeseData } from '../../models/tese';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeseService extends BaseService<TeseData> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/${environment.version}/Teses`);
  }
}
