// (200420.0511)
import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { v4 as uuid } from 'uuid';


import { BaseNodeConfigurationComponent } from '../base-node-Configuration.component';






@Component({
  selector: 'app-data-processor-configuration',
  templateUrl: './data-processor-configuration.component.html',
  styleUrls: ['./data-processor-configuration.component.scss']
})
export class DataProcessorConfigurationComponent extends BaseNodeConfigurationComponent {
  
  constructor() {

  }

  
  ngOnInit(): void {

  }


}


