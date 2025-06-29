import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Transaction, TransactionCategory, TransactionType } from '../../models/transaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  providers: [ConfirmationService]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  transactionForm: FormGroup;
  selectedTransaction: Transaction | null = null;
  maxDate: Date = new Date();
  
  // Math reference for template use
  Math = Math;
  
  // Time range options
  timeRanges = [
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last 30 Days', value: '30days' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
    { label: 'This Year', value: 'thisYear' },
    { label: 'Custom Range', value: 'custom' }
  ];
  selectedTimeRange = 'thisMonth';
  
  // Transaction type options for dropdown
  transactionTypeOptions = [
    { label: 'All Types', value: null },
    { label: 'Income', value: TransactionType.INCOME },
    { label: 'Expense', value: TransactionType.EXPENSE }
  ];
  
  // For direct access in template
  TransactionType = TransactionType;
  
  // Financial summary data
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  incomeTrend: number = 8.5;
  expenseTrend: number = 4.2;
  balanceTrend: number = 6.3;
  
  // Transaction statistics
  stats = {
    thisMonth: 0,
    average: 0,
    highestAmount: 0,
    topCategory: ''
  };
  
  transactionTypes = Object.values(TransactionType);
  categories: {label: string, value: string}[] = [];
  
  filterOptions = {
    type: null as TransactionType | null,
    startDate: null as Date | null,
    endDate: null as Date | null,
    category: null as string | null
  };
  
  // Currency settings
  currencyCode = 'INR';
  currencySymbol = '₹';
  
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.transactionForm = this.createTransactionForm();
  }
  
  ngOnInit(): void {
    this.loadTransactionsData();
    this.initCategories();
    this.calculateStatistics();
  }
  
  private createTransactionForm(): FormGroup {
    return this.fb.group({
      description: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: [TransactionType.EXPENSE, Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }
  
  private initCategories(): void {
    // Convert enum values to dropdown options
    this.categories = Object.values(TransactionCategory).map(cat => {
      return {
        label: this.formatCategoryLabel(cat),
        value: cat
      };
    });
  }
  
  formatCategoryLabel(category: string): string {
    return category.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }
  
  private loadTransactionsData(): void {
    // Mock data for transactions
    this.transactions = [
      {
        id: 1,
        description: 'Salary',
        amount: 3500,
        type: TransactionType.INCOME,
        date: new Date('2025-06-15'),
        category: TransactionCategory.SALARY,
        userId: 1
      },
      {
        id: 2,
        description: 'Rent Payment',
        amount: 1200,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-05'),
        category: TransactionCategory.RENT,
        userId: 1
      },
      {
        id: 3,
        description: 'Grocery Shopping',
        amount: 350,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-10'),
        category: TransactionCategory.FOOD,
        userId: 1
      },
      {
        id: 4,
        description: 'Freelance Project',
        amount: 500,
        type: TransactionType.INCOME,
        date: new Date('2025-06-20'),
        category: TransactionCategory.BUSINESS,
        userId: 1
      },
      {
        id: 5,
        description: 'Electricity Bill',
        amount: 120,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-12'),
        category: TransactionCategory.UTILITIES,
        userId: 1
      },
      {
        id: 6,
        description: 'Internet Subscription',
        amount: 80,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-08'),
        category: TransactionCategory.UTILITIES,
        userId: 1
      },
      {
        id: 7,
        description: 'Restaurant Dinner',
        amount: 95,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-18'),
        category: TransactionCategory.EATING_OUT,
        userId: 1
      },
      {
        id: 8,
        description: 'Movie Tickets',
        amount: 35,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-22'),
        category: TransactionCategory.ENTERTAINMENT,
        userId: 1
      }
    ];
    
    // Calculate totals
    this.calculateTotals();
  }
  
  private calculateTotals(): void {
    this.totalIncome = this.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    this.totalExpenses = this.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    
    this.balance = this.totalIncome - this.totalExpenses;
  }
  
  private calculateStatistics(): void {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Transactions this month
    const thisMonthTransactions = this.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
    
    this.stats.thisMonth = thisMonthTransactions.length;
    
    // Average transaction amount
    const totalAmount = this.transactions.reduce((sum, t) => sum + t.amount, 0);
    this.stats.average = this.transactions.length > 0 ? 
      totalAmount / this.transactions.length : 0;
    
    // Highest transaction amount
    this.stats.highestAmount = Math.max(...this.transactions.map(t => t.amount), 0);
    
    // Top category
    const categoryCounts: {[key: string]: number} = {};
    this.transactions.forEach(t => {
      categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });
    
    let topCategory = '';
    let maxCount = 0;
    
    Object.entries(categoryCounts).forEach(([category, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = category;
      }
    });
    
    this.stats.topCategory = this.formatCategoryLabel(topCategory);
  }
  
  openNewDialog(): void {
    this.transactionForm.reset({
      type: TransactionType.EXPENSE,
      amount: 0,
      date: new Date()
    });
    this.displayAddDialog = true;
  }
  
  openEditDialog(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionForm.patchValue({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: new Date(transaction.date)
    });
    this.displayEditDialog = true;
  }
  
  saveNewTransaction(): void {
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: this.generateId(),
        ...this.transactionForm.value,
        userId: 1  // Mock user ID
      };
      
      this.transactions.unshift(transaction);
      this.displayAddDialog = false;
      this.calculateTotals();
      this.calculateStatistics();
      
      this.messageService.add({
        severity: 'success',
        summary: 'Transaction Added',
        detail: 'Your transaction was added successfully'
      });
    }
  }
  
  updateTransaction(): void {
    if (this.transactionForm.valid && this.selectedTransaction) {
      const index = this.transactions.findIndex(t => t.id === this.selectedTransaction!.id);
      
      if (index !== -1) {
        this.transactions[index] = {
          ...this.selectedTransaction,
          ...this.transactionForm.value
        };
        
        this.displayEditDialog = false;
        this.calculateTotals();
        this.calculateStatistics();
        
        this.messageService.add({
          severity: 'success',
          summary: 'Transaction Updated',
          detail: 'Your transaction was updated successfully'
        });
      }
    }
  }
  
  confirmDelete(transaction: Transaction): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the transaction "${transaction.description}"?`,
      accept: () => {
        this.deleteTransaction(transaction.id!);
      }
    });
  }
  
  deleteTransaction(id: number): void {
    const index = this.transactions.findIndex(t => t.id === id);
    
    if (index !== -1) {
      this.transactions.splice(index, 1);
      this.calculateTotals();
      this.calculateStatistics();
      
      this.messageService.add({
        severity: 'success',
        summary: 'Transaction Deleted',
        detail: 'Transaction was deleted successfully'
      });
    }
  }
  
  applyFilters(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Filters Applied',
      detail: 'Transactions filtered according to your criteria'
    });
    
    // In a real app, we would filter the transactions here
    // For demo purposes, we'll wait 500ms to simulate an API call
    setTimeout(() => {
      this.loadTransactionsData();
    }, 500);
  }
  
  clearFilters(): void {
    this.filterOptions = {
      type: null,
      category: null,
      startDate: null,
      endDate: null
    };
    this.selectedTimeRange = 'thisMonth';
    
    this.messageService.add({
      severity: 'info',
      summary: 'Filters Reset',
      detail: 'All filters have been cleared'
    });
    
    // Reload original data
    this.loadTransactionsData();
  }
  
  onTimeRangeChange(): void {
    // In a real app, we would filter transactions by the selected time range
    // For now, let's just show a message
    const rangeLabel = this.timeRanges.find(r => r.value === this.selectedTimeRange)?.label;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Time Range Changed',
      detail: `Showing transactions for: ${rangeLabel}`
    });
    
    // If custom range is selected, we don't do anything automatically
    if (this.selectedTimeRange !== 'custom') {
      // Clear date inputs if a predefined range is selected
      this.filterOptions.startDate = null;
      this.filterOptions.endDate = null;
      
      // In a real app, apply the predefined filter
      this.simulateTimeRangeChange();
    }
  }
  
  private simulateTimeRangeChange(): void {
    // Simulate data changes based on selected time range
    switch(this.selectedTimeRange) {
      case '7days':
        this.totalIncome = 850;
        this.totalExpenses = 610;
        this.balance = 240;
        break;
      case '30days':
        this.totalIncome = 3200;
        this.totalExpenses = 2200;
        this.balance = 1000;
        break;
      case 'lastMonth':
        this.totalIncome = 3250;
        this.totalExpenses = 2300;
        this.balance = 950;
        break;
      case 'thisYear':
        this.totalIncome = 21000;
        this.totalExpenses = 14700;
        this.balance = 6300;
        break;
      default: // thisMonth
        this.calculateTotals(); // Use actual data for current month
    }
    
    // Randomly adjust trends for demo purposes
    this.incomeTrend = parseFloat((Math.random() * 10 + 2).toFixed(1));
    this.expenseTrend = parseFloat((Math.random() * 8 + 1).toFixed(1));
    this.balanceTrend = parseFloat((Math.random() * 12 - 6).toFixed(1));
    
    this.calculateStatistics();
  }
  
  getCategoryLabel(category: string): string {
    return this.formatCategoryLabel(category);
  }
  
  getCategorySeverity(category: string): string {
    const severityMap: {[key: string]: string} = {
      SALARY: 'success',
      BUSINESS: 'success',
      INVESTMENT: 'success',
      RENT: 'danger',
      UTILITIES: 'warning',
      FOOD: 'info',
      TRANSPORTATION: 'warning',
      ENTERTAINMENT: 'info',
      SHOPPING: 'danger',
      TRAVEL: 'info',
      HEALTH: 'help',
      EDUCATION: 'help',
      EATING_OUT: 'warning',
      OTHER: 'secondary'
    };
    
    return severityMap[category] || 'info';
  }
  
  setTransactionType(type: TransactionType): void {
    this.transactionForm.get('type')?.setValue(type);
  }
  
  private generateId(): number {
    return Math.max(0, ...this.transactions.map(t => t.id || 0)) + 1;
  }
  
  /**
   * Format a number as currency with INR symbol
   */
  formatCurrency(value: number): string {
    return `${this.currencySymbol}${value.toFixed(2)}`;
  }
}
