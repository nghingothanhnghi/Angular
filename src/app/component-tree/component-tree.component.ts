import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent implements OnInit {
  showLibary = false; // indicates whether component tree is showing libary component
  keyword = ''; // Using for searching components on tree

  // property group control expanded, collapsed components on tree
  isUAExpanded = false;
  isRecipesExpanded = false;
  isMapsExpanded = false;
  isProfilesExpanded = false;
  isXmlProfilesExpanded = false;
  isJsonProfilesExpanded = false;
  isFlatFileProfilesExpanded = false;
  isDatabaseProfilesExpanded = false;
  isConnectionsExpanded = false;
  isSOAPConnectionsExpanded = false;
  isHttpClientConnectionsExpanded = false;
  isDiskConnectionsExpanded = false;
  isOperationsExpanded = false;
  isSOAPOperationsExpanded = false;
  isHttpClientOperationsExpanded = false;
  isDiskOperationsExpanded = false;

  // for library
  isUALibaryExpanded = true;
  isRecipesLibaryExpanded = false;
  constructor() { }

  ngOnInit(): void {
  }

}
