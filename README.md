# 📊 Finance Tracker

## 📝 Project Overview
A full-stack Finance Tracker application that helps users monitor their income, expenses, and savings.  
Built with Angular for the frontend, Java Spring Boot for the backend, and PostgreSQL for database management.

---

## 🚀 Tech Stack

- **Frontend:** Angular 18, HTML5, CSS3, TypeScript, PrimeNG, Bootstrap
- **Backend:** Java 21, Spring Boot 3.x, Spring Security, Spring Data JPA
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment (optional if applicable):** Docker, AWS / Render / Railway

---

## 📂 Project Structure

```plaintext
finance-tracker/
├── backend/
│   ├── src/main/java/com/example/financetracker/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   ├── repository/
│   │   └── config/
│   └── src/main/resources/
│       └── application.properties
└── frontend/
    ├── src/app/
    │   ├── components/
    │   ├── services/
    │   ├── models/
    │   └── pages/
    └── angular.json
```

---

## 🎯 Key Features

- User Registration and Login (JWT Auth)
- Add, Edit, Delete Transactions
- Track Income vs Expenses
- Monthly Summary Reports
- Category-wise Analytics (Food, Rent, Travel, etc.)
- Secure APIs with Spring Security
- Responsive UI with Angular & PrimeNG

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

### 2. Backend Setup (Spring Boot)

- Navigate to the `backend` folder.
- Configure `application.properties` with your PostgreSQL database credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/yourdbname
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

- Run the backend:

```bash
./mvnw spring-boot:run
```

### 3. Frontend Setup (Angular)

- Navigate to the `frontend` folder.
- Install dependencies:

```bash
npm install
```

- Run the Angular app:

```bash
ng serve
```

- Visit: `http://localhost:4200`

---

## 🛡️ Authentication

- Uses JWT tokens.
- After successful login, the token is stored in local storage.
- API requests are protected via Authorization headers.

---

## 📈 Database Schema

- **User**
  - id (PK)
  - username
  - email
  - password
- **Transaction**
  - id (PK)
  - amount
  - category
  - type (Income/Expense)
  - description
  - date
  - user_id (FK)

*(You can add an ER Diagram if you want.)*

---

## 📸 Screenshots (optional but recommended)

> ![Dashboard Screenshot](link-to-screenshot.png)

---

## 🧑‍🧬 Future Enhancements

- Budget Planning
- Email Notifications
- Export Reports (PDF/Excel)
- Graphs with D3.js / Chart.js

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **Your Name**
- LinkedIn: [your-profile-link](https://linkedin.com/in/your-profile)
- GitHub: [your-username](https://github.com/your-username)
- Email: your-email@example.com

