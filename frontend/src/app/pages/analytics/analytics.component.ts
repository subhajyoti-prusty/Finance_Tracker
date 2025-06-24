import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TransactionCategory, TransactionType } from '../../models/transaction';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  // Chart data
  incomeVsExpenseData: any;
  categoryBreakdownData: any;
  monthlyTrendData: any;
  savingsRateData: any;
  
  // Trend metrics
  incomeTrend: number = 8.2;
  expenseTrend: number = 4.7;
  balanceTrend: number = 12.5;
  
  // Chart views
  chartViewOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Yearly', value: 'yearly' }
  ];
  selectedChartView = 'monthly';
  
  // Expense categories
  expenseCategories = [
    { label: 'All Categories', value: null },
    { label: 'Food', value: 'FOOD' },
    { label: 'Rent', value: 'RENT' },
    { label: 'Utilities', value: 'UTILITIES' },
    { label: 'Transportation', value: 'TRANSPORTATION' },
    { label: 'Entertainment', value: 'ENTERTAINMENT' },
    { label: 'Shopping', value: 'SHOPPING' },
    { label: 'Other', value: 'OTHER_EXPENSE' }
  ];
  selectedExpenseCategory = null;
  
  // Trend options
  trendOptions = [
    { label: 'Income & Expenses', value: 'income_expenses' },
    { label: 'Savings', value: 'savings' },
    { label: 'Net Worth', value: 'net_worth' }
  ];
  selectedTrendOption = 'income_expenses';
  
  // Category amounts for legend
  categoryAmounts: number[] = [];
  
  // Chart options
  chartOptions: any;
  pieChartOptions: any;
  lineChartOptions: any;
  
  // Time period selection
  selectedTimePeriod: string = 'month';
  timePeriods: any[] = [
    { label: 'This Month', value: 'month' },
    { label: 'Last 3 Months', value: 'quarter' },
    { label: 'This Year', value: 'year' },
    { label: 'All Time', value: 'all' }
  ];
  
  // Financial metrics
  totalIncome: number = 0;
  totalExpenses: number = 0;
  savingsRate: number = 0;
  
  // Top spending categories
  topSpendingCategories: any[] = [];
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.initChartOptions();
    this.loadChartData();
    this.calculateFinancialMetrics();
  }

  private initChartOptions(): void {
    // Common chart options
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            color: 'var(--text-color)'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'var(--surface-card)',
          titleColor: 'var(--text-color)',
          bodyColor: 'var(--text-color)',
          borderColor: 'var(--surface-border)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            color: 'var(--surface-border)',
            drawBorder: false
          },
          ticks: {
            color: 'var(--text-color)'
          }
        },
        y: {
          grid: {
            color: 'var(--surface-border)',
            drawBorder: false
          },
          ticks: {
            color: 'var(--text-color)'
          }
        }
      }
    };
    
    // Pie chart options
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'var(--surface-card)',
          titleColor: 'var(--text-color)',
          bodyColor: 'var(--text-color)',
          borderColor: 'var(--surface-border)',
          borderWidth: 1
        }
      }
    };
    
    // Line chart options
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            color: 'var(--text-color)'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'var(--surface-card)',
          titleColor: 'var(--text-color)',
          bodyColor: 'var(--text-color)',
          borderColor: 'var(--surface-border)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            color: 'var(--surface-border)',
            drawBorder: false,
            display: false
          },
          ticks: {
            color: 'var(--text-color)'
          }
        },
        y: {
          grid: {
            color: 'var(--surface-border)',
            drawBorder: false
          },
          ticks: {
            color: 'var(--text-color)'
          },
          beginAtZero: true
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 6
        }
      }
    };
  }
  
  private loadChartData(): void {
    // Income vs Expense bar chart
    this.incomeVsExpenseData = {
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
    
    // Category breakdown pie chart
    this.categoryBreakdownData = {
      labels: ['Food', 'Rent', 'Utilities', 'Transportation', 'Entertainment', 'Others'],
      datasets: [
        {
          data: [350, 1200, 200, 180, 300, 170],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ]
    };
    
    // Initialize category amounts
    this.categoryAmounts = [350, 1200, 200, 180, 300, 170];
    
    // Monthly trend line chart
    this.monthlyTrendData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Income',
          data: [2500, 2800, 3100, 2700, 3300, 3500],
          fill: false,
          borderColor: '#4BC0C0',
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Expenses',
          data: [1800, 1950, 2100, 2300, 2200, 2400],
          fill: false,
          borderColor: '#FF6384',
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Savings',
          data: [700, 850, 1000, 400, 1100, 1100],
          fill: true,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: '#9966FF',
          tension: 0.4,
          borderWidth: 2
        }
      ]
    };
    
    // Savings rate gauge chart
    this.savingsRateData = {
      labels: ['Savings Rate'],
      datasets: [
        {
          data: [32],
          backgroundColor: ['#36A2EB'],
          hoverBackgroundColor: ['#36A2EB']
        }
      ]
    };
  }
  
  private calculateFinancialMetrics(): void {
    // In a real app, these values would come from actual transaction data
    this.totalIncome = 17900; // Sum of all income for the period
    this.totalExpenses = 12750; // Sum of all expenses for the period
    this.savingsRate = Math.round((this.totalIncome - this.totalExpenses) / this.totalIncome * 100);
    
    // Top spending categories
    this.topSpendingCategories = [
      { category: 'Rent', amount: 1200, percentage: 28 },
      { category: 'Food', amount: 850, percentage: 20 },
      { category: 'Entertainment', amount: 650, percentage: 15 },
      { category: 'Transportation', amount: 550, percentage: 13 },
      { category: 'Utilities', amount: 450, percentage: 10 }
    ];
  }
  
  onTimePeriodChange(): void {
    // In a real app, this would reload data based on the selected time period
    const periodText = this.timePeriods.find(p => p.value === this.selectedTimePeriod)?.label;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Time Period Changed',
      detail: `Showing data for: ${periodText}`
    });
    
    // Simulate data reload with mock data
    this.simulateDataChange();
  }
  
  onChartViewChange(): void {
    const viewText = this.chartViewOptions.find(o => o.value === this.selectedChartView)?.label;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Chart View Changed',
      detail: `Showing ${viewText} view`
    });
    
    // Update the chart data based on selected view
    this.updateChartViewData();
  }
  
  updateCategoryChart(): void {
    if (this.selectedExpenseCategory) {
      const categoryName = this.expenseCategories.find(c => c.value === this.selectedExpenseCategory)?.label;
      
      this.messageService.add({
        severity: 'info',
        summary: 'Category Filter Applied',
        detail: `Showing breakdown for: ${categoryName}`
      });
      
      // In a real app, we would filter the data
      // For now, just show a simulation
      setTimeout(() => {
        // Simulate filtered data
        this.categoryBreakdownData = {
          labels: ['Groceries', 'Restaurants', 'Fast Food', 'Coffee Shops'],
          datasets: [{
            data: [210, 80, 40, 20],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
        };
        this.categoryAmounts = [210, 80, 40, 20];
      }, 300);
    } else {
      // Reset to original data
      setTimeout(() => {
        this.loadChartData();
      }, 300);
    }
  }
  
  updateTrendChart(): void {
    const trendText = this.trendOptions.find(o => o.value === this.selectedTrendOption)?.label;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Trend View Changed',
      detail: `Showing ${trendText} trends`
    });
    
    // Update chart based on selected trend
    switch (this.selectedTrendOption) {
      case 'savings':
        this.monthlyTrendData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Savings',
            data: [700, 850, 1000, 400, 1100, 1100],
            fill: true,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: '#9966FF',
            tension: 0.4,
            borderWidth: 3
          }]
        };
        break;
      case 'net_worth':
        this.monthlyTrendData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Net Worth',
            data: [15000, 16500, 18200, 18800, 20500, 22300],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: '#36A2EB',
            tension: 0.4,
            borderWidth: 3
          }]
        };
        break;
      default: // income_expenses
        this.monthlyTrendData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Income',
              data: [2500, 2800, 3100, 2700, 3300, 3500],
              fill: false,
              borderColor: '#4BC0C0',
              tension: 0.4,
              borderWidth: 3
            },
            {
              label: 'Expenses',
              data: [1800, 1950, 2100, 2300, 2200, 2400],
              fill: false,
              borderColor: '#FF6384',
              tension: 0.4,
              borderWidth: 3
            }
          ]
        };
    }
  }
  
  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Food': 'pi pi-shopping-bag',
      'Rent': 'pi pi-home',
      'Utilities': 'pi pi-bolt',
      'Transportation': 'pi pi-car',
      'Entertainment': 'pi pi-ticket',
      'Shopping': 'pi pi-shopping-cart',
      'Others': 'pi pi-tag'
    };
    
    return iconMap[category] || 'pi pi-tag';
  }
  
  private updateChartViewData(): void {
    switch (this.selectedChartView) {
      case 'weekly':
        this.incomeVsExpenseData = {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Income',
              data: [950, 1150, 800, 1350],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            },
            {
              label: 'Expenses',
              data: [750, 850, 700, 950],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1
            }
          ]
        };
        break;
      case 'yearly':
        this.incomeVsExpenseData = {
          labels: ['2021', '2022', '2023', '2024', '2025'],
          datasets: [
            {
              label: 'Income',
              data: [24000, 28000, 31000, 35000, 21000],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            },
            {
              label: 'Expenses',
              data: [20000, 23000, 26000, 29000, 14700],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1
            }
          ]
        };
        break;
      default: // monthly
        this.incomeVsExpenseData = {
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
    }
  }
  
  private simulateDataChange(): void {
    // Simulate different data for different time periods
    switch (this.selectedTimePeriod) {
      case 'quarter':
        this.totalIncome = 33200;
        this.totalExpenses = 24800;
        this.savingsRate = 25;
        this.incomeTrend = 5.8;
        this.expenseTrend = 3.9;
        this.balanceTrend = 8.2;
        break;
      case 'year':
        this.totalIncome = 112000;
        this.totalExpenses = 89600;
        this.savingsRate = 20;
        this.incomeTrend = 12.3;
        this.expenseTrend = 7.4;
        this.balanceTrend = 15.6;
        break;
      case 'all':
        this.totalIncome = 245000;
        this.totalExpenses = 196000;
        this.savingsRate = 21;
        this.incomeTrend = 18.9;
        this.expenseTrend = 14.2;
        this.balanceTrend = 22.7;
        break;
      default: // month
        this.totalIncome = 17900;
        this.totalExpenses = 12750;
        this.savingsRate = 29;
        this.incomeTrend = 8.2;
        this.expenseTrend = 4.7;
        this.balanceTrend = 12.5;
    }
    
    // Simulate updated top spending categories
    const categoryNames = this.topSpendingCategories.map(c => c.category);
    const newAmounts = [
      this.totalExpenses * 0.28,
      this.totalExpenses * 0.20,
      this.totalExpenses * 0.15,
      this.totalExpenses * 0.13,
      this.totalExpenses * 0.10
    ];
    
    this.topSpendingCategories = categoryNames.map((name, i) => ({
      category: name,
      amount: Math.round(newAmounts[i]),
      percentage: i === 0 ? 28 : i === 1 ? 20 : i === 2 ? 15 : i === 3 ? 13 : 10
    }));
    
    // Update chart data
    this.updateChartViewData();
  }
  
  downloadReport(): void {
    // In a real app, this would generate and download a report
    this.messageService.add({
      severity: 'success',
      summary: 'Report Downloaded',
      detail: 'Your financial report has been downloaded'
    });
  }
}
