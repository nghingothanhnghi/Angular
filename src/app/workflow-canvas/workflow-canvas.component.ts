import { Component, OnInit } from '@angular/core';
import { DrawingTools, jsPlumbToolkit, Surface, SurfaceRenderParams } from "jsplumbtoolkit";
import { jsPlumbSurfaceComponent, AngularViewOptions } from "jsplumbtoolkit-angular";
import { Subscription } from 'rxjs/internal/Subscription';

import { ActivityNodeService,} from '../services/activity-node.service';
import { RecipeLayoutService, RecipeLayoutMode} from '../services/recipe-layout.service';


@Component({
  selector: 'app-workflow-canvas',
  templateUrl: './workflow-canvas.component.html',
  styleUrls: ['./workflow-canvas.component.css']
})
export class WorkflowCanvasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
