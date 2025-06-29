import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  @Input() brandName: string = 'Finance Tracker';
  @Input() brandDescription: string = 'Your personal finance tracker to help you manage income, expenses, and savings.';
  
  year: number = new Date().getFullYear();
  
  quickLinks: Array<{label: string, route: string}> = [
    { label: 'Dashboard', route: '/' },
    { label: 'Transactions', route: '/transactions' },
    { label: 'Analytics', route: '/analytics' },
    { label: 'Settings', route: '/settings' }
  ];
  
  contactInfo: Array<{icon: string, text: string}> = [
    { icon: 'pi pi-envelope', text: 'subhajyoti.2004@gmail.com' },
    { icon: 'pi pi-phone', text: '+91 7788081947' },
    { icon: 'pi pi-map-marker', text: 'Bhubaneswar, Odisha, India' }
  ];
  
  socialLinks: Array<{icon: string, url: string, label: string}> = [
    { icon: 'pi pi-facebook', url: '#', label: 'Facebook' },
    { icon: 'pi pi-twitter', url: '#', label: 'Twitter' },
    { icon: 'pi pi-linkedin', url: 'https://www.linkedin.com/in/subhajyoti-prusty-46b498257/', label: 'LinkedIn' },
    { icon: 'pi pi-instagram', url: '#', label: 'Instagram' }
  ];
  
  legalLinks: Array<{label: string, url: string}> = [
    { label: 'Terms of Service', url: '#' },
    { label: 'Privacy Policy', url: '#' },
    { label: 'Cookies Policy', url: '#' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
