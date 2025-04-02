import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToolbarRoute } from '../../models/toolbar';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  emitterRoute = new EventEmitter<ToolbarRoute[]>();
  emitterLogin = new EventEmitter<boolean>();
  
  constructor(private titleService: Title) { }

  setTitlePage(title: ToolbarRoute[]) {
    this.emitterRoute.emit(title);
  }
}
