import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {
  title= "Settings";
  constructor() { }

  ngOnInit(): void {
  }

}
