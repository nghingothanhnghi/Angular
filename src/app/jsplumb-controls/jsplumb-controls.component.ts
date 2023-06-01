import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { jsPlumbToolkitUndoRedo } from "jsplumbtoolkit-undo-redo";
import { jsPlumb, Surface } from "jsplumbtoolkit";
import { jsPlumbService } from "jsplumbtoolkit-angular";

@Component({
  selector: 'jsplumb-controls',
  templateUrl: './jsplumb-controls.component.html',
  styleUrls: ['./jsplumb-controls.component.scss']
})
export class JsplumbControlsComponent implements OnInit {

  @Input() surfaceId: string;

  surface: Surface;
  undoManager: jsPlumbToolkitUndoRedo;

  constructor(private _el: ElementRef, private _jsplumb: jsPlumbService) { }

  getNativeElement(component: any) {
    return (component.nativeElement || component._nativeElement || component.location.nativeElement).childNodes[0];
  }

  panMode() {
    this.surface.setMode("pan");
  }

  selectMode() {
    this.surface.setMode("select");
  }

  zoomToFit() {
    this.surface.getToolkit().clearSelection();
    this.surface.zoomToFit();
  }

  undo() {
    this.undoManager.undo();
  }

  redo() {
    this.undoManager.redo();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._jsplumb.getSurface(this.surfaceId, (s: Surface) => {

      this.surface = s;
      this.surface.bind("modeChanged", (mode: String) => {
        let controls = this.getNativeElement(this._el);
        jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
        jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
      });

      this.undoManager = new jsPlumbToolkitUndoRedo({
        surface: this.surface,
        compound: true,
        onChange: (mgr: jsPlumbToolkitUndoRedo, undoSize: number, redoSize: number) => {
          let controls = this.getNativeElement(this._el);
          controls.setAttribute("can-undo", undoSize > 0);
          controls.setAttribute("can-redo", redoSize > 0);
        }
      });

      this.surface.bind("canvasClick", () => this.surface.getToolkit().clearSelection());

    });
  }
}
