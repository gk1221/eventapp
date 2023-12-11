const {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
  BACKWARDS,
  END,
} = require("@eventstore/db-client");
const { readFileSync } = require("fs");
const path = require("path");

const rootCertificatePath = path.join(
  __dirname,
  "../../project/certs/ca/ca.crt"
);

const client = new EventStoreDBClient(
  {
    endpoints: [
      {
        address: "localhost",
        port: 2112,
      },
      {
        address: "localhost",
        port: 2111,
      },
      {
        address: "localhost",
        port: 2113,
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

const readEvent = async (stream) => {
  const events = client.readStream(stream, {
    direction: BACKWARDS,
    fromRevision: END,
    maxCount: 30,
  });
  const collectedEventData = [];

  for await (const resolvedEvent of events) {
    // console.log(1);

    collectedEventData.push({
      ...resolvedEvent.event.data,
      type: resolvedEvent.event.type,
      people: resolvedEvent.event.metadata.name,
      time: resolvedEvent.event.created,
    });
  }
  console.log(collectedEventData);

  return collectedEventData;
};

module.exports = readEvent;
