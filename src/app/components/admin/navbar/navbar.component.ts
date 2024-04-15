import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;

  faHome = faHome;
  faChartBar = faChartBar;
  faTags = faTags;
  faBook = faBook;
  faUserCircle = faUserCircle;
  faUsers = faUsers;
  faSignOutAlt = faSignOutAlt;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('Logout function called');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleNavbar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
