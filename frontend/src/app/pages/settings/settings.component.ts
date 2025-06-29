import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TransactionCategory } from '../../models/transaction';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';

// Register the Indian locale
registerLocaleData(localeIn);

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  activeTab: number = 0;
  
  // Profile settings
  profileForm: FormGroup;
  
  // Appearance settings
  isDarkMode: boolean = false;
  currencySymbol: string = '₹';
  dateFormat: string = 'dd/MM/yyyy';
  
  // Languages dropdown
  languages: any[] = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'French', value: 'French' },
    { label: 'German', value: 'German' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Hindi', value: 'Hindi' }
  ];
  
  availableCurrencies: any[] = [
    { label: 'Indian Rupee (₹)', value: '₹' },
    { label: 'US Dollar ($)', value: '$' },
    { label: 'Euro (€)', value: '€' },
    { label: 'British Pound (£)', value: '£' },
    { label: 'Japanese Yen (¥)', value: '¥' }
  ];
  
  availableDateFormats: any[] = [
    { label: 'DD/MM/YYYY', value: 'dd/MM/yyyy' },
    { label: 'MM/DD/YYYY', value: 'MM/dd/yyyy' },
    { label: 'YYYY-MM-DD', value: 'yyyy-MM-dd' }
  ];
  
  // Notification settings
  emailNotifications: boolean = true;
  pushNotifications: boolean = true;
  weeklyReportEnabled: boolean = true;
  monthlyReportEnabled: boolean = true;
  budgetAlertEnabled: boolean = true;
  unusualActivityAlertEnabled: boolean = true;
  
  // Budget settings
  budgets: any[] = [
    { category: TransactionCategory.FOOD, limit: 500, used: 350 },
    { category: TransactionCategory.RENT, limit: 1300, used: 1200 },
    { category: TransactionCategory.UTILITIES, limit: 250, used: 200 },
    { category: TransactionCategory.ENTERTAINMENT, limit: 400, used: 300 },
    { category: TransactionCategory.TRANSPORTATION, limit: 300, used: 180 }
  ];
  
  selectedBudget: any = null;
  displayBudgetDialog: boolean = false;
  budgetForm: FormGroup;
  
  // Security Settings
  passwordForm: FormGroup;
  twoFactorEnabled: boolean = false;
  
  // Categories for dropdown
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.profileForm = this.createProfileForm();
    this.budgetForm = this.createBudgetForm();
    this.passwordForm = this.createPasswordForm();
  }

  ngOnInit(): void {
    this.loadUserSettings();
    this.initCategories();
  }
  
  private createProfileForm(): FormGroup {
    return this.fb.group({
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['(555) 123-4567', []],
      language: ['English', []]
    });
  }
  
  private createBudgetForm(): FormGroup {
    return this.fb.group({
      category: ['', [Validators.required]],
      limit: [0, [Validators.required, Validators.min(1)]]
    });
  }
  
  private createPasswordForm(): FormGroup {
    return this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  
  private passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    
    if (newPassword === confirmPassword) {
      g.get('confirmPassword')?.setErrors(null);
      return null;
    } else {
      g.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
  
  private loadUserSettings(): void {
    // In a real app, this would load user settings from a service
    const storedDarkMode = localStorage.getItem('darkMode');
    this.isDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
    
    // Apply dark mode theme if it's enabled
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }
  
  private initCategories(): void {
    // Convert enum values to dropdown options
    this.categories = Object.values(TransactionCategory).map(cat => {
      return {
        label: cat.replace('_', ' '),
        value: cat
      };
    });
  }
  
  saveProfile(): void {
    if (this.profileForm.valid) {
      // In a real app, save to service/API
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Profile settings saved successfully'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields correctly'
      });
    }
  }
  
  // Theme management methods
  selectTheme(theme: string): void {
    this.isDarkMode = theme === 'dark';
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    this.messageService.add({
      severity: 'info',
      summary: 'Theme Changed',
      detail: `Theme switched to ${theme} mode`
    });
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    document.body.classList.toggle('dark-mode');
    
    this.messageService.add({
      severity: 'info',
      summary: 'Theme Changed',
      detail: `Theme switched to ${this.isDarkMode ? 'dark' : 'light'} mode`
    });
  }
  
  saveAppearanceSettings(): void {
    // In a real app, save to service/API
    localStorage.setItem('currencySymbol', this.currencySymbol);
    localStorage.setItem('dateFormat', this.dateFormat);
    
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Appearance settings saved successfully'
    });
  }
  
  saveNotificationSettings(): void {
    // In a real app, save to service/API
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Notification preferences saved successfully'
    });
  }
  
  openNewBudgetDialog(): void {
    this.selectedBudget = null;
    this.budgetForm.reset();
    this.displayBudgetDialog = true;
  }
  
  openEditBudgetDialog(budget: any): void {
    this.selectedBudget = budget;
    this.budgetForm.patchValue({
      category: budget.category,
      limit: budget.limit
    });
    this.displayBudgetDialog = true;
  }
  
  saveBudget(): void {
    if (this.budgetForm.valid) {
      const budgetData = this.budgetForm.value;
      
      if (this.selectedBudget) {
        // Update existing budget
        const index = this.budgets.findIndex(b => b.category === this.selectedBudget.category);
        if (index !== -1) {
          this.budgets[index] = {
            ...this.selectedBudget,
            category: budgetData.category,
            limit: budgetData.limit
          };
        }
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Budget updated successfully'
        });
      } else {
        // Add new budget
        const newBudget = {
          category: budgetData.category,
          limit: budgetData.limit,
          used: 0
        };
        
        this.budgets.push(newBudget);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New budget added successfully'
        });
      }
      
      this.displayBudgetDialog = false;
    }
  }
  
  deleteBudget(budget: any): void {
    const index = this.budgets.findIndex(b => b.category === budget.category);
    if (index !== -1) {
      this.budgets.splice(index, 1);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Budget deleted successfully'
      });
    }
  }
  
  // Security methods
  changePassword(): void {
    if (this.passwordForm.valid) {
      // In a real app, this would call a service/API
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password changed successfully'
      });
      
      this.passwordForm.reset();
    }
  }
  
  toggleTwoFactor(): void {
    // In a real app, this would call a service/API to enable/disable 2FA
    const status = this.twoFactorEnabled ? 'enabled' : 'disabled';
    
    this.messageService.add({
      severity: 'success',
      summary: 'Two-Factor Authentication',
      detail: `Two-factor authentication has been ${status}`
    });
  }
  
  logOutAllSessions(): void {
    // In a real app, this would call a service/API
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'All other sessions have been logged out'
    });
  }
  
  // Helper methods
  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      FOOD: 'pi pi-shopping-bag',
      RENT: 'pi pi-home',
      UTILITIES: 'pi pi-bolt',
      TRANSPORTATION: 'pi pi-car',
      ENTERTAINMENT: 'pi pi-ticket',
      SHOPPING: 'pi pi-shopping-cart',
      HEALTH: 'pi pi-heart',
      EDUCATION: 'pi pi-book',
      TRAVEL: 'pi pi-globe',
      EATING_OUT: 'pi pi-utensils',
      SALARY: 'pi pi-wallet',
      INVESTMENT: 'pi pi-chart-line',
      BUSINESS: 'pi pi-briefcase',
      GIFT: 'pi pi-gift',
      OTHER_INCOME: 'pi pi-plus-circle',
      OTHER_EXPENSE: 'pi pi-minus-circle'
    };
    
    return iconMap[category] || 'pi pi-tag';
  }
  
  // Helper method to get category label for display
  getCategoryLabel(category: string): string {
    return category.replace('_', ' ');
  }
  
  // Calculate progress percentage for budget usage
  calculateProgress(used: number, limit: number): number {
    return Math.min(100, Math.round((used / limit) * 100));
  }
  
  // Calculate days left in the current month for budget tracking
  calculateDaysLeft(): number {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return lastDay - today.getDate();
  }
  
  // Determine severity class based on usage percentage for progress bars
  getProgressSeverityClass(percentage: number): string {
    if (percentage < 70) return 'p-progressbar-success';
    if (percentage < 90) return 'p-progressbar-warning';
    return 'p-progressbar-danger';
  }
  
  // Determine text severity class for status text
  getTextSeverityClass(percentage: number): string {
    if (percentage < 70) return 'text-success';
    if (percentage < 90) return 'text-warning';
    return 'text-danger';
  }
  
  // Date helper methods for login sessions
  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
  
  getPastDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString();
  }
  
  // Format currency value based on the selected currency symbol
  formatCurrency(value: number): string {
    return formatCurrency(value, 'en-IN', this.currencySymbol);
  }
}
