export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum TransactionCategory {
  // Income categories
  SALARY = 'SALARY',
  BUSINESS = 'BUSINESS',
  INVESTMENT = 'INVESTMENT',
  GIFT = 'GIFT',
  OTHER_INCOME = 'OTHER_INCOME',
  
  // Expense categories
  FOOD = 'FOOD',
  RENT = 'RENT',
  UTILITIES = 'UTILITIES',
  TRANSPORTATION = 'TRANSPORTATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SHOPPING = 'SHOPPING',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  TRAVEL = 'TRAVEL',
  EATING_OUT = 'EATING_OUT',
  OTHER_EXPENSE = 'OTHER_EXPENSE'
}

export interface Transaction {
  id?: number;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: Date;
  userId: number;
}
