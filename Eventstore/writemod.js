const { EventStoreDBClient, jsonEvent } = require("@eventstore/db-client");
const { time } = require("console");
const { randomUUID } = require("crypto");

const { readFileSync } = require("fs");

const client = new EventStoreDBClient(
  {
    endpoints: [
      {
        address: "localhost",
        port: 2112,
      },
      {
        address: "localhost",
        port: 2113,
      },
      {
        address: "localhost",
        port: 2111,
      },
    ],
    nodePreference: "random",
  },
  {
    rootCertificate: readFileSync(__dirname + "/../certs/ca/ca.crt"),
  },
  {
    username: "admin",
    password: "changeit",
  }
);
const writeEvent = async (type, username, increatment, nowprice, stream) => {
  const streamName = stream;

  const event = jsonEvent({
    type: type,
    data: {
      increment: increatment,
    },
    metadata: {
      UserName: username,
      NowPrice: nowprice,
    },
  });

  const appendResult = await client.appendToStream(streamName, event);

  return appendResult.success;
};

const addItem = async (type, ItemName, picURL, etime, price, stream) => {
  const streamName = stream;

  const event = jsonEvent({
    type: type,
    data: {
      ItemName: ItemName,
      Picture: picURL,
      StartPrice: price,
    },
    metadata: {
      Endtime: etime,
    },
  });

  const appendResult = await client.appendToStream(streamName, event);

  return appendResult.success;
};

module.exports = { writeEvent, addItem };
