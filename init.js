const mongoose = require("mongoose");
const Library = require("./models/library.js");

main()
.then(()=>{
  console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Library');
}

let library = [
  {
    "Bookname": "a monk who sold his ferrari",
    "Author": "Robin Sharma",
    "Username": "Junaid Metkari",
    "Mobile_no": "8600360790",
    "DateIssued": "2024-12-15",
    "LastDateToSubmit": "2024-12-29"
  },
  {
    "Bookname": "Atomic Habits",
    "Author": "James Clear",
    "Username": "Rohit Sharma",
    "Mobile_no": "7896541230",
    "DateIssued": "2024-12-12",
    "LastDateToSubmit": "2024-12-26"
  },
  {
    "Bookname": "The Alchemist",
    "Author": "Paulo Coelho",
    "Username": "Sneha Patil",
    "Mobile_no": "9854123678",
    "DateIssued": "2024-12-13",
    "LastDateToSubmit": "2024-12-27"
  },
  {
    "Bookname": "Rich Dad Poor Dad",
    "Author": "Robert Kiyosaki",
    "Username": "Ajay Singh",
    "Mobile_no": "9638527410",
    "DateIssued": "2024-12-14",
    "LastDateToSubmit": "2024-12-28"
  },
  {
    "Bookname": "The Power of Now",
    "Author": "Eckhart Tolle",
    "Username": "Priya Nair",
    "Mobile_no": "7418529630",
    "DateIssued": "2024-12-15",
    "LastDateToSubmit": "2024-12-29"
  },
  {
    "Bookname": "Sapiens",
    "Author": "Yuval Noah Harari",
    "Username": "Vikram Chauhan",
    "Mobile_no": "8529637410",
    "DateIssued": "2024-12-16",
    "LastDateToSubmit": "2024-12-30"
  },
  {
    "Bookname": "The 7 Habits of Highly Effective People",
    "Author": "Stephen R. Covey",
    "Username": "Meera Gupta",
    "Mobile_no": "7598461230",
    "DateIssued": "2024-12-17",
    "LastDateToSubmit": "2024-12-31"
  },
  {
    "Bookname": "Start With Why",
    "Author": "Simon Sinek",
    "Username": "Rajesh Kumar",
    "Mobile_no": "9876543210",
    "DateIssued": "2024-12-18",
    "LastDateToSubmit": "2025-01-01"
  },
  {
    "Bookname": "Deep Work",
    "Author": "Cal Newport",
    "Username": "Aisha Khan",
    "Mobile_no": "9123456789",
    "DateIssued": "2024-12-19",
    "LastDateToSubmit": "2025-01-02"
  },
  {
    "Bookname": "Can't Hurt Me",
    "Author": "David Goggins",
    "Username": "Kunal Joshi",
    "Mobile_no": "7891234567",
    "DateIssued": "2024-12-20",
    "LastDateToSubmit": "2025-01-03"
  }
]

Library.insertMany(library);