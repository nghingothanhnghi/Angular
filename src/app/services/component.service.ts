// (200210.0421)
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ComponentType, ComponentTypeGroup, componentTypeGroups } from '../models/component-type';
import { ComponentModel } from '../models/component';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingService } from './setting.service';

@Injectable({ providedIn: 'root' })
export class ComponentService extends GenericService<ComponentModel> {
  //isUrlReady: boolean = false;
  constructor(httpClient: HttpClient, settingService: SettingService) {
    super(httpClient);

    //let interval = setInterval(() => {
    //  let gc = settingService.getConfiguration();
    //  if (gc && gc.service) {
    //    this.url = gc.service;
    //    this.isUrlReady = true;
    //    clearInterval(interval);
    //  }
    //}, 10);
  }

  private componentOpenedSource = new Subject<string | ComponentModel>();
  componentOpened$ = this.componentOpenedSource.asObservable();

  private componentClosedSource = new Subject<string>();
  componentClosed$ = this.componentClosedSource.asObservable();

  private componentSavedSource = new Subject<string | ComponentModel>();
  componentSaved$ = this.componentSavedSource.asObservable();

  private componentDeletedSource = new Subject<string>();
  componentDeleted$ = this.componentDeletedSource.asObservable();

  public componentTypeGroups: ComponentTypeGroup[] = componentTypeGroups;

  openComponent(comp: string | ComponentModel) {
    this.componentOpenedSource.next(comp);
  }

  closeComponent(id: string) {
    this.componentClosedSource.next(id);
  }

  saveComponentCompleted(data: string | ComponentModel) {
    this.componentSavedSource.next(data);
  }

  deleteComponentCompleted(id: string) {
    this.componentDeletedSource.next(id);
  }

  getComponentTypeGroups(): ComponentTypeGroup[] {
    return this.componentTypeGroups;
  }

  getComponentType(type: string, localType: string): ComponentType {
    for (const group of this.componentTypeGroups) {
      for (const componentTypeGroup of group.items) {
        if (componentTypeGroup.type === type && componentTypeGroup.localType === localType) return componentTypeGroup;
      }
    }
  }

  getComponents() {
    return this.getList('ucapi/Process/Read');
  }

  getComponentsByType(type: string, localType?: string) {
    if (localType == null) localType = '';
    return this.getList('ucapi/Process/ReadByType?type=' + type + '&localType=' + localType);
  }

  getComponentsByTypeWithDefault(type: string, localType: string, component: ComponentModel) {
    return this.getList('ucapi/Process/ReadByType?type=' + type + '&localType=' + localType).pipe(
      map(components => {
        if (component?.id !== null) {
          const found = components.some(el => el.id === component.id);
          if (!found) components.push(component);
        }

        return components;
      })
    );
  }

  getComponentsByCustomer() {
    return this.getList('ucapi/Process/ReadByCustomer');
  }

  getComponent(id: any) {
    return this.get('ucapi/Process/Read', id);
  }

  getDraftProcess() {
    return this.getList('ucapi/Process/GetDraftProcess').pipe(
      map(arr => {
        return arr.map(v => {
          if (v.status == null) v.status = 0;
          return v;
        });
      })
    );
  }

  saveComponent(component: ComponentModel) {
    const data = component;
    if (component.isNew) {
      return this.post('ucapi/Process/Create', data);
    } else {
      return this.put('ucapi/Process/Update', data);
    }
  }

  deleteComponent(id: string) {
    return this.delete('ucapi/Process/Delete', id);
  }

  addComponentToLibrary(id: string) {
    return this.post('ucapi/Process/CreateLibrary/' + id);
  }

  importComponentFromLibrary(id: string) {
    return this.post('ucapi/Process/ImportFromLibrary/' + id);
  }

  testSOAPService(serviceUrl: string, headersJson: any) {
    return this.post('ucapi/Process/TestSOAP?serviceUrl=' + serviceUrl, {
      headersJson
    });
  }

  getUrlService(serviceUrl: string) {
    return this.post('ucapi/Process/GetUrl?serviceUrl=' + serviceUrl);
  }
}
