# 🧳 Campus Lost & Found System (Backend)

This is a Node.js + Express + MongoDB backend API for managing lost and found items on campus. It allows security personnel and students to log, view, update, and delete lost items.

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Postman (for testing)

---

## 📦 Project Setup

1. Clone the repository
   git clone https://github.com/your-username/lost-found-backend.git
   cd lost-found-backend
````

2. Install dependencies
   npm install

3. Create a `.env` file and add your MongoDB URL:

   MONGODB_URL=your_mongodb_connection_string

4. Start the server
   npm run dev

## 📘 API Endpoints

### ✅ Add a found item
POST `/add-item`

{
  "itemName": "Backpack",
  "description": "Black bag with 2 zips",
  "locationFound": "Library",
  "dateFound": "2025-05-27",
  "claimed": false
}

---

### 📄 View all unclaimed items
GET `/unclaimed-items`

### 🔍 View one item by ID
GET `/item/:id`

### 📝 Update item or mark as claimed
PATCH `/item/:id`

{
  "claimed": true
}

### ❌ Delete an item
DELETE `/item/:id`

## 🧠 Why This Project?

This project solves a real-life problem on campus — helping lost items get back to their owners. It's practical, relatable, and a great way to demonstrate full CRUD operations using modern backend tools.

---

## 👤 Author

* Name: Bilyaminu Ahmad
* Project: For CareerEx Backend Assignment Week-7
