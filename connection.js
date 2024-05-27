const express = require("express");
const mongoose = require("mongoose");
const MealModel = require("./meal");
const UserModel = require("./user");
const cors = require("cors");
const OrderModel = require("./order");
const app = express();
const https = require("https");
const fs = require("fs");

// const path = require("path");

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://christian2:christian2@beatstore.todsx.mongodb.net/EasyOrder?retryWrites=true&w=majority",
  // "mongodb+srv://root:eO2022@easyorder.j2hp3gt.mongodb.net/EasyOrder?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// app.use("/ssl", (req, res, next) => {
//   res.send("Hello from SSL");
//   console.log("Hello from SSL");
// });

//set requests
app.post("/deleteMeal", async (req, res) => {
  const meal = MealModel.deleteOne({ _id: req.body.id })
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/setOrder", (req, res) => {
  const meal = OrderModel.create({
    Name: req.body.name,
    Price: req.body.price,
    Mesa: req.body.mesa,
    Estado: req.body.estado,
  });
  try {
    meal.save = () => {};
    res.json("A sua refeição está sendo preparada");
  } catch (err) {
    console.log("Error while making order \n " + err);
    res.json(
      "Não foi possível criar um pedido \n, por favor verifique a sua conexão."
    );
  }
});

app.post("/addMeal", (req, res) => {
  const meal = MealModel.create({
    Name: req.body.Name,
    Description: req.body.Description,
    Image: req.body.Image,
    Price: req.body.Price,
    Course: req.body.Course,
  });
  try {
    meal.save = () => {};
    res.json("Prato adicionado com sucesso");
  } catch (err) {
    res.json("Error while adding meal ", err);
  }
});

//get requests
app.get("/", (req, res) => {
  res.json("Api is working properly");
  
});

app.get("/getMeals", (req, res) => {
  const meal = MealModel.find({})
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.json("Error while retrieving data" + err);
      console.log(err);
    });
});

app.post("/removeMeal", (req, res) => {
  const meal = MealModel.deleteOne({ _id: req.body.id })
    .then((found) => {
      res.json("Refeição removida com sucesso");
    })
    .catch((err) => {
      res.json("Error while removing meal" + err);
      console.log(err);
    });
});

app.post("/deliverOrder", (req, res) => {
  const order = OrderModel.deleteOne({ _id: req.body.id })
    .then((found) => {
      res.json("Refeição entregue com sucesso");
    })
    .catch((err) => {
      res.json("Error while delivering order" + err);
      console.log(err);
    });
});

app.post("/cancelOrder", (req, res) => {
  const order = OrderModel.deleteOne({ _id: req.body.id })
    .then((found) => {
      res.json("Pedido cancelado com sucesso");
    })
    .catch((err) => {
      res.json("Error while canceling your order" + err);
      console.log(err);
    });
});

app.get("/login", (req, res) => {
  const user = UserModel.findOne({})
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.json("Error while retrieving user " + err);
    });
});

app.post("/importMeals", async (req, res) => {
  const meal = MealModel.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    course: req.body.course,
  });
  try {
    meal.save = () => {};
    console.log(req.body);
  } catch (err) {
    res.json("Error while importing ", err);
  }
});

app.post("/changeEstado", async (req, res) => {
  try {
    const order = await OrderModel.updateOne(
      { _id: req.body.mealID },
      { $set: { Estado: req.body.novoEstado } }
    );
    res.json(order);
  } catch (err) {
    res.json("Error while changing state: " + err);
    console.log(err);
  }
});

app.get("/getOrders", (req, res) => {
  const meal = OrderModel.find({})
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      res.json("Error while retrieving data" + err);
      console.log(err);
    });
});

app.get("/teste", (req, res) => {
  res.json("Node is working fine!");
  console.log("Node is working fine!");
});

//clear
app.get("/clear", (req, res) => {
  const meal = OrderModel.deleteMany({})
    .then((found) => {
      res.json(found);
    })
    .catch((err) => {
      console.log("Error \n" + err);
    });
});

app.get("/sign", (req, res) => {
  const user = UserModel.create({
    username: "admin",
    password: "eO2022",
  });
  try {
    user.save = () => {};
    res.json("send");
  } catch (err) {
    res.json("Error while importing ", err);
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Listenting on port ${PORT}...`));

// const ssl = {
//   key: fs.readFileSync(
//     "/etc/letsencrypt/live/christianmacarthur.com-0004/privkey.pem"
//   ),
//   cert: fs.readFileSync(
//     "/etc/letsencrypt/live/christianmacarthur.com-0004/cert.pem"
//   ),
//   ca: fs.readFileSync(
//     "/etc/letsencrypt/live/christianmacarthur.com-0004/chain.pem"
//   ),
// };

// https.createServer(ssl, app).listen(PORT, () => {
//   console.log(`Secure server running on port ${PORT}...`);
// });
