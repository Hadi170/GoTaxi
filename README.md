# 🚕 GoTaxi – ReactJS Taxi Booking Web App

GoTaxi is a modern, responsive taxi-booking web application built using **ReactJS** and **Tailwind CSS**.  
It lets users quickly book safe and affordable rides through a clean and intuitive interface, offers dynamic ride selection, real-time trip details, and a polished UI

---

## 📌 Features

### 🎨 **Frontend (ReactJS + TailwindCSS)**
- Fully responsive design (desktop + mobile)
- Sidebar navigation (collapsible)
- Clean yellow/black taxi-themed UI
- Smooth hover and transition effects
- Modular React components:
  - Navbar
  - Footer
  - Menu



### 📄 **Pages Included**
- **Home** – Hero section, features, CTA buttons
  ![image alt](https://github.com/Hadi170/GoTaxi/blob/7579a204f5074bf26e3518e51f9b1e4098e04091/home.png)

- **About** – Service introduction
![image alt](https://github.com/Hadi170/GoTaxi/blob/b2e94fe656e01973e2f523c6183498f1612ca9c8/about.png)

- **Contact** – Contact form with state handling
![image alt](https://github.com/Hadi170/GoTaxi/blob/b2e94fe656e01973e2f523c6183498f1612ca9c8/contact.png)

- **Services** – List of available taxi services
   ![image alt](https://github.com/Hadi170/GoTaxi/blob/7579a204f5074bf26e3518e51f9b1e4098e04091/services.png)
  
- **Offers** – Displays special offers (dynamic card generation)
  ![image alt](https://github.com/Hadi170/GoTaxi/blob/be1563cbb531ecf6be5a6f4a0bc579c9f52ea39a/offers.png)

- **Booking** 
  - Ride type selection  
  - Date, time, passenger input  
  - Dynamic state update  
 ![image alt](https://github.com/Hadi170/GoTaxi/blob/7579a204f5074bf26e3518e51f9b1e4098e04091/booking.png)


## 🛠️ Technologies Used

| Tech | Purpose |
|------|---------|
| **ReactJS** | Main frontend framework |
| **Tailwind CSS** | Styling |
| **JavaScript (ES6+)** | Logic and interactivity |

---
## 📁 Project Structure
```bash
GoTaxi/
├── public/
├── src/
│ ├── Assets/
│ ├── Components/
│ │ ├── Menu.jsx
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ ├── Pages/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Booking.jsx
│ │ ├── Contact.jsx
│ │ ├── Drivers.jsx
│ │ ├── Offers.jsx
│ │ ├── Services.jsx
│ ├── App.js
│ ├── index.js
├── package.json
├── tailwind.config.js
├── README.md
```


## 🚀 Setup & Run Locally

### 1️⃣ Prerequisites
- **Node.js** (LTS version recommended)
- **npm** (comes with Node)

Check versions:
```bash
node -v
npm -v
```

2️⃣ Clone the repository
```bash
git clone https://github.com/Hadi170/GoTaxi.git
cd GoTaxi
```

3️⃣ Install dependencies
```bash
npm install
```

4️⃣ Start the development server
```bash
npm start
```
The app will be available at:
http://localhost:3000
