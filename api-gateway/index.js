const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const app = express();

// Route requests to the user service
app.use("/users", (req, res) => {
  console.log("Routing request to user service");

  proxy.web(req, res, { target: "http://localhost:3000" });
});

// Route requests to the product service
app.use("/products", (req, res) => {

  console.log("Routing request to product service");
  proxy.web(req, res, { target: "http://localhost:3001" });
});

// Route requests to the order service
app.use("/orders", (req, res) => {
  console.log("Routing request to order service");
  proxy.web(req, res, { target: "http://localhost:3002" });
});

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
