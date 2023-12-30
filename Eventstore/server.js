const server = require("fastify");
const readEvent = require("./readmod.js");
const cors = require("@fastify/cors");
const { writeEvent, addItem } = require("./writemod.js");
const { returnhost, hostcheck } = require("./check.js");
const fs = require("fs");

const dbserver = server().register(cors, {});

dbserver.get("/test", function (req, res) {
  console.log("/test");
  return { name: "HEA" };
});
//列出所有
dbserver.get("/list", async function (req, res) {
  try {
    const data = await readEvent("orderconference");
    // 根據需要對 data 進行處理
    return data;
  } catch (error) {
    console.error("Error occurred:", error);
    return "Error";
  }
});
//下單
dbserver.post("/order", async function (req, res) {
  //doing
  console.log("/order");
  try {
    let newEvent = req.body;
    await writeEvent(
      newEvent.type,
      newEvent.username,
      newEvent.increment,
      newEvent.price,
      "orderconference"
    );
    return "OK";
  } catch (error) {
    console.error("Error occurred:", error);
    return "Error";
  }
});
//新增商品
dbserver.post("/add", async function (req, res) {
  //doing
  console.log("/add");
  try {
    let newItem = req.body;
    await addItem(
      "Itemtype",
      newItem.ItemName,
      newItem.Picture,
      newItem.etime,
      newItem.price,
      "orderconference"
    );
    return "OK";
  } catch (error) {
    console.error("Error occurred:", error);
    return "Error";
  }
});

//列出projection 結果
dbserver.get("/result/:type", async function (req, res) {
  const type = req.params.type;
  try {
    const data = await readEvent(type);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error occurred:", error);
    return "Error";
  }
});

// dbserver.get("/check", function (req, res) {
//   const data = returnhost();
//   return data;
// });

dbserver.get("/check/:host", async function (req, res) {
  const host = req.params.host;

  const data = await hostcheck(host);

  const fileContent = fs.readFileSync(
    `./Eventstore/${host}.txt`,
    (encoding = "utf-8")
  );
  const lines = fileContent.split("\n");
  console.log(lines[lines.length - 2]);
  return lines[lines.length - 2].split(",");
});

dbserver.listen(3000, "127.0.0.1");
