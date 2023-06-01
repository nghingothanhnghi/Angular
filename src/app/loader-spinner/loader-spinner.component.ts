import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css']
})
export class LoaderSpinnerComponent  {
  isLoading: Subject<boolean>;
  isAsync: Subject<boolean>;

  constructor(private loaderSpinnerService: LoaderSpinnerService) {
    this.isLoading = this.loaderSpinnerService.isLoading;
    this.isAsync = this.loaderSpinnerService.isAsync;
  }

}
