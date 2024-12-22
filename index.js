const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Library = require("./models/library.js");
const methodOverride = require("method-override");

const app = express();

// Set views and static folder
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Library'); // Replace with your MongoDB URI if on cloud service
    console.log("MongoDB Connection Successful");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
}

main();

// Index Route
app.get("/library", async (req, res) => {
  try {
    let library = await Library.find();
    console.log(library);
    res.render("index.ejs", { library });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching library records.");
  }
});

// New Route
app.get("/library/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route (POST)
app.post("/library", async (req, res) => {
  const { Bookname, Author, Username, Mobile_no, DateIssued, LastDateToSubmit } = req.body;
  try {
    let newLibrary = new Library({
      Bookname,
      Author,
      Username,
      Mobile_no,
      DateIssued,
      LastDateToSubmit,
    });

    await newLibrary.save();
    console.log("Data was saved");
    res.redirect("/library?success=true");
  } catch (err) {
    console.error(err);
    res.redirect("/library?success=false");
  }
});

// Edit Route
app.get("/library/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let library = await Library.findById(id);
    if (!library) {
      return res.status(404).send("Library document not found!");
    }
    res.render("edit.ejs", { library });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching document for editing.");
  }
});

// Update Route (PUT)
app.put("/library/:id", async (req, res) => {
  let { id } = req.params;
  const { Bookname, Author, Username, Mobile_no, DateIssued, LastDateToSubmit } = req.body;

  try {
    let updatedLibrary = await Library.findByIdAndUpdate(
      id,
      { Bookname, Author, Username, Mobile_no, DateIssued, LastDateToSubmit },
      { runValidators: true, new: true }
    );

    console.log("Data updated successfully!");
    res.redirect("/library?edit=true");
  } catch (err) {
    console.error("Error updating the document:", err);
    res.redirect("/library?edit=false");
  }
});

// Delete Route
app.delete("/library/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deletedData = await Library.findByIdAndDelete(id);
    console.log(deletedData);
    res.redirect("/library?delete=true");
  } catch (err) {
    console.error(err);
    res.redirect("/library?delete=false");
  }
});

// Show Route (View a specific library entry)
app.get("/library/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let library = await Library.findById(id);
    if (!library) {
      return res.status(404).send("Library document not found!");
    }
    res.render("show.ejs", { library });
  } catch (err) {
    console.error("Error fetching library document:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
