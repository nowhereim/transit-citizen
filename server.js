const server = require("./app");
const port = process.env.PORT || 3000;

require("./randomChat");

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
