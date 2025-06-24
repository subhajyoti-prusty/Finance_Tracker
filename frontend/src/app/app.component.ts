import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Finance Tracker';
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.initializeMenu();
  }

  private initializeMenu() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        label: 'Transactions',
        icon: 'pi pi-money-bill',
        routerLink: ['/transactions']
      },
      {
        label: 'Analytics',
        icon: 'pi pi-chart-bar',
        routerLink: ['/analytics']
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: ['/settings']
      }
    ];
  }
}
