// backend.js
import express from "express";
import cors from "cors";
import x from "./user-services.js"
import User from "./user.js"


const app = express();
const port = 8000;


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "CharlieHello",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };



app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello There World!");
});

  //
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  x.getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((err) => {
      console.error("Failed to fetch users:", err);
      res.status(500).send("Internal Server Error");
    });
});


  //
 app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  x.findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.error("Error fetching user by ID:", err);
      res.status(500).send("Internal Server Error");
    });
});
  
  
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



  //keep for now
  const generateId = () => {
    return Math.random().toString(36).substr(2, 8); // Generates short random alphanumeric ID
  };


  app.post("/users", (req, res) => {
    const userToAdd = req.body;
  
    x.addUser(userToAdd)
      .then((savedUser) => {
        res.status(201).send(savedUser);
      })
      .catch((err) => {
        console.error("Failed to add user:", err);
        res.status(500).send("Internal Server Error");
      });
  });



  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
  
    x.deleteUserById(id)
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(404).send("User not found.");
        }
        res.status(200).send({
          message: "User deleted successfully.",
          user: deletedUser,
        });
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        res.status(500).send("Internal Server Error");
      });
  });