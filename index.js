const express = require("express");
const app = express();
const {
  query,
  validationResult,
  matchedData,
  checkSchema,
} = require("express-validator");
const createUserValidationSchema = require("./utils/validationSchema.js");
const createQueryValidationSchema = require("./utils/queryValidationSchema.js");

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

// query validation. this is an api to validate the income data and it is called express-validator
app.get("/api/users", checkSchema(createQueryValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  const {
    query: { filter, value },
  } = req;
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
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

// body()function middleware from express-validator to check the proper data for the body. It can also be used in array
// post request
// localhost:3000/api/users

app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  // validation for the post method
  const result = validationResult(req);
  console.log(result);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  const data = matchedData(req);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// put-> update entire record of database
// patch-> update partial record of database
// delete-> delete entire record of database

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

// patch request
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  // overwrite the properties of the mockUsers[findUserIndex] object.
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

// delete
app.delete("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`The port is running on ${PORT}`);
});
