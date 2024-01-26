const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "emran", displayName: "Hossain" },
  { id: 2, username: "nusaiba", displayName: "Sadifa" },
  { id: 3, username: "farjana", displayName: "Maya" },
  { id: 4, username: "omaer", displayName: "Atiqur" },
  { id: 5, username: "asraful", displayName: "Alam" },
  { id: 6, username: "nahiyan", displayName: "Prodhan" },
];

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
