import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [];
  @Input() brandName: string = 'Finance Tracker';
  @Input() showNotifications: boolean = true;
  @Input() showThemeToggle: boolean = true;
  @Input() showUserProfile: boolean = true;
  @Input() notificationCount: number = 3;
  @Input() logoIcon: string = 'pi pi-chart-line';
  
  isDarkMode: boolean = false;
  currentDate: Date = new Date();
  userMenuItems: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.setupHeader();
    this.initUserMenu();
  }

  setupHeader() {
    // Check if dark mode is stored in local storage
    const storedDarkMode = localStorage.getItem('darkMode');
    this.isDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    document.body.classList.toggle('dark-mode');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  private initUserMenu() {
    this.userMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.navigateTo('/settings')
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.navigateTo('/settings')
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          // Logout logic would go here
          console.log('Logged out');
        }
      }
    ];
  }
}
