const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Library = require("./models/library.js");
const methodOverride = require("method-override");


app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
  console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Library');
}

let library1 = new Library({
    Bookname: "Think & Grow Rich",
    Author: "Napoleon Hill",
    Username: "Abhijeet Karne",
    Mobile_no: "9529892215",
    DateIssued: "2024-12-12", // Example date
    LastDateToSubmit: "2024-12-25" // Example date
});

library1.save().then((res) =>{
  console.log(res);
});

app.get("/" , (req , res) =>{
  res.send("root is working");
});

//Index Route
app.get("/library" , async (req , res) =>{
  let library = await Library.find();
  console.log(library);
  res.render("index.ejs" , { library });
})

//New Route
app.get("/library/new" , (req , res) =>{
  res.render("new.ejs")
})

app.post("/library" , async (req , res) =>{
  let {Bookname , Author , Username , Mobile_no , DateIssued , LastDateToSubmit} = req.body;
  let newLibrary = new Library({
    Bookname: Bookname,
    Author: Author,
    Username: Username,
    Mobile_no: Mobile_no,
    DateIssued: DateIssued,
    LastDateToSubmit: LastDateToSubmit,
  });
  // newLibrary
  //   .save()
  //   .then((res) =>{
  //     console.log("Data was saved");
  //   })
  //   .catch((err) =>{
  //     console.log(err);
  //   });
  //   res.redirect("/library");
  try {
    await newLibrary.save();
    console.log("Data was saved");
    res.redirect("/library?success=true"); // Redirect with success query
  } catch (err) {
    console.error(err);
    res.redirect("/library?success=false"); // Redirect in case of failure
  }

});

//Edit Route
app.get("/library/:id/edit" ,async (req , res) =>{
  let {id} = req.params;
  let library = await Library.findById(id);
  res.render("edit.ejs" , { library });
});

//Update Route
// app.put("/library/:id" , async(req , res) =>{
//   let {id} = req.params;
//   let {Bookname: newBookname , Author: newAuthor , Username: newUsername , Mobile_no: newMobile_no , DateIssued: newDateIssued , LastDateToSubmit: newLastDateToSubmit} = req.body;
//   console.log(newBookname);
//   console.log(newAuthor);
//   console.log(newUsername);
//   console.log(newMobile_no);
//   console.log(newDateIssued);
//   console.log(newLastDateToSubmit);

//   let updatedLibrary = await Library.findByIdAndUpdate(id,
//     {Bookname: newBookname},
//     {Author: newAuthor},
//     {Username: newUsername},
//     {Mobile_no: newMobile_no},
//     {DateIssued: newDateIssued},
//     {LastDateToSubmit: newLastDateToSubmit},
//     {runValidators: true , new: true}
//   );
//   (updatedLibrary);
//   res.redirect("/library");
// })

app.put("/library/:id", async (req, res) => {
  let { id } = req.params;
  let { Bookname, Author, Username, Mobile_no, DateIssued, LastDateToSubmit } = req.body;

  try {
    await Library.findByIdAndUpdate(
      id,
      {
        Bookname,
        Author,
        Username,
        Mobile_no,
        DateIssued,
        LastDateToSubmit,
      },
      { runValidators: true, new: true }
    );

    console.log("Data updated successfully!");
    res.redirect("/library?edit=true"); // Redirect with edit success flag
  } catch (err) {
    console.error("Error updating the document:", err);
    res.redirect("/library?edit=false"); // Redirect with edit failure flag
  }
});


//Delete Route
// app.delete("/library/:id" , async(req , res) =>{
//   let {id} = req.params;
//   let deletedData = await Library.findByIdAndDelete(id);
//   console.log(deletedData);
//   res.redirect("/library");
// })


app.delete("/library/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deletedData = await Library.findByIdAndDelete(id);
    console.log(deletedData);
    res.redirect("/library?delete=true"); // Redirect with delete query parameter
  } catch (err) {
    console.error(err);
    res.redirect("/library?delete=false"); // Redirect with failure query
  }
});

// See in detail
app.get("/library/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let library = await Library.findById(id); // Fetch the library document by ID from the database
    if (!library) {
      return res.status(404).send("Library document not found!");
    }
    res.render("show.ejs", { library }); // Pass the retrieved document to the template
  } catch (err) {
    console.error("Error fetching library document:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(8080 , () =>{
  console.log("Server is listening on port 8080");
});