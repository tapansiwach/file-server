const { HOST, PORT } = require("./constants");
const { stdin } = require("process");

const net = require("net");
const client = net.createConnection({
  host: HOST,
  port: PORT,
});

client.setEncoding("utf8");

client.on("connect", () => {
  client.write("Hello from client");
});

client.on("data", (data) => {
  console.log(data);
})

stdin.on("data", (data) => {
  client.write(data);
});