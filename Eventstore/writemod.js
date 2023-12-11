const {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} = require("@eventstore/db-client");
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
const writeEvent = async (type, username, increatment, upbound) => {
  const streamName = "orderconference";

  const event = jsonEvent({
    type: type,
    data: {
      increment: increatment,
    },
    metadata: {
      name: username,
      upbound: upbound,
    },
  });

  const appendResult = await client.appendToStream(streamName, event);

  return appendResult.success;
};

module.exports = writeEvent;
