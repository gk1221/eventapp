import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";
import { time } from "console";
import { randomUUID } from "crypto";

import { readFileSync } from "fs";

const client = new EventStoreDBClient(
  {
    endpoints: [
      {
        address: "localhost",
        port: 2112,
      },
    ],
    nodePreference: "random",
  },
  {
    rootCertificate: readFileSync("../certs/ca/ca.crt"),
  },
  {
    username: "admin",
    password: "changeit",
  }
);
async function simpleTest() {
  const streamName = "account-1";

  const event = jsonEvent({
    type: "myEventType",
    data: {
      languages: ["typescript", "Python", "JavaScript"],
      runtime: "NodeJS",
      set: 2,
      identiy: time(),
      fox: true,
    },
    metadata: {
      resource: "Node.js",
      log: time(),
    },
  });

  const appendResult = await client.appendToStream(streamName, event);

  if (appendResult.success) console.log("Message sent!");
}

setInterval(() => {
  simpleTest();
}, 300);

