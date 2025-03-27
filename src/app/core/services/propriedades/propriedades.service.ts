import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { PropriedadeData } from '../../models/propriedade';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropriedadesService extends BaseService<PropriedadeData> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/${environment.version}/Propriedades`);
  }
}
