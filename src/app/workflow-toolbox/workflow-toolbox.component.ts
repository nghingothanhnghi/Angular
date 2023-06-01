import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workflow-toolbox',
  templateUrl: './workflow-toolbox.component.html',
  styleUrls: ['./workflow-toolbox.component.scss']
})
export class WorkflowToolboxComponent implements OnInit {

  @Input() surfaceId: string;
  keyword = ''; // Using for searching activities on toolbox
  selectedGroupIndex: number = 0;
  groups = [
    {
      id: '2c27e370-92eb-4558-84cf-4257a21980b6',
      name: 'Activity',
      index: 0,
      iconVertTab: 'fa fa-random',
      active: true
    },
    {
      id: 'dd12760a-3a84-405b-bfb5-4f69ce2568e3',
      name: 'Logic',
      index: 1,
      iconVertTab: 'fa fa-puzzle-piece',
      active: false
    },
    {
      id: 'c537d4a9-28b3-48ec-a070-339007c8718e',
      name: 'Communication',
      index: 2,
      iconVertTab: 'fa fa-plug',
      active: false
    }
  ];

  nodeTypes = [
    { label: "End", type: "End", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/flag-end-point.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Cleanse", type: "Cleanse", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/cleanse.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Disk", type: "Disk", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/disk.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "SOAP Service", type: "SOAP", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/soap-connection.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Http Client", type: "httpClient", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/browser.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Map", type: "Map", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/map.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Cloud Interchange Platform", type: "cip", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/cloud-interchange-platform.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Notify", type: "Notify", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/notification.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' },
    { label: "Data Processor ", type: "DataProcessor", w: 120, h: 70, imgUrl: './assets/imgs/svg-component/database.svg', groupId: '2c27e370-92eb-4558-84cf-4257a21980b6' }
  ];

  constructor() { }

  ngOnInit(): void { }

  dataGenerator(el: Element) {
    return {
      type: el.getAttribute("data-node-type"),
      text: el.getAttribute("data-node-text"),
      name: el.getAttribute("data-node-text"),
      w: parseInt(el.getAttribute("jtk-width"), 10),
      h: parseInt(el.getAttribute("jtk-height"), 10),
      imgUrl: el.getAttribute("jtk-img-url")
    }
  }

  groupChanged(selectedGroup) {
    this.selectedGroupIndex = selectedGroup.index;
    for (let group of this.groups) {
      group.active = group.index === selectedGroup.index;
    }
  }

}
