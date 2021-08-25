const { PORT } = require("./constants");
const fs = require("fs");
const net = require("net");
const server = net.createServer();

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const getFileData = (fileName, client) => {
  fs.readFile("./files/" + fileName, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    client.write(data);
  });
}

server.on("connection", client => {
  console.log("a client has connected");

  client.setEncoding("utf8");

  console.log(`a client connected`);
  // inform the client the correct format for requesting a file is
  // file: [FILENAME.EXTENSION]
  client.write("welcome to the file server\n");
  client.write("the syntax for requesting a file is... \n");
  client.write("file: [FILENAME.EXTENSION] // replace filename.extension with the file you want to request");
  client.write("for example: type...");
  client.write("file: lorem.html");

  client.on("data", (data) => {
    const head = data.split(" ")[0];
    // we try to fetch file data only if the format used by client is
    // file: [FILENAME.EXTENSION]
    if (head === "file:") {
      let requestedFile = data.split(" ")[1];
      requestedFile = requestedFile.substr(0, requestedFile.length - 1);
      if (requestedFile) {
        getFileData(requestedFile, client);
      }
    }
  });

  client.on("end", () => {
    console.log("client disconnected");
  });
});