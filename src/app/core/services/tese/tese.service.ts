import { Injectable } from '@angular/core';
import { TeseData } from '../../models/tese';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResultResponse } from '../../models/result-response';

@Injectable({
  providedIn: 'root'
})
export class TeseService extends BaseService<TeseData> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/${environment.version}/Teses`);
  }

  preview(id: string, item: any): Observable<string> {
    const url = `${environment.apiUrl}/${environment.version}/Teses/${id}/preview`;
    return this.http.post(url, item, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as const
    });
  }
  
  
}
