const server = require("fastify");
const readEvent = require("./readmod.js");
const cors = require("@fastify/cors");
const writeEvent = require("./writemod.js");
<<<<<<< HEAD
const returnhost = require("./check.js");
=======
>>>>>>> 3b3155418d8bf7dabe112cbc81f8d6e3e984c5f9

const dbserver = server().register(cors, {});

dbserver.get("/test", function (req, res) {
  console.log("/test");
  return { name: "HEA" };
});

dbserver.get("/list", async function (req, res) {
  try {
    const data = await readEvent("orderconference");
    // 根據需要對 data 進行處理
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while fetching data" };
  }
});

dbserver.get("/order1", function (req, res) {
  console.log("/order1");
  return { name: "userA" };
});

dbserver.post("/order2", function (req, res) {
  return reply.status(200).send({ message: "Hello World" });
});

dbserver.post("/order", async function (req, res) {
  //doing
  console.log("/order");
  try {
    let newEvent = req.body;
    await writeEvent(
      newEvent.type,
      newEvent.username,
      newEvent.increment,
      newEvent.upbound
    );
    return "OK";
  } catch (error) {
    console.error("Error occurred:", error);
    return { error: "An error occurred while creating the event" };
  }
});

dbserver.get("/result", async function (req, res) {
  const data = await readEvent("order_result");
  return data;
});

<<<<<<< HEAD
dbserver.get("/check", function (req, res) {
  const data = returnhost();

  return data;
});

=======
>>>>>>> 3b3155418d8bf7dabe112cbc81f8d6e3e984c5f9
dbserver.listen(3000, "127.0.0.1");
