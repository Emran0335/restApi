const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// callback function is also called predicate function
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "emran", displayName: "Hossain" },
  { id: 2, username: "nusaiba", displayName: "Sadifa" },
  { id: 3, username: "farjana", displayName: "Maya" },
  { id: 4, username: "omaer", displayName: "Atiqur" },
  { id: 5, username: "asraful", displayName: "Alam" },
  { id: 6, username: "nahiyan", displayName: "Prodhan" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  // when filter and value are undefined
  if (!filter && !value) return res.send(mockUsers);
  if (filter && value)
    // return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    return res.send(mockUsers.filter((user) => user[filter] === value));
});

app.get("/api/users/:id", (req, res) => {
  // params is string. so it should be numeric.
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Bad Request and invalid id." });
  }
  const user = mockUsers.find((user) => user.id === parsedId);
  if (!user) {
    res.status(404).send("User not found");
  }
  return res.send(user);
});

// query parameters
// localhost:3000/api/users?key=value&key2=value2
// localhost is called domain
// 3000 is called port/path
// products is called route/segment/endpoint
// key=value&key2=value2 is called query parameters(query string)
// & is called delimiter which means fix the boundary
// filter=username&value=em, but value=Em does not work as uppercase is not allowed
app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken roast", price: 12.99 }]);
});


// post request
// localhost:3000/api/users
app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.listen(PORT, () => {
  console.log(`The port is running on ${PORT}`);
});
