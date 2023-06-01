import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-main-nav',
  templateUrl: './header-main-nav.component.html',
  styleUrls: ['./header-main-nav.component.css']
})
export class HeaderMainNavComponent implements OnInit {
  @Output() navItemActiveChanged = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  navItemActiveChange(route: string) {
    this.navItemActiveChanged.emit(route);
  }
}
