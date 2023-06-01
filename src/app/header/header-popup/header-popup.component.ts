import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Role } from '../../models/role';
@Component({
  selector: 'app-header-popup',
  templateUrl: './header-popup.component.html',
  styleUrls: ['./header-popup.component.css']
})
export class HeaderPopupComponent implements OnInit {
  avatar:string;
  currentUser: User;

  @Output() navItemActiveChanged = new EventEmitter();
  constructor(        
    private router: Router,        
    private authenticationService: AuthenticationService,) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit(): void {
  }
  navItemActiveChange(route: string) {
    this.navItemActiveChanged.emit(route);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
