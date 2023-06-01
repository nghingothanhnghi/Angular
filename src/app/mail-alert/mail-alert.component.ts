import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-alert',
  templateUrl: './mail-alert.component.html',
  styleUrls: ['./mail-alert.component.css']
})
export class MailAlertComponent implements OnInit {
  title="Mail Alert";
  constructor() { }

  ngOnInit(): void {
  }

}
