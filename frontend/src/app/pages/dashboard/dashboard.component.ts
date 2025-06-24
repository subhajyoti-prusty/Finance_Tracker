import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TransactionType } from '../../models/transaction';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Time ranges for dropdown
  timeRanges = [
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last 30 Days', value: '30days' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
    { label: 'This Year', value: 'thisYear' }
  ];
  selectedTimeRange = 'thisMonth';

  // Chart view options
  chartViewOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Yearly', value: 'yearly' }
  ];
  selectedChartView = 'monthly';

  // Math reference for template
  Math = Math;

  // Charts data
  chartData: any;
  chartOptions: any;
  categoryData: any;
  pieOptions: any;
  
  // Summary data
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;
  balanceTrend: number = 6.3; // Percentage trend compared to last period
  savingsRate: number = 18; // Percentage of income saved
  
  // Sparklines data
  incomeSparkline: number[] = [45, 52, 49, 65, 59, 70, 75];
  expenseSparkline: number[] = [35, 41, 35, 55, 49, 47, 50];
  balanceSparkline: number[] = [10, 11, 14, 10, 10, 23, 25];
  
  // Category breakdown
  categoryColors: string[] = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
  ];
  
  topCategories: any[] = [
    { name: 'Food & Groceries', percentage: 35 },
    { name: 'Rent', percentage: 25 },
    { name: 'Entertainment', percentage: 15 },
    { name: 'Utilities', percentage: 12 },
    { name: 'Transport', percentage: 8 },
    { name: 'Others', percentage: 5 }
  ];
  
  // Recent transactions
  recentTransactions: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.initChartData();
    this.initCategoryData();
    this.loadMockData();
    this.messageService.add({
      severity: 'success',
      summary: 'Welcome',
      detail: 'Finance Tracker Dashboard loaded successfully'
    });
  }

  private initChartData(): void {
    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Income',
          data: [2500, 2800, 3100, 2700, 3300, 3500],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        },
        {
          label: 'Expenses',
          data: [1800, 1950, 2100, 2300, 2200, 2400],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Finance Overview'
        }
      }
    };
  }

  private initCategoryData(): void {
    this.categoryData = {
      labels: this.topCategories.map(cat => cat.name),
      datasets: [{
        data: this.topCategories.map(cat => cat.percentage),
        backgroundColor: this.categoryColors,
        borderColor: this.categoryColors.map(color => color + '66'),
        hoverBackgroundColor: this.categoryColors.map(color => color + 'CC')
      }]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          display: false
        }
      },
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false
    };
  }

  private loadMockData(): void {
    // Mock data for demonstration
    this.totalIncome = 3500;
    this.totalExpense = 2400;
    this.balance = this.totalIncome - this.totalExpense;

    this.recentTransactions = [
      {
        id: 1,
        description: 'Salary',
        amount: 3500,
        type: TransactionType.INCOME,
        date: new Date('2025-06-15'),
        category: 'SALARY'
      },
      {
        id: 2,
        description: 'Rent',
        amount: 1200,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-05'),
        category: 'RENT'
      },
      {
        id: 3,
        description: 'Groceries',
        amount: 350,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-10'),
        category: 'FOOD'
      },
      {
        id: 4,
        description: 'Freelance Work',
        amount: 800,
        type: TransactionType.INCOME,
        date: new Date('2025-06-08'),
        category: 'FREELANCE'
      },
      {
        id: 5,
        description: 'Utilities',
        amount: 180,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-12'),
        category: 'UTILITIES'
      },
      {
        id: 6,
        description: 'Entertainment',
        amount: 120,
        type: TransactionType.EXPENSE,
        date: new Date('2025-06-18'),
        category: 'ENTERTAINMENT'
      }
    ];
  }

  // Event handler methods
  onTimeRangeChange(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Time Range Changed',
      detail: `Showing data for: ${this.timeRanges.find(tr => tr.value === this.selectedTimeRange)?.label}`
    });
    
    // In a real app, we would fetch data for the selected time range here
    // For now, let's simulate data changes
    this.simulateDataChange();
  }

  updateChartView(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Chart View Changed',
      detail: `Showing ${this.selectedChartView} view`
    });

    // Simulate chart data changes based on selected view
    switch (this.selectedChartView) {
      case 'weekly':
        this.chartData.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        this.chartData.datasets[0].data = [950, 1150, 800, 1350];
        this.chartData.datasets[1].data = [750, 850, 700, 950];
        break;
      case 'yearly':
        this.chartData.labels = ['2021', '2022', '2023', '2024', '2025'];
        this.chartData.datasets[0].data = [24000, 28000, 31000, 35000, 21000];
        this.chartData.datasets[1].data = [20000, 23000, 26000, 29000, 14700];
        break;
      default: // monthly
        this.chartData.labels = ['January', 'February', 'March', 'April', 'May', 'June'];
        this.chartData.datasets[0].data = [2500, 2800, 3100, 2700, 3300, 3500];
        this.chartData.datasets[1].data = [1800, 1950, 2100, 2300, 2200, 2400];
    }
    
    // Force chart update
    this.chartData = { ...this.chartData };
  }

  private simulateDataChange(): void {
    // Simulate different data for different time periods
    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    switch (this.selectedTimeRange) {
      case '7days':
        this.totalIncome = 850;
        this.totalExpense = 610;
        this.balanceTrend = 3.2;
        this.savingsRate = 15;
        this.incomeSparkline = Array.from({length: 7}, () => random(30, 70));
        this.expenseSparkline = Array.from({length: 7}, () => random(25, 60));
        break;
      case '30days':
        this.totalIncome = 3200;
        this.totalExpense = 2200;
        this.balanceTrend = 5.8;
        this.savingsRate = 16;
        this.incomeSparkline = Array.from({length: 7}, () => random(40, 75));
        this.expenseSparkline = Array.from({length: 7}, () => random(30, 65));
        break;
      case 'lastMonth':
        this.totalIncome = 3250;
        this.totalExpense = 2300;
        this.balanceTrend = -2.1;
        this.savingsRate = 14;
        this.incomeSparkline = Array.from({length: 7}, () => random(35, 70));
        this.expenseSparkline = Array.from({length: 7}, () => random(30, 65));
        break;
      case 'thisYear':
        this.totalIncome = 21000;
        this.totalExpense = 14700;
        this.balanceTrend = 8.4;
        this.savingsRate = 22;
        this.incomeSparkline = Array.from({length: 7}, () => random(45, 80));
        this.expenseSparkline = Array.from({length: 7}, () => random(35, 70));
        break;
      default: // thisMonth
        this.totalIncome = 3500;
        this.totalExpense = 2400;
        this.balanceTrend = 6.3;
        this.savingsRate = 18;
        this.incomeSparkline = [45, 52, 49, 65, 59, 70, 75];
        this.expenseSparkline = [35, 41, 35, 55, 49, 47, 50];
    }
    
    this.balance = this.totalIncome - this.totalExpense;
    
    // Recalculate balance sparkline
    this.balanceSparkline = this.incomeSparkline.map((inc, idx) => 
      inc - this.expenseSparkline[idx]);
      
    // Update category data
    const categoryNames = this.topCategories.map(cat => cat.name);
    const newPercentages = Array.from({length: categoryNames.length}, () => random(5, 40));
    const sum = newPercentages.reduce((a, b) => a + b, 0);
    
    // Normalize to sum to 100%
    const normalizedPercentages = newPercentages.map(p => Math.round((p / sum) * 100));
    
    // Adjust the last value to ensure sum is 100%
    const adjustedSum = normalizedPercentages.slice(0, -1).reduce((a, b) => a + b, 0);
    normalizedPercentages[normalizedPercentages.length - 1] = 100 - adjustedSum;
    
    this.topCategories = categoryNames.map((name, i) => ({ 
      name, 
      percentage: normalizedPercentages[i] 
    }));
    
    // Update chart data
    this.initCategoryData();
  }
}
